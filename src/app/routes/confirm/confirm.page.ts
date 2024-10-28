import { UsersService } from 'src/services/users/users.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from '../../../shared/utils/base.component';
import {
  AlertController,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import { PayloadService } from '../../../services/payload/payload.service';
import { IPayload } from '../../../services/payload/interfaces/i-payload';
import { ERouters } from '../../../shared/utils/e-routers';
import { ConfirmEmailDto } from '../../../services/users/dto/confirm-email.dto';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.page.html',
  styleUrls: ['./confirm.page.scss'],
})
export class ConfirmPage extends BaseComponent implements OnInit {
  public payload: IPayload | null = null;
  public uid: number | null = null;
  public token: string | null = null;
  public isLoading: boolean = true;
  public canResend: boolean = true;
  public isChecking: boolean = false;
  public isVerified: boolean = false;
  public emailResent: boolean = false;
  public redirected: boolean = false;

  constructor(
    private readonly payloadService: PayloadService,
    private readonly usersService: UsersService,
    private router: Router,
    private route: ActivatedRoute,
    toastController: ToastController,
    alertController: AlertController,
    loadingController: LoadingController
  ) {
    super(toastController, alertController, loadingController);
  }

  public goBack() {
    this.payloadService.nextPayload(null);
    this.router.navigate([ERouters.login], {
      replaceUrl: true,
    });
  }

  ngOnInit() {
    this.subs.push(
      this.payloadService.payload$.subscribe((res: IPayload | null) => {
        this.payload = res;
        if (res) {
          this.checkPayloadOrToken();
        }
      })
    );
    this.token = this.route.snapshot.queryParams['token'];
    this.uid = parseInt(this.route.snapshot.queryParams['uid']);
    this.redirected = this.route.snapshot.queryParams['redirected'] === 'true';
    console.log('QUERY =>', this.route.snapshot.queryParams);
    this.checkPayloadOrToken();
  }

  public resendEmail() {
    this.isLoading = true;
    this.usersService.resendEmail().subscribe({
      next: () => {
        this.emailResent = true;
        this.isLoading = false;
      },
      error: (error: any) => {
        this.alert(error?.message, 'Atenção!');
        console.error(error);
        this.isLoading = false;
      },
    });
  }

  private checkPayloadOrToken() {
    // SE NÃO TIVER TOKEN NEM PAYLOAD, ENTÃO A PESSOA CAIU DE PARAQUEDAS. MANDA DE VOLTA PRO LOGIN
    if (!this.token && !this.payload) {
      this.goBack();
      return;
    }

    if (this.redirected) {
      // NESSE CASO ESSA PÁGINA FOI ACESSADA PELO REGISTER OU CHECKIN (login)

      /**
       * TENHO QUE EXIBIR NO FRONT AS OPÇÕES DE
       *    "JÁ CONFIRMEI", QUE ASSIM VAI CONSULTAR NA API, SE VIER COM VERIFIED TRUE ENTÃO TÁ CERTO, SE NÃO, IGNORA.
       *    "ENVIAR NOVAMENTE", TENHO QUE COLOCAR EM PAUTA DE DEIXAR ESSA OPÇÃO DESATIVADA SE O TEMPO DO ÚLTIMO ENVIO FOR MENOR QUE 1 HORA.
       */
      if (this.payload?.verified) {
        this.isVerified = true;
        return;
      }

      console.log('VERIFIED SCHEDULED =>', this.payload?.verifiedScheduled);

      let scheduled: Date | null = null;
      if (this.payload?.verifiedScheduled) {
        const [day, month, yearAndTime] = (
          this.payload.verifiedScheduled as string
        ).split('/');
        const [year, time] = yearAndTime.split(' ');

        scheduled = new Date(`${year}-${month}-${day}T${time}Z`);
      }

      if (scheduled && !isNaN(scheduled.getTime())) {
        // Verifica se a data é válida
        const now = new Date();
        console.log('SCHEDULED =>', scheduled);

        const diff = Math.abs(
          (now.getTime() - scheduled.getTime()) / (1000 * 60)
        );

        console.log('DIFF =>', diff);
        if (diff < 45) {
          this.canResend = false;
        }
      } else {
        console.log('Data inválida');
      }
    }

    // NESSE CASO ESSA PÁGINA FOI ACESSADA PELO E-MAIL OU COM ALGUM PARAMQUERY MANUAL
    if (this.token) {
      console.log('Tem token!');
      // PRECISO ENVIAR PRA API O TOKEN E O USERID (SE TIVER PAYLOAD)
      if (this.payload && this.payload?.id) {
        console.log('Tem payloadId!');
        if (this.uid) {
          if (this.uid !== this.payload.id) {
            this.alert(
              'Houve um erro pra confirmar seu e-mail, tente novamente',
              'Atenção!'
            );
            return;
          }
          // SE CAIR AQUI, O PAYLOAD.ID É O MESMO QUE O UID
        }
        this.uid = this.payload.id;
        // CONSEQUENTEMENTE, SE CAIR AQUI, NÃO NECESSARIAMENTE ELE TEM UM UID, MAS TEM O PAYLOAD.ID,
        // ENTÃO POSSO USAR O PAYLOAD.ID
        console.log('O payloadId é o mesmo que o userId na query');
        this.isChecking = true;
        // SE RETORNAR UM ACCESSTOKEN, ENTÃO MANDA PRA PÁGINA DE CHECKIN. QUALQUER EXCEÇÃO VAI CAIR NA TRATATIVA DE ERRO
        return;
      } else {
        console.log('Não tem payloadId!');
        if (!this.uid) {
          this.alert(
            'Houve um erro pra confirmar seu e-mail, tente novamente',
            'Atenção!'
          );
          return;
        }
        this.isChecking = true;
      }

      const data = {
        token: this.token,
        userId: this.uid,
      } as ConfirmEmailDto;
      this.usersService.confirmEmail(data).subscribe({
        next: (res) => {
          console.log(res);
          this.isChecking = false;
          // if (res.item) {
          //   this.router.navigate([ERouters.checkin], {
          //     replaceUrl: true,
          //   });
          // }
        },
        error: (error) => {
          this.isChecking = false;
          console.error(error);
        },
      });
    }

    this.isLoading = false;
  }
}

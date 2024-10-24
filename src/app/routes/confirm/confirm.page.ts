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

  constructor(
    private readonly payloadService: PayloadService,
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
      this.payloadService.payload$.subscribe((res) => (this.payload = res))
    );
    this.token = this.route.snapshot.queryParams['token'];
    this.uid = this.route.snapshot.queryParams['uid'] as number;
    // SE NÃO TIVER TOKEN NEM PAYLOAD, ENTÃO A PESSOA CAIU DE PARAQUEDAS. MANDA DE VOLTA PRO LOGIN
    if (!this.token && !this.payload) {
      this.goBack();
      return;
    }

    if (!this.token && this.payload) {
      // NESSE CASO ESSA PÁGINA FOI ACESSADA PELO REGISTER OU CHECKIN

      /**
       * TENHO QUE EXIBIR NO FRONT AS OPÇÕES DE 
       *    "JÁ CONFIRMEI", QUE ASSIM VAI CONSULTAR NA API, SE VIER COM VERIFIED TRUE ENTÃO TÁ CERTO, SE NÃO, IGNORA.
       *    "ENVIAR NOVAMENTE", TENHO QUE COLOCAR EM PAUTA DE DEIXAR ESSA OPÇÃO DESATIVADA SE O TEMPO DO ÚLTIMO ENVIO FOR MENOR QUE 1 HORA.
       */
    }

    if (this.token) {
      // NESSE CASO ESSA PÁGINA FOI ACESSADA PELO E-MAIL OU COM ALGUM PARAMQUERY MANUAL

      // PRECISO ENVIAR PRA API O TOKEN E O USERID (SE TIVER PAYLOAD)
      if (this.payload?.id) {
        if (this.uid) {
          if (this.uid !== this.payload.id) {
            this.alert("Houve um erro pra confirmar seu e-mail, tente novamente", "Atenção!");
            return;
          }
          // SE CAIR AQUI, O PAYLOAD.ID É O MESMO QUE O UID
        }
        // CONSEQUENTEMENTE, SE CAIR AQUI, NÃO NECESSARIAMENTE ELE TEM UM UID, MAS TEM O PAYLOAD.ID,
        // ENTÃO POSSO USAR O PAYLOAD.ID

        // this.usersService.confirmEmail(token, this.payload.id).subscribe({ next: (res) => { console.log(res); }, error: (error) => { console.error(error); } });
        // SE RETORNAR UM ACCESSTOKEN, ENTÃO MANDA PRA PÁGINA DE CHECKIN. QUALQUER EXCEÇÃO VAI CAIR NA TRATATIVA DE ERRO
      }
    }

    this.isLoading = false;
  }
}

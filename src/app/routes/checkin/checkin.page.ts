import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../shared/utils/base.component';
import {
  ToastController,
  AlertController,
  LoadingController,
} from '@ionic/angular';
import { ERouters } from '../../../shared/utils/e-routers';
import { PayloadService } from '../../../services/payload/payload.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IPayload } from '../../../services/payload/interfaces/i-payload';
import { InstitutionService } from '../../../services/instution/intitution.service';
import { IInstitution } from '../../../services/instution/interfaces/i-institution';
import { UsersService } from '../../../services/users/users.service';
import { SelectInstitutionDto } from '../../../services/users/dto/select-institution.dto';

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.page.html',
  styleUrls: ['./checkin.page.scss'],
})
export class CheckinPage extends BaseComponent implements OnInit {
  public payload: IPayload | null = null;
  public isLoading: boolean = true;
  public institutions: IInstitution[] | null = [];
  public redirected: boolean = false;

  constructor(
    private readonly usersService: UsersService,
    private readonly institutionService: InstitutionService,
    private readonly payloadService: PayloadService,
    private route: ActivatedRoute,
    private router: Router,
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
      this.institutionService.institutions$.subscribe(
        (res) => (this.institutions = res)
      ),
      this.payloadService.payload$.subscribe((res) => (this.payload = res))
    );
    this.redirected = this.route.snapshot.queryParams['redirected'];
    this.onGetPayload();
  }

  public onSelectInstitution(institution: IInstitution) {
    this.isLoading = true;
    const data = {
      institutionId: institution.id,
      userId: parseInt(this.payload?.id as any),
    } as SelectInstitutionDto;
    this.usersService.selectInstitution(data).subscribe({
      next: (_) => {
        this.getInstitution();
      },
      error: (error) => {
        console.error(error);
        this.isLoading = false;
        this.alert(error?.message, 'Atenção!');
      },
    });
  }

  private onGetPayload() {
    this.isLoading = true;
    this.institutionService.getAllByUser().subscribe({
      next: (res) => {
        if (res.items.length && res.items.length > 0) {
          const institutionId = parseInt(this.payload?.institutionId as any);
          if (institutionId) {
            const institution = res.items.find(
              (item) => item.id === institutionId
            );
            // console.log('institution', institution)
            if (institution) {
              this.onSelectInstitution(institution);
            } else {
              this.isLoading = false;
            }
          } else {
            if (res.items.length === 1 && this.redirected) {
              this.onSelectInstitution(res.items[0]);
            } else {
              this.isLoading = false;
              this.router.navigate([ERouters.login]);
            }
          }
        } else {
          this.isLoading = false;
          this.router.navigate([ERouters.login]);
        }
      },
      error: (error) => {
        console.error(error);
        this.isLoading = false;
        this.alert(error?.message, 'Atenção!');
      },
    });
  }

  private getInstitution() {
    this.institutionService.getCurrent().subscribe({
      next: (_) => {
        this.isLoading = false;
        this.router.navigate([ERouters.home], {
          replaceUrl: true,
        });
      },
      error: (error) => {
        console.error(error);
        this.isLoading = false;
        this.alert(error?.message, 'Atenção!');
      },
    });
  }
}

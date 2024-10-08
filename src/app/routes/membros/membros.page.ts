import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {
  ToastController,
  AlertController,
  LoadingController,
} from '@ionic/angular';
import { BaseComponent } from '../../../shared/utils/base.component';
import { ERouters } from '../../../shared/utils/e-routers';
import { PayloadService } from '../../../services/payload/payload.service';
import { IPayload } from '../../../services/payload/interfaces/i-payload';
import { EUserRole } from '../../../services/payload/interfaces/enum/EUserRole';
import { UsersService } from '../../../services/users/users.service';

@Component({
  selector: 'app-membros',
  templateUrl: './membros.page.html',
  styleUrls: ['./membros.page.scss'],
})
export class MembrosPage
  extends BaseComponent
  implements OnInit, AfterViewInit
{
  // @ViewChild('AppEdit') public appEditMember: any;
  @ViewChild('AppAddMember') public appAddMember: any;
  public payload: IPayload | null = null;
  public homeURL = `/${ERouters.app}/${ERouters.home}`;
  public defaultURL = ERouters.home;
  public isLoading = true;
  public eUser = EUserRole.USER;
  public eSupport = EUserRole.SUPPORT;
  public eWarehouseman = EUserRole.WAREHOUSEMAN;
  public members: any[] | null = [];

  constructor(
    private readonly usersService: UsersService,
    private readonly payloadService: PayloadService,
    toastController: ToastController,
    alertController: AlertController,
    loadingController: LoadingController
  ) {
    super(toastController, alertController, loadingController);
  }

  ngAfterViewInit(): void {
    this.onGetAll();
  }

  ngOnInit() {
    this.subs.push(
      this.payloadService.payload$.subscribe((res) => (this.payload = res)),
      this.usersService.members$.subscribe((res) => (this.members = res))
    );
  }

  public onReload() {
    this.onGetAll();
  }

  public onShowChangeRole(member: any) {}

  public translateRole(memberRole: EUserRole): string {
    switch (memberRole) {
      case EUserRole.USER:
        return 'USUÁRIO';
      case EUserRole.WAREHOUSEMAN:
        return 'ALMOXARIFE';
      case EUserRole.COORDINATOR:
        return 'COORDENADOR';
      case EUserRole.SUPPORT:
        return 'SUPORTE';
      default:
        return 'INDEFINIDO';
    }
  }

  public onGetRoleColor(memberRole: EUserRole): string {
    switch (memberRole) {
      case EUserRole.USER:
        return 'tertiary';
      case EUserRole.WAREHOUSEMAN:
        return 'success';
      case EUserRole.COORDINATOR:
        return 'danger';
      case EUserRole.SUPPORT:
        return 'warning';
      default:
        return 'medium';
    }
  }

  public async onShowRemove(memberId: number) {
    if (this.payload?.id === memberId) {
      this.toast('Você não pode remover a si mesmo.', 'Atenção!', 'danger');
      return;
    }
    await this.alertController
      .create({
        cssClass: 'custom-alert',
        header: 'Atenção!',
        message: 'Deseja realmente remover este membro?',
        buttons: [
          {
            text: 'Cancelar',
            handler: () => {},
          },
          {
            text: 'Excluir',
            handler: () => {
              this.onRemove(memberId);
            },
          },
        ],
      })
      .then((alert) => alert.present());
  }

  private onRemove(memberId: number) {
  }

  private onGetAll() {
    this.isLoading = true;
    this.usersService.getAllFromInstitution().subscribe({
      next: (res) => {
        this.isLoading = false;
      },
      error: (error) => {
        console.error(error);
        this.isLoading = false;
        this.toast(error?.message, 'Atenção!', 'danger', 'bottom');
      },
    });
  }
}

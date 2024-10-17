import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import {
  AlertController,
  IonSearchbar,
  LoadingController,
  ToastController,
  ViewDidEnter,
} from '@ionic/angular';
import { IMember } from 'src/services/users/interfaces/i-member';
import { UsersService } from 'src/services/users/users.service';
import { IWarehouse } from 'src/services/warehouses/interfaces/i-warehouse';
import { AreasService } from '../../../services/areas/areas.service';
import { IArea } from '../../../services/areas/interfaces/i-area';
import { EUserRole } from '../../../services/payload/interfaces/enum/EUserRole';
import { IPayload } from '../../../services/payload/interfaces/i-payload';
import { PayloadService } from '../../../services/payload/payload.service';
import { WarehousesService } from '../../../services/warehouses/warehouses.service';
import { BaseComponent } from '../../../shared/utils/base.component';
import { ERouters } from '../../../shared/utils/e-routers';

@Component({
  selector: 'app-warehouses',
  templateUrl: './warehouses.page.html',
  styleUrls: ['./warehouses.page.scss'],
})
export class WarehousesPage
  extends BaseComponent
  implements OnInit, ViewDidEnter
{
  // #region Properties (4)

  @ViewChild('searchbarInput') searchbar!: IonSearchbar;
  @ViewChild('AppCreateWarehouse') createWarehouseModal!: any;
  public isLoading = true;
  public payload: IPayload | null = null;
  public warehouses: IWarehouse[] | null = [];
  public areas: IArea[] | null = [];
  public warehousemans: IMember[] | null = [];
  public filtered: IWarehouse[] | null = [];
  public search: string = '';
  public eUser = EUserRole.USER;
  public eWarehouseman = EUserRole.WAREHOUSEMAN;
  public homeURL = `/${ERouters.app}/${ERouters.home}`;
  public defaultURL = ERouters.home;
  public isDark: boolean = false;

  // #endregion Properties (4)

  // #region Constructors (1)

  constructor(
    private readonly payloadService: PayloadService,
    private readonly usersService: UsersService,
    private readonly areasService: AreasService,
    private readonly warehousesService: WarehousesService,
    private cdr: ChangeDetectorRef,
    toastController: ToastController,
    alertController: AlertController,
    loadingController: LoadingController
  ) {
    super(toastController, alertController, loadingController);
  }

  // #endregion Constructors (1)

  // #region Public Getters And Setters (1)

  public get columnSize(): number {
    if (window.innerWidth <= 950 && window.innerWidth > 798) {
      return 4;
    }
    if (window.innerWidth <= 798) {
      return 6;
    }
    return 3;
  }

  // #endregion Public Getters And Setters (1)

  // #region Public Methods (6)

  ionViewDidEnter(): void {
    this.onGetAll();
  }

  public onDeleteWarehouse(wh: IWarehouse) {
    this.alertController
      .create({
        cssClass: 'custom-alert',
        header: 'Excluir Almoxarifado',
        message: `Deseja realmente excluir o almoxarifado ${wh.name}?`,
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
          },
          {
            text: 'Sim',
            handler: () => {
              this.warehousesService.delete(wh.id).subscribe({
                next: (_: any) => {
                  this.toast('Almoxarifado excluído com sucesso!', 'Sucesso');
                  this.onReload();
                },
                error: (err: any) => {
                  this.alert(err?.message, 'Atenção!');
                },
              });
            },
          },
        ],
      })
      .then((a) => a.present());
  }

  public onGetAll() {
    this.isLoading = true;
    this.warehousesService.getAll().subscribe({
      next: (_: any) => {
        this.isLoading = false;
      },
      error: (err: any) => {
        // console.log('[WHERR]', err);
        this.alert(err?.message, 'Atenção!');
        this.isLoading = false;
      },
    });
  }

  public onCreateWarehouse() {
    if (!this.areas || this.areas.length === 0) {
      this.toast(
        'Você precisa registrar uma área antes de criar um almoxarifado.',
        'Atenção!',
        'warning',
        'middle'
      );
      return;
    }
    this.createWarehouseModal.onOpenModal();
  }

  public onSearch() {
    this.isLoading = true;
    if (!this.search) {
      this.onGetAll();
      setTimeout(() => {
        this.searchbar.setFocus();
      }, 100);
      return;
    }
    this.warehousesService.searchByName(this.search).subscribe({
      next: (_: any) => {
        this.isLoading = false;
        setTimeout(() => {
          this.searchbar.setFocus();
        }, 100);
      },
      error: (err: any) => {
        // console.log('[WHERR]', err);
        this.alert(err?.message, 'Atenção!');
        this.isLoading = false;
      },
    });
  }

  public goToWarehouse(wh: IWarehouse) {
    // console.log('[WAREHOUSE]', wh);
  }

  public ngOnInit() {
    this.search = '';
    this.subs.push(
      this.payloadService.payload$.subscribe(
        (res: any) => (this.payload = res)
      ),
      this.usersService.members$.subscribe((res: any) => {
        this.warehousemans = res?.filter(
          (u: any) => u.role === EUserRole.WAREHOUSEMAN
        ) as IMember[];
      }),
      this.areasService.areas$.subscribe((res: any) => (this.areas = res)),
      this.warehousesService.warehouses$.subscribe((res: any) => {
        this.warehouses = res;
        this.filtered = res;
      }),
      this.warehousesService.filtered$.subscribe((res: any) => {
        // console.log(res);
        if (this.payload?.role === this.eWarehouseman) {
          const filter = res?.filter((w: any) => w.active);
          this.filtered = filter as IWarehouse[];
          return;
        }
        this.filtered = res;
      })
    );
  }

  public onReload() {
    this.onGetAll();
  }

  // #endregion Public Methods (6)
}

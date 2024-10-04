import { Component, OnInit, ViewChild } from '@angular/core';
import {
  AlertController,
  IonSearchbar,
  LoadingController,
  ToastController,
  ViewDidEnter,
} from '@ionic/angular';
import { IWarehouse } from 'src/services/warehouses/interfaces/i-warehouse';
import { IPayload } from '../../../services/payload/interfaces/i-payload';
import { PayloadService } from '../../../services/payload/payload.service';
import { WarehousesService } from '../../../services/warehouses/warehouses.service';
import { BaseComponent } from '../../../shared/utils/base.component';
import { AreasService } from '../../../services/areas/areas.service';
import { IArea } from '../../../services/areas/interfaces/i-area';
import { EUserRole } from '../../../services/payload/interfaces/enum/EUserRole';
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
  public filtered: IWarehouse[] | null = [];
  public search: string = '';
  public eUser = EUserRole.USER;
  public homeURL = `/${ERouters.app}/${ERouters.home}`;
  public defaultURL = ERouters.home;

  // #endregion Properties (4)

  // #region Constructors (1)

  constructor(
    private readonly payloadService: PayloadService,
    private readonly areasService: AreasService,
    private readonly warehousesService: WarehousesService,
    toastController: ToastController,
    alertController: AlertController,
    loadingController: LoadingController
  ) {
    super(toastController, alertController, loadingController);
    this.detectColorSchemeChanges();
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

  public deleteWarehouse(wh: IWarehouse) {}

  public getWarehouseIcon(): string {
    if (this.darkMode) {
      return 'assets/svgs/warehouse-icon.svg';
    }

    return 'assets/svgs/warehouse-black-icon.svg';
  }

  public onGetAll() {
    this.isLoading = true;
    this.warehousesService.getAll().subscribe({
      next: (res) => {
        this.isLoading = false;
      },
      error: (err) => {
        console.log('[WHERR]', err);
        this.alert(err?.message, 'Atenção!');
        this.isLoading = false;
      },
    });
  }

  public onCreateWarehouse() {
    if (!this.areas || this.areas.length === 0) {
      this.toast("Você precisa registrar uma área antes de criar um almoxarifado.", "Atenção!", "warning", "middle");
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
      next: (res) => {
        this.isLoading = false;
        setTimeout(() => {
          this.searchbar.setFocus();
        }, 100);
      },
      error: (err) => {
        console.log('[WHERR]', err);
        this.alert(err?.message, 'Atenção!');
        this.isLoading = false;
      },
    });
  }

  public goToWarehouse(wh: IWarehouse) {
    console.log('[WAREHOUSE]', wh);
  }

  public ngOnInit() {
    this.search = '';
    this.subs.push(
      this.payloadService.payload$.subscribe((res) => (this.payload = res)),
      this.areasService.areas$.subscribe((res) => (this.areas = res)),
      this.warehousesService.warehouses$.subscribe((res) => {
        this.warehouses = res;
        this.filtered = res;
      }),
      this.warehousesService.filtered$.subscribe((res) => (this.filtered = res))
    );
  }

  public onReload() {
    this.onGetAll();
  }

  // #endregion Public Methods (6)
}

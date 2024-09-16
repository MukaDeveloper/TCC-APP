import { Component, OnInit, ViewChild } from '@angular/core';
import {
  AlertController,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import { IPayload } from '../../../services/payload/interfaces/i-payload';
import { PayloadService } from '../../../services/payload/payload.service';
import { WarehousesService } from '../../../services/warehouses/warehouses.service';
import { BaseComponent } from '../../../shared/utils/base.component';
import { IWarehouse } from 'src/services/warehouses/interfaces/i-warehouse';

@Component({
  selector: 'app-warehouses',
  templateUrl: './warehouses.page.html',
  styleUrls: ['./warehouses.page.scss'],
})
export class WarehousesPage extends BaseComponent implements OnInit {
  // #region Properties (4)

  @ViewChild('AppCreateWarehouse') public createWarehouse: any;
  public isLoading = true;
  public payload: IPayload | null = null;
  public warehouses: IWarehouse[] | null = [];

  // #endregion Properties (4)

  // #region Constructors (1)

  constructor(
    private readonly payloadService: PayloadService,
    private readonly warehousesService: WarehousesService,
    toastController: ToastController,
    alertController: AlertController,
    loadingController: LoadingController
  ) {
    super(toastController, alertController, loadingController);
  }

  // #endregion Constructors (1)

  // #region Public Methods (7)

  public get columnSize(): number {
    if (window.innerWidth <= 950 && window.innerWidth > 798) {
      return 4;
    }
    if (window.innerWidth <= 798) {
      return 6;
    }
    return 3;
  }
  
  public addNewWarehouse() {
    this.createWarehouse.onOpenModal();
  }

  public deleteWarehouse(wh: IWarehouse) {}

  public editWarehouse(wh: IWarehouse) {}

  public getAll() {
    this.isLoading = true;
    this.warehousesService
      .getAll()
      .subscribe({
        next: (res) => {
          this.isLoading = false;
        },
        error: (err) => {
          this.isLoading = false;
        },
      });
  }

  public goToWarehouse(wh: IWarehouse) {
    console.log('[WAREHOUSE]', wh)
  }

  public ngOnInit() {
    this.subs.push(
      this.payloadService.payload$.subscribe((res) => (this.payload = res)),
      this.warehousesService.warehouses$.subscribe(
        (res) => (this.warehouses = res)
      )
    );
    this.getAll();
  }

  public onReload() {
    this.getAll();
  }

  // #endregion Public Methods (7)
}

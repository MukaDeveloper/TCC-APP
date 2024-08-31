import { Component, OnInit, ViewChild } from '@angular/core';
import {
  AlertController,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import { WarehousesService } from '../../../services/warehouses/warehouses.service';
import { BaseComponent } from '../../../shared/utils/base.component';

@Component({
  selector: 'app-warehouses',
  templateUrl: './warehouses.page.html',
  styleUrls: ['./warehouses.page.scss'],
})
export class WarehousesPage extends BaseComponent implements OnInit {

  @ViewChild('AppCreateWarehouse') public createWarehouse: any;
  public isLoading = true;
  public warehouses: any[] = [];

  constructor(
    private readonly warehousesService: WarehousesService,
    toastController: ToastController,
    alertController: AlertController,
    loadingController: LoadingController
  ) {
    super(toastController, alertController, loadingController);
  }

  ngOnInit() {
    this.subs.push(
      this.warehousesService.warehouses$.subscribe(
        (res) => (this.warehouses = res)
      )
    );
    this.isLoading = false;
  }

  public onReload() {
    this.isLoading = true;
    this.warehousesService.getAll().subscribe({
      next: (res) => {
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
      },
    });
  }

  public addNewWarehouse() {
    this.createWarehouse.onOpenModal();
  }

  public editWarehouse() {

  }

  public deleteWarehouse() {

  }

  public goToWarehouse() {

  }
}

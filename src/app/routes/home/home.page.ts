import { Component, OnInit } from '@angular/core';
import {
  ToastController,
  AlertController,
  LoadingController,
} from '@ionic/angular';
import { WarehousesService } from 'src/services/warehouses/warehouses.service';
import { BaseComponent } from 'src/shared/utils/base.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage extends BaseComponent implements OnInit {
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
      this.warehousesService.warehouses$.subscribe((res) => this.warehouses = res),
    )
    this.isLoading = false;
  }
}

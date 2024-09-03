import { Component, OnInit } from '@angular/core';
import {
  AlertController,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import { WarehousesService } from 'src/services/warehouses/warehouses.service';
import { BaseComponent } from 'src/shared/utils/base.component';
import { InstitutionService } from '../../../services/instution/intitution.service';
import { IPayload } from '../../../services/payload/interfaces/i-payload';
import { PayloadService } from '../../../services/payload/payload.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage extends BaseComponent implements OnInit {
  public isLoading = true;
  public payload: IPayload | null = null;
  public institution: any | null = null;
  public warehouses: any[] = [];

  constructor(
    private readonly payloadService: PayloadService,
    private readonly institutionService: InstitutionService,
    private readonly warehousesService: WarehousesService,
    toastController: ToastController,
    alertController: AlertController,
    loadingController: LoadingController
  ) {
    super(toastController, alertController, loadingController);
  }

  ngOnInit() {
    this.subs.push(
      this.payloadService.payload$.subscribe((res) => (this.payload = res)),
      this.warehousesService.warehouses$.subscribe(
        (res) => (this.warehouses = res)
      ),
      this.institutionService.institution$.subscribe(
        (res) => (this.institution = res)
      )
    );
    this.isLoading = false;
  }
}

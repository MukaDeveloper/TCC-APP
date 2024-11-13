import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  ToastController,
  AlertController,
  LoadingController,
} from '@ionic/angular';
import { IWarehouse } from 'src/services/warehouses/interfaces/i-warehouse';
import { WarehousesService } from 'src/services/warehouses/warehouses.service';
import { BaseComponent } from 'src/shared/utils/base.component';
import { ERouters } from 'src/shared/utils/e-routers';

@Component({
  selector: 'app-add-material',
  templateUrl: './add-material.page.html',
  styleUrls: ['./add-material.page.scss'],
})
export class AddMaterialPage extends BaseComponent implements OnInit {
  public formGroup: FormGroup | null = null;
  public action: 'SINGLE' | 'MULTIPLE' = 'SINGLE';
  public warehouses: IWarehouse[] = [];

  constructor(
    private readonly warehousesService: WarehousesService,
    private router: Router,
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
    this.onCreateForm();
  }

  public onBack() {
    this.router.navigate([`${ERouters.app}/${ERouters.materials}`], {
      replaceUrl: true,
    });
  }

  private onCreateForm() {
    let wh: number | null = null;
    if (this.warehouses.length === 1) {
      wh = this.warehouses[0].id;
    }

    this.formGroup = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl(''),
      recordNumber: new FormControl(''),
      manufactorer: new FormControl(''),
      quantity: new FormControl('', Validators.required),
      measure: new FormControl('UN', Validators.required),
      warehouseId: new FormControl(
        { value: wh, disabled: this.warehouses?.length === 1 ? true : false },
        [Validators.required]
      ),
      imageURL: new FormControl(''),
    });
  }
}

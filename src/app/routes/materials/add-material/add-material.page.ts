import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  ToastController,
  AlertController,
  LoadingController,
} from '@ionic/angular';
import { MaterialsService } from 'src/services/materials/materials.service';
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
  public isLoading = true;
  public formGroup: FormGroup | null = null;
  public action: 'SINGLE' | 'MULTIPLE' = 'SINGLE';
  public warehouses: IWarehouse[] = [];

  constructor(
    private readonly warehousesService: WarehousesService,
    private readonly materialsService: MaterialsService,
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

  public onSubmit() {
    const obj = this.formGroup?.value;

    if (!this.formGroup?.valid) {
      this.toast('Preencha todos os campos obrigatórios', 'Atenção!');
      return;
    }
    this.isLoading = true;

    delete obj.hasRecord;
    delete obj.hasQuantity;

    console.log('onSubmit', obj);
    this.materialsService.addNew(obj).subscribe({
      next: (res) => {
        this.toast("Material adicionado com sucesso!", "Sucesso!", "success", "top");
        this.onBack();
        this.isLoading = false;
      },
      error: (error) => {
        console.error(error);
        this.alert(error?.message, 'Erro!');
        this.isLoading = false;
      },
    });
  }

  private onCreateForm() {
    let wh: number | null = null;
    if (this.warehouses.length === 1) {
      wh = this.warehouses[0].id;
    }

    this.formGroup = new FormGroup({
      materialType: new FormControl(null, Validators.required),
      name: new FormControl('', Validators.required),
      description: new FormControl(''),
      manufactorer: new FormControl(''),
      measure: new FormControl('UN', Validators.required),
      warehouseId: new FormControl(
        { value: wh, disabled: this.warehouses?.length === 1 ? true : false },
        [Validators.required]
      ),
      imageURL: new FormControl(''),
      recordNumber: new FormControl(''),
      hasRecord: new FormControl(false),
      quantity: new FormControl(''),
      hasQuantity: new FormControl(false),
    });

    this.formMonitor();
    this.isLoading = false;
  }

  private formMonitor() {
    this.formGroup
      ?.get('materialType')
      ?.valueChanges.subscribe((value: string) => {
        const recordNumberControl = this.formGroup?.get('recordNumber');
        const quantityControl = this.formGroup?.get('quantity');
        console.log('materialType value changed', value);

        if (value === 'LOAN') {
          recordNumberControl?.enable();
          recordNumberControl?.setValidators([Validators.required]);
          quantityControl?.clearValidators();
          this.formGroup?.get('recordNumber')?.enable();
          this.formGroup?.get('hasRecord')?.setValue(true);
          this.formGroup?.get('hasQuantity')?.setValue(false);
        }
        if (value === 'CONSUMPTION') {
          quantityControl?.enable();
          quantityControl?.setValidators([Validators.required]);
          recordNumberControl?.clearValidators();
          this.formGroup?.get('hasRecord')?.setValue(false);
          this.formGroup?.get('hasQuantity')?.setValue(true);
        }
      });

    // Monitorar diretamente as checkboxes
    this.formGroup
      ?.get('hasQuantity')
      ?.valueChanges.subscribe((checked: boolean) => {
        const materialType = this.formGroup?.get('materialType')?.value;
        const quantityControl = this.formGroup?.get('quantity');
        if (materialType === 'LOAN') {
          if (checked) {
            quantityControl?.enable();
            quantityControl?.setValidators([Validators.required]);
          } else {
            quantityControl?.disable();
            quantityControl?.clearValidators();
          }
          quantityControl?.updateValueAndValidity();
        }
      });

    this.formGroup
      ?.get('hasRecord')
      ?.valueChanges.subscribe((checked: boolean) => {
        const materialType = this.formGroup?.get('materialType')?.value;
        const recordNumberControl = this.formGroup?.get('recordNumber');
        if (materialType === 'CONSUMPTION') {
          if (checked) {
            recordNumberControl?.enable();
            recordNumberControl?.setValidators([Validators.required]);
          } else {
            recordNumberControl?.disable();
            recordNumberControl?.clearValidators();
          }
          recordNumberControl?.updateValueAndValidity();
        }
      });
  }
}

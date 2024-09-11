import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { BaseComponent } from '../../../../shared/utils/base.component';
import {
  AlertController,
  IonModal,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AreasService } from 'src/services/areas/areas.service';
import { IArea } from 'src/services/areas/interfaces/i-area';
import { WarehousesService } from '../../../../services/warehouses/warehouses.service';

@Component({
  selector: 'app-create-warehouse',
  templateUrl: './create-warehouse.component.html',
  styleUrls: ['./create-warehouse.component.scss'],
})
export class CreateWarehouseComponent extends BaseComponent {

  @ViewChild(IonModal) public modal!: IonModal;
  public isLoading = true;
  public formGroup: FormGroup | null = null;
  public areas: IArea[] | null = [];
  @Output() public reload = new EventEmitter;

  constructor(
    private readonly warehousesService: WarehousesService,
    private readonly areasService: AreasService,
    toastController: ToastController,
    alertController: AlertController,
    loadingController: LoadingController
  ) {
    super(toastController, alertController, loadingController);
  }

  public onOpenModal() {
    this.subs.push(
      this.areasService.areas$.subscribe((res) => (this.areas = res))
    )
    this.createForm();
    this.modal.present();
  }

  public onSubmit() {
    if (!this.formGroup?.valid) {
      this.alert('Preencha todos os campos obrigatórios.', 'Atenção!');
      return;
    }
    const loading = this.loadingShow("Adicionando...");
    const data = this.formGroup?.value;
    this.warehousesService.create(data).subscribe({
      next: (_) => {
        loading.then((l) => l.dismiss());
        this.modal.dismiss();
        this.reload.emit();
      },
      error: (err) => {
        console.log(err);
        this.alert(err.message, "Atenção!");
        loading.then((l) => l.dismiss());
      }
    });
  }

  private createForm() {
    const loading = this.loadingShow('Gerando formulário...');
    this.formGroup = new FormGroup({
      name: new FormControl('', [Validators.required]),
      areaId: new FormControl('', [Validators.required]),
      description: new FormControl(''),
    });
    loading.then((l) => l.dismiss());
    this.isLoading = false;
  }
}

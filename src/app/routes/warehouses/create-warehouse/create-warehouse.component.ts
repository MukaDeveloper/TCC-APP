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
  // #region Properties (5)

  public areas: IArea[] | null = [];
  public formGroup: FormGroup | null = null;
  public isLoading = true;
  @ViewChild(IonModal) public modal!: IonModal;
  @Output() public reload = new EventEmitter;

  // #endregion Properties (5)

  // #region Constructors (1)

  constructor(
    private readonly warehousesService: WarehousesService,
    private readonly areasService: AreasService,
    toastController: ToastController,
    alertController: AlertController,
    loadingController: LoadingController
  ) {
    super(toastController, alertController, loadingController);
  }

  // #endregion Constructors (1)

  // #region Public Methods (2)

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
        console.error(err);
        this.alert(err.message, "Atenção!");
        loading.then((l) => l.dismiss());
      }
    });
  }

  // #endregion Public Methods (2)

  // #region Private Methods (1)

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

  // #endregion Private Methods (1)
}

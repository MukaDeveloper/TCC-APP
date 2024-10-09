import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  AlertController,
  IonModal,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import { AreasService } from '../../../../services/areas/areas.service';
import { IArea } from '../../../../services/areas/interfaces/i-area';
import { UpdateWarehouseDto } from '../../../../services/warehouses/dto/update-warehouse.dto';
import { IWarehouse } from '../../../../services/warehouses/interfaces/i-warehouse';
import { WarehousesService } from '../../../../services/warehouses/warehouses.service';
import { BaseComponent } from '../../../../shared/utils/base.component';
import { IMember } from 'src/services/users/interfaces/i-member';

@Component({
  selector: 'app-edit-warehouse',
  templateUrl: './edit-warehouse.component.html',
  styleUrls: ['./edit-warehouse.component.scss'],
})
export class EditWarehouseComponent extends BaseComponent implements OnInit {
  // #region Properties (6)

  @Input() public areas: IArea[] | null = [];
  @Input() public warehousemans: IMember[] | null = [];
  public formGroup: FormGroup | null = null;
  public isLoading = false;
  @ViewChild(IonModal) public modal!: IonModal;
  @Output() public reload = new EventEmitter();
  public warehouse: IWarehouse | null = null;

  // #endregion Properties (6)

  // #region Constructors (1)

  constructor(
    private readonly warehousesService: WarehousesService,
    toastController: ToastController,
    alertController: AlertController,
    loadingController: LoadingController
  ) {
    super(toastController, alertController, loadingController);
  }

  // #endregion Constructors (1)

  // #region Public Methods (3)

  public ngOnInit() {}

  public onOpenModal(wh: IWarehouse) {
    this.warehouse = wh;
    this.createForm();
    this.modal.present();
  }

  public onSubmit() {
    if (!this.formGroup?.valid) {
      this.alert('Preencha todos os campos obrigatórios.', 'Atenção!');
      return;
    }
    if (
      this.formGroup?.value.name === this.warehouse?.name &&
      this.formGroup?.value.description === this.warehouse?.description &&
      this.formGroup?.value.areaId === this.warehouse?.areaId
    ) {
      this.modal.dismiss();
      return;
    }
    const data = this.formGroup?.value as UpdateWarehouseDto;
    const loading = this.loadingShow('Salvando...');
    this.warehousesService.updateWarehouse(data).subscribe({
      next: (_: any) => {
        this.toast(
          'Almoxarifado atualizado com sucesso!',
          'Sucesso!',
          'success'
        );
        loading.then((l) => l.dismiss());
        this.modal.dismiss();
        this.reload.emit();
      },
      error: (err: any) => {
        console.error(err);
        this.alert(err.message, 'Atenção!');
        loading.then((l) => l.dismiss());
      },
    });
  }

  public onUserChange(event: any) {
    const selectedIds = event.detail.value;
    this.formGroup
      ?.get('warehousemans')
      ?.setValue(
        this.warehousemans?.filter((user) => selectedIds.includes(user.id))
      );
  }

  // #endregion Public Methods (3)

  // #region Private Methods (1)

  private createForm() {
    const loading = this.loadingShow('Gerando formulário...');
    this.formGroup = new FormGroup({
      id: new FormControl(this.warehouse?.id, [Validators.required]),
      name: new FormControl(this.warehouse?.name || '', [Validators.required]),
      areaId: new FormControl(this.warehouse?.areaId || '', [
        Validators.required,
      ]),
      description: new FormControl(this.warehouse?.description || ''),
    });
    loading.then((l) => l.dismiss());
    this.isLoading = false;
  }

  // #endregion Private Methods (1)
}

import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
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
    this.warehousesService.updateWarehouse(data).subscribe({
      next: (_: any) => {
        this.toast(
          'Almoxarifado atualizado com sucesso!',
          'Sucesso!',
          'success'
        );
        this.modal.dismiss();
        this.reload.emit();
      },
      error: (err: any) => {
        console.error(err);
        this.alert(err.message, 'Atenção!');
      },
    });
  }

  public onUserChange(event: any) {
    const selectedIds = event.detail.value;
    const warehousemansFormArray = this.formGroup?.get(
      'warehousemans'
    ) as FormArray;

    // Primeiro limpamos o array para evitar duplicações.
    while (warehousemansFormArray.length !== 0) {
      warehousemansFormArray.removeAt(0);
    }

    // Agora, adicionamos o novo conjunto de valores.
    selectedIds.forEach((id: any) => {
      const selectedUser = this.warehousemans?.find((user) => user.id === id);
      if (selectedUser) {
        warehousemansFormArray.push(
          new FormGroup({
            id: new FormControl(selectedUser.id),
            name: new FormControl(selectedUser.name),
          })
        );
      }
    });
  }

  // #endregion Public Methods (3)

  // #region Private Methods (1)

  private createForm() {
    this.formGroup = new FormGroup({
      id: new FormControl(this.warehouse?.id, [Validators.required]),
      name: new FormControl(this.warehouse?.name || '', [Validators.required]),
      warehousemans: new FormArray([]),
      areaId: new FormControl(this.warehouse?.areaId || '', [
        Validators.required,
      ]),
      description: new FormControl(this.warehouse?.description || ''),
    });

    // Verifica se há warehousemans e popula o FormArray
    if (this.warehouse?.warehousemans?.length) {
      const warehousemansArray = this.formGroup.get(
        'warehousemans'
      ) as FormArray;

      this.warehouse.warehousemans.forEach((w: any) => {
        // Cria um FormGroup para cada warehouseman e adiciona ao FormArray
        const warehousemanGroup = new FormGroup({
          userId: new FormControl(w.userId, [Validators.required]),
          warehouseId: new FormControl(w.warehouseId, [Validators.required]),
        });
        warehousemansArray.push(warehousemanGroup);
      });
    }

    this.isLoading = false;
  }

  // #endregion Private Methods (1)
}

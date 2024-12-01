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
  // #region Properties (7)

  @Input() public areas: IArea[] = [];
  public formGroup: FormGroup | null = null;
  public isLoading = false;
  @ViewChild(IonModal) public modal!: IonModal;
  @Output() public reload = new EventEmitter();
  public warehouse: IWarehouse | null = null;
  @Input() public warehousemans: IMember[] = [];

  // #endregion Properties (7)

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

  // #region Public Getters And Setters (1)

  public get warehousemansList(): FormArray {
    return this.formGroup?.controls['warehousemans'] as FormArray;
  }

  // #endregion Public Getters And Setters (1)

  // #region Public Methods (6)

  public disableWarehouseman(id: number) {
    const i = this.warehousemansList?.value.findIndex((u: any) => u.id === id);
    if (i > -1) {
      return true;
    }

    return false;
  }

  public ngOnInit() {}

  public onOpenModal(wh: IWarehouse) {
    this.warehouse = wh;
    this.createForm();
    this.modal.present();
  }

  public onRemoveWarehouseman(index: number) {
    this.warehousemansList.removeAt(index);
  }

  public onSubmit() {
    if (!this.formGroup?.valid) {
      this.alert('Preencha todos os campos obrigatórios.', 'Atenção!');
      return;
    }
    if (
      this.formGroup?.value.name === this.warehouse?.name &&
      this.formGroup?.value.description === this.warehouse?.description &&
      this.formGroup?.value.areaId === this.warehouse?.areaId &&
      !this.hasDifferences(
        this.warehousemansList,
        this.warehouse?.warehousemans
      )
    ) {
      this.modal.dismiss();
      return;
    }
    const data = this.formGroup?.value as UpdateWarehouseDto;

    console.log('this.formGroup.value', this.formGroup.value);
    console.log('updateWarehouse', data);
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
    const id = event.detail.value;

    const exist = this.disableWarehouseman(id);
    if (exist) {
      this.toast('Responsável já adicionado!', 'Atenção!', 'warning', 'top');
      event.target.value = null;
      return;
    }

    const selectedUser = this.warehousemans?.find((user) => user.id === id);
    if (selectedUser) {
      this.warehousemansList.push(
        new FormGroup({
          id: new FormControl(selectedUser.id),
          name: new FormControl(selectedUser.name),
        })
      );
    }

    if (event) {
      event.target.value = null;
    }
  }

  // #endregion Public Methods (6)

  // #region Private Methods (2)

  private createForm() {
    this.formGroup = new FormGroup({
      id: new FormControl(this.warehouse?.id, [Validators.required]),
      name: new FormControl(this.warehouse?.name || '', [Validators.required]),
      warehousemans: new FormArray([]),
      areaId: new FormControl(this.warehouse?.areaId || null, [
        Validators.required,
      ]),
      description: new FormControl(this.warehouse?.description || ''),
    });

    // Verifica se há warehousemans e popula o FormArray
    if (this.warehouse?.warehousemans?.length) {
      this.warehouse.warehousemans.map((w: any) => {
        // Cria um FormGroup para cada warehouseman e adiciona ao FormArray
        const user = this.warehousemans?.find(
          (u) => parseInt(u.id.toString()) === parseInt(w.userId)
        );
        this.warehousemansList.push(
          new FormGroup({
            id: new FormControl(user?.id, [Validators.required]),
            name: new FormControl(user?.name, [Validators.required]),
          })
        );
      });
    }

    this.isLoading = false;
  }

  private hasDifferences(formArray: FormArray, array: any): boolean {
    // 1. Verificar se o comprimento das arrays é diferente
    if (formArray.length !== array.length) {
      return true;
    }

    // 2. Iterar sobre cada elemento para comparar
    for (let i = 0; i < formArray.length; i++) {
      const formGroup = formArray.at(i) as FormGroup;
      const formValue = formGroup.value;

      const arrayItem = array[i];

      // 3. Comparar propriedades 'id' e 'name'
      if (formValue.id !== arrayItem.id || formValue.name !== arrayItem.name) {
        return true;
      }
    }

    // 4. Se todas as comparações passaram, retornar false
    return false;
  }

  // #endregion Private Methods (2)
}

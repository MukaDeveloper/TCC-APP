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
import { IArea } from 'src/services/areas/interfaces/i-area';
import { IMember } from 'src/services/users/interfaces/i-member';
import { NewWarehouseDto } from '../../../../services/warehouses/dto/new-warehouse.dto';
import { WarehousesService } from '../../../../services/warehouses/warehouses.service';
import { BaseComponent } from '../../../../shared/utils/base.component';

@Component({
  selector: 'app-create-warehouse',
  templateUrl: './create-warehouse.component.html',
  styleUrls: ['./create-warehouse.component.scss'],
})
export class CreateWarehouseComponent extends BaseComponent implements OnInit {
  // #region Properties (6)

  @Input() public areas: IArea[] = [];
  public formGroup: FormGroup | null = null;
  public isLoading = true;
  @ViewChild(IonModal) public modal!: IonModal;
  @Output() public reload = new EventEmitter();
  @Input() public warehousemans: IMember[] = [];

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

  public onOpenModal() {
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
    const data = this.formGroup?.value as NewWarehouseDto;
    this.warehousesService.create(data).subscribe({
      next: (_: any) => {
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

  // #region Private Methods (1)

  private createForm() {
    let area: number | null = null;
    if (this.areas.length === 1) {
      area = this.areas[0].id;
    }

    this.formGroup = new FormGroup({
      name: new FormControl('', [Validators.required]),
      areaId: new FormControl(area, [Validators.required]),
      warehousemans: new FormArray([]),
      description: new FormControl(''),
    });
    this.isLoading = false;
  }

  // #endregion Private Methods (1)
}

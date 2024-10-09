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
import { AreasService } from 'src/services/areas/areas.service';
import { IArea } from 'src/services/areas/interfaces/i-area';
import { NewWarehouseDto } from '../../../../services/warehouses/dto/new-warehouse.dto';
import { WarehousesService } from '../../../../services/warehouses/warehouses.service';
import { BaseComponent } from '../../../../shared/utils/base.component';
import { IMember } from 'src/services/users/interfaces/i-member';

@Component({
  selector: 'app-create-warehouse',
  templateUrl: './create-warehouse.component.html',
  styleUrls: ['./create-warehouse.component.scss'],
})
export class CreateWarehouseComponent extends BaseComponent implements OnInit {
  // #region Properties (5)

  @Input() public areas: IArea[] | null = [];
  @Input() public warehousemans: IMember[] | null = [];
  public formGroup: FormGroup | null = null;
  public isLoading = true;
  @ViewChild(IonModal) public modal!: IonModal;
  @Output() public reload = new EventEmitter();

  // #endregion Properties (5)

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

  public onOpenModal() {
    this.createForm();
    this.modal.present();
  }

  public onSubmit() {
    if (!this.formGroup?.valid) {
      this.alert('Preencha todos os campos obrigatórios.', 'Atenção!');
      return;
    }
    const loading = this.loadingShow('Adicionando...');
    const data = this.formGroup?.value as NewWarehouseDto;
    this.warehousesService.create(data).subscribe({
      next: (_: any) => {
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
    const warehousemansFormArray = this.formGroup?.get('warehousemans') as FormArray;
  
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
    const loading = this.loadingShow('Gerando formulário...');
    this.formGroup = new FormGroup({
      name: new FormControl('', [Validators.required]),
      areaId: new FormControl('', [Validators.required]),
      warehousemans: new FormArray([]),
      description: new FormControl(''),
    });
    loading.then((l) => l.dismiss());
    this.isLoading = false;
  }

  // #endregion Private Methods (1)
}

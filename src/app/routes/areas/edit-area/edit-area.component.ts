import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  AlertController,
  IonInput,
  IonModal,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import { IPayload } from 'src/services/payload/interfaces/i-payload';
import { BaseComponent } from 'src/shared/utils/base.component';
import { AreasService } from '../../../../services/areas/areas.service';
import { UpdateAreaDto } from '../../../../services/areas/dto/update-area.dto';
import { IArea } from '../../../../services/areas/interfaces/i-area';
import { PayloadService } from './../../../../services/payload/payload.service';

@Component({
  selector: 'app-edit-area',
  templateUrl: './edit-area.component.html',
  styleUrls: ['./edit-area.component.scss'],
})
export class EditAreaComponent extends BaseComponent implements OnInit {
  // #region Properties (7)

  public area: IArea | null = null;
  public formGroup: FormGroup | null = null;
  public isLoading: boolean = false;
  @ViewChild(IonModal) public modal!: IonModal;
  @ViewChild('nameInput') public nameInput!: IonInput;
  public payload: IPayload | null = null;
  @Output() public reload = new EventEmitter();

  // #endregion Properties (7)

  // #region Constructors (1)

  constructor(
    private readonly areasService: AreasService,
    private readonly payloadService: PayloadService,
    toastController: ToastController,
    alertController: AlertController,
    loadingController: LoadingController
  ) {
    super(toastController, alertController, loadingController);
  }

  // #endregion Constructors (1)

  // #region Public Methods (4)

  public ngOnInit() {
    this.subs.push(
      this.payloadService.payload$.subscribe((res) => (this.payload = res))
    );
  }

  public onKeyEvent(event: any) {
    if (event.keyCode === 13 && this.formGroup?.valid) {
      event.preventDefault();
      this.onSubmit();
    }
  }

  public onOpenModal(area: IArea) {
    this.area = area;
    this.createForm();
    this.modal.present();
    setTimeout(() => {
      this.nameInput.setFocus();
    }, 200);
  }

  public onSubmit() {
    if (!this.formGroup?.valid) {
      this.alert('Preencha todos os campos obrigatórios.', 'Atenção!');
      return;
    }
    if (
      this.formGroup?.value.name === this.area?.name &&
      this.formGroup.value.description === this.area?.description
    ) {
      this.modal.dismiss();
      return;
    }
    const data = this.formGroup?.value as UpdateAreaDto;
    this.areasService.updateArea(data).subscribe({
      next: (_) => {
        this.toast('Área atualizada com sucesso!', 'Sucesso!', 'success');
        this.modal.dismiss();
        this.reload.emit();
      },
      error: (err) => {
        console.error(err);
        this.alert(err.message, 'Atenção!');
      },
    });
  }

  // #endregion Public Methods (4)

  // #region Private Methods (1)

  private createForm() {
    this.formGroup = new FormGroup({
      id: new FormControl(this.area?.id, [Validators.required]),
      name: new FormControl(this.area?.name, [Validators.required]),
      description: new FormControl(this.area?.description || ''),
      intitutionId: new FormControl(this.payload?.institutionId),
    });
    this.isLoading = false;
  }

  // #endregion Private Methods (1)
}

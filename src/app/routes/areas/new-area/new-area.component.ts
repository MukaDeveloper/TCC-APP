import { MovimentationsService } from './../../../../services/movimentations/warehouses.service';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  IonModal,
  ToastController,
  AlertController,
  LoadingController,
} from '@ionic/angular';
import { AreasService } from 'src/services/areas/areas.service';
import { IPayload } from 'src/services/payload/interfaces/i-payload';
import { PayloadService } from 'src/services/payload/payload.service';
import { BaseComponent } from 'src/shared/utils/base.component';

@Component({
  selector: 'app-new-area',
  templateUrl: './new-area.component.html',
  styleUrls: ['./new-area.component.scss'],
})
export class NewAreaComponent extends BaseComponent {
  // #region Properties (5)

  public formGroup: FormGroup | null = null;
  public isLoading = true;
  @ViewChild(IonModal) public modal!: IonModal;
  public payload: IPayload | null = null;
  @Output() public reload = new EventEmitter;

  // #endregion Properties (5)

  // #region Constructors (1)

  constructor(
    private readonly movimentationsService: MovimentationsService,
    private readonly payloadService: PayloadService,
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
      this.payloadService.payload$.subscribe((res) => this.payload = res),
    )
    this.createForm();
    this.modal.present();
  }

  public reloadMovimentations() {
    this.movimentationsService.getAll().subscribe({
      next: (_) => _,
      error: (error) => {
        this.alert("[MV400] " + error?.message, "Atenção!");
        console.error(error);
      }
    })
  }

  public onSubmit() {
    if (!this.formGroup?.valid) {
      this.alert('Preencha todos os campos obrigatórios.', 'Atenção!');
      return;
    }
    const loading = this.loadingShow("Adicionando...");
    const data = this.formGroup?.value;
    this.areasService.addNew(data).subscribe({
      next: (_) => {
        loading.then((l) => l.dismiss());
        this.reloadMovimentations();
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
      description: new FormControl(''),
      intitutionId: new FormControl(this.payload?.institutionId)
    });
    loading.then((l) => l.dismiss());
    this.isLoading = false;
  }

  // #endregion Private Methods (1)
}

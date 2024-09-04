import { Component, OnInit, ViewChild } from '@angular/core';
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

  @ViewChild(IonModal) public modal!: IonModal;
  public payload: IPayload | null = null;
  public isLoading = true;
  public formGroup: FormGroup | null = null;

  constructor(
    private readonly payloadService: PayloadService,
    private readonly areasService: AreasService,
    toastController: ToastController,
    alertController: AlertController,
    loadingController: LoadingController
  ) {
    super(toastController, alertController, loadingController);
  }

  public onOpenModal() {
    this.subs.push(
      this.payloadService.payload$.subscribe((res) => this.payload = res),
    )
    this.createForm();
    this.modal.present();
  }

  public onSubmit() {
    const loading = this.loadingShow("Adicionando...");
    const data = this.formGroup?.value;
    this.areasService.addNew(data).subscribe({
      next: (_) => {
        loading.then((l) => l.dismiss());
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
      description: new FormControl(''),
      intitutionId: new FormControl(this.payload?.institutionId)
    });
    loading.then((l) => l.dismiss());
    this.isLoading = false;
  }
}

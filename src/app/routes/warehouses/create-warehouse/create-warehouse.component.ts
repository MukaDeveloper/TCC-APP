import { Component, ViewChild } from '@angular/core';
import { BaseComponent } from '../../../../shared/utils/base.component';
import {
  AlertController,
  IonModal,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AreasService } from 'src/services/areas/areas.service';

@Component({
  selector: 'app-create-warehouse',
  templateUrl: './create-warehouse.component.html',
  styleUrls: ['./create-warehouse.component.scss'],
})
export class CreateWarehouseComponent extends BaseComponent {

  @ViewChild(IonModal) public modal!: IonModal;
  public isLoading = true;
  public formGroup: FormGroup | null = null;
  public areas: any[] | null = [];

  constructor(
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

  }

  private createForm() {
    const loading = this.loadingShow('Gerando formulário...');
    this.formGroup = new FormGroup({
      name: new FormControl('', [Validators.required]),
      area: new FormControl('', [Validators.required]),
      description: new FormControl(''),
    });
    loading.then((l) => l.dismiss());
    this.isLoading = false;
  }
}

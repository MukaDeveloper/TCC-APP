import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '../../../../shared/utils/base.component';
import { ToastController, AlertController, LoadingController, IonModal } from '@ionic/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-material',
  templateUrl: './add-material.component.html',
  styleUrls: ['./add-material.component.scss'],
})
export class AddMaterialComponent extends BaseComponent implements OnInit {

  @ViewChild(IonModal) public modal!: IonModal;
  public formGroup: FormGroup | null = null;

  constructor(
    toastController: ToastController,
    alertController: AlertController,
    loadingController: LoadingController
  ) {
    super(toastController, alertController, loadingController);
  }

  ngOnInit() {}

  public onOpenModal() {
    this.onCreateForm();
  }

  private onCreateForm() {
    this.formGroup = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl(''),
      recordNumber: new FormControl(''),
      manufactorer: new FormControl(''),
      quantity: new FormControl('', Validators.required),
      measure: new FormControl('', Validators.required),
      imageURL: new FormControl(''),
    });
  }
}

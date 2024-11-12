import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  ToastController,
  AlertController,
  LoadingController,
} from '@ionic/angular';
import { BaseComponent } from 'src/shared/utils/base.component';
import { ERouters } from 'src/shared/utils/e-routers';

@Component({
  selector: 'app-add-material',
  templateUrl: './add-material.page.html',
  styleUrls: ['./add-material.page.scss'],
})
export class AddMaterialPage extends BaseComponent implements OnInit {
  public formGroup: FormGroup | null = null;
  public action: 'SINGLE' | 'MULTIPLE' = 'SINGLE';

  constructor(
    private router: Router,
    toastController: ToastController,
    alertController: AlertController,
    loadingController: LoadingController
  ) {
    super(toastController, alertController, loadingController);
  }

  ngOnInit() {
    this.onCreateForm();
  }

  public onBack() {
    this.router.navigate([`${ERouters.app}/${ERouters.materials}`], {
      replaceUrl: true,
    });
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

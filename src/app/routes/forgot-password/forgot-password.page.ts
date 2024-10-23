import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  ToastController,
  AlertController,
  LoadingController,
} from '@ionic/angular';
import { BaseComponent } from '../../../shared/utils/base.component';
import { ERouters } from '../../../shared/utils/e-routers';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage extends BaseComponent implements OnInit {
  public formGroup: FormGroup | null = null;
  public isLoading: boolean = true;

  constructor(
    private router: Router,
    toastController: ToastController,
    alertController: AlertController,
    loadingController: LoadingController
  ) {
    super(toastController, alertController, loadingController);
  }

  ngOnInit() {
    this.createForm();
  }

  public goBack() {
    this.formGroup?.reset();
    this.router.navigate([ERouters.login], {
      replaceUrl: true,
    });
  }

  public onKeyEvent($e: number): void {}

  public onSubmit() {}

  private createForm() {
    this.formGroup = new FormGroup(
      {
        email: new FormControl('', [Validators.required, Validators.email]),
      },
    );
    this.isLoading = false;
  }
}

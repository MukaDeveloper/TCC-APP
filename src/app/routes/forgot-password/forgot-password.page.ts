import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {
  ToastController,
  AlertController,
  LoadingController,
} from '@ionic/angular';
import { BaseComponent } from '../../../shared/utils/base.component';

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

  ngOnInit() {}

  public goBack() {

  }

  public onKeyEvent($e: number): void {
    
  }

  public onSubmit() {

  }
}

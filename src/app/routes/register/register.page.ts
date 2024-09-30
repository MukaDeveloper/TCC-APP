import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  AlertController,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import { LocalStorageAuthService } from '../../../services/localstorage/auth-local.service';
import { UsersService } from '../../../services/users/users.service';
import { BaseComponent } from '../../../shared/utils/base.component';
import { RoutersEnum } from '../../../shared/utils/routers-enum';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage extends BaseComponent implements OnInit {
  public formGroup: FormGroup | null = null;
  public isLoading: boolean = true;

  constructor(
    private readonly localStorageAuthService: LocalStorageAuthService,
    private readonly usersService: UsersService,
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
    this.router.navigate([RoutersEnum.login]);
  }

  public onKeyEvent($e: number): void {
    if ($e === 13 && this.formGroup!.valid) {
      // this.onSubmit();
    }
  }

  public onSubmit() {}

  private createForm() {
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
    this.isLoading = false;
  }
}

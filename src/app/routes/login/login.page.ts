import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  AlertController,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import { UsersService } from 'src/services/users/users.service';
import { BaseComponent } from 'src/shared/utils/base.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage extends BaseComponent implements OnInit {
  // #region Properties (2)

  public formGroup: FormGroup | null = null;
  public isBusy: boolean = true;

  // #endregion Properties (2)

  // #region Constructors (1)

  constructor(
    private readonly usersService: UsersService,
    private router: Router,
    toastController: ToastController,
    alertController: AlertController,
    loadingController: LoadingController
  ) {
    super(toastController, alertController, loadingController);
  }

  // #endregion Constructors (1)

  // #region Public Methods (2)

  public ngOnInit() {
    this.createForm();
  }

  public onKeyup($e: number): void {
    if ($e === 13 && this.formGroup!.valid) {
      this.onSubmit();
    }
  }

  public onSubmit() {
    const Email = this.formGroup?.get('email')?.value;
    const PasswordString = this.formGroup?.get('password')?.value;
    if (Email && PasswordString) {
      this.usersService.auth({ Email, PasswordString }).subscribe({
        next: (res) => {
          console.log('LOGADO');
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }

  // #endregion Public Methods (2)

  // #region Private Methods (1)

  private createForm() {
    const loading = this.loadingShow('Gerando formulário...');
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
    loading.then((l) => l.dismiss());
    this.isBusy = false;
  }

  // #endregion Private Methods (1)
}

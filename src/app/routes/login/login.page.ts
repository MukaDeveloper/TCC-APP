import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  AlertController,
  LoadingController,
  ToastController,
  ViewDidEnter,
} from '@ionic/angular';
import { UsersService } from 'src/services/users/users.service';
import { BaseComponent } from 'src/shared/utils/base.component';
import { RoutersEnum } from '../../../shared/utils/routers-enum';
import { LocalStorageAuthService } from 'src/services/localstorage/auth-local.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage extends BaseComponent implements OnInit, ViewDidEnter {
  // #region Properties (2)

  public formGroup: FormGroup | null = null;
  public isLoading: boolean = true;
  public keepMeLogIn: boolean = false;

  // #endregion Properties (2)

  // #region Constructors (1)

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

  // #endregion Constructors (1)

  // #region Public Methods (2)

  public ngOnInit() {
    this.createForm();
  }

  ionViewDidEnter(): void {}

  public onKeyup($e: number): void {
    if ($e === 13 && this.formGroup!.valid) {
      this.onSubmit();
    }
  }

  public onSubmit() {
    const loading = this.loadingShow('Autenticando...');

    const Email = this.formGroup?.get('email')?.value;
    const PasswordString = this.formGroup?.get('password')?.value;
    const InstitutionId = this.formGroup?.get('institutionId')?.value;
    if (!Email || !PasswordString || !InstitutionId) {
      this.alert('Preencha os campos corretamente', 'Aviso!');
      loading.then((l) => l.dismiss());
      return;
    }
    if (Email && PasswordString && InstitutionId) {
      this.usersService
        .auth({ Email, PasswordString, InstitutionId })
        .subscribe({
          next: (res) => {
            loading.then((l) => l.dismiss());
            console.log(
              '[KEEP ME IN] =>',
              this.formGroup?.get('keepIn')?.value
            );
            if (this.formGroup?.get('keepIn')?.value) {
              this.localStorageAuthService.val = res?.item;
            }
            this.formGroup?.reset();
            this.router.navigate([`${RoutersEnum.app}/${RoutersEnum.home}`]);
          },
          error: (error) => {
            this.alert(error?.message, 'Aviso!');
            loading.then((l) => l.dismiss());
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
      institutionId: new FormControl('', [Validators.required]),
      keepIn: new FormControl(false),
    });
    loading.then((l) => l.dismiss());
    this.isLoading = false;
  }

  // #endregion Private Methods (1)
}

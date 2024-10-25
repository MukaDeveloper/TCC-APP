import { PayloadService } from 'src/services/payload/payload.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  AlertController,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import { LocalStorageAuthService } from 'src/services/localstorage/auth-local.service';
import { UsersService } from 'src/services/users/users.service';
import { BaseComponent } from 'src/shared/utils/base.component';
import { IEnvelope } from 'src/shared/utils/envelope';
import { CredentialsDto } from '../../../services/users/dto/credentials.dto';
import { ERouters } from '../../../shared/utils/e-routers';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage extends BaseComponent implements OnInit {
  // #region Properties (3)

  public formGroup: FormGroup | null = null;
  public isLoading: boolean = true;
  public keepMeLogIn: boolean = false;

  // #endregion Properties (3)

  // #region Constructors (1)

  constructor(
    private readonly localStorageAuthService: LocalStorageAuthService,
    private readonly payloadService: PayloadService,
    private readonly usersService: UsersService,
    private router: Router,
    toastController: ToastController,
    alertController: AlertController,
    loadingController: LoadingController
  ) {
    super(toastController, alertController, loadingController);
  }

  // #endregion Constructors (1)

  // #region Public Methods (4)

  public ngOnInit() {
    this.createForm();
  }

  public onKeyEvent($e: number): void {
    if ($e === 13 && this.formGroup!.valid) {
      this.onSubmit();
    }
  }

  public goToRegister() {
    this.router.navigate([ERouters.register], {
      replaceUrl: true,
    });
  }

  public forgotPassword() {
    this.router.navigate([ERouters.forgotPassword], {
      replaceUrl: true,
    });
  }

  public onSubmit() {
    const email = this.formGroup?.get('email')?.value;
    const passwordString = this.formGroup?.get('password')?.value;
    // const institutionId = this.formGroup?.get('institutionId')?.value;
    // || !institutionId
    if (!email || !passwordString) {
      this.alert('Preencha os campos corretamente', 'Aviso!');
      return;
    }
    // && institutionId
    this.isLoading = true;
    if (email && passwordString) {
      const credentials = {
        email,
        passwordString,
        // institutionId,
      } as CredentialsDto;
      this.usersService.auth(credentials).subscribe({
        next: (res: IEnvelope<string>) => {
          this.isLoading = false;
          if (this.formGroup?.get('keepIn')?.value) {
            this.localStorageAuthService.val = res?.item;
          }
          this.formGroup?.reset();
          this.router.navigate([ERouters.checkin], {
            replaceUrl: true,
          });
        },
        error: (error: any) => {
          this.isLoading = false;
          this.toast(error?.message, 'Aviso!', 'secondary', 'bottom');
          this.formGroup?.get('password')?.reset();
        },
      });
    }
  }

  // #endregion Public Methods (4)

  // #region Private Methods (1)

  private createForm() {
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      // institutionId: new FormControl('', [Validators.required]),
      keepIn: new FormControl(false),
    });
    this.isLoading = false;
  }

  // #endregion Private Methods (1)
}

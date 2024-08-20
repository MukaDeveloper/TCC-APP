import { alertController } from '@ionic/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/shared/utils/base.component';
import { UsersService } from 'src/services/users/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage extends BaseComponent implements OnInit {

  public isBusy: boolean = true;
  public formGroup: FormGroup | null = null;

  constructor(
    private readonly usersService: UsersService,
    private router: Router,
    toastController: ToastController,
    alertController: AlertController,
    loadingController: LoadingController,
  ) {
    super(toastController, alertController, loadingController);
  }

  ngOnInit() {
    this.createForm();
  }

  public onSubmit() {
    const email = this.formGroup?.get('email')?.value;
    const password = this.formGroup?.get('password')?.value;
    if (email && password) {
      this.usersService.auth({ email, password }).subscribe({
        next: (res) => {
          console.log('LOGADO');
        },
        error: (error) => {
          console.log(error);
        }
      })
    }
  }

  private createForm() {
    const loading = this.loadingShow('Gerando formulário...');
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    })
    loading.then((l) => l.dismiss());
    this.isBusy = false;
  }
}

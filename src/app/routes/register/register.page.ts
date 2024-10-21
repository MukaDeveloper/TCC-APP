import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  AlertController,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import { RegisterDto } from 'src/services/users/dto/register.dto';
import { IEnvelope } from 'src/shared/utils/envelope';
import { LocalStorageAuthService } from '../../../services/localstorage/auth-local.service';
import { UsersService } from '../../../services/users/users.service';
import { BaseComponent } from '../../../shared/utils/base.component';
import { ERouters } from '../../../shared/utils/e-routers';

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

  get passwordMismatch() {
    return (
      this.formGroup?.hasError('mismatch') &&
      this.formGroup?.get('confirmPassword')?.touched
    );
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

  public onKeyEvent($e: number): void {
    if ($e === 13 && this.formGroup!.valid) {
      this.onSubmit();
    }
  }

  public onSubmit() {
    if (this.passwordMismatch) {
      this.toast(
        'As senhas devem se coincidir',
        'Atenção!',
        'medium',
        'middle'
      );
      return;
    }
    if (!this.formGroup?.valid) {
      this.alert('Preencha todos os campos obrigatórios.', 'Atenção!');
      return;
    }
    this.isLoading = true;
    const initials = this.generateInitials(this.formGroup?.get('name')?.value);
    const background = this.getRandomColor();
    const photoUrl = this.generateAvatarImage(initials, background);
    this.formGroup?.get('photoUrl')?.setValue(photoUrl);
    const obj = this.formGroup?.value as RegisterDto;
    delete (obj as any).confirmPassword;

    this.usersService.register(obj).subscribe({
      next: (res: IEnvelope<any>) => {
        this.router.navigate([ERouters.login], {
          replaceUrl: true,
        });
        this.formGroup?.reset();
        this.toast(`Bem-vindo ${res.item.name}! Agora você pode fazer login`, "Sucesso!", "success", "bottom");
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error(error);
        this.alert(error?.message, 'Atenção!');
        this.isLoading = false;
      },
    });
  }

  public passwordMatchValidator: ValidatorFn = (
    formGroup: AbstractControl
  ): ValidationErrors | null => {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  };
  private createForm() {
    this.formGroup = new FormGroup(
      {
        name: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]),
        confirmPassword: new FormControl('', [Validators.required]),
        photoUrl: new FormControl(''),
      },
      { validators: this.passwordMatchValidator }
    );
    this.isLoading = false;
  }

  // Gera as iniciais com base no nome do usuário
  private generateInitials(name: string): string {
    const nameParts = name.trim().split(' ');
    if (nameParts.length === 1) {
      return nameParts[0].charAt(0).toUpperCase();
    } else {
      return (
        nameParts[0].charAt(0).toUpperCase() +
        nameParts[1].charAt(0).toUpperCase()
      );
    }
  }

  // Gera uma cor aleatória
  private getRandomColor(): string {
    const pastelColors: string[] = [
      '#A7C6ED', // Pastel Azul
      '#B8E5B3', // Pastel Verde
      '#F4B6C2', // Pastel Rosa
      '#F2E6A0', // Pastel Amarelo
      '#D6C7E2', // Pastel Lilás
    ];
    const randomIndex = Math.floor(Math.random() * pastelColors.length);
    return pastelColors[randomIndex];
  }

  // Gera a imagem com o canvas e retorna a URL
  private generateAvatarImage(
    initials: string,
    backgroundColor: string
  ): string {
    const canvas = document.createElement('canvas');
    canvas.width = 100;
    canvas.height = 100;
    const context = canvas.getContext('2d');

    if (context) {
      // Define o background
      context.fillStyle = backgroundColor;
      context.fillRect(0, 0, canvas.width, canvas.height);

      // Define o texto
      context.fillStyle = '#FDFDFD'; // Cor branca para o texto
      context.font = 'bold 40px Arial';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(initials, canvas.width / 2, canvas.height / 2);
    }

    return canvas.toDataURL('image/png'); // Retorna a imagem como uma URL Base64
  }
}

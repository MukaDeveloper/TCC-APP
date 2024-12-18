import { Component, EventEmitter, OnDestroy } from '@angular/core';
import {
  AlertController,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EUserRole } from '../../services/payload/interfaces/enum/EUserRole';
import { ICart } from 'src/services/cart/interfaces/i-cart';
import { ICartItems } from 'src/services/cart/interfaces/i-cart-items';

@Component({
  template: '',
})
export class BaseComponent implements OnDestroy {
  // #region Properties (2)

  protected subs: Subscription[] = [];
  public customSelectOptions = {
    cssClass: 'custom-alert',
  };
  public darkMode: boolean;

  public eUserRole = EUserRole.USER;
  public eWarehousemanRole = EUserRole.WAREHOUSEMAN;
  public eCoordinatorRole = EUserRole.COORDINATOR;
  public eSupportRole = EUserRole.SUPPORT;
  // #endregion Properties (2)

  // #region Constructors (1)

  constructor(
    public readonly toastController: ToastController,
    public readonly alertController: AlertController,
    public readonly loadingController: LoadingController
  ) {
    const savedTheme = localStorage.getItem('str-dark-media');
    this.darkMode = savedTheme
      ? JSON.parse(savedTheme)
      : window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Atualiza o tema na inicialização
    this.updateTheme(this.darkMode);
  }

  // #endregion Constructors (1)

  // #region Public Getters And Setters (1)

  public get isDev() {
    return !environment.production;
  }

  // #endregion Public Getters And Setters (1)

  // #region Public Methods (5)

  updateTheme(isDark: boolean) {
    const body = document.body;

    if (isDark) {
      body.classList.add('dark-theme');
    } else {
      body.classList.remove('dark-theme');
    }
  }

  public toggleDarkMode() {
    this.darkMode = !this.darkMode;
    this.updateTheme(this.darkMode);

    // Salvar a preferência no localStorage
    localStorage.setItem('str-dark-media', JSON.stringify(this.darkMode));
  }

  public async alert(message: string, header: string, subHeader: string = '') {
    const alert = await this.alertController.create({
      cssClass: 'custom-alert',
      header,
      subHeader,
      message,
      buttons: [
        { text: 'OK', role: 'confirm', cssClass: 'alert-button-confirm' },
      ],
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
  }

  public async loadingShow(message: string) {
    const loading = await this.loadingController.create({
      cssClass: 'custom-loading',
      animated: true,
      message,
      duration: 0,
      spinner: 'lines',
      translucent: true,
      backdropDismiss: false,
    });
    await loading.present();
    return loading;
  }

  public ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }

  public phoneMaskEvent(event: any) {
    let input = event.target.value.replace(/\D/g, '');
    let phoneNumber = '';
    if (input.length > 0) {
      input = `(${input}`;
    }
    if (input.length > 3) {
      input = `${input.slice(0, 3)}) ${input.slice(3)}`;
    }
    if (input.length > 10) {
      input = `${input.slice(0, 10)}-${input.slice(10, 14)}`;
    }
    phoneNumber = input.slice(0, 15);
    event.target.value = phoneNumber;
  }

  public async toast(
    message: string,
    header: string,
    color: string = 'warning',
    position: 'bottom' | 'top' | 'middle' = 'bottom'
  ) {
    const toast = await this.toastController.create({
      cssClass: 'custom-toast',
      header,
      message,
      position,
      color,
      duration: 2000,
    });
    return toast.present();
  }

  public getCartItemsQuantity(items: ICartItems[] | undefined): number | null {
    if (!items) {
      return null;
    }

    let quantity = 0;
    items.forEach((item) => {
      quantity += item.quantity;
    });
    return quantity;
  }

  // #endregion Public Methods (5)
}

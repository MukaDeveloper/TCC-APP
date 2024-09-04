import { Component, OnDestroy } from '@angular/core';
import {
  AlertController,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  template: '',
})
export class BaseComponent implements OnDestroy {
  protected subs: Subscription[] = [];
  public darkMode: boolean = window.matchMedia('(prefers-color-scheme: dark)')
    .matches;

  constructor(
    public readonly toastController: ToastController,
    public readonly alertController: AlertController,
    public readonly loadingController: LoadingController
  ) {}

  public get isDev() {
    return !environment.production;
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

  public async alert(message: string, header: string, subHeader: string = '') {
    const alert = await this.alertController.create({
      cssClass: 'custom-alert',
      header,
      subHeader,
      message,
      buttons: ['OK'],
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }

  public async toast(
    message: string,
    header: string,
    color: string = 'warning',
    position: 'bottom' | 'top' | 'middle' = 'bottom'
  ) {
    const toast = await this.toastController.create({
      header,
      message,
      position,
      color,
      duration: 2000,
    });
    return toast.present();
  }
}

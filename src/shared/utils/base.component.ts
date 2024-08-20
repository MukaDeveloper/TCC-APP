import { Component, OnDestroy } from "@angular/core";
import { AlertController, LoadingController, ToastController } from "@ionic/angular";
import { Subscription } from "rxjs";
import { environment } from "src/environments/environment";

@Component({
  template: '',
})
export class BaseComponent implements OnDestroy {

  protected subs: Subscription[] = [];
  public darkMode: boolean = window.matchMedia('(prefers-color-scheme: dark)').matches;


  constructor(
    public readonly toastController: ToastController,
    public readonly alertController: AlertController,
    public readonly loadingController: LoadingController,
  ) { }

  public get isDev() {
    return !environment.production
  }

  public async loadingShow(message: string) {
    const loading = await this.loadingController.create({
      cssClass: 'custom-loading',
      message,
      duration: 0,
      translucent: true,
      backdropDismiss: false,
    })
    await loading.present();
    return loading;
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }


}

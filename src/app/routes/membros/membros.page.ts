import { AfterViewInit, Component, OnInit } from '@angular/core';
import {
  ToastController,
  AlertController,
  LoadingController,
} from '@ionic/angular';
import { BaseComponent } from '../../../shared/utils/base.component';

@Component({
  selector: 'app-membros',
  templateUrl: './membros.page.html',
  styleUrls: ['./membros.page.scss'],
})
export class MembrosPage
  extends BaseComponent
  implements OnInit, AfterViewInit
{
  public isLoading = true;

  constructor(
    toastController: ToastController,
    alertController: AlertController,
    loadingController: LoadingController
  ) {
    super(toastController, alertController, loadingController);
  }

  ngAfterViewInit(): void {
    // this.onGetAll();
  }

  ngOnInit() {
    this.subs.push();
    // this.isLoading = false;
  }

  public onReload() {
    // this.onGetAll();
  }

  private onGetAll() {}
}

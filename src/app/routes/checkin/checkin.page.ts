import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../shared/utils/base.component';
import {
  ToastController,
  AlertController,
  LoadingController,
} from '@ionic/angular';
import { ERouters } from '../../../shared/utils/e-routers';
import { PayloadService } from '../../../services/payload/payload.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.page.html',
  styleUrls: ['./checkin.page.scss'],
})
export class CheckinPage extends BaseComponent implements OnInit {

  public isLoading: boolean = true;

  constructor(
    private readonly payloadService: PayloadService,
    private router: Router,
    toastController: ToastController,
    alertController: AlertController,
    loadingController: LoadingController
  ) {
    super(toastController, alertController, loadingController);
  }

  public goBack() {
    this.payloadService.nextPayload(null);
    this.router.navigate([ERouters.login], {
      replaceUrl: true,
    });
  }

  ngOnInit() {
    this.isLoading = false;
  }
}

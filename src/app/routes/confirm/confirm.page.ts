import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from '../../../shared/utils/base.component';
import {
  AlertController,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import { PayloadService } from '../../../services/payload/payload.service';
import { IPayload } from '../../../services/payload/interfaces/i-payload';
import { ERouters } from '../../../shared/utils/e-routers';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.page.html',
  styleUrls: ['./confirm.page.scss'],
})
export class ConfirmPage extends BaseComponent implements OnInit {
  public payload: IPayload | null = null;
  public token: string | null = null;
  public isLoading: boolean = true;

  constructor(
    private readonly payloadService: PayloadService,
    private router: Router,
    private route: ActivatedRoute,
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
    this.subs.push(
      this.payloadService.payload$.subscribe((res) => (this.payload = res))
    );
    this.token = this.route.snapshot.queryParams['token'];
    const redirected = this.route.snapshot.queryParams['redirected'];
    if (!this.token && !this.payload) {
      this.goBack();
      return;
    }
    this.isLoading = false;
  }
}

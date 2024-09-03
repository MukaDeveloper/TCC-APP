import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PayloadService } from '../../services/payload/payload.service';
import { RoutersEnum } from '../../shared/utils/routers-enum';
import { InstitutionService } from '../../services/instution/intitution.service';
import { WarehousesService } from '../../services/warehouses/warehouses.service';
import { IPayload } from '../../services/payload/interfaces/i-payload';
import { mergeMap } from 'rxjs';
import { BaseComponent } from 'src/shared/utils/base.component';
import {
  ToastController,
  AlertController,
  LoadingController,
  ViewDidEnter,
} from '@ionic/angular';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.page.html',
  styleUrls: ['./layout.page.scss'],
})
export class LayoutPage extends BaseComponent implements OnInit, ViewDidEnter {
  // #region Properties (1)

  public isLoading = true;
  public isMenuOpen = false;
  public payload: IPayload | null = null;

  // #endregion Properties (1)

  // #region Constructors (1)

  constructor(
    private readonly payloadService: PayloadService,
    private readonly institutionService: InstitutionService,
    private readonly warehousesService: WarehousesService,
    private router: Router,
    toastController: ToastController,
    alertController: AlertController,
    loadingController: LoadingController
  ) {
    super(toastController, alertController, loadingController);
  }

  // #endregion Constructors (1)

  // #region Public Methods (1)

  onSplitPaneVisible(event: any) {
    this.isMenuOpen = event.detail.visible;
  }

  public ionViewDidEnter(): void {
    this.onPayload();
  }

  public ngOnInit() {
    this.subs.push(
      this.payloadService.payload$.subscribe((res) => (this.payload = res))
    );
  }

  public onLogout() {
    this.payloadService.nextPayload(null);
    this.router.navigate([RoutersEnum.login], {
      queryParams: { redirected: true },
    });
  }

  private onPayload() {
    console.log('Fazendo requisição de instituição e armazéns', this.payload);
    this.institutionService
      .getCurrent()
      .pipe(mergeMap(() => this.warehousesService.getAll()))
      .subscribe({
        next: (res) => {
          this.isLoading = false;
        },
        error: (err) => {
          this.isLoading = false;
        },
      });
  }

  // #endregion Public Methods (1)
}

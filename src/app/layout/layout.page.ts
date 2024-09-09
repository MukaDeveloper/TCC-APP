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
import { AreasService } from 'src/services/areas/areas.service';

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
    private readonly areasService: AreasService,
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
    const loading = this.loadingShow("Carregando...");
    this.institutionService
      .getCurrent()
      .pipe(mergeMap(() => this.areasService.getAll()))
      .subscribe({
        next: (res) => {
          loading.then((l) => l.dismiss());
          this.isLoading = false;
        },
        error: (err) => {
          loading.then((l) => l.dismiss());
          this.isLoading = false;
        },
      });
  }

  // #endregion Public Methods (1)
}

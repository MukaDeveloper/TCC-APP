import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AlertController,
  LoadingController,
  ToastController,
  ViewDidEnter,
} from '@ionic/angular';
import { mergeMap } from 'rxjs';
import { AreasService } from 'src/services/areas/areas.service';
import { BaseComponent } from 'src/shared/utils/base.component';
import { InstitutionService } from '../../services/instution/intitution.service';
import { IPayload } from '../../services/payload/interfaces/i-payload';
import { PayloadService } from '../../services/payload/payload.service';
import { ResetService } from '../../services/reset/reset.service';
import { RoutersEnum } from '../../shared/utils/routers-enum';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.page.html',
  styleUrls: ['./layout.page.scss'],
})
export class LayoutPage extends BaseComponent implements OnInit, ViewDidEnter {
  // #region Properties (3)

  public isLoading = true;
  public isMenuOpen = false;
  public payload: IPayload | null = null;

  // #endregion Properties (3)

  // #region Constructors (1)

  constructor(
    private readonly resetService: ResetService,
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

  // #region Public Methods (4)

  public ionViewDidEnter(): void {
    this.onPayload();
  }

  public ngOnInit() {
    this.subs.push(
      this.payloadService.payload$.subscribe((res) => (this.payload = res))
    );
  }

  public onLogout() {
    this.resetService.resetAll();
    this.payloadService.nextPayload(null);
    this.router.navigate([RoutersEnum.login], {
      replaceUrl: true,
      queryParams: { redirected: true },
    });
  }

  public onSplitPaneVisible(event: any) {
    this.isMenuOpen = event.detail.visible;
  }

  // #endregion Public Methods (4)

  // #region Private Methods (1)

  private onPayload() {
    const loading = this.loadingShow('Carregando...');
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

  // #endregion Private Methods (1)
}

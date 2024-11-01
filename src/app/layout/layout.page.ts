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
import { WarehousesService } from '../../services/warehouses/warehouses.service';
import { ERouters } from '../../shared/utils/e-routers';
import { IMember } from 'src/services/users/interfaces/i-member';
import { UsersService } from 'src/services/users/users.service';
import { CartService } from 'src/services/cart/cart.service';

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
  public members: IMember[] | null = null;

  // #endregion Properties (3)

  // #region Constructors (1)

  constructor(
    private readonly cartService: CartService,
    private readonly usersService: UsersService,
    private readonly resetService: ResetService,
    private readonly payloadService: PayloadService,
    private readonly institutionService: InstitutionService,
    private readonly areasService: AreasService,
    private readonly warehousesService: WarehousesService,
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
      this.payloadService.payload$.subscribe((res) => (this.payload = res)),
      this.usersService.members$.subscribe((res) => (this.members = res))
    );
  }

  public onLogout() {
    this.resetService.resetAll();
    this.payloadService.nextPayload(null);
    this.router.navigate([ERouters.login], {
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
    if (!this.institutionService.institution) {
      const loading = this.loadingShow('Carregando...');
      this.institutionService.getCurrent().subscribe({
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

    if (this.payload?.role !== 'USER') {
      this.areasService
        .getAll()
        .pipe(mergeMap((_) => this.warehousesService.getAll()))
        .subscribe();
    }

    if (!this.members?.length) {
      this.usersService.getAllFromInstitution().subscribe();
    }

    this.cartService.cart = this.cartService.getCart();
  }

  // #endregion Private Methods (1)
}

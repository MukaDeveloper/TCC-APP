import { Component, effect, OnInit } from '@angular/core';
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
import { ICart } from 'src/services/cart/interfaces/i-cart';

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
  public cart: ICart | null = null;
  public blackList: string[] = [
    `/${ERouters.app}/${ERouters.materials}/${ERouters.addMaterial}`,
  ];

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
    public router: Router,
    toastController: ToastController,
    alertController: AlertController,
    loadingController: LoadingController
  ) {
    super(toastController, alertController, loadingController);

    effect(() => {
      this.cart = this.cartService.cart;
    });
  }

  // #endregion Constructors (1)

  public get canShow(): boolean {
    if (this.blackList.includes(this.router.url)) {
      return false;
    }
    return true;
  }

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
      this.institutionService.getCurrent().subscribe({
        next: (res) => {
          this.isLoading = false;

          let cart = this.cartService.getCart();

          if (cart) {
            if (cart?.userId !== this.payload?.id) {
              cart = null;
            }

            if (cart?.institutionId !== res.item.id) {
              cart = null;
            }
          }

          // console.log('onPayload => getCart', cart);
          this.cartService.cart = cart;
        },
        error: (err) => {
          this.isLoading = false;
        },
      });
    } else {
      let cart = this.cartService.getCart();

      if (cart) {
        if (cart?.userId !== this.payload?.id) {
          cart = null;
        }

        if (cart?.institutionId !== this.institutionService.institution.id) {
          cart = null;
        }
      }

      this.cartService.cart = cart;
    }

    if (this.payload?.role !== 'USER') {
      this.areasService
        .getAll()
        .pipe(mergeMap((_) => this.warehousesService.getAll()))
        .subscribe();

      if (!this.members?.length) {
        this.usersService.getAllFromInstitution().subscribe();
      }
    }
  }

  // #endregion Private Methods (1)
}

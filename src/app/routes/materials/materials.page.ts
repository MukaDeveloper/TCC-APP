import { WarehousesService } from './../../../services/warehouses/warehouses.service';
import {
  Component,
  effect,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { BaseComponent } from '../../../shared/utils/base.component';
import {
  ToastController,
  AlertController,
  LoadingController,
} from '@ionic/angular';
import { IMaterial } from '../../../services/materials/interfaces/i-material';
import { MaterialsService } from '../../../services/materials/materials.service';
import { PayloadService } from '../../../services/payload/payload.service';
import { IPayload } from '../../../services/payload/interfaces/i-payload';
import { ERouters } from '../../../shared/utils/e-routers';
import { EUserRole } from 'src/services/payload/interfaces/enum/EUserRole';
import { EMaterialStatus } from '../../../services/materials/interfaces/enum/material-status.enum';
import { IMaterialStatus } from '../../../services/materials/interfaces/i-material-status';
import { ICart } from 'src/services/cart/interfaces/i-cart';
import { ECartItemStatus } from 'src/services/cart/interfaces/enums/cart-item-status.enum';
import { CartService } from '../../../services/cart/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-materials',
  templateUrl: './materials.page.html',
  styleUrls: ['./materials.page.scss'],
})
export class MaterialsPage extends BaseComponent implements OnInit {
  // #region Properties (3)

  @ViewChild('ModalCart') public modalCart: any;
  public filtered: IMaterial[] = [];
  public isLoading = true;
  public payload: IPayload | null = null;
  public homeURL = `/${ERouters.app}/${ERouters.home}`;
  public defaultURL = ERouters.home;
  public cart: ICart | null = null;
  public flexColumn = false;

  // #endregion Properties (3)

  // #region Constructors (1)

  constructor(
    private readonly payloadService: PayloadService,
    private readonly warehousesService: WarehousesService,
    private readonly materialsService: MaterialsService,
    private readonly cartService: CartService,
    private router: Router,
    toastController: ToastController,
    alertController: AlertController,
    loadingController: LoadingController
  ) {
    super(toastController, alertController, loadingController);

    effect(() => {
      this.cart = this.cartService.cart;
    });
    this.onResize();
  }

  @HostListener('window:resize')
  public onResize() {
    this.flexColumn =
      window.innerWidth <= 490 ||
      (window.innerWidth >= 575 && window.innerWidth <= 890);
  }

  // #endregion Constructors (1)

  // #region Public Methods (2)

  public getMaterialIcon(material: IMaterial): string {
    if (!material.imageURL) {
      return 'assets/imgs/dummy.jpg';
    }
    return material.imageURL;
  }

  public ngOnInit() {
    this.subs.push(
      this.payloadService.payload$.subscribe(
        (res: IPayload | null) => (this.payload = res)
      ),
      this.materialsService.filtered$.subscribe(
        (res: IMaterial[]) => (this.filtered = res)
      )
    );
    this.onGetAll();
  }

  public onRequest(material: IMaterial): void {
    const cart = this.cartService.cart;
    const availables =
      material?.status.find((o) => o.status === EMaterialStatus.AVAILABLE)
        ?.quantity || 0;

    if (!cart) {
      const defaultDate = new Date();
      defaultDate.setDate(defaultDate.getDate() + 7);
      this.cartService.cart = {
        userId: this.payload?.id as number,
        institutionId: this.payloadService.payload?.institutionId as number,
        description: '',
        items: [
          {
            name: material.name,
            imageURL: material.imageURL,
            materialId: material.id,
            quantity: 1,
            status: ECartItemStatus.PENDING,
            quantityAvailable: availables,
            quantityAccepted: 0,
            quantityDeclined: 0,
          },
        ],
        expectReturnAt: defaultDate.toISOString(),
        sended: false,
      };
      this.cart = cart;
      this.toast('Adicionado ao carrinho', 'Sucesso!', 'success', 'top');
      return;
    }

    if (cart?.items.length) {
      const item = cart?.items.find((o) => o.materialId === material.id);
      if (item) {
        item.quantity += 1;
        if (item.quantity > availables) {
          item.quantity = availables;
        } else {
          this.toast('Adicionado ao carrinho', 'Sucesso!', 'success', 'top');
        }
        this.cartService.cart = cart;
        this.cart = cart;
        return;
      }
    }

    cart.items.push({
      name: material.name,
      imageURL: material.imageURL,
      materialId: material.id,
      quantity: 1,
      status: ECartItemStatus.PENDING,
      quantityAvailable: availables,
      quantityAccepted: 0,
      quantityDeclined: 0,
    });
    this.cartService.cart = cart;
    this.cart = cart;
    this.toast('Adicionado ao carrinho', 'Sucesso!', 'success', 'top');
  }

  public resolveAvailableStatus(status: IMaterialStatus[]): string {
    let message = 'Nenhum disponível';
    const available = status.find(
      (s) => s.status === EMaterialStatus.AVAILABLE
    );
    if (available?.quantity) {
      message = '1 DISPONÍVEL';
      if (available.quantity > 1) {
        message = `${available.quantity} DISPONÍVEIS`;
      }
    }
    return message;
  }

  public onReload() {
    this.filtered = [];
    this.isLoading = true;
    this.onGetAll();
  }

  public canEdit(material: IMaterial): boolean {
    if (window.innerWidth < 790) {
      if (window.innerWidth > 575 || window.innerWidth < 490) {
        return false;
      }
    }

    if (this.payload?.role === EUserRole.USER) {
      return false;
    }

    if (this.payload?.role === EUserRole.WAREHOUSEMAN) {
      if (material.materialWarehouses.length) {
        if (material.materialWarehouses.length === 1) {
          const warehouse = this.warehousesService.warehouses$.value?.find(
            (w) => w.id === material.materialWarehouses[0].id
          );
          if (
            warehouse &&
            !warehouse?.warehousemans?.includes(this.payload.id)
          ) {
            return false;
          }
        }
      }
    }

    // if (material.materialWarehouses.includes)
    return true;
  }

  public addMaterial() {
    this.router.navigate(
      [`${ERouters.app}/${ERouters.materials}/${ERouters.addMaterial}`],
      {
        replaceUrl: true,
      }
    );
  }

  public editMaterial(material: IMaterial, button: boolean) {
    if (window.innerWidth >= 790 && !button) {
      return;
    }
    
    // Redirecionar para página de edição
  }

  // #endregion Public Methods (2)

  // #region Private Methods (1)

  private onGetAll() {
    this.materialsService.getAll(0, 20).subscribe({
      next: () => (this.isLoading = false),
      error: (err: any) => {
        this.isLoading = false;
        this.toast(err.message, 'Erro!', 'danger');
      },
    });
  }

  // #endregion Private Methods (1)
}

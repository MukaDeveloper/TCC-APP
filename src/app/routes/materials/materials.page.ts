import { WarehousesService } from './../../../services/warehouses/warehouses.service';
import { Component, OnInit } from '@angular/core';
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
import { CartStorageService } from 'src/services/localstorage/cart-local.service';
import { ICart } from 'src/services/cart/interfaces/i-cart';
import { ECartItemStatus } from 'src/services/cart/interfaces/enums/cart-item-status.enum';

@Component({
  selector: 'app-materials',
  templateUrl: './materials.page.html',
  styleUrls: ['./materials.page.scss'],
})
export class MaterialsPage extends BaseComponent implements OnInit {
  // #region Properties (3)

  public filtered: IMaterial[] | null = [];
  public isLoading = true;
  public payload: IPayload | null = null;
  public homeURL = `/${ERouters.app}/${ERouters.home}`;
  public defaultURL = ERouters.home;

  // #endregion Properties (3)

  // #region Constructors (1)

  constructor(
    private readonly payloadService: PayloadService,
    private readonly warehousesService: WarehousesService,
    private readonly materialsService: MaterialsService,
    private readonly cartStorageService: CartStorageService,
    toastController: ToastController,
    alertController: AlertController,
    loadingController: LoadingController
  ) {
    super(toastController, alertController, loadingController);
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
      this.payloadService.payload$.subscribe((res: IPayload | null) => (this.payload = res)),
      this.materialsService.filtered$.subscribe((res: IMaterial[] | null) => (this.filtered = res))
    );
    this.onGetAll();
  }

  public onRequest(material: IMaterial) {
    const availables = material.status.find(o => o.status === EMaterialStatus.AVAILABLE);
    this.alertController.create({
      cssClass: 'custom-alert',
      header: material.name,
      backdropDismiss: true,
      message: "Quantos materiais deseja solicitar?",
      inputs: [
        {
          name: "Quantidade",
          placeholder: "5",
          type: "number",
          value: 1,
          min: 1,
          max: availables?.quantity || 99
        }
      ],
      buttons: [
        {
          text: "Cancelar",
          role: "cancel"
        },
        {
          text: "Adicionar",
          role: "add",
          handler: (data) => {
            const quantity = data.value;
            // Aqui você pode manipular o valor da entrada (data.name)
          }
        }
      ]
    })
  }

  public request(materialId: number, quantity: number): void {
    let cart = JSON.parse(this.cartStorageService.val) as ICart;

    if (!cart) {
      cart = {
        sended: false,
        items: [],
      } as ICart;
    }

    if (cart.items.length) {
      const item = cart.items.find(o => o.materialId === materialId);
      if (item) {
        item.quantity += quantity;
        return;
      }
    }

    cart.items.push({
      materialId,
      quantity,
      status: ECartItemStatus.PENDING,
      quantityAccepted: 0,
      quantityDeclined: 0
    });
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

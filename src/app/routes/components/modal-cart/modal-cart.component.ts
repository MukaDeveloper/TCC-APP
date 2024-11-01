import { Component, effect, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '../../../../shared/utils/base.component';
import {
  ToastController,
  AlertController,
  LoadingController,
  IonModal,
} from '@ionic/angular';
import { ICart } from '../../../../services/cart/interfaces/i-cart';
import { CartService } from '../../../../services/cart/cart.service';
import { Router } from '@angular/router';
import { ERouters } from 'src/shared/utils/e-routers';

@Component({
  selector: 'app-modal-cart',
  templateUrl: './modal-cart.component.html',
  styleUrls: ['./modal-cart.component.scss'],
})
export class ModalCartComponent extends BaseComponent implements OnInit {
  @ViewChild(IonModal) public modal!: IonModal;
  public cart: ICart | null = null;

  constructor(
    private readonly cartService: CartService,
    private readonly router: Router,
    toastController: ToastController,
    alertController: AlertController,
    loadingController: LoadingController
  ) {
    super(toastController, alertController, loadingController);

    effect(() => {
      const newValue = this.cartService.cart;
      if (newValue) {
        this.cart = newValue;
      }
    });
  }

  ngOnInit() {}

  public onOpenModal() {
    this.modal.present();
  }

  public GoToMaterials() {
    this.modal.dismiss();
    console.log('this url', this.router.url);
    if (this.router.url !== `/${ERouters.app}/${ERouters.materials}`) {
      this.router.navigate([`${ERouters.app}/${ERouters.materials}`]);
    }
  }

  public onAddItem(materialId: number) {
    if (!this.cart?.items.length) {
      this.toast(
        'Houve um erro com sua solicitação, adicione um item novamente',
        'Atenção'
      );
      this.GoToMaterials();
      return;
    }
    const materialIndex = this.cart?.items?.findIndex(
      (item) => item.materialId === materialId
    );
    if (materialIndex > -1) {
    }
  }

  public onDeleteItem(materialId: number) {
    if (!this.cart?.items.length) {
      this.modal.dismiss();
      return;
    }

    const materialIndex = this.cart?.items?.findIndex(
      (item) => item.materialId === materialId
    );

    if (materialIndex > -1) {
      this.cart.items[materialIndex].quantity--;
      if (this.cart.items[materialIndex].quantity === 0) {
        this.cart.items.splice(materialIndex, 1);
      }

      if (!this.cart.items.length) {
        this.modal.dismiss();
      }
    }
  }

  public clearCart() {
    this.cartService.cart = null;
    this.modal.dismiss();
  }
}

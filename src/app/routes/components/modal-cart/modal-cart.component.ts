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
}

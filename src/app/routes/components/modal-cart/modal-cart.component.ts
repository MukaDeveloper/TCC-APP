import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../shared/utils/base.component';
import {
  ToastController,
  AlertController,
  LoadingController,
} from '@ionic/angular';
import { CartStorageService } from '../../../../services/localstorage/cart-local.service';
import { ICart } from '../../../../services/cart/interfaces/i-cart';
import { CartService } from '../../../../services/cart/cart.service';

@Component({
  selector: 'app-modal-cart',
  templateUrl: './modal-cart.component.html',
  styleUrls: ['./modal-cart.component.scss'],
})
export class ModalCartComponent extends BaseComponent implements OnInit {

  public cart: ICart | null = null;

  constructor(
    private readonly cartService: CartService,
    toastController: ToastController,
    alertController: AlertController,
    loadingController: LoadingController
  ) {
    super(toastController, alertController, loadingController);
  }

  ngOnInit() {
    this.subs.push(
      this.cartService.cart$.subscribe((res) => (this.cart = res))
    )
  }
}

import { BehaviorSubject, Observable } from 'rxjs';
import { ICart } from './interfaces/i-cart';
import { CartStorageService } from '../localstorage/cart-local.service';
import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  // #region Properties (2)

  private cart$: WritableSignal<ICart | null> = signal(null);

  // #endregion Properties (2)

  // #region Constructors (1)

  constructor(readonly cartStorageService: CartStorageService) {}

  // #endregion Constructors (1)

  // #region Public Getters And Setters (1)

  public get cart(): ICart | null {
    let cart = this.cart$();
    if (!cart) {
      const cartObj = this.cartStorageService.val;
      if (cartObj) {
        this.cart$.set((JSON.parse(cartObj) as ICart) || null);
        return cart;
      }
      return null;
    }
    return cart;
  }

  public set cart(value: ICart | null) {
    this.cartStorageService.val = JSON.stringify(value || '');
    this.cart$.set(value);
  }

  // #endregion Public Getters And Setters (1)

  // #region Public Methods (1) 
}

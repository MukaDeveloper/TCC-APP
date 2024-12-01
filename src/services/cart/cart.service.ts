import { BehaviorSubject, Observable } from 'rxjs';
import { ICart } from './interfaces/i-cart';
import { CartStorageService } from '../localstorage/cart-local.service';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { PayloadService } from '../payload/payload.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  // #region Properties (2)

  private cart$: WritableSignal<ICart | null> = signal(null);

  // #endregion Properties (2)

  // #region Constructors (1)

  constructor(
    readonly cartStorageService: CartStorageService,
    readonly payloadService: PayloadService
  ) {}

  // #endregion Constructors (1)

  // #region Public Getters And Setters (1)

  public get cart(): ICart | null {
    let cart = this.cart$();
    if (!cart) {
      return null;
    }
    return cart;
  }

  public set cart(value: ICart | null) {
    this.cartStorageService.val = JSON.stringify(value) || null;
    this.cart$.set(value);
  }

  public getCart(): ICart | null {
    const cartObj = this.cartStorageService.val;
    if (!cartObj) {
      const defaultDate = new Date();
      defaultDate.setDate(defaultDate.getDate() + 7);
      const cart: ICart = {
        institutionId: this.payloadService.payload?.institutionId as number,
        userId: this.payloadService.payload?.id as number,
        description: '',
        items: [],
        expectReturnAt: defaultDate.toISOString(),
        sended: false,
      };
      this.cart$.set(cart);
      return cart;
    }
    const parsed = (JSON.parse(cartObj) as ICart) || null;
    this.cart$.set(parsed);
    return parsed;
  }

  public reset() {
    this.cart = null;
  }

  // #endregion Public Getters And Setters (1)

  // #region Public Methods (1)
}

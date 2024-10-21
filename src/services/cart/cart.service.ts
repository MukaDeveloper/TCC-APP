import { BehaviorSubject, Observable } from "rxjs";
import { ICart } from "./interfaces/i-cart";
import { CartStorageService } from "../localstorage/cart-local.service";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class CartService {
  // #region Properties (2)

  private cartSubject: BehaviorSubject<ICart | null>;

  public cart$: Observable<ICart | null>;

  // #endregion Properties (2)

  // #region Constructors (1)

  constructor(
    readonly cartStorageService: CartStorageService,
  ) {
    this.cartSubject = new BehaviorSubject<ICart | null>(null);
    this.cart$ = this.cartSubject.asObservable();
  }

  // #endregion Constructors (1)

  // #region Public Getters And Setters (1)

  public get cart(): ICart | null {
    let cart = this.cartSubject.value;
    if (!cart) {
      const cartObj = JSON.parse(this.cartStorageService.val) as ICart;
      if (cartObj) {
        this.cartSubject.next(cart || null);
        return cart;
      }
      return null;
    }
    return this.cartSubject.value;
  }

  // #endregion Public Getters And Setters (1)

  // #region Public Methods (1)

  public nextCart(obj: ICart | null): void {
    if (!obj) {
      this.cartStorageService.val = '';
      this.cartSubject.next(null);
      return;
    }
    this.cartStorageService.val = JSON.stringify(obj);
    this.cartSubject.next(obj || null);
  }
}

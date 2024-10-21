import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartStorageService {
  // #region Properties (1)

  private key = 'str-cart';

  // #endregion Properties (1)

  // #region Constructors (1)

  constructor() {}

  // #endregion Constructors (1)

  // #region Public Getters And Setters (2)

  public get val(): string {
    const val = sessionStorage.getItem(this.key);
    if (!val) {
      return '';
    }
    return val;
  }

  public set val(val: string) {
    if (!val) {
      sessionStorage.setItem(this.key, '');
    } else {
      sessionStorage.setItem(this.key, val);
    }
  }

  // #endregion Public Getters And Setters (2)
}

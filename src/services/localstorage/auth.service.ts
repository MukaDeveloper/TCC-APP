import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageAuthService {
  // #region Properties (1)

  private key = 'str-auth';

  // #endregion Properties (1)

  // #region Constructors (1)

  constructor() {}

  // #endregion Constructors (1)

  // #region Public Accessors (1)

  public get val(): string {
    const val = localStorage.getItem(this.key);
    if (!val) {
      return '';
    }
    return val;
  }

  // #endregion Public Accessors (1)

  // #region Public Methods (1)

  public set val(val: string) {
    if (!val) {
      localStorage.setItem(this.key, '');
    } else {
      localStorage.setItem(this.key, val);
    }
  }

  // #endregion Public Methods (1)
}

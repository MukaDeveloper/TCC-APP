import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';
import { IPayload } from './interfaces/i-payload';

@Injectable({
  providedIn: 'root',
})
export class PayloadService {
  // #region Properties (2)

  private payloadSubject: BehaviorSubject<IPayload | null>;

  public payload$: Observable<IPayload | null>;

  // #endregion Properties (2)

  // #region Constructors (1)

  constructor() {
    this.payloadSubject = new BehaviorSubject<IPayload | null>(null);
    this.payload$ = this.payloadSubject.asObservable();
  }

  // #endregion Constructors (1)

  // #region Public Getters And Setters (2)

  public get payload(): IPayload | null {
    let payload = this.payloadSubject.value;
    if (!payload) {
      // const token = this.localstorageTokenService.val;
      // payload = this.decodeJWT(token);
      this.payloadSubject.next(payload || null);
    }
    return this.payloadSubject.value;
  }

  public set payload(value: IPayload | null) {
    this.payloadSubject.next(value);
  }

  // #endregion Public Getters And Setters (2)

  // #region Public Methods (1)

  public nextPayload(token: string | null): void {
    if (!token) {
      // this.localstorageTokenService.val = '';
      this.payloadSubject.next(null);
      return;
    }
    // this.localstorageTokenService.val = token;
    const payload = this.decodeJWT(token);
    this.payloadSubject.next(payload || null);
  }

  // #endregion Public Methods (1)

  // #region Private Methods (1)

  private decodeJWT(token: string): IPayload | null {
    try {
      const decoded = jwtDecode<IPayload>(token);
      if (decoded) {
        return (decoded as any)?.member as IPayload;
      }
      return null;
    } catch (error) {
      console.error('Erro ao decodificar o JWT', error);
      return null;
    }
  }

  // #endregion Private Methods (1)
}

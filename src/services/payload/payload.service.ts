import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';
import { SessionStorageAuthService } from '../localstorage/auth-session.service';
import { IPayload } from './interfaces/i-payload';
import { LocalStorageAuthService } from '../localstorage/auth-local.service';

@Injectable({
  providedIn: 'root',
})
export class PayloadService {
  // #region Properties (2)

  private payloadSubject: BehaviorSubject<IPayload | null>;

  public payload$: Observable<IPayload | null>;

  // #endregion Properties (2)

  // #region Constructors (1)

  constructor(
    readonly sessionStorageAuthService: SessionStorageAuthService,
    readonly localStorageAuthService: LocalStorageAuthService,
  ) {
    this.payloadSubject = new BehaviorSubject<IPayload | null>(null);
    this.payload$ = this.payloadSubject.asObservable();
  }

  // #endregion Constructors (1)

  // #region Public Getters And Setters (2)

  public get payload(): IPayload | null {
    let payload = this.payloadSubject.value;
    if (!payload) {
      const tokenSession = this.sessionStorageAuthService.val;
      const tokenLocal = this.localStorageAuthService.val;
      if (tokenSession) {
        payload = this.decodeJWT(tokenSession);
        this.payloadSubject.next(payload || null);
        return payload;
      } else if (tokenLocal) {
        payload = this.decodeJWT(tokenLocal);
        this.payloadSubject.next(payload || null);
        return payload;
      }
      return null;
    }
    return this.payloadSubject.value;
  }

  // #endregion Public Getters And Setters (2)

  // #region Public Methods (1)

  public nextPayload(token: string | null): void {
    if (!token) {
      this.sessionStorageAuthService.val = '';
      this.localStorageAuthService.val = '';
      this.payloadSubject.next(null);
      return;
    }
    this.sessionStorageAuthService.val = token;
    const payload = this.decodeJWT(token);
    console.log('[NextPayload]', payload);
    this.payloadSubject.next(payload || null);
  }

  // #endregion Public Methods (1)

  // #region Private Methods (1)

  private decodeJWT(token: string): IPayload | null {
    try {
      const decoded = jwtDecode<IPayload>(token);
      console.log('[DECODE]', decoded);
      if (decoded) {
        return decoded as IPayload;
      }
      return null;
    } catch (error) {
      console.error('Erro ao decodificar o JWT', error);
      return null;
    }
  }

  // #endregion Private Methods (1)
}

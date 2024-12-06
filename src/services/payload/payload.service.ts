import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalStorageAuthService } from '../localstorage/auth-local.service';
import { SessionStorageAuthService } from '../localstorage/auth-session.service';
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

  constructor(
    readonly sessionStorageAuthService: SessionStorageAuthService,
    readonly localStorageAuthService: LocalStorageAuthService
  ) {
    this.payloadSubject = new BehaviorSubject<IPayload | null>(null);
    this.payload$ = this.payloadSubject.asObservable();
  }

  // #endregion Constructors (1)

  // #region Public Getters And Setters (1)

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

  // #endregion Public Getters And Setters (1)

  // #region Public Methods (1)

  public nextPayload(token: string | null): void {
    if (!token) {
      this.sessionStorageAuthService.val = '';
      this.localStorageAuthService.val = '';
      this.payloadSubject.next(null);
      return;
    }
    if (this.localStorageAuthService.val) {
      this.localStorageAuthService.val = token;
    }
    this.sessionStorageAuthService.val = token;
    const payload = this.decodeJWT(token);
    this.payloadSubject.next(payload || null);
  }

  // #endregion Public Methods (1)

  // #region Private Methods (1)

  private decodeJWT(token: string): IPayload | null {
    try {
      const decoded = jwtDecode<any>(token);
      if (decoded) {
        decoded.verified = decoded.verified.toLowerCase() === 'true';
        decoded.active = decoded.active.toLowerCase() === 'true';
        decoded.id = parseInt(decoded.id);
        decoded.institutionId = parseInt(decoded.institutionId);

        if (decoded.exp < Math.floor(Date.now() / 1000)) {
          return null;
        }

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

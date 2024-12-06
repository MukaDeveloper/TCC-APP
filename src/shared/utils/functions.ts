import { Injectable } from '@angular/core';
import { LocalStorageAuthService } from 'src/services/localstorage/auth-local.service';
import { SessionStorageAuthService } from 'src/services/localstorage/auth-session.service';

@Injectable({
  providedIn: 'root',
})
export class Functions {
  constructor(
    private readonly localStorageAuthService: LocalStorageAuthService,
    private readonly sessionStorageAuthService: SessionStorageAuthService
  ) {}

  public getToken(): string {
    const session = this.sessionStorageAuthService.val || '';
    const local = this.localStorageAuthService.val || '';
    return session || local;
  }
}

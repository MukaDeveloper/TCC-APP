import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SessionStorageAuthService } from '../../services/localstorage/auth-session.service';
import { LocalStorageAuthService } from 'src/services/localstorage/auth-local.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  // #region Constructors (1)

  constructor(
    private readonly localStorageAuthService: LocalStorageAuthService,
    private readonly sessionStorageAuthService: SessionStorageAuthService
  ) {}

  // #endregion Constructors (1)

  // #region Public Methods (1)

  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const session = this.sessionStorageAuthService.val || '';
    const local = this.localStorageAuthService.val || '';
    const dupReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${local || session}`),
    });
    return next.handle(dupReq);
  }

  // #endregion Public Methods (1)
}

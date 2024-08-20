import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalStorageAuthService } from '../../services/localstorage/auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  // #region Constructors (1)

  constructor(
    private readonly localStorageAuthService: LocalStorageAuthService
  ) {}

  // #endregion Constructors (1)

  // #region Public Methods (1)

  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const local = this.localStorageAuthService.val;
    const xUser = local ? `Bearer ${local}` : '';
    const dupReq = req.clone({
      headers: req.headers.set('user', xUser),
    });
    return next.handle(dupReq);
  }

  // #endregion Public Methods (1)
}

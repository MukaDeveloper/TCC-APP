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
import { Functions } from '../utils/functions';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  // #region Constructors (1)

  constructor(
    private readonly functions: Functions,
  ) {}

  // #endregion Constructors (1)

  // #region Public Methods (1)

  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.functions.getToken();
    const dupReq = req.clone({
      headers: req.headers
        .set('Authorization', `Bearer ${token}`)
        .set('Access-Control-Allow-Origin', '*'),
    });
    return next.handle(dupReq);
  }

  // #endregion Public Methods (1)
}

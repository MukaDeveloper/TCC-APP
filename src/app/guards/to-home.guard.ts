import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageAuthService } from 'src/services/localstorage/auth-local.service';
import { ERouters } from 'src/shared/utils/e-routers';
import { SessionStorageAuthService } from '../../services/localstorage/auth-session.service';

@Injectable({
  providedIn: 'root',
})
export class PermissionsService {
  // #region Constructors (1)

  constructor(
    private readonly sessionStorageAuthService: SessionStorageAuthService,
    private readonly localStorageAuthService: LocalStorageAuthService,
    private readonly router: Router
  ) {}

  // #endregion Constructors (1)

  // #region Public Methods (1)

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    // console.log('[ToHomeGuard] PermissionsService.canActivate');

    const sessionStorage = this.sessionStorageAuthService.val;
    const localStorage = this.localStorageAuthService.val;

    if (sessionStorage || localStorage) {
      // console.log('[ToHomeGuard] REDIRECT');
      return this.router.createUrlTree([`${ERouters.app}/${ERouters.home}`], {
        queryParams: { redirected: true },
      });
    }
    return true;
  }

  // #endregion Public Methods (1)
}
export const toHomeGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
):
  | boolean
  | UrlTree
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree> =>
  inject(PermissionsService).canActivate(next, state);

import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { SessionStorageAuthService } from '../../services/localstorage/auth-session.service';
import { LocalStorageAuthService } from '../../services/localstorage/auth-local.service';
import { ERouters } from '../../shared/utils/e-routers';

@Injectable({
  providedIn: 'root',
})
export class PermissionsService {
  constructor(
    private readonly sessionStorageAuthService: SessionStorageAuthService,
    private readonly localStorageAuthService: LocalStorageAuthService,
    private readonly router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    // console.log('[TOKENGUARD] PermissionsService.canActivate');

    if (
      !this.localStorageAuthService.val ||
      !this.sessionStorageAuthService.val
    ) {
      // console.log('[TOKENGUARD] BLOCKED => GO TO LOGIN');
      return this.router.createUrlTree([ERouters.login], {
        queryParams: { redirected: true },
      });
    }
    // console.log('[TOKENGUARD] ALLOWED');
    return true;
  }
}
export const tokenGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
):
  | boolean
  | UrlTree
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree> =>
  inject(PermissionsService).canActivate(next, state);

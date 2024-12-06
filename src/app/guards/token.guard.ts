import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageAuthService } from '../../services/localstorage/auth-local.service';
import { SessionStorageAuthService } from '../../services/localstorage/auth-session.service';
import { ERouters } from '../../shared/utils/e-routers';
import { PayloadService } from '../../services/payload/payload.service';

@Injectable({
  providedIn: 'root',
})
export class PermissionsService {
  constructor(
    private readonly sessionStorageAuthService: SessionStorageAuthService,
    private readonly localStorageAuthService: LocalStorageAuthService,
    private readonly payloadService: PayloadService,
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
    // console.log('[CheckinGUARD] PermissionsService.canActivate');

    if (
      !this.localStorageAuthService.val &&
      !this.sessionStorageAuthService.val
    ) {
      // console.log('[CheckinGUARD] BLOCKED => GO TO LOGIN');
      return this.router.createUrlTree([ERouters.login], {
        queryParams: { redirected: true },
      });
    }

    const payload = this.payloadService.payload;
    if (payload?.verified === false) {
      // console.log('[CheckinGUARD] BLOCKED2 => GO TO CONFIRM');
      return this.router.createUrlTree([ERouters.confirm], {
        queryParams: { redirected: true },
      });
    }

    // console.log('[CheckinGUARD] ALLOWED');
    return true;
  }
}
export const checkinGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
):
  | boolean
  | UrlTree
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree> =>
  inject(PermissionsService).canActivate(next, state);

import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ERouters } from 'src/shared/utils/e-routers';
import { PayloadService } from '../../services/payload/payload.service';

@Injectable({
  providedIn: 'root',
})
export class PermissionsService {
  // #region Constructors (1)

  constructor(
    private readonly payloadService: PayloadService,
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
    // // console.log('[PayloadGuard] PermissionsService.canActivate');

    const payload = this.payloadService.payload;

    if (!payload || !payload?.verified) {
      // // console.log('[PayloadGuard] BLOCKED => REDIRECT');
      return this.router.createUrlTree([ERouters.login], {
        queryParams: { redirected: true },
      });
    }

    const institutionId = payload.institutionId;
    if (!institutionId) {
      // console.log('[PayloadGuard] BLOCKED2 => GO TO CHECKIN');
      return this.router.createUrlTree([ERouters.checkin], {
        queryParams: { redirected: true },
      });
    }
    // // console.log('[PayloadGuard] ALLOWED');
    return true;
  }

  // #endregion Public Methods (1)
}
export const payloadGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
):
  | boolean
  | UrlTree
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree> =>
  inject(PermissionsService).canActivate(next, state);

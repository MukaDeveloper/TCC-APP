import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { RoutersEnum } from 'src/shared/utils/routers-enum';
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
    console.log('[PayloadGuard] PermissionsService.canActivate');

    const payload = this.payloadService.payload;

    console.log('[PayloadGuard] Payload =>', payload);
    if (!payload) {
      console.log('[PayloadGuard] BLOCKED => REDIRECT');
      return this.router.createUrlTree([RoutersEnum.login], {
        queryParams: { redirected: true },
      });
    }
    console.log('[PayloadGuard] ALLOWED');
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

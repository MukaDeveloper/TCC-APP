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
    console.log('[InstitutionGuard] PermissionsService.canActivate');

    const payload = this.payloadService.payload;

    if (!payload?.institutionId) {
      console.log('[InstitutionGuard] BLOCKED => REDIRECT');
      return this.router.createUrlTree([RoutersEnum.checkin], {
        queryParams: { redirected: true },
      });
    }
    console.log('[InstitutionGuard] ALLOWED');
    return true;
  }

  // #endregion Public Methods (1)
}
export const institutionGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
):
  | boolean
  | UrlTree
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree> =>
  inject(PermissionsService).canActivate(next, state);

import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { InstitutionService } from '../../services/instution/intitution.service';
import { ERouters } from '../../shared/utils/e-routers';

@Injectable({
  providedIn: 'root',
})
export class PermissionsService {
  // #region Constructors (1)

  constructor(
    public institutionService: InstitutionService,
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
    // console.log('[InstitutionGuard] PermissionsService.canActivate');
    const institution = this.institutionService.institution;
    if (institution) {
      // console.log('[InstitutionGuard] PASS => GO TO ROUTE');
      return true;
    } else {
      this.institutionService.getCurrent().subscribe({
        next: (_) => this.router.navigate([ERouters.home]),
        error: (_) => this.router.navigate([ERouters.login]),
      });
      return false;
    }
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

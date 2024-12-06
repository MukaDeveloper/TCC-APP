import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PayloadService } from 'src/services/payload/payload.service';
import { ERouters } from 'src/shared/utils/e-routers';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  // #region Properties (1)

  public isLoading = true;

  // #endregion Properties (1)

  // #region Constructors (1)

  constructor(
    private readonly payloadService: PayloadService,
    private readonly router: Router
  ) {}

  // #endregion Constructors (1)

  // #region Public Methods (2)

  public ngOnInit() {
    this.isLoading = false;
  }

  public onLogout() {
    this.payloadService.nextPayload(null);
    this.router.navigate([ERouters.login], {
      replaceUrl: true,
      queryParams: { redirected: true },
    });
  }

  // #endregion Public Methods (2)
}

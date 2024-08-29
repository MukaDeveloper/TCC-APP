import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PayloadService } from '../../services/payload/payload.service';
import { RoutersEnum } from '../../shared/utils/routers-enum';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.page.html',
  styleUrls: ['./layout.page.scss'],
})
export class LayoutPage implements OnInit {
  // #region Properties (1)

  public isLoading = true;
  public isMenuOpen = false;

  // #endregion Properties (1)

  // #region Constructors (1)

  constructor(
    
    private readonly payloadService: PayloadService,

    private router: Router,
  ) {}

  // #endregion Constructors (1)

  // #region Public Methods (1)

  onSplitPaneVisible(event: any) {
    this.isMenuOpen = event.detail.visible;
  }

  public ngOnInit() {
    this.isLoading = false;
  }

  public onLogout() {
    this.payloadService.nextPayload(null);
    this.router.navigate([RoutersEnum.login], {
      queryParams: { redirected: true },
    });
  }

  // #endregion Public Methods (1)
}

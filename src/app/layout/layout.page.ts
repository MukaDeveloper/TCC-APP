import { Component, OnInit } from '@angular/core';

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

  constructor() {}

  // #endregion Constructors (1)

  // #region Public Methods (1)

  onSplitPaneVisible(event: any) {
    this.isMenuOpen = event.detail.visible;
  }

  public ngOnInit() {
    this.isLoading = false;
  }

  // #endregion Public Methods (1)
}

import { Component, OnInit } from '@angular/core';

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

  constructor() {}

  // #endregion Constructors (1)

  // #region Public Methods (1)

  public ngOnInit() {
    this.isLoading = false;
  }

  // #endregion Public Methods (1)
}

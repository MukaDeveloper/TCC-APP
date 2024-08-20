import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
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

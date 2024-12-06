import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  // #region Properties (1)

  public menuItems$: BehaviorSubject<any[]> = new BehaviorSubject<any>([]);

  // #endregion Properties (1)

  // #region Constructors (1)

  constructor() {}

  // #endregion Constructors (1)

  // #region Public Methods (1)

  public addMenu(
    items: Array<{
      text: string;
      heading?: boolean;
      link?: string;
      elink?: string;
      target?: string;
      icon?: string;
      alert?: string;
      submenu?: Array<any>;
    }>
  ): void {
    this.menuItems$.next([]);
    items.forEach((item) => {
      this.menuItems$.value.push(item);
    });
  }

  // #endregion Public Methods (1)
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  public menuItems$: BehaviorSubject<any[]> = new BehaviorSubject<any>([]);

  constructor() {}

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
}

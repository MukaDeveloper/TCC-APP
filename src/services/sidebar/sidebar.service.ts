import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IMenu } from './interfaces/i-menus';

@Injectable({
    providedIn: 'root'
})
export class SidebarService {
    // public menuItems$: BehaviorSubject<[]> = new BehaviorSubject([]);

    constructor() { }
}

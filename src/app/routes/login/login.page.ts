import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/shared/utils/base.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage extends BaseComponent implements OnInit {

  public isBusy: boolean = false;

  constructor(
    private router: Router,
  ) {
    super();
  }

  ngOnInit() {
  }

  public goToRegister() {

  }

}

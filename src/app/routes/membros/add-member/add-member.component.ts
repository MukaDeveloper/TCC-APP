import { Component, OnInit, ViewChild } from '@angular/core';
import {
  AlertController,
  IonModal,
  IonSearchbar,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import { BaseComponent } from '../../../../shared/utils/base.component';
import { FormGroup } from '@angular/forms';
import { ERouters } from '../../../../shared/utils/e-routers';
import { UsersService } from '../../../../services/users/users.service';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.scss'],
})
export class AddMemberComponent extends BaseComponent implements OnInit {
  // #region Properties (8)

  public defaultURL = ERouters.home;
  public formGroup: FormGroup | null = null;
  public isLoading: boolean = false;
  public members: any[] = [];
  @ViewChild(IonModal) public modal!: IonModal;
  public search: string = '';
  @ViewChild(IonSearchbar) public searchbar!: IonSearchbar;
  public selectedMember: any;

  // #endregion Properties (8)

  // #region Constructors (1)

  constructor(
    private readonly usersService: UsersService,
    toastController: ToastController,
    alertController: AlertController,
    loadingController: LoadingController
  ) {
    super(toastController, alertController, loadingController);
  }

  // #endregion Constructors (1)

  // #region Public Methods (3)

  public ngOnInit() {}

  public onSearch() {
    this.isLoading = true;
    if (!this.search) {
      this.selectedMember = null;
      this.members = [];
      setTimeout(() => {
        this.searchbar.setFocus();
      }, 100);
      return;
    }

    if (this.search.includes('@.')) {
      this.searchByEmail(this.search);
      return;
    }

    this.searchByName(this.search);
    return;
  }

  public onSubmit() {}

  // #endregion Public Methods (3)

  // #region Private Methods (2)

  private searchByEmail(query: string) {
    this.isLoading = true;
    this.usersService.searchByEmail(query).subscribe({
      next: (res) => {
        this.isLoading = false;
        setTimeout(() => {
          this.searchbar.setFocus();
        }, 100);
        this.members = res.items;
      },
      error: (err) => {
        console.log('[MMAERR]', err);
        this.alert(err?.message, 'Atenção!');
        this.isLoading = false;
      },
    });
  }

  private searchByName(query: string) {
    this.isLoading = true;
    this.usersService.searchByName(query).subscribe({
      next: (res) => {
        this.isLoading = false;
        setTimeout(() => {
          this.searchbar.setFocus();
        }, 100);
        this.members = res.items;
      },
      error: (err) => {
        console.log('[MMAERR]', err);
        this.alert(err?.message, 'Atenção!');
        this.isLoading = false;
      },
    });
  }

  // #endregion Private Methods (2)
}

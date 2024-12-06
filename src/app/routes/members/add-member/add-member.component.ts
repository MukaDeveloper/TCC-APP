import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  AlertController,
  IonModal,
  IonSearchbar,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import { EUserRole } from '../../../../services/payload/interfaces/enum/EUserRole';
import { IPayload } from '../../../../services/payload/interfaces/i-payload';
import { AddUserInstitutionDto } from '../../../../services/users/dto/add-user-institution.dto';
import { IMember } from '../../../../services/users/interfaces/i-member';
import { UsersService } from '../../../../services/users/users.service';
import { BaseComponent } from '../../../../shared/utils/base.component';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.scss'],
})
export class AddMemberComponent extends BaseComponent implements OnInit {
  // #region Properties (8)

  @Input() public payload: IPayload | null = null;
  public formGroup: FormGroup | null = null;
  public isLoading: boolean = false;
  public members: IMember[] = [];
  public eCoordinator = EUserRole.COORDINATOR;
  public eSupport = EUserRole.SUPPORT;
  @ViewChild(IonModal) public modal!: IonModal;
  public search: string = '';
  @ViewChild(IonSearchbar) public searchbar!: IonSearchbar;
  public selectedMember: IMember | null = null;

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

  public ngOnInit() {
    this.search = '';
    this.selectedMember = null;
  }

  public onDismiss() {
    this.search = '';
    this.selectedMember = null;
    this.modal.dismiss();
  }

  public onSearch() {
    if (!this.search) {
      this.selectedMember = null;
      this.members = [];
      setTimeout(() => {
        this.searchbar.setFocus();
      }, 500);
      return;
    }
    this.isLoading = true;
    this.usersService.search(this.search).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.members = res.items;
        setTimeout(() => {
          this.searchbar.setFocus();
        }, 100);
      },
      error: (err) => {
        // console.log('[MMAERR]', err);
        this.alert(err?.message, 'Atenção!');
        this.isLoading = false;
      },
    });
  }

  public selectMember(member: IMember | null) {
    this.search = '';
    this.members = [];
    if (!member) {
      this.selectedMember = null;
      setTimeout(() => {
        this.searchbar.setFocus();
      }, 200);
      return;
    }
    this.selectedMember = member;
    this.onCreateForm();
  }

  public onSubmit() {
    if (!this.selectedMember) {
      this.alert('Um usuário precisa ser selecionado.', 'Atenção!');
      return;
    }
    if (!this.formGroup?.valid) {
      this.alert('Preencha todos os campos obrigatórios.', 'Atenção!');
      return;
    }
    this.isLoading = true;
    const data = this.formGroup?.value as AddUserInstitutionDto;
    // console.log('[ADD USER DATA] =>', data);
    this.usersService.addInstitutionMember(data).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.onDismiss();
        if (res.item) {
          this.toast('Membro adicionado com sucesso!', 'Atenção!', 'success');
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.toast(error?.message, 'Atenção!', 'danger');
        console.error(error);
      },
    });
  }

  // #endregion Public Methods (3)

  // #region Private Methods (2)

  private onCreateForm() {
    this.formGroup = new FormGroup({
      userId: new FormControl(this.selectedMember?.id, [Validators.required]),
      institutionId: new FormControl(this.payload?.institutionId, [
        Validators.required,
      ]),
      userRole: new FormControl(EUserRole.USER, [Validators.required]),
    });
  }

  // #endregion Private Methods (2)
}

import {
  Component,
  effect,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { BaseComponent } from '../../../../shared/utils/base.component';
import {
  ToastController,
  AlertController,
  LoadingController,
  IonModal,
} from '@ionic/angular';
import { ICart } from '../../../../services/cart/interfaces/i-cart';
import { CartService } from '../../../../services/cart/cart.service';
import { Router } from '@angular/router';
import { ERouters } from 'src/shared/utils/e-routers';
import { ICartItems } from 'src/services/cart/interfaces/i-cart-items';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { SolicitationsService } from 'src/services/solicitations/solicitations.service';
import { NewSolicitationDto } from 'src/services/solicitations/dto/new-solicitation.dto';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-modal-cart',
  templateUrl: './modal-cart.component.html',
  styleUrls: ['./modal-cart.component.scss'],
})
export class ModalCartComponent extends BaseComponent implements OnInit {
  @ViewChild(IonModal) public modal!: IonModal;
  public isLoading = true;
  public cart: ICart | null = null;
  public mobileView = false;
  public formGroup: FormGroup | null = null;

  constructor(
    private readonly solicitationsService: SolicitationsService,
    private readonly cartService: CartService,
    private router: Router,
    toastController: ToastController,
    alertController: AlertController,
    loadingController: LoadingController
  ) {
    super(toastController, alertController, loadingController);

    effect(() => {
      this.cart = this.cartService.cart;
    });
    this.onResize();
  }

  public get items(): FormArray {
    return this.formGroup?.get('items') as FormArray;
  }

  @HostListener('window:resize', [])
  onResize() {
    this.mobileView = window.innerWidth < 768;
  }

  ngOnInit() {}

  public onOpenModal() {
    this.createForm();
    this.modal.present();
  }

  public GoToMaterials() {
    this.modal.dismiss();
    // console.log('this url', this.router.url);
    if (this.router.url !== `/${ERouters.app}/${ERouters.materials}`) {
      this.router.navigate([`${ERouters.app}/${ERouters.materials}`]);
    }
  }

  onDateChange(event: any) {
    const selected = event.detail.value; // Valor selecionado no ion-datetime
    const selectedDate = new Date(selected); // Formata para ISO 8601
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Zera as horas para comparar apenas a data

    if (isNaN(selectedDate.getTime()) || selectedDate < today) {
      this.toast('A data selecionada é inválida.', 'Atenção!', 'danger', 'top');
      return;
    }

    if (this.cartService.cart) {
      this.cartService.cart.expectReturnAt = selectedDate.toISOString(); // Atualiza o valor no carrinho
    }
    this.formGroup?.get('expectReturnAt')?.setValue(selectedDate.toISOString()); // Atualiza o valor no formulário
  }

  public async onIncrementItem(item: ICartItems, index: number) {
    if (!this.cart?.items.length) {
      this.modal.dismiss();
      return;
    }

    if (index > -1) {
      item.quantity++;
      if (item.quantity >= item.quantityAvailable) {
        item.quantity = item.quantityAvailable;
      }
      if (this.cartService.cart) {
        this.cartService.cart.items[index] = item;
      }
      this.items.controls[index].get('quantity')?.setValue(item.quantity);
    }
  }

  public onDecrementItem(item: ICartItems, index: number) {
    if (!this.cart?.items.length) {
      this.modal.dismiss();
      return;
    }

    if (index > -1) {
      item.quantity--;
      if (item.quantity <= 0) {
        if (this.cartService.cart) {
          this.cartService.cart.items.splice(index, 1);
        }
        this.items.removeAt(index);
      } else {
        if (this.cartService.cart) {
          this.cartService.cart.items[index] = item;
        }
        this.items.controls[index].get('quantity')?.setValue(item.quantity);
      }

      if (!this.cart.items.length) {
        this.modal.dismiss();
      }
    }
  }

  public onSubmit() {
    const obj: NewSolicitationDto = this.formGroup?.value;
    this.solicitationsService.create(obj).subscribe({
      next: (res) => {
        this.toast(
          'Solicitação criada com sucesso!',
          'Sucesso',
          `success`,
          `bottom`
        );
        this.clearCart();
        this.modal.dismiss();
      },
      error: (error) => {
        this.alert(error?.message, 'Atenção!');
        console.error(error);
      },
    });
  }

  public clearCart() {
    this.cart = null;
    this.cartService.cart = null;
    this.modal.dismiss();
  }

  private createForm() {
    const defaultDate = new Date();
    defaultDate.setDate(defaultDate.getDate() + 7);
    this.formGroup = new FormGroup({
      description: new FormControl(this.cart?.description || ''),
      items: new FormArray([]),
      expectReturnAt: new FormControl(
        this.cart?.expectReturnAt || defaultDate.toISOString()
      ),
    });

    this.formGroup
      .get('description')
      ?.valueChanges.pipe(debounceTime(1000)) // Aguarda 1 segundo
      .subscribe((value) => {
        if (this.cartService.cart) {
          this.cartService.cart.description = value; // Atualiza o cart
        }
      });

    this.patchItems();

    this.isLoading = false;
  }

  private patchItems() {
    if (this.cart?.items.length) {
      this.cart.items.forEach((item) => {
        const formGroup = new FormGroup({
          quantity: new FormControl(item.quantity),
          materialId: new FormControl(item.materialId),
        });
        this.items.push(formGroup);
      });
    }
  }
}

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
import { EMaterialStatus } from 'src/services/materials/interfaces/enum/material-status.enum';
import { MaterialsService } from 'src/services/materials/materials.service';
import { ICartItems } from 'src/services/cart/interfaces/i-cart-items';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { SolicitationsService } from 'src/services/solicitations/solicitations.service';
import { NewSolicitationDto } from 'src/services/solicitations/dto/new-solicitation.dto';

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

  public async onIncrementItem(item: ICartItems) {
    if (!this.cart?.items.length) {
      this.modal.dismiss();
      return;
    }

    const materialIndex = this.cart?.items?.findIndex(
      (item) => item.materialId === item.materialId
    );

    if (materialIndex > -1) {
      item.quantity++;
      if (item.quantity >= item.quantityAvailable) {
        item.quantity = item.quantityAvailable;
      }
      this.cart.items[materialIndex] = item;
    }
  }

  public onDecrementItem(item: ICartItems) {
    if (!this.cart?.items.length) {
      this.modal.dismiss();
      return;
    }

    const materialIndex = this.cart?.items?.findIndex(
      (item) => item.materialId === item.materialId
    );

    if (materialIndex > -1) {
      item.quantity--;
      if (item.quantity <= 0) {
        this.cart.items.splice(materialIndex, 1);
      } else {
        this.cart.items[materialIndex] = item;
      }

      if (!this.cart.items.length) {
        this.modal.dismiss();
      }
    }
  }

  public onSubmit() {
    const date = new Date();
    date.setDate(date.getDate() + 7);

    const mock: NewSolicitationDto = {
      description: 'blablabla',
      items: [
        {
          quantity: 3,
          materialId: 1,
        },
      ],
      expectReturnAt: date,
    };

    this.solicitationsService.create(mock).subscribe({
      next: (res) => {
        console.log('Solicitação criada', res);
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
    const date = new Date();
    this.formGroup = new FormGroup({
      description: new FormControl(''),
      items: new FormArray([]),
      expectReturnAt: new FormControl(date.setDate(date.getDate() + 7)),
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

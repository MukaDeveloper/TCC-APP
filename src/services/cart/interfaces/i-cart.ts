import { ICartItems } from "./i-cart-items";

export interface ICart {
  // #region Properties (10)

  userId: number;
  institutionId: number;
  sended: boolean;
  items: ICartItems[];

  // #endregion Properties (10)
}

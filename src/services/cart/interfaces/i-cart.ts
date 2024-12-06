import { ICartItems } from "./i-cart-items";

export interface ICart {
  // #region Properties (10)

  userId: number;
  institutionId: number;
  sended: boolean;
  description: string;
  items: ICartItems[];
  expectReturnAt: string | Date | number ;

  // #endregion Properties (10)
}

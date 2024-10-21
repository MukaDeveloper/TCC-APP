import { ECartItemStatus } from "./enums/cart-item-status.enum";

export interface ICartItems {

  materialId: number;
  quantity: number;
  status: ECartItemStatus;
  quantityAccepted: number;
  quantityDeclined: number;
}

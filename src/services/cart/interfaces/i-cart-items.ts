import { ECartItemStatus } from "./enums/cart-item-status.enum";

export interface ICartItems {

  name: string;
  imageURL: string;
  materialId: number;
  quantity: number;
  status: ECartItemStatus;
  quantityAccepted: number;
  quantityDeclined: number;
}

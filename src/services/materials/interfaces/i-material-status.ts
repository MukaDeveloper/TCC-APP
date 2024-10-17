import { EMaterialStatus } from "./enum/material-status.enum";

export interface IMaterialStatus {
  status: EMaterialStatus;
  quantity: number;
}
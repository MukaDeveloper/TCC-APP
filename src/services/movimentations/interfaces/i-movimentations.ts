import { EMovimentationType } from "./enum/EMovimentationType";

export interface IMovimentations {
  // #region Properties (10)

  areaId: number;
  name: string;
  date: Date;
  description: string;
  id: number;
  institutionId: number;
  materialId: number;
  reason: number;
  type: EMovimentationType;
  userId: number;
  warehouseId: number;
  quantity: number;

  // #endregion Properties (10)
}

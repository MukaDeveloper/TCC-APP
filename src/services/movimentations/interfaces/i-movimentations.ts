import { IArea } from '../../areas/interfaces/i-area';
import { IPayload } from '../../payload/interfaces/i-payload';
import { IWarehouse } from '../../warehouses/interfaces/i-warehouse';
import { EMovimentationType } from './enum/EMovimentationType';

export interface IMovimentations {
  // #region Properties (17)

  area: IArea;
  areaId: number;
  date: Date;
  description: string;
  id: number;
  institutionId: number;
  material: any;
  materialId: number;
  movimentationBy: string;
  name: string;
  quantity: number;
  reason: number;
  type: EMovimentationType;
  user: IPayload;
  userId: number;
  warehouse: IWarehouse;
  warehouseId: number;

  // #endregion Properties (17)
}

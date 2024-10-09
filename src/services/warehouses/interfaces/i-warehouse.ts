import { IMember } from 'src/services/users/interfaces/i-member';
import { IArea } from '../../areas/interfaces/i-area';

export interface IWarehouse {
  id: number;
  active: boolean;

  name: string;
  area: IArea;
  description: string;

  warehousemans?: IMember[];

  areaId: number;
  areaName: string;

  institutionId: number;
  institutionName: string;

  createdAt: Date;
  createdBy: string;
}

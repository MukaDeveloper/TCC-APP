export interface IWarehouse {
  id: number;
  active: boolean;
  name: string;
  description: string;
  areaId: number;
  areaName: string;
  institutionId: number;
  institutionName: string;
  createdAt: Date;
  createdBy: string;
}

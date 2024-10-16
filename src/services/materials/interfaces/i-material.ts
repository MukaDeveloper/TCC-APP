export interface IMaterial {
  active: boolean;
  id: number;
  name: string;
  description: string;
  imageURL: string;
  manufactorer: string;
  recordNumber: number;
  materialType: any;

  quantity: number;
  measure: 'UN' | 'KG' | 'L';

  materialWarehouses: any[];

  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
}

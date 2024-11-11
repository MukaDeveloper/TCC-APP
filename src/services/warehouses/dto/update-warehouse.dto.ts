export class UpdateWarehouseDto {
  public id: number | null = null;
  public name?: string | null = '';
  public description?: string | null = '';
  public areaId: number | null = null;
  public warehousemans: number[] = [];
}
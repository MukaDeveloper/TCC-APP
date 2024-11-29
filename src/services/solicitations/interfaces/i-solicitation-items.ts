import { ESolicitationStatus } from "./enum/solicitation-status.enum";

export interface ISolicitationItens {
  materialId: number,
  materialName: string,
  quantity: number,
  status: ESolicitationStatus
}

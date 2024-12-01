import { ESolicitationStatus } from "./enum/solicitation-status.enum";
import { ISolicitationItens } from "./i-solicitation-items";

export interface ISolicitation {
  id: number,
  description: string,

  items: ISolicitationItens[],

  userId: number,
  institutionId: number,
  userInstitution: any;

  solicitatedAt: Date,
  expectReturnAt: Date,
  status: ESolicitationStatus
}

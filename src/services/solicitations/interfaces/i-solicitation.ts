import { ESolicitationStatus } from "./enum/solicitation-status.enum";
import { ISolicitationItens } from "./i-solicitation-items";

export interface ISolicitation {
  id: number,
  description: string,

  items: ISolicitationItens[],

  userId: number,
  institutionId: number,
  userInstitution: any;

  status: ESolicitationStatus

  solicitedAt: Date,
  expectReturnAt: Date,

  approvedAt: Date,
  declinedAt: Date,
  borroadAt: Date,
  returnedAt: Date
}

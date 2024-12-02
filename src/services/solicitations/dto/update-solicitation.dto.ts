import { ESolicitationStatus } from "../interfaces/enum/solicitation-status.enum";

export class UpdateSolicitationDto
{
    public id: number = 0;
    public status: ESolicitationStatus = ESolicitationStatus.WAITING;
    public movimentedAt: string | Date | number = new Date();
}

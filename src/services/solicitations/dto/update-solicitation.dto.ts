import { ESolicitationStatus } from "../interfaces/enum/solicitation-status.enum";
import { SolicitationMaterialsDto } from "./solicitation-materials.dto";

export class UpdateSolicitationDto
{
    public id: number = 0;
    public items: SolicitationMaterialsDto[] = [];
    public status: ESolicitationStatus = ESolicitationStatus.WAITING;
    public movimentedAt: string | Date | number = new Date();
}

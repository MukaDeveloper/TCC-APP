import { SolicitationMaterialsDto } from "./solicitation-materials.dto";

export class NewSolicitationDto
{
    public description: string = '';
    public items: SolicitationMaterialsDto[] = [];
    public expectReturnAt: string | Date | number = new Date();
}


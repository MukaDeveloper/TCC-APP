export class NewSolicitationDto
{
    public description: string = '';
    public items: SolicitationMaterialsDto[] = [];
    public expectReturnAt: Date = new Date();
}

export class SolicitationMaterialsDto
{
    public quantity: number = 0;
    public materialId: number = 0;
}

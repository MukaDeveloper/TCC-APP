import { EUserRole } from "../../payload/interfaces/enum/EUserRole";

export class AddUserInstitutionDto {
  public userId: string = '';
  public institutionId!: number;
  public role: EUserRole = EUserRole.USER;
}

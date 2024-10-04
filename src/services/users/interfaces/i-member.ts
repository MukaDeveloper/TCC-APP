import { EUserRole } from "../../payload/interfaces/enum/EUserRole";

export interface IMember {
  id: string;
  name: string;
  email: string;
  photoUrl: string;
  role: EUserRole;
}

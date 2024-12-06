import { EUserRole } from "../../payload/interfaces/enum/EUserRole";

export interface IMember {
  id: number;
  name: string;
  email: string;
  photoUrl: string;
  role: EUserRole;
  verified: boolean;
}

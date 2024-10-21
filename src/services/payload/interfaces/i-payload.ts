import { EUserRole } from "./enum/EUserRole";

export interface IPayload {
  active: boolean;
  id: number;
  name: string;
  email: string;
  photoUrl: string;
  institutionId: number;
  role: EUserRole;
  verified: boolean;
}

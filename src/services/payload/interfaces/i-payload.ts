import { EUserRole } from "./enum/EUserRole";

export interface IPayload {
  id: number;
  name: string;
  email: string;
  photoUrl: string;
  institutionId: number;
  role: EUserRole;
}

import { EUserRole } from "./enum/EUserRole";

export interface IPayload {
  active: boolean;
  id: number;
  name: string;
  email: string;
  photoUrl: string | null;
  institutionId: number | null;
  role: EUserRole | null;

  verified: boolean;
  verifiedScheduled: Date;
}

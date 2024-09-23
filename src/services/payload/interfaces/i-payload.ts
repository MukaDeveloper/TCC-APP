export interface IPayload {
  id: string;
  name: string;
  email: string;
  photoUrl: string;
  institutionId: number;
  role: 'USER' | 'WAREHOUSEMAN' | 'COORDINATOR' | 'SUPPORT';
}

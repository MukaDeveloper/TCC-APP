import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

export class ApiBaseService {
  protected apiUrl = `${environment.apiUrl}`
  constructor(protected http: HttpClient) {}
}

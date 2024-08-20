import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

export class HandleError {
  static handler(error: HttpErrorResponse | any) {
    return throwError(HandleError.makeErrorModel(error));
  }
  static makeErrorModel(error: HttpErrorResponse | any) {
    console.log(error);
    let errorModel: { message: string; status: number };
    if (error instanceof HttpErrorResponse) {
      errorModel = {
        message: error.error.message,
        status: error.status,
      };
    } else {
      errorModel = {
        message: error.message || error.toString(),
        status: error.status || 0,
      };
    }
    return errorModel;
  }
}

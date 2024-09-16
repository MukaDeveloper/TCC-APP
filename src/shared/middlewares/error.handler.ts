import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

export class HandleError {
  // #region Public Static Methods (2)

  public static handler(error: HttpErrorResponse | any) {
    return throwError(HandleError.makeErrorModel(error));
  }

  public static makeErrorModel(error: HttpErrorResponse | any) {
    console.log('Error:', error);
  
    let errorModel: { message: string; status: number };
  
    if (error instanceof HttpErrorResponse) {
      // Verifique se 'error.error' contém o objeto esperado
      const message = error.error?.message || 'Ocorreu um erro inesperado.';
      
      errorModel = {
        message: message,
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

  // #endregion Public Static Methods (2)
}

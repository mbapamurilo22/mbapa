import { 
  HttpErrorResponse,
  HttpHeaders, 
} from '@angular/common/http';
import { throwError } from 'rxjs';
 
export class ApiService {
  baseUri: string = 'http://localhost:4000';
  headers = new HttpHeaders().set('Content-Type', 'application/json'); 

  
  // Error handling
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}

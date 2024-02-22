import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private dialogRef: MatDialog, private router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);

        let errorMsg = {};
        if (error.error instanceof ErrorEvent) {
          errorMsg = `Error: ${error.error.message}`;
        } else {
          if (
            error.status === 403 &&
            error.error.message == ' session expired please login again'
          ) {
            localStorage.setItem('sessionExpired', JSON.stringify(true));

            localStorage.clear();
            this.router.navigate(['/login']);
            this.dialogRef.closeAll();
          } else if (
            error.status === 403 &&
            error.error.message !== ' session expired please login again'
          ) {
            this.dialogRef.closeAll();
          } else if (error.status === 503) {
            // Handle 503 Service Unavailable error
          } else if (error.status === 500) {
            // Handle 500 Internal Server Error
          } else if (
            error.status === 401 &&
            error.error.message.includes('Invalid credentials')
          ) {
            localStorage.setItem('sessionExpired', JSON.stringify(true));
            this.router.navigate(['/login']);
            localStorage.clear();
            this.dialogRef.closeAll();
          } else if (error.status === 400) {
            // Handle 400 Bad Request error
          } else if (error.status === 404) {
            // Handle 404 Not Found error
          }
          errorMsg = { err: error.status, message: error.error.message };
        }
        return throwError(errorMsg);
      })
    );
  }
}

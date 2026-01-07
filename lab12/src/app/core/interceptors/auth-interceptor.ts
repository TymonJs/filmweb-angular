import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService);
  const router = inject(Router);
  const token = authService.getToken();

  const newReq = req.clone({
    setHeaders: { Authorization: `Bearer ${token}` }
  })
  
  return next(newReq).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status == 404) router.navigate(["login"]);
      return throwError(() => err)
    })
  );
};

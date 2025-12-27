import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { catchError, map, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  const authRoutes = ['/login', '/register'];
  const isAuthRoute = authRoutes.includes(state.url);
  
  return userService.verifyToken().pipe(
    map(user => {
      if (user) {
        if (isAuthRoute) return router.createUrlTree(["/"])
        return true;
      } else {
        if (isAuthRoute) return true
        return router.createUrlTree(['login']); 
      }
    }),
    catchError(() => {
      userService.removeToken();
      return of(isAuthRoute? true: router.createUrlTree(['login']));
    })
  );
    
};

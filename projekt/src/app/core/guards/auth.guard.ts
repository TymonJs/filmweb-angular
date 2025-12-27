import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { catchError, map, of } from 'rxjs';

export const authGuard: CanActivateFn = () => { //route, state
  const userService = inject(UserService);
  const router = inject(Router);
  
  return userService.verifyToken().pipe(
    map(user => {
      if (user) {
        return true;
      } else {
        return router.createUrlTree(['login']); 
      }
    }),
    catchError(() => {
      userService.removeToken();
      return of(router.createUrlTree(['login']));
    })
  );
    
};

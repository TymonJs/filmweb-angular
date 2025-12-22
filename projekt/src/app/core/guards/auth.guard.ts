import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { catchError, map, of } from 'rxjs';

export const authGuard: CanActivateFn = () => { //route, state
  const userService = inject(UserService);
  const router = inject(Router);

  if (userService.user$.value !== null) return of(true);
  
  return userService.verifyToken().pipe(
    map(() => true),
    catchError(() => {
      localStorage.removeItem("access_token")
      router.navigate(["login"]);
      return of(false)
    })
  )
    
};

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../../services/user.service';

export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);

  console.log("guard: ", route, state);
  
  const token = userService.getToken();

  if (!token){
    const router = inject(Router);
    return router.navigate(["register"])
  }

  

  return true
    
};

import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {

    // Inject references needed by the guard.
    let authenticationService = inject(AuthenticationService);
    let router = inject(Router);
    
    if (authenticationService.authenticationToken) {
      // There is a token present, so the user is logged in.
      return true;
    }
    else {
      // There is no token, so redirect the user to the login page.
      router.navigate(['/login']);
      return false;
    }

};

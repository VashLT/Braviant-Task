import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { FULL_ROUTES } from '@consts/routes';
import { AuthStore } from '@stores/auth.store';

/**
 * Basic Auth Guard
 * This guard checks if the user is authenticated.
 * If the user is authenticated, it allows access to the route.
 * If the user is not authenticated, it redirects to the login page.
 * @returns CanActivateFn
 */
export const authGuard: CanActivateFn = () => {
  const authStore = inject(AuthStore);
  const router = inject(Router);
  console.log('Auth Guard triggered', authStore.isAuthenticated());
  if (authStore.isAuthenticated()) {
    return true;
  }

  // Redirect to login page if not authenticated
  return router.parseUrl(FULL_ROUTES.login);
};

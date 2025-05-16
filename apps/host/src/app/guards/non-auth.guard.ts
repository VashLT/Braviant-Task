import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { FULL_ROUTES } from '@consts/routes';
import { AuthStore } from '@stores/auth.store';

/**
 * Non-Auth Guard
 * This guard prevents authenticated users from accessing routes like login.
 * If the user is NOT authenticated, it allows access to the route.
 * If the user is authenticated, it redirects to the home page.
 * @returns CanActivateFn
 */
export const nonAuthGuard: CanActivateFn = () => {
  const authStore = inject(AuthStore);
  const router = inject(Router);
  console.log('Non-Auth Guard triggered', authStore.isAuthenticated());

  if (!authStore.isAuthenticated()) {
    return true; // Not authenticated, allow access to login
  }

  // Redirect to home page if already authenticated
  return router.parseUrl(FULL_ROUTES.home);
};

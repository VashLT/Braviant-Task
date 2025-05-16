import { Route } from '@angular/router';
import { HomePage } from './pages/home/home.page';
import { authGuard } from './guards/auth.guard';
import { ROUTES } from '@consts/routes';
import { nonAuthGuard } from './guards/non-auth.guard';

export const appRoutes: Route[] = [
  {
    path: ROUTES.login,
    loadChildren: () => import('login/Routes').then((m) => m.remoteRoutes),
    canActivate: [nonAuthGuard]
  },
  {
    path: ROUTES.home,
    component: HomePage,
    canActivate: [authGuard]
  },
];

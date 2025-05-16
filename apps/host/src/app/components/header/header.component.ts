import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';


@Component({
  selector: 'app-header',
  imports: [RouterLink, MatToolbarModule, MatIcon, RouterLinkActive],
  template: `
  <mat-toolbar color="primary" class="app-toolbar">
    <div class="logo-container">
      <mat-icon class="logo-icon">layers</mat-icon>
      <h3 class="mat-subheading-2">Braviant Test</h3>
    </div>

    <div class="nav-links">
      <a
        mat-button
        routerLink="/"
        routerLinkActive="active-link"
        [routerLinkActiveOptions]="{exact: true}"
        class="nav-link mat-body-strong"
      >
        Home
      </a>
      <a
        mat-button
        color="primary"
        routerLink="login"
        routerLinkActive="active-link"
        class="nav-link mat-body-strong"
      >
        Login
      </a>
    </div>
  </mat-toolbar>
  `,
  styles: `
    mat-toolbar {
      display: flex;
      justify-content: space-between;
      padding: 0 1rem;
      height: 4rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .logo-container {
      display: flex;
      align-items: center;
    }

    .logo-icon {
      margin-right: 8px;
      font-size: 24px;
      height: 24px;
      width: 24px;
    }

    .nav-links {
      display: flex;
      align-items: center;
      gap: 2rem;
      padding: 0 1rem;
    }

    .nav-link {
      display: flex;
      align-items: center;
      text-decoration: none;
      transition: color 250ms;
      color: var(--mat-sys-on-surface);
      &:hover {
        color: var(--mat-sys-secondary);
      }
    }

    .nav-link mat-icon {
      margin-right: 4px;
    }

    .active-link {
      color: var(--mat-sys-primary);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent { }

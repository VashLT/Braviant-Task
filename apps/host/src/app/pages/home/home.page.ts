import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { FULL_ROUTES } from '@consts/routes';
import { AuthStore } from '@stores/auth.store';

@Component({
  selector: 'app-home',
  imports: [MatCardModule, MatIcon, MatButton],
  template: `
  <mat-card class="welcome-card">
    <mat-card-header>
      <div mat-card-avatar class="user-avatar">
        👋
      </div>
      <mat-card-title class="mat-title-large">Welcome, {{ $name() }}</mat-card-title>
      <mat-card-subtitle>You've successfully logged in</mat-card-subtitle>
    </mat-card-header>

    <mat-card-content>
      <p class="welcome-message mat-body-medium">
        This is a secure area that can only be accessed by <strong>authenticated users</strong>. Feel free to play around in the
        site. If you want to log out, just click the button below.
        <br /><br/>

        Additionally, <strong>thank you for the opportunity</strong> to
        showcase my skills. I hope you find this demo useful and informative.
      </p>
    </mat-card-content>

    <mat-card-actions>
      <button mat-button color="primary" (click)="logout()">
        <mat-icon>exit_to_app</mat-icon>
        Logout
      </button>
    </mat-card-actions>
  </mat-card>
  `,
  styleUrl: './home.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  readonly authStore = inject(AuthStore);
  private readonly router = inject(Router);
  $user = this.authStore.user;
  /**
   * Computed property to get the user's name.
   * If something goes wrong, it returns 'Guest'.
   * If the user has both first and last names, it returns them concatenated.
   */
  $name = computed(() => {
    const user = this.$user();
    if (!user) return 'Guest';
    const { firstName, lastName, username } = user;
    return firstName && lastName ? `${firstName} ${lastName}` : username;
  });
  $isAuthenticated = this.authStore.isAuthenticated;
  /**
   * Event handler for logout button click.
   * Navigates to the login page and calls the logout method from the auth store.
   */
  logout() {
    this.router.navigateByUrl(FULL_ROUTES.login);
    this.authStore.logout();
  }
}

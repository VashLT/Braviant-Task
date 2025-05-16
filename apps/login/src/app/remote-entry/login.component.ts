import { Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { passwordValidator } from '@validators/password.validator';
import { map, startWith } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthStore } from '@stores/auth.store';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { LoginCredentials } from '@models/login.model';
import { Router } from '@angular/router';
import { FULL_ROUTES } from '@consts/routes';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { SnackbarService } from '@services/snackbar/snackbar.service';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatProgressSpinner,
    MatTooltipModule,
  ],
  selector: 'app-login-entry',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  readonly authStore = inject(AuthStore);
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly snackbar = inject(SnackbarService);
  private readonly destroyRef = inject(DestroyRef);
  form = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, passwordValidator()]],
  });
  /**
   * A signal with validity of the form.
   * It uses the `statusChanges` observable of the form to emit the current status.
   */
  $formIsValid = toSignal(this.form.statusChanges.pipe(
    startWith(this.form.valid),
    map((status) => status === 'VALID')
  ));
  /**
   * Indicates whether the password is hidden or not.
   */
  $hidePassword = signal(true);
  /**
   * A signal that indicates whether the login button should be disabled or not.
   * It uses the `isLoggingIn` property of the auth store and the form validity.
   */
  $disableLoginButton = computed(() => !this.$formIsValid() || this.authStore.isLoggingIn());
  /**
   * Event trigger when the user clicks on the login button.
   * It checks if the form is valid and if not, it marks all the fields as touched.
   * If the form is valid, it calls the login method of the auth store with the credentials.
   */
  onLogin() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    const credentials = this.form.value as Required<LoginCredentials>;
    this.authStore.login(credentials).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((res) => {
      if (!res.success) {
        this.snackbar.show({
          message: res.message,
          type: 'error',
          options: {
            verticalPosition: 'top',
            horizontalPosition: 'center',
            duration: 3000,
          },
        });
        return;
      }
      this.router.navigateByUrl(FULL_ROUTES.home);
    });
  }
  /**
   * Event trigger when the user toggle the password visibility.
   */
  onTogglePasswordVisibility() {
    this.$hidePassword.update((prev) => !prev);
  }
}

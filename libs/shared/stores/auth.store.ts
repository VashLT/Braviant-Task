import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { AuthState } from '../models/auth-store.model';
import { computed, DestroyRef, effect, inject } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { LoginCredentials } from '../models/login.model';
import { finalize, tap } from 'rxjs';
import { AUTH_STATE_CHANGE_EVENT, USER_STORAGE_KEY } from '../consts/keys';


const getInitialState = (): AuthState => {
  const userJson = localStorage.getItem(USER_STORAGE_KEY);
  console.log('Initial state', userJson);
  return {
    user: userJson ? JSON.parse(userJson) : null,
    isLoggingIn: false,
  };
};

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState(getInitialState()),
  withComputed((state) => ({
    isAuthenticated: computed(() => !!state.user()),
  })),
  withMethods((
    state
  ) => {
    const authService = inject(AuthService);

    /**
     * Function to update localStorage and dispatch a custom event
     * @param user The user object to be stored in localStorage
     */
    const updateAuthState = (user: AuthState['user']) => {
      if (user) {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(USER_STORAGE_KEY);
      }

      /**
       * Dispatch custom event for cross-microfrontend communication
       */
      if (typeof window !== 'undefined') {
        const event = new CustomEvent(AUTH_STATE_CHANGE_EVENT, {
          detail: { user }
        });
        window.dispatchEvent(event);
      }
    };

    /**
     * Effect to sync state to localStorage whenever user changes
     */
    effect(() => {
      const user = state.user();
      if (user) {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
      } else {
        console.log('removing user');
        localStorage.removeItem(USER_STORAGE_KEY);
      }
    });

    /**
     * Set up a storage event listener to detect changes
     * from other tabs or microfrontends
     */
    if (typeof window !== 'undefined') {
      const destroyRef = inject(DestroyRef);
      const storageEventListener = (event: StorageEvent) => {
        console.log({ event });
        if (event.key === USER_STORAGE_KEY) {
          /**
           * Update local state when storage changes in another tab/microfrontend
           */
          const user = event.newValue ? JSON.parse(event.newValue) : null;
          patchState(state, { user });
        }
      }

      const authStateChangeListener = ((event: CustomEvent) => {
        console.log('Auth state changed event:', event);
        const { user } = event.detail;
        patchState(state, { user });
      }) as EventListener;

      window.addEventListener('storage', storageEventListener);

      /**
       * Listen for custom events (for changes from other microfrontends in same tab)
       */
      window.addEventListener(AUTH_STATE_CHANGE_EVENT, authStateChangeListener);

      destroyRef.onDestroy(() => {
        window.removeEventListener('storage', storageEventListener);
        window.removeEventListener(AUTH_STATE_CHANGE_EVENT, authStateChangeListener);
      });
    }

    return {
      login: (credentials: LoginCredentials) => {
        patchState(state, { isLoggingIn: true });
        return authService.login(credentials).pipe(
          tap((res) => {
            if (!res.success) return;
            /**
             * Update the state with the user data
             * @param res The response from the login API
             */
            patchState(state, { user: res.user });
            /**
             * Update localStorage and dispatch event for other microfrontends
             */
            updateAuthState(res.user);
          }),
          finalize(() => {
            patchState(state, { isLoggingIn: false });
          }),
        );
      },
      logout: () => {
        patchState(state, { user: null });
        console.log('User logged out');
      },
      /**
       * Check if user is coming from localStorage on init
       */
      checkAuthState: () => {
        const userJson = localStorage.getItem(USER_STORAGE_KEY);
        if (userJson && !state.user()) {
          patchState(state, { user: JSON.parse(userJson) });
        }
      }
    }
  })
)

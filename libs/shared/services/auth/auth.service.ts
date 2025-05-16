import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { LOGIN_CREDENTIALS_SCHEMA, LoginCredentials, LoginResponse } from '../../models/login.model';
import { MOCK_USERS } from '../../consts/users';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  /**
   * @param credentials The login credentials provided by the user.
   * @description This method simulates a login process by validating the provided credentials against a mock user database.
   * It returns an observable that emits a LoginResponse object after a short delay.
   * @returns Observable<LoginResponse> An observable that emits the result of the login attempt.
   */
  login(credentials: LoginCredentials): Observable<LoginResponse> {
    /**
     * Simulate a delay to mimic an API call.
     * In a real application, this would be replaced with an actual HTTP request.
     */
    return of(this.validateCredentials(credentials)).pipe(delay(800));
  }
  /**
   * Mock function to validate user credentials.
   * In a real application, this would involve making an API call to a backend service.
   * @param credentials The login credentials provided by the user.
   * @returns Whether the login was successful or not.
   */
  private validateCredentials(credentials: LoginCredentials): LoginResponse {
    /**
     * Simple schema validation using Zod.
     */
    const validationResult = LOGIN_CREDENTIALS_SCHEMA.safeParse(credentials);
    if (validationResult.error) return {
      success: false,
      message: 'Invalid credentials format. Please check your input.'
    }
    /**
     * Simulate a user lookup in a mock database.
     */
    const user = MOCK_USERS.find(u =>
      u.email === credentials.email &&
      u._password === credentials.password
    );

    if (user) {
      return {
        success: true,
        user: MOCK_USERS[0]
      };
    } else {
      return {
        success: false,
        message: 'Invalid email or password. Please try again.'
      };
    }
  }
}

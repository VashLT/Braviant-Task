import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
/**
 * @returns ValidatorFn
 * @description A custom validator function that checks if the password meets certain criteria:
 * - At least one uppercase letter
 * - At least one numeric digit
 * - At least 8 characters long
 */
export const passwordValidator = (): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    const hasUpperCase = /[A-Z]+/.test(value);
    const hasNumeric = /\d+/.test(value);
    const hasMinLength = value.length >= 8;

    const passwordValid = hasUpperCase && hasNumeric && hasMinLength;

    return !passwordValid ? {
      passwordLength: !hasMinLength,
      passwordNumber: !hasNumeric,
      passwordUpperCase: !hasUpperCase,
    } : null;
  };
}

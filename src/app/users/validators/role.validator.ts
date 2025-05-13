import { AbstractControl, ValidationErrors } from '@angular/forms';

export function roleValidator(control: AbstractControl): ValidationErrors | null {
  const validRoles = ['admin', 'user'];
  const value = control.value?.toLowerCase();

  return validRoles.includes(value) ? null : { invalidRole: true };
}

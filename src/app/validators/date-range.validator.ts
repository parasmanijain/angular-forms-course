import {
  AbstractControl,
  FormGroup,
  ValidatorFn,
  ValidationErrors,
} from "@angular/forms";

export function createPromoRangeValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const form = control as FormGroup;

    const startControl = form.get("promoStartAt");
    const endControl = form.get("promoEndAt");

    if (!startControl || !endControl) {
      return null;
    }

    const start: Date = startControl.value;
    const end: Date = endControl.value;

    if (start && end) {
      const isRangeValid = end.getTime() - start.getTime() > 0;

      return isRangeValid ? null : { promoPeriod: true };
    }

    return null;
  };
}

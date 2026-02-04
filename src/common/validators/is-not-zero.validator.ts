import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'isNotZero', async: false })
export class IsNotZeroConstraint implements ValidatorConstraintInterface {
  validate(value: any) {
    return typeof value === 'number' && value > 0;
  }
  defaultMessage() {
    return 'Amount must be a positive number greater than zero';
  }
}

export function IsNotZero(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsNotZeroConstraint,
    });
  };
}
import { isValidPhoneNumber } from 'react-phone-number-input';

export type Validator = (x: any) => boolean;

export default class Validators {
  static validate = (
    value: any,
    validators: ((v: any) => boolean)[],
  ) => validators.some((validator) => !validator(value));

  static isString: Validator = (value: any) => typeof value === 'string';

  static isObject: Validator = (value: any) => typeof value === 'object';

  static isArray: Validator = (value: any) => Array.isArray(value);

  // eslint-disable-next-line no-control-regex
  static isEmail: Validator = (value: string) => /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)])/.test(value);

  static isNotEmpty: Validator = (value: any) => (
    (Validators.isArray(value) || Validators.isString(value)) && value?.length > 0
  );

  static isPhoneNumber: Validator = (value: string) => isValidPhoneNumber(value);
}

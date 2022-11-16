export interface FormStep {
  title: string;
  fields: FormField[];
}

export interface FormField {
  type: 'text' | 'email' | 'number' | 'date' | 'radio' | 'textarea' | 'select';
  name: string;
  label?: string;
  required?: boolean;
  placeholder?: string;
  description?: string;
  value?: FormValue;
  options?: FormOption[];
}

export type FormValue = number | string | boolean;

export interface FormOption {
  label: string;
  value: string;
}

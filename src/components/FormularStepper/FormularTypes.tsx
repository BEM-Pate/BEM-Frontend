export interface FormStep {
  title: string;
  fields: FormField[];
}

export interface FormField {
  type: 'text' | 'number' | 'date' | 'radio' | 'textarea';
  name: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  description?: string;
  value?: FormValue;
}

export type FormValue = number | string | boolean;

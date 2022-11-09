export interface FormStep {
  title: string;
  fields: FormField[];
}

export interface FormField {
  type: 'text' | 'number' | 'date';
  name: string;
  value?: number | string | boolean;
}

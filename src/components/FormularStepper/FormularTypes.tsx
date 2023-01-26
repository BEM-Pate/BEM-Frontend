export interface FormControl {
  id: string;
  name?: string;
  disabled?: boolean;
  onChange?: (e: any) => void;
  onBlur?: (e: any) => void;
  label?: string;
  required?: boolean;
  defaultValue?: any;
}

export interface FormOption {
  label: string;
  value: string;
  icon?: string;
}

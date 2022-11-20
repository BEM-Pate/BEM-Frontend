import React from 'react';

export interface FormControl<T> {
  id: string;
  name?: string;
  disabled?: boolean;
  onChange?: React.ChangeEventHandler<T>;
  label?: string;
  required?: boolean;
}

export interface FormOption {
  label: string;
  value: string;
}

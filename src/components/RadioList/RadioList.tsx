import React from 'react';
import { FormOption } from '../FormularStepper/FormularTypes';

interface RadioListProps {
  options: FormOption[];
  name: string;
}

const RadioList = (props: RadioListProps) => {
  const { options, name } = props;
  return (
    <>
      {options.map(({ value, label }) => (
        <div>
          <input type="radio" value={value} name={name} />
          {label}
        </div>
      ))}
    </>
  );
};

export default RadioList;

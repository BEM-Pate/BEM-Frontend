import React from 'react';

interface RadioListOptions {
  _id: number;
  value: string;
}
interface RadioListProps {
  options: RadioListOptions[];
  groupName: string;
}

const RadioList = (props: RadioListProps) => {
  const { options, groupName } = props;
  return (
    <>
      {options.map(({ value, _id }) => (
        <div>
          <input type="radio" value={_id} name={groupName} />
          {value}
        </div>
      ))}
    </>
  );
};

export default RadioList;

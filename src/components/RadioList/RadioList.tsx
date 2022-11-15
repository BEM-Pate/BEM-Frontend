import React from 'react';

// can be deleted after fetching data from backend
const DUMMYDATA = [
  { _id: 1, value: 'Option 1' },
  { _id: 2, value: 'Option 2' },
  { _id: 3, value: 'Option 3' },
  { _id: 4, value: 'Option 4' },
  { _id: 5, value: 'Option 5' },
];

const RadioList = () => (
  <>
    {DUMMYDATA.map(({ value, _id }) => (
      <div>
        <input type="radio" value={_id} name={value} />
        {' '}
        {value}
      </div>
    ))}
  </>
);

export default RadioList;

import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import styles from './LandingPage.module.scss';
import Button from '../../components/Button/Button';
import RadioList from '../../components/RadioList/RadioList';

interface LandingPageProps {
  children?: React.ReactNode
}
const DUMMYDATA = [
  { _id: 1, value: 'Option 1' },
  { _id: 2, value: 'Option 2' },
  { _id: 3, value: 'Option 3' },
  { _id: 4, value: 'Option 4' },
  { _id: 5, value: 'Option 5' },
];
const GROUPNAME = 'RadioListGroup';

const LandingPage = (props: LandingPageProps) => {
  const { children } = props;
  return (
    <div className={classNames(styles.LandingPage)}>
      landing page
      <Link to="/register/affected">Register Affected</Link>
      <Link to="/register/mentor">Register Mentor</Link>
      {children}
      <Button>Text</Button>
      <RadioList options={DUMMYDATA} groupName={GROUPNAME} />
    </div>
  );
};

export default LandingPage;

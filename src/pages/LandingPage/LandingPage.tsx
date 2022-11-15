import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import styles from './LandingPage.module.scss';
import Button from '../../components/Button/Button';
import RadioList from '../../components/RadioList/RadioList';

interface LandingPageProps {
  children?: React.ReactNode
}

const LandingPage = (props: LandingPageProps) => {
  const { children } = props;
  return (
    <div className={classNames(styles.LandingPage)}>
      landing page
      <Link to="/register/affected">Register Affected</Link>
      <Link to="/register/mentor">Register Mentor</Link>
      {children}
      <Button>Text</Button>
      <RadioList />
    </div>
  );
};

export default LandingPage;

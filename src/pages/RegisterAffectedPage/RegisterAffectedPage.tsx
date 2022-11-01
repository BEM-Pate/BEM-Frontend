import React from 'react';
import classNames from 'classnames';
import styles from './RegisterAffectedPage.module.scss';
import Button from '../../components/Button/Button';

interface LandingPageProps {
  children?: React.ReactNode
}

const RegisterAffectedPage = (props: LandingPageProps) => {
  const { children } = props;
  return (
    <div className={classNames(styles.RegisterAffectedPage)}>
      <h1>register affected page</h1>
      {children}
      <Button>Text</Button>
    </div>
  );
};

export default RegisterAffectedPage;

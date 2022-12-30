import React from 'react';
import classNames from 'classnames';
import styles from './RegisterPatePage.module.scss';
import Button from '../../components/Buttons/Button';

interface RegisterMentorPageProps {
  children?: React.ReactNode
}

const RegisterPatePage = (props: RegisterMentorPageProps) => {
  const { children } = props;
  return (
    <div className={classNames(styles.RegisterMentorPage)}>
      <h1>register mentor page</h1>
      {children}
      <Button>Text</Button>
    </div>
  );
};

export default RegisterPatePage;

import React from 'react';
import classNames from 'classnames';
import styles from './RegisterMentorPage.module.scss';
import Button from '../../components/Button/Button';

interface RegisterMentorPageProps {
  children?: React.ReactNode
}

const RegisterMentorPage = (props: RegisterMentorPageProps) => {
  const { children } = props;
  return (
    <div className={classNames(styles.RegisterMentorPage)}>
      <h1>register mentor page</h1>
      {children}
      <Button>Text</Button>
    </div>
  );
};

export default RegisterMentorPage;

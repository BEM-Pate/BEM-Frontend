import React from 'react';
import classNames from 'classnames';
import styles from './RegisterAffectedPage.module.scss';
import FormularStepper from '../../components/FormularStepper/FormularStepper';
import FormularStep from '../../components/FormularStepper/FormularStep';
import Textfield from '../../components/Textfield/Textfield';

interface LandingPageProps {
  children?: React.ReactNode;
}

const RegisterAffectedPage = (props: LandingPageProps) => {
  const { children } = props;

  return (
    <div className={classNames(styles.RegisterAffectedPage)}>
      <h1>register affected page</h1>
      {children}
      <FormularStepper postUrl="backend-url">
        <FormularStep title="Title">
          <Textfield type="text" id="textfield-text" name="text" />
        </FormularStep>
        <FormularStep title="Title 2">
          <Textfield type="number" id="textfield-text" name="text2" required />
        </FormularStep>
        <FormularStep title="Title 3">
          <Textfield label="Email" type="email" id="textfield-text" name="email" />
        </FormularStep>
      </FormularStepper>
    </div>
  );
};

export default RegisterAffectedPage;

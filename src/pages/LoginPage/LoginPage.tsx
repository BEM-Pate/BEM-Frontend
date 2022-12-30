import React, { useRef, useState } from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './LoginPage.module.scss';
import Textfield from '../../components/Textfield/Textfield';
import Headline from '../../components/Headline/Headline';
import Button from '../../components/Buttons/Button';
import { API_ADDRESS } from '../../helpers/env';

interface Props {
  setUserData: (s: any) => void;
}

const LoginPage = (props: Props) => {
  const { setUserData } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>(new FormData());
  const [submitting, setSubmitting] = useState(false);

  const form = useRef<HTMLFormElement>(null);

  const onChange = () => {
    setFormData(new FormData(form.current ?? undefined));
  };

  const onSubmit = (e: any) => {
    e.preventDefault();

    setSubmitting(true);
    try {
      axios.post(`${API_ADDRESS}/user/login`, {
        email: formData.get('email'),
        password: formData.get('password'),
      }).then((res) => {
        if (res.status === 200) {
          setUserData(res.data);
          navigate('/');
        }
      })
        .catch(() => {
          setUserData(null);
        })
        .finally(() => {
          setSubmitting(false);
        });
    } catch (err) {
      console.log('failed', err);
    }
  };

  return (
    <div className={classNames(styles.LoginPage)}>
      <div className={classNames(styles.LoginPageContainer)}>
        <Headline headline="h3" className={classNames(styles.LoginPageHeadline)}>{t('loginPageHeadline')}</Headline>
        <form
          ref={form}
          className={classNames(styles.LoginPageForm)}
          onSubmit={onSubmit}
        >
          <Textfield
            id="login-email"
            type="email"
            name="email"
            label={t('labelEMail')!}
            onChange={onChange}
            required
          />
          <Textfield
            id="login-password"
            type="password"
            name="password"
            label={t('labelPassword')!}
            onChange={onChange}
            required
          />
          <div className={classNames(styles.LoginPageFormButtons)}>
            <Link to="/forgot-password" className={classNames(styles.LoginPageFormLink)}>
              {t('loginPageButtonForgotPassword')}
            </Link>
            <Button type="submit" disabled={submitting}>
              {t('loginPageButtonLogin')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

import React, { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './LoginPage.module.scss';
import Textfield from '../../components/Textfield/Textfield';
import Headline from '../../components/Headline/Headline';
import Button from '../../components/Button/Button';
import { API_ADDRESS } from '../../helpers/env';
import PhoneNumberInput from '../../components/PhoneNumberInput/PhoneNumberInput';
import PinInput from '../../components/PinInput/PinInput';
import Validators from '../../helpers/validators';
import { useZustand } from '../../zustand/store';

type LoginType = 'phone' | 'email';
type RequestState = 'OTP' | 'AUTH';

const LoginPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [state, setState] = useState<RequestState>('OTP');
  const [mode, setMode] = useState<LoginType>('phone');
  const [accountName, setAccountName] = useState('');
  const [otpCode, setOtpCode] = useState<string | null>(null);
  const [validators, setValidators] = useState<any[]>([]);
  const [requesting, setRequesting] = useState(false);
  const setUser = useZustand((state) => state.setUser);

  useEffect(() => {
    setState('OTP');
    setAccountName('');
    setOtpCode(null);

    switch (mode) {
      case 'email':
        setValidators([
          Validators.isNotEmpty,
          Validators.isEmail,
        ]);
        break;
      case 'phone':
        setValidators([
          Validators.isNotEmpty,
          Validators.isPhoneNumber,
        ]);
        break;
      default:
    }
  }, [mode]);

  const requestOTP = useCallback(() => {
    try {
      setRequesting(true);
      axios.post(`${API_ADDRESS}/user/account/generateOTP?method=${mode}`, {
        accountName,
      }).then((res) => {
        if (res.status === 201) {
          setState('AUTH');
        }
      }).finally(() => {
        setRequesting(false);
      });
    } catch (err) {
      console.error('failed', err);
    }
  }, [accountName, mode]);

  const requestLogin = useCallback(() => {
    try {
      setRequesting(true);
      axios.post(`${API_ADDRESS}/user/login`, {
        accountName,
        code: otpCode,
      }).then((res) => {
        if (res.status === 200) {
          setUser(res.data);
          navigate('/');
        }
      }).finally(() => {
        setRequesting(false);
      });
    } catch (err) {
      console.error('failed', err);
    }
  }, [accountName, otpCode, navigate, setUser]);

  return (
    <div className={classNames(styles.LoginPage)}>
      <div className={classNames(styles.LoginPageContainer)}>
        <Headline headline="h3" className={classNames(styles.LoginPageHeadline)}>{t('loginPageHeadline')}</Headline>
        <div className={classNames(styles.LoginPageForm)}>
          {state === 'OTP' && (
          <>
            {mode === 'email'
              && (
                <>
                  <span className={classNames(styles.LoginPageFormInstruction)}>
                    E-Mail eingeben zum Anmelden
                  </span>
                  <Textfield
                    id="login-email"
                    type="email"
                    name="email"
                    placeholder="mail@example.com"
                    onChange={(e) => setAccountName(e)}
                    required
                  />
                </>
              )}
            {mode === 'phone'
              && (
                <>
                  <span className={classNames(styles.LoginPageFormInstruction)}>
                    Telefonnummer eingeben zum Anmelden
                  </span>
                  <PhoneNumberInput
                    id="login-phone"
                    name="phone"
                    onChange={(e) => setAccountName(e)}
                    required
                  />
                </>
              )}
            <div className={classNames(styles.LoginPageFormActions)}>
              <Button
                onClick={requestOTP}
                disabled={Validators.validate(accountName, validators) || requesting}
              >
                Request OTP Code
              </Button>
            </div>
          </>
          )}

          {state === 'AUTH' && (
            <>
              <PinInput
                id="login-otp"
                length={4}
                onChange={(e) => setOtpCode(e)}
                focus
              />
              <div className={classNames(styles.LoginPageFormActions)}>
                <span className={classNames(styles.LoginPageFormActionsResendOTP)}>
                  Code nicht erhalten?&nbsp;
                  <Button onClick={requestOTP} styling="link">
                    Code nochmal senden
                  </Button>
                </span>
                <Button
                  onClick={requestLogin}
                  disabled={Validators.validate(accountName, validators) || requesting}
                >
                  {t('loginPageButtonLogin')}
                </Button>
              </div>
            </>
          )}

          <span className={classNames(styles.LoginPageFormOr)}>or</span>

          <Button
            className={styles.LoginPageFormModeSwitch}
            styling="outline"
            onClick={() => (mode === 'email'
              ? setMode('phone')
              : setMode('email'))}
          >
            {mode === 'email' && 'Login with phone number'}
            {mode === 'phone' && 'Login with email'}
          </Button>

          <div className={classNames(styles.LoginPageFormRegister)}>
            <span>Don&apos;t have an account yet? </span>
            <Button styling="link" onClick={() => navigate('/register')}>Register here</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

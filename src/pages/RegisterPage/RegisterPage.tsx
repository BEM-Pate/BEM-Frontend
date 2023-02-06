import React, { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './RegisterPage.module.scss';
import Textfield from '../../components/Textfield/Textfield';
import Headline from '../../components/Headline/Headline';
import Button from '../../components/Button/Button';
import { API_ADDRESS } from '../../helpers/env';
import PhoneNumberInput from '../../components/PhoneNumberInput/PhoneNumberInput';
import PinInput from '../../components/PinInput/PinInput';
import Validators from '../../helpers/validators';
import {useZustand} from "../../zustand/store";
import LanguageDropdown from '../../components/LanguageDropdown/LanguageDropdown';

type RegisterType = 'phone' | 'email';
type RequestState = 'OTP' | 'AUTH';

const RegisterPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [state, setState] = useState<RequestState>('OTP');
  const [mode, setMode] = useState<RegisterType>('phone');
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
      axios.post(`${API_ADDRESS}/user/account/registration?method=${mode}`, {
        accountName,
      }).then((res) => {
        if (res.status === 200) {
          // already exists
        }
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

  const requestRegister = useCallback(() => {
    try {
      setRequesting(true);
      axios.post(`${API_ADDRESS}/user/account/verify`, {
        accountName,
        code: otpCode,
      }).then((res) => {
        if (res.status === 200) {
          setUser(res.data);
          navigate('/register/user');
        }
      }).finally(() => {
        setRequesting(false);
      });
    } catch (err) {
      console.error('failed', err);
    }
  }, [accountName, otpCode, navigate, setUser]);

  return (
    <div className={classNames(styles.RegisterPage)}>
      <div className={classNames(styles.RegisterPageContainer)}>
        <Headline headline="h3" className={classNames(styles.RegisterPageHeadline)}>
        {t("labelRegister")}
        </Headline>
        <div className={classNames(styles.RegisterPageForm)}>
          {state === 'OTP' && (
            <>
              {mode === 'email'
                && (
                  <>
                    <span className={classNames(styles.RegisterPageFormInstruction)}>
                    {t("labelTextEmail")}
                    </span>
                    <Textfield
                      id="register-email"
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
                    <span className={classNames(styles.RegisterPageFormInstruction)}>
                    {t("labelTextNumber")}
                    </span>
                    <PhoneNumberInput
                      id="register-phone"
                      name="phone"
                      onChange={(e) => setAccountName(e)}
                      required
                    />
                  </>
                )}
              <div className={classNames(styles.RegisterPageFormActions)}>
                <Button
                  onClick={requestOTP}
                  disabled={Validators.validate(accountName, validators) || requesting}
                >
                  {t("labelOTP")}
                </Button>
              </div>
            </>
          )}

          {state === 'AUTH' && (
            <>
              <PinInput
                id="register-otp"
                length={4}
                onChange={(e) => setOtpCode(e)}
                focus
              />
              <div className={classNames(styles.RegisterPageFormActions)}>
                <span className={classNames(styles.RegisterPageFormActionsResendOTP)}>
                {t("labelCode")}
                  <Button onClick={requestOTP} styling="link">
                  {t("labelCodeReturn")}
                  </Button>
                </span>
                <Button
                  onClick={requestRegister}
                  disabled={Validators.validate(accountName, validators) || requesting}
                >
                  {t('RegisterPageButtonRegister')}
                </Button>
              </div>
            </>
          )}

          <span className={classNames(styles.RegisterPageFormOr)}>{t('labelOr')}</span>

          <Button
            className={styles.RegisterPageFormModeSwitch}
            styling="outline"
            onClick={() => (mode === 'email'
              ? setMode('phone')
              : setMode('email'))}
          >
            {mode === 'email' && t('labelRegisterPhone')}
            {mode === 'phone' && t('labelRegisterEmail')}
          </Button>

          <div className={classNames(styles.RegisterPageFormLogin)}>
            <span>{t('labelAccountText')}  </span>
            <Button styling="link" onClick={() => navigate('/login')}>{t('loginPageButtonLogin')}</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

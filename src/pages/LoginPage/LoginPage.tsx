import React, { useCallback, useEffect, useState } from "react";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./LoginPage.module.scss";
import Textfield from "../../components/Textfield/Textfield";
import Headline from "../../components/Headline/Headline";
import Button from "../../components/Button/Button";
import { API_ADDRESS } from "../../helpers/env";
import PhoneNumberInput from "../../components/PhoneNumberInput/PhoneNumberInput";
import PinInput from "../../components/PinInput/PinInput";
import Validators from "../../helpers/validators";
import { useZustand } from "../../zustand/store";

type LoginType = "phone" | "email";
type RequestState = "OTP" | "AUTH";

const LoginPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [state, setState] = useState<RequestState>("OTP");
  const [mode, setMode] = useState<LoginType>("phone");
  const [accountName, setAccountName] = useState("");
  const [otpCode, setOtpCode] = useState<string | null>(null);
  const [validators, setValidators] = useState<any[]>([]);
  const [requesting, setRequesting] = useState(false);
  const setUser = useZustand((state) => state.setUser);
  const addNotification = useZustand((state) => state.addNotification);

  useEffect(() => {
    setState("OTP");
    setAccountName("");
    setOtpCode(null);

    switch (mode) {
      case "email":
        setValidators([Validators.isNotEmpty, Validators.isEmail]);
        break;
      case "phone":
        setValidators([Validators.isNotEmpty, Validators.isPhoneNumber]);
        break;
      default:
    }
  }, [mode]);

  const requestOTP = useCallback(() => {
    try {
      setRequesting(true);
      axios
        .post(`${API_ADDRESS}/user/account/generateOTP?method=${mode}`, {
          accountName,
        })
        .then((res) => {
          if (res.status === 201) {
            addNotification(t(`notificationOTPSent_${mode}`), 'success');
            setState("AUTH");
          }
        })
        .finally(() => {
          setRequesting(false);
        });
    } catch (err) {
      addNotification(t('notificationOTPError'), 'error');
      console.error("failed", err);
    }
  }, [accountName, addNotification, mode, t]);

  const requestLogin = useCallback(() => {
    try {
      setRequesting(true);
      axios
        .post(`${API_ADDRESS}/user/login`, {
          accountName,
          code: otpCode,
        })
        .then((res) => {
          if (res.status === 200) {
            setUser(res.data);
            navigate("/");
          }
        })
        .catch(() => {
          addNotification(t(`notificationLoginError`), 'error');
        })
        .finally(() => {
          setRequesting(false);
        });
    } catch (err) {
      addNotification(t(`notificationLoginError`), 'error');
      console.error("failed", err);
    }
  }, [accountName, otpCode, setUser, navigate, addNotification, t]);

  return (
    <div className={classNames(styles.LoginPage)}>
      <div className={classNames(styles.LoginPageContainer)}>
        <Headline
          headline="h3"
          className={classNames(styles.LoginPageHeadline)}
        >
          {t("loginPageHeadline")}
        </Headline>
        <div className={classNames(styles.LoginPageForm)}>
          {state === "OTP" && (
            <>
              {mode === "email" && (
                <>
                  <span className={classNames(styles.LoginPageFormInstruction)}>
                    {t("labelTextEmail")}
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
              {mode === "phone" && (
                <>
                  <span className={classNames(styles.LoginPageFormInstruction)}>
                    {t("labelTextNumber")}
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
                  disabled={
                    Validators.validate(accountName, validators) || requesting
                  }
                >
                  {t("labelOTP")}
                </Button>
              </div>
            </>
          )}

          {state === "AUTH" && (
            <>
              <PinInput
                id="login-otp"
                length={4}
                onChange={(e) => setOtpCode(e)}
                focus
              />
              <div className={classNames(styles.LoginPageFormActions)}>
                <span
                  className={classNames(styles.LoginPageFormActionsResendOTP)}
                >
                  {t("labelCode")}
                  <Button onClick={requestOTP} styling="link">
                    {t("labelCodeReturn")}
                  </Button>
                </span>
                <Button
                  onClick={requestLogin}
                  disabled={
                    Validators.validate(accountName, validators) || requesting
                  }
                >
                  {t("loginPageButtonLogin")}
                </Button>
              </div>
            </>
          )}

          <span className={classNames(styles.LoginPageFormOr)}>{t("labelOr")}</span>

          <Button
            className={styles.LoginPageFormModeSwitch}
            styling="outline"
            onClick={() =>
              mode === "email" ? setMode("phone") : setMode("email")
            }
          >
            {mode === "email" && t("labelLoginPhone")}
            {mode === "phone" && t("labelLoginEmail")}
          </Button>

          <div className={classNames(styles.LoginPageFormRegister)}>
            <span>{t("labelAccountless")}</span>
            <Button styling="link" onClick={() => navigate("/register")}>
              {t("labelRegisterhere")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

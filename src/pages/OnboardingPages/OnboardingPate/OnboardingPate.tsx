import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import classnames from "classnames";
import placeholder from "../../../images/icons/ui/OB2.jpeg";
import Button from "../../../components/Button/Button";
import styles from "./OnboardingPate.module.scss";

const OnboardingPate = () => {
  const { t } = useTranslation();
  return (
    <div className={classnames(styles.Container)}>
      <div className={classnames(styles.imageContainer)} style={{backgroundImage: `url(${placeholder})`}}></div>
      <div className={classnames(styles.textContainer)}>
        <h1 className={classnames(styles.textContainerheader)}>
          {t("onboardingPateHeader")}
        </h1>
        <p className={classnames(styles.textContainertext)}>{t("onboardingPateDescription")}</p>
      </div>
      <div className={classnames(styles.buttonContainer)}>
        <Link to="/onboardingshg">
          <Button className={classnames(styles.buttonContainerbutton)}>
            {t("labelNext")}
          </Button>
        </Link>
        <Link to="/register/pate">
          <Button className={classnames(styles.buttonContainerbuttonNext)}>
            {t("labelRegister")}
          </Button>
        </Link>
      </div>
      <div className={classnames(styles.loginLink)}>
        <Link to="/login">
          <span>{t("labelLogin")}</span>
        </Link>
      </div>
    </div>
  );
};
export default OnboardingPate;

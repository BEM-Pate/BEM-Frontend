import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import classnames from "classnames";
import placeholder from "../../../images/icons/ui/OB3.jpeg";
import Button from "../../../components/Button/Button";
import styles from "./OnboardingSHG.module.scss";

const OnboardingSHG = () => {
  const { t } = useTranslation();
  return (
    <div className={classnames(styles.Container)}>
      <div className={classnames(styles.imageContainer)} style={{backgroundImage: `url(${placeholder})`}}></div>
      <div className={classnames(styles.textContainer)}>
        <h1 className={classnames(styles.textContainerheader)}>
          {t("onboardingSHGHeader")}
        </h1>
      </div>

      <div className={classnames(styles.buttonContainer)}>
        <Link to="/onboardingseeker">
          <Button className={classnames(styles.buttonContainerbutton)}>
            {t("labelNext")}
          </Button>
        </Link>
        <Link to="/register">
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
export default OnboardingSHG;

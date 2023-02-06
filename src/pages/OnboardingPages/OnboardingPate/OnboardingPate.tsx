import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import classnames from "classnames";
import placeholder from "../../../images/icons/ui/OB2.jpeg";
import Button from "../../../components/Button/Button";
import styles from "./OnboardingPate.module.scss";
import AlreadyAccount from "../../../components/alreadyAccount/alreadyAccount";

const OnboardingPate = () => {
  const { t } = useTranslation();
  return (
    <div>
      <div className={classnames(styles.imageContainer)}>
        <img
          src={placeholder}
          className={classnames(styles.imageContainerimage)}
          alt="placeholder"
        />
      </div>
      <div className={classnames(styles.textContainer)}>
        <h1 className={classnames(styles.textContainerheader)}>
          {t("onboardingPateHeader")}
        </h1>
        <p>{t("onboardingPateDescription")}</p>
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
      <hr />
      <AlreadyAccount />
    </div>
  );
};
export default OnboardingPate;

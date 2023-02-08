import React from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { useTranslation } from "react-i18next";
import styles from "./OnboardingSeeker.module.scss";
import Button from "../../../components/Button/Button";
import placeholderleft from "../../../images/onboarding/seeker_left.png";
import placeholderright from "../../../images/onboarding/seeker_right.png";

const OnboardingSeeker = () => {
  const { t } = useTranslation();
  return (
    <div className={classnames(styles.Container)}>
      <div className={classnames(styles.imageContainer)}>
        <div className={classnames(styles.imageContainerleft)} style={{backgroundImage: `url(${placeholderleft})`}}></div>
        <div className={classnames(styles.imageContainerright)} style={{backgroundImage: `url(${placeholderright})`}}></div>
      </div>
      <div className={classnames(styles.spacer)}></div>
      <div className={classnames(styles.textContainer)}>
        <h1 className={classnames(styles.textContainerheader)}>
          {t("onboardingPageSeekerHeader")}
        </h1>
        <p className={classnames(styles.textContainertext)}>{t("onboardingPageSeekerDescription")}</p>
      </div>
      <div className={classnames(styles.buttonContainer)}>
        <Link to="/onboardingpate">
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
export default OnboardingSeeker;

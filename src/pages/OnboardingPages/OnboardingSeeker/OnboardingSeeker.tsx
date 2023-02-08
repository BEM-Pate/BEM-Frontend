import React from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { useTranslation } from "react-i18next";
import styles from "./OnboardingSeeker.module.scss";
import Button from "../../../components/Button/Button";
import placeholder from "../../../images/icons/ui/OB1.jpeg";
import AlreadyAccount from "../../../components/alreadyAccount/alreadyAccount";

const OnboardingSeeker = () => {
  const { t } = useTranslation();
  return (
    <div className={classnames(styles.Container)}>
      <div className={classnames(styles.imageContainer)}>
        <img
          src={placeholder}
          className={classnames(styles.imageContainerimage)}
          alt="Placeholder"
        />
      </div>

      <div className={classnames(styles.textContainer)}>
        <h1 className={classnames(styles.textContainerheader)}>
          {t("onboardingPageSeekerHeader")}
        </h1>
        <p>{t("onboardingPageSeekerDescription")}</p>
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
      <hr />
      <AlreadyAccount />
    </div>
  );
};
export default OnboardingSeeker;

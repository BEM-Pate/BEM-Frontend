import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import classnames from "classnames";
import placeholder from "../../../images/icons/ui/OB3.jpeg";
import Button from "../../../components/Button/Button";
import styles from "./OnboardingSHG.module.scss";
import AlreadyAccount from "../../../components/alreadyAccount/alreadyAccount";

const OnboardingSHG = () => {
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
          {t("onboardingSHGHeader")}
        </h1>
      </div>

      <div className={classnames(styles.buttonContainer)}>
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
export default OnboardingSHG;

import classnames from "classnames";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./SplashScreenPage.module.scss";
import AlreadyAccount from "../../../components/alreadyAccount/alreadyAccount";
import logo from "../../../images/icons/ui/bemLogo.svg";
import bubble from "../../../images/icons/ui/SplashScreenBubble.png";
import Button from "../../../components/Button/Button";
import { Link } from "react-router-dom";
import LanguageDropdown from "../../../components/LanguageDropdown/LanguageDropdown";

const SplashScreenPage = () => {
  const { t } = useTranslation();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowContent(true);
    }, 2000);
  }, []);

  return (
    <div className={classnames(styles.Container)}>
        <div className={classnames(styles.ContainerupperDiv)}>
          <img
            src={logo}
            className={classnames(styles.ContainerupperDivimg)}
            alt="BEM-Logo"
          />
          <h1 className={classnames(styles.ContainerupperDivheader)}>BEMpsy</h1>
          <h1 className={classnames(styles.ContainerupperDivheader)}>Buddy</h1>
        </div>
        <div className={classnames(styles.FadeIn)}>
          {showContent ? (
            <>
              <div>
                <h1 className={classnames(styles.ContainerDescription)}>
                  {t("splashscreenText")}
                </h1>
              </div>
              <div className={classnames(styles.buttonContainer)}>
                <Link to="/onboardingseeker">
                  <Button className={classnames(styles.buttonContainerbutton)}>
                    {t("labelNext")}
                  </Button>
                </Link>
              </div>
              <div>
                <LanguageDropdown />
              </div>
              <AlreadyAccount />
            </>
          ) : null}
        </div>
    </div>
  );
};
export default SplashScreenPage;

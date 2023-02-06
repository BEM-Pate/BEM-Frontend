import classnames from "classnames";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styles from "./alreadyAccount.module.scss";

const AlreadyAccount = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = useTranslation();
  return (
    <div className={classnames(styles.LoginContainer)}>
      <hr />
      <Link to="/login" className={classnames(styles.LoginContainertext)}>
        <a className="link">{t("labelLogin")}</a> 
      </Link>
    </div>
  );
};
export default AlreadyAccount;

import React, { useEffect, useState } from "react";
import classNames from "classnames";
import styles from "./Account.module.scss";
import Headline from "../../Headline/Headline";
import Button from "../../Button/Button";
import { useNavigate } from "react-router-dom";
import Textfield from "../../Textfield/Textfield";
import ModalWindow from "../../ModalWindow/ModalWindow";
import useModal from "../../../helpers/useModal";
import axios from "axios";
import { API_ADDRESS } from "../../../helpers/env";
import { useZustand } from "../../../zustand/store";

interface Props {
  userData: any;
}

const Account = (props: Props) => {
  const { userData } = props;
  const navigate = useNavigate();

  const { isVisible, toggleModal } = useModal();
  const addNotification = useZustand(state => state.addNotification);
  const deleteAccount = useZustand((state) => state.deleteAccount);

  const handleDelete = () => {
    try {
      const res = axios.delete(`${API_ADDRESS}/user/deleteAccount`, {
        headers: {
          accept: "*",
          Authorization: `Bearer ${userData.token}`,
        },
      }).then((res) => {
        if(res.status === 200) {
            deleteAccount();
            navigate('/')
        } 
      });
      
    } catch (err) {
      addNotification("An error occurred while deleting your account. Please contact the admins.", "error") 
       {/* Muss nicht */}
      console.error(err);
    }
  };

  return (
    <div className={classNames(styles.Account)}>
      <div className={classNames(styles.AccountHeader)}>
        <Button icon styling="back" onClick={() => navigate(-1)} />
        <Headline headline="h1" styling="page">
          Account
        </Headline>{" "}
        {/* TODO Hasan */}
      </div>
      <div className={classNames(styles.AccountSection)}>
        <Headline headline="h2" styling="caps">
          E-Mail / Phone
        </Headline> {/* TODO Hasan */}
        <Textfield
          id="mail"
          disabled
          placeholder={userData.account}
        ></Textfield>
      </div>
      <div className={classNames(styles.AccountSection)}>
        <Headline headline="h2" styling="caps">
          Account Settings
        </Headline> {/* TODO Hasan */}
        <Button
          className={classNames(styles.AccountDelete)}
          onClick={toggleModal}
          styling="setting"
        >
          Delete Account
        </Button> {/* TODO Hasan */}
      </div>
      <ModalWindow
        isVisible={isVisible}
        headline="Are you sure you want to delte your Account?"
        text="This action is irreversible!"
        type="warning"
      >
        <Button onClick={toggleModal}>No, I want to stay!</Button>
        <Button className={classNames(styles.AccountDelete)} styling="outline" onClick={() => handleDelete()}>
          Yes, please delete all my data
        </Button>
      </ModalWindow>
    </div>
  );
};

export default Account;

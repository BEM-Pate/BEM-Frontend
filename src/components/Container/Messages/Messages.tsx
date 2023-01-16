import classNames from 'classnames';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";
import styles from './Messages.module.scss';

import { useZustand } from '../../../zustand/store';


const Messages = () => {

  const navigate = useNavigate();

  const [fetchChatroom, contacts, setRoute] = useZustand((state) => [state.fetchChatroom, state.contacts, state.setCurrentRoute]);

  useEffect(() => {
    fetchChatroom();
  },
    []
  )

  const { t } = useTranslation();
  return (
    <div className={classNames(styles.Messages)}>
      <h1 className={classNames(styles.MessagesHeader)}>
        {t('messagesPageHeader')}
      </h1>
      <h4 className={classNames(styles.MessagesSubheader)}>
        {t('messagesPageSubHeader')}
      </h4>
      <div className={classNames(styles.MessagesContainerContacts)}>

        {contacts?.map((user: any) => {
          const userData = user.baseUserData;
          const b64 = btoa(
            userData.avatar.data.data.reduce((data: any, byte: any) => data + String.fromCharCode(byte), '')
          )
          const contentType = userData.avatar.contentType;
          return (
            <div style={
              {
                display: 'flex',
                flexDirection: 'column',
                width: '100px',
                height: '100px',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
              }

            }>
              <img
                src={`data:${contentType};base64,${b64}`}
                alt="PatePicture"
                className={classNames(styles.MessagesProfilePictures)}
                onClick={() => {
                  navigate(`/dashboard/chatroom/${user._id}`)
                  setRoute(`/dashboard/chatroom/${user._id}`)
                }}
              />
              {/*<h1>{userData.firstName}</h1>*/}
            </div>
          )
        })}


      </div>
      <h4 className={classNames(styles.MessagesSubheader)}>
        {t('messagesPageMessages')}
      </h4>
      <div className={classNames(styles.MessagesContainerMessages)}>

      </div>
    </div>
  );
};

export default Messages;

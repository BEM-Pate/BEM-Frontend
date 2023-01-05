import React from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import styles from './Messages.module.scss';

import placeholder from '../../../images/default.png';

const GERMAN_FIRST_NAMES = [
  'Anna',
  'Bruno',
  'Carla',
  'Dieter',
  'Emma',
  'Friedrich',
  'Greta',
  'Hans',
  'Irina',
  'Johann',
];
const GERMAN_LAST_NAMES = [
  'Müller',
  'Schmidt',
  'Schneider',
  'Fischer',
  'Weber',
  'Meyer',
  'Wagner',
  'Becker',
  'Schulz',
  'Hoffmann',
];
const GERMAN_LOCATIONS = [
  'Berlin',
  'Hamburg',
  'München',
  'Köln',
  'Frankfurt',
  'Stuttgart',
  'Düsseldorf',
  'Dortmund',
  'Essen',
  'Bremen',
];
const messages = [
  "Hey, how's it going?",
  'Good, just hanging out at home. You?',
  "Same here. Let's plan to grab a coffee",
  "Sounds good to me. Let's pick a day and time.",
];

const generateRandomPerson = () => {
  const people = [];
  while (people.length !== 50) {
    const firstName = GERMAN_FIRST_NAMES[Math.floor(Math.random() * GERMAN_FIRST_NAMES.length)];
    const lastName = GERMAN_LAST_NAMES[Math.floor(Math.random() * GERMAN_LAST_NAMES.length)];
    const age = Math.floor(Math.random() * 100);
    const location = GERMAN_LOCATIONS[Math.floor(Math.random() * GERMAN_LOCATIONS.length)];
    const message = messages[Math.floor(Math.random() * messages.length)];
    const date = new Date(Math.random() * Date.now());

    const person = {
      firstName,
      lastName,
      age,
      location,
      date,
      message,
    };

    people.push(person);
  }

  return people;
};

const paten = generateRandomPerson();

const Messages = () => {
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
        {/**
         * Mappen der Profilbilder
         * onClick --> öffnen ProfilePage der Kontakte
         * die jetzigen Bilder dienen nur zur Demonstation des Scrollviews
         */}
        <img
          src={placeholder}
          alt="PatePicture"
          className={classNames(styles.MessagesProfilePictures)}
        />
        <img
          src={placeholder}
          alt="PatePicture"
          className={classNames(styles.MessagesProfilePictures)}
        />
        <img
          src={placeholder}
          alt="PatePicture"
          className={classNames(styles.MessagesProfilePictures)}
        />
        {' '}
        <img
          src={placeholder}
          alt="PatePicture"
          className={classNames(styles.MessagesProfilePictures)}
        />
        {' '}
        <img
          src={placeholder}
          alt="PatePicture"
          className={classNames(styles.MessagesProfilePictures)}
        />
        {' '}
        <img
          src={placeholder}
          alt="PatePicture"
          className={classNames(styles.MessagesProfilePictures)}
        />
        {' '}
        <img
          src={placeholder}
          alt="PatePicture"
          className={classNames(styles.MessagesProfilePictures)}
        />
        {' '}
        <img
          src={placeholder}
          alt="PatePicture"
          className={classNames(styles.MessagesProfilePictures)}
        />
        {' '}
        <img
          src={placeholder}
          alt="PatePicture"
          className={classNames(styles.MessagesProfilePictures)}
        />
        {' '}
        <img
          src={placeholder}
          alt="PatePicture"
          className={classNames(styles.MessagesProfilePictures)}
        />
      </div>
      <h4 className={classNames(styles.MessagesSubheader)}>
        {t('messagesPageMessages')}
      </h4>
      <div
        className={classNames(styles.MessagesContainerMessages)}
      >
        {/**
         *Bilder durch ProfilePicture ersetzen
         *die Nachricjten anklickbar machen
         */
        paten.map((pate) => (
          <div className={classNames(styles.MessagesContainerMessagesMessages)}>
            <img
              src={placeholder}
              alt="placeholder"
              className={classNames(styles.MessagesProfilePictures)}
            />
            <span
              className={classNames(styles.MessagesContainerMessagesTextName)}
            >
              {pate.firstName}
              {' '}
              {pate.lastName}
              {' '}
            </span>
            <br />
            <span
              className={classNames(
                styles.MessagesContainerMessagesTextMessage,
              )}
            >
              {pate.message}
            </span>
            <br />
            <span
              className={classNames(styles.MessagesContainerMessagesTextDate)}
            >
              {`${pate.date.toDateString()}`}
            </span>
            <hr />
          </div>
        ))
}
      </div>
    </div>
  );
};

export default Messages;

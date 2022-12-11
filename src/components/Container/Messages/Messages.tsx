import React from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import styles from './Messages.module.scss';
import Headline from '../../Headline/Headline';

import placeholder from '../../../images/default.png';

const GERMAN_FIRST_NAMES = ['Anna', 'Bruno', 'Carla', 'Dieter', 'Emma', 'Friedrich', 'Greta', 'Hans', 'Irina', 'Johann'];
const GERMAN_LAST_NAMES = ['Müller', 'Schmidt', 'Schneider', 'Fischer', 'Weber', 'Meyer', 'Wagner', 'Becker', 'Schulz', 'Hoffmann'];
const GERMAN_LOCATIONS = ['Berlin', 'Hamburg', 'München', 'Köln', 'Frankfurt', 'Stuttgart', 'Düsseldorf', 'Dortmund', 'Essen', 'Bremen'];
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
      <Headline headline="h2">{t('messagesHeader')}</Headline>
      {
      paten.map((pate, index) => (
        <>
          <div key={index} className={classNames(styles.MessagesItem)}>
            <img src={placeholder} alt="placeholder" />
            <div className={classNames(styles.MessagesItemInfo)}>
              <div className={classNames(styles.MessagesItemInfoName)}>
                <span>{pate.firstName}</span>
                <span>{`${pate.date.getDay()} ${t('messagesTage')}`}</span>
              </div>
              <p>
                {pate.message}
              </p>

            </div>

          </div>
          <hr />
        </>
      ))
    }
    </div>
  );
};

export default Messages;

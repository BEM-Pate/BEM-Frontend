import React from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import styles from './Search.module.scss';
import Textfield from '../../Textfield/Textfield';

import placeholder from '../../../images/default.png';

/* DELETE THIS SHIT LATER!!! --> */

import Anna from '../../../images/ai_people/1.jpg';
import Carla from '../../../images/ai_people/2.jpg';
import Emma from '../../../images/ai_people/3.jpg';
import Johann from '../../../images/ai_people/4.jpg';
import Greta from '../../../images/ai_people/5.jpg';
import Irina from '../../../images/ai_people/6.jpg';
import Hans from '../../../images/ai_people/7.jpg';
import Friedrich from '../../../images/ai_people/8.jpg';
import Dieter from '../../../images/ai_people/9.jpg';
import Bruno from '../../../images/ai_people/10.jpg';

const GERMAN_FIRST_NAMES = ['Anna', 'Bruno', 'Carla', 'Dieter', 'Emma', 'Friedrich', 'Greta', 'Hans', 'Irina', 'Johann'];
const GERMAN_LAST_NAMES = ['Müller', 'Schmidt', 'Schneider', 'Fischer', 'Weber', 'Meyer', 'Wagner', 'Becker', 'Schulz', 'Hoffmann'];
const GERMAN_LOCATIONS = ['Berlin', 'Hamburg', 'München', 'Köln', 'Frankfurt', 'Stuttgart', 'Düsseldorf', 'Dortmund', 'Essen', 'Bremen'];

const images = [
  Anna, Carla, Emma, Johann, Greta, Irina, Hans, Friedrich, Dieter, Bruno,
];

const generateRandomPerson = () => {
  const people = [];
  while (people.length !== 50) {
    const firstName = GERMAN_FIRST_NAMES[Math.floor(Math.random() * GERMAN_FIRST_NAMES.length)];
    const lastName = GERMAN_LAST_NAMES[Math.floor(Math.random() * GERMAN_LAST_NAMES.length)];
    const age = Math.floor(Math.random() * 100);
    const location = GERMAN_LOCATIONS[Math.floor(Math.random() * GERMAN_LOCATIONS.length)];

    const person = {
      firstName,
      lastName,
      age,
      location,
    };

    people.push(person);
  }

  return people;
};

const paten = generateRandomPerson();

/* <-- DELETE THIS SHIT LATER!!! */

const Search = () => {
  const { t } = useTranslation();
  return (
    <div className={classNames(styles.Search)}>

      <div className={classNames(styles.SearchBar)}>
        <Textfield id="pate-search" type="text" placeholder={t('SearchSearchbar')!} />
      </div>
      <div className={classNames(styles.SearchPanel)}>
        {paten.map((person, index) => (
          <div key={index} className={classNames(styles.Pate)}>
            <img src={images[index] || placeholder} alt="placeholder" />
            <div className={classNames(styles.PateInfo)}>
              <div className={classNames(styles.PateInfoName)}>
                <span>{`${person.firstName} ${person.lastName}`}</span>
                <span>{person.age}</span>
              </div>
              <span>
                {person.location}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;

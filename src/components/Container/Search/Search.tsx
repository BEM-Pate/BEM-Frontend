import React from 'react';
import classNames from 'classnames';
import styles from './Search.module.scss';
import Textfield from '../../Textfield/Textfield';

import placeholder from '../../../images/default.png';

const GERMAN_FIRST_NAMES = ['Anna', 'Bruno', 'Carla', 'Dieter', 'Emma', 'Friedrich', 'Greta', 'Hans', 'Irina', 'Johann'];
const GERMAN_LAST_NAMES = ['Müller', 'Schmidt', 'Schneider', 'Fischer', 'Weber', 'Meyer', 'Wagner', 'Becker', 'Schulz', 'Hoffmann'];
const GERMAN_LOCATIONS = ['Berlin', 'Hamburg', 'München', 'Köln', 'Frankfurt', 'Stuttgart', 'Düsseldorf', 'Dortmund', 'Essen', 'Bremen'];

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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const paten = generateRandomPerson();

const Search = () => (
  <div className={classNames(styles.Search)}>

    <div>
      <Textfield id="pate-search" type="text" placeholder="Search..." />
    </div>
    <div className={classNames(styles.PatePanel)}>
      {paten.map((person, index) => (
        <div key={index} className={classNames(styles.Pate)}>
          <img src={placeholder} alt="placeholder" />
          <div>
            {person.firstName}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Search;

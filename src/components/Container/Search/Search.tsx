import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import axios from 'axios';
import styles from './Search.module.scss';
import Textfield from '../../Textfield/Textfield';
import { API_ADDRESS } from '../../../helpers/env';

/* BEGIN Delete Later */
import placeholder from '../../../images/default.png';
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

import ResultCard from './ResultCard/ResultCard';

const images = [
  Anna, Carla, Emma, Johann, Greta, Irina, Hans, Friedrich, Dieter, Bruno,
];

function getRandomImage() {
  const randomImage = images[Math.floor(Math.random() * images.length)];
  return randomImage === undefined ? placeholder : randomImage;
}

/* END Delete Later */

interface Props {
  userData: any;
}

interface ResultProps {
  data: any;
  userAttributes: any;
}

const Loading = () => <p className={classNames(styles.SearchLoading)}>Loading</p>;

const Results = (props: ResultProps) => {
  const { data, userAttributes } = props;
  return (
    <div className={classNames(styles.SearchResults)}>
      {
      data.map((pate :any, index: any) => (
        <ResultCard
          image={getRandomImage()}
          key={index}
          firstName={pate.firstName}
          languages={pate.languages}
          lastName={pate.lastName}
          experience={pate.experience}
          diseases={pate.diseases}
          occupation={pate.occupation}
          userAttributes={userAttributes}
        />
      ))
}
    </div>
  );
};

const Search = (props: Props) => {
  const { userData } = props;

  const [matches, setMatches] = useState(null);
  const [userAttributes, setUserAttributes] = useState(null);

  useEffect(() => {
    axios.post(`${API_ADDRESS}/match/pate`, '', {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${userData.token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }).then((res) => {
      if (res.status === 200) {
        setMatches(res.data);
      }
    });

    axios.get(`${API_ADDRESS}/user/userinfo`, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${userData.token}`,
      },
    }).then((res) => {
      if (res.status === 200) {
        setUserAttributes(res.data.bemInformation);
      }
    });
  }, []);

  return (
    <div className={classNames(styles.Search)}>
      <div className={classNames(styles.SearchBar)}>
        <Textfield id="pate-search" type="text" placeholder="Search..." />
      </div>
      <div>
        {matches ? <Results data={matches} userAttributes={userAttributes} /> : <Loading />}
      </div>
    </div>
  );
};

export default Search;

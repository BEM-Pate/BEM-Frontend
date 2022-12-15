import React from 'react';
import classNames from 'classnames';
import styles from './ResultCard.module.scss';
import Headline from '../../../Headline/Headline';

/* import arrowRight from '../../../../images/icons/ui/arrow_right.svg'; */
/* import languageIcon from '../../../../images/icons/ui/language.svg'; */

interface Props {
  firstName: string;
  lastName: string;
  image: string;
  experience: string;
  languages: string[];
  occupation: string[];
  diseases: string[];
  userData: any;
}

const ResultCard = (props: Props) => {
  const {
    firstName, lastName, image, languages, experience, occupation, diseases, userData,
  } = props;
  console.log(userData);
  return (
    <div className={classNames(styles.ResultCard)}>
      <div className={classNames(styles.ResultCardEssentials)}>
        <img src={image} alt="test" />
        <div>
          <Headline headline="h3">{`${firstName} ${lastName}`}</Headline>
          <Headline headline="p">{experience}</Headline>
        </div>
      </div>
      <hr />
      <div className={classNames(styles.ResultCardAdditional)}>

        <Headline headline="p">Berfusgruppe</Headline>
        <div>
          {occupation.map((lang: string, index) => (
            <span
              className={classNames(styles.ResultCardTag)}
              key={index}
            >
              {lang}
            </span>
          ))}

        </div>
        <Headline headline="p">Krankheitsbild</Headline>
        <div>
          {diseases.map((lang: string, index) => (
            <span
              className={classNames(styles.ResultCardTag)}
              key={index}
            >
              {lang}
            </span>
          ))}

        </div>

        <Headline headline="p">Ich spreche</Headline>
        <div>
          {languages.map((lang: string, index) => (
            <span
              className={classNames(styles.ResultCardTag)}
              key={index}
            >
              {lang}
            </span>
          ))}

        </div>
      </div>
    </div>
  );
};

export default ResultCard;

import React, { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import axios from 'axios';
import styles from './ResultCard.module.scss';
import Headline from '../../../Headline/Headline';
import { NormalUserData, PateData } from '../../../../util/types';
import placeholder from '../../../../images/default.png';
import API from '../../../../helpers/api';
import { API_ADDRESS } from '../../../../helpers/env';
import Button from '../../../Button/Button';

interface Props {
  userAttributes: NormalUserData;
  pate: PateData;
  token: string;
}

const ResultCard = (props: Props) => {
  const { userAttributes, pate, token } = props;
  const [imageSrc, setImageSrc] = useState<any>(placeholder);

  useEffect(() => {
    const setUserAvatar = async () => {
      const userAvatar = await API.getUserAvatar(pate.account);
      setImageSrc(userAvatar);
    };
    setUserAvatar();
  }, []);

  const requstContact = useCallback(() => {
    try {
      axios.post(
        `${API_ADDRESS}/match/request-contact/${pate.account}`,
        '',
        {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <div className={classNames(styles.ResultCard)}>
      <div className={classNames(styles.ResultCardEssentials)}>
        <div className={classNames(styles.ResultCardEssentialsImageScore)}>
          <img src={imageSrc} alt={pate.firstName} />
          <span>{`${pate.score === undefined ? pate.score : pate.score * 100} %`}</span>
        </div>
        <div>
          <Headline headline="h3">{`${pate.firstName} ${pate.lastName}`}</Headline>
          <p>{pate.motivation}</p>
        </div>
      </div>
      <hr />
      <div className={classNames(styles.ResultCardAdditional)}>
        <Headline headline="p">Ich spreche</Headline>
        <div>
          {pate.languages.map((lang: string, index) => (
            <span
              className={classNames(
                styles.ResultCardTag,
                userAttributes.languages.includes(lang)
                  ? styles.ResultCardTagActive
                  : '',
              )}
              key={index}
            >
              {lang}
            </span>
          ))}
        </div>
        <Headline headline="p">Berufsfeld</Headline>
        <div>
          <span
            className={classNames(
              styles.ResultCardTag,
              userAttributes.occupation === pate.occupation
                ? styles.ResultCardTagActive
                : '',
            )}
          >
            {' '}
            {pate.occupation}
          </span>
        </div>
      </div>
      <Button styling="outline" onClick={requstContact}>Request Contact</Button>
    </div>
  );
};

export default ResultCard;

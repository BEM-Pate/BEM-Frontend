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
import { Link } from 'react-router-dom';

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

  function within7Days(dateString:string): boolean {
    const diff = new Date().getTime() - new Date(dateString).getTime();
    const diffDays = diff / (1000 * 3600 * 24);
    return diffDays < 7;
  }

  return (
    <Link to={`/dashboard/search/user/${pate.account}`}>
    <div className={classNames(styles.ResultCard)}>
     {within7Days(pate.date!) && <div className={classNames(styles.ResultCardNewTag)}>NEW</div>}
      <img src={imageSrc} alt={pate.firstName}></img>
      <div className={classNames(styles.ResultCardDetails)}>
        <div>
        <Headline className={classNames(styles.ResultCardDetailsName)} headline='p'>{pate.firstName}</Headline>
        <Headline className={classNames(styles.ResultCardDetailsLocation)} headline='p'>{pate.meetingPreference.location}</Headline>
        <div className={classNames(styles.ResultCardDetailsBackground)}></div>
        </div>
      </div>
    </div>
    </Link>
  );
};

export default ResultCard;

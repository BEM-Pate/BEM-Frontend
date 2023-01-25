import React, { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import axios from 'axios';
import styles from './ResultCard.module.scss';
import Headline from '../../../Headline/Headline';
import { UserData, PateData, Match } from '../../../../util/types';
import placeholder from '../../../../images/default.png';
import API from '../../../../helpers/api';
import { API_ADDRESS } from '../../../../helpers/env';
import Button from '../../../Button/Button';
import { Link } from 'react-router-dom';

interface Props {
  userAttributes: UserData;
  match: Match;
  token: string;
}

const ResultCard = (props: Props) => {
  const { userAttributes, match, token } = props;
  const [imageSrc, setImageSrc] = useState<any>(placeholder);

  useEffect(() => {
    const setUserAvatar = async () => {
      const userAvatar = await API.getUserAvatar(match.account);
      setImageSrc(userAvatar);
    };
    setUserAvatar();
  }, []);

  function within7Days(dateString: Date): boolean {
    const diff = new Date().getTime() - new Date(dateString).getTime();
    const diffDays = diff / (1000 * 3600 * 24);
    return diffDays < 7;
  }

  return (
    <Link to={`/dashboard/search/user/${match.account}`}>
    <div className={classNames(styles.ResultCard)}>
     {within7Days(match.date!) && <div className={classNames(styles.ResultCardNewTag)}>NEW</div>}
      <img src={imageSrc} alt={match.firstName}></img>
      <div className={classNames(styles.ResultCardDetails)}>
        <div>
        <Headline className={classNames(styles.ResultCardDetailsName)} headline='p'>{match.firstName}</Headline>
        <Headline className={classNames(styles.ResultCardDetailsLocation)} headline='p'>{match.meetingPreference.location}</Headline>
        <div className={classNames(styles.ResultCardDetailsBackground)}></div>
        </div>
      </div>
    </div>
    </Link>
  );
};

export default ResultCard;

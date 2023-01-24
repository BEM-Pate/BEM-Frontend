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

/*   const requstContact = useCallback(() => {
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
 */

  function within3Days(dateString:string): boolean {
    const diff = new Date().getTime() - new Date(dateString).getTime();
    const diffDays = diff / (1000 * 3600 * 24);
    return diffDays < 7;
  }


  return (
    <div className={classNames(styles.ResultCard)}>
     {within3Days(pate.date!) && <div className={classNames(styles.ResultCardNewTag)}>NEW</div>}
      <img src={imageSrc} alt={pate.firstName}></img>
      <div className={classNames(styles.ResultCardDetails)}>
        <div>
        <Headline className={classNames(styles.ResultCardDetailsName)} headline='p'>{pate.firstName}</Headline>
        <Headline className={classNames(styles.ResultCardDetailsLocation)} headline='p'>{pate.meetingPreference.location}</Headline>
        <div className={classNames(styles.ResultCardDetailsBackground)}></div>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;

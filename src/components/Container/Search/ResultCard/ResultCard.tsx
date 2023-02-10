import React, {useCallback, useEffect, useState} from 'react';
import classNames from 'classnames';
import axios from 'axios';
import styles from './ResultCard.module.scss';
import Headline from '../../../Headline/Headline';
import {UserData, PateData, Match} from '../../../../util/types';
import placeholder from '../../../../images/default.png';
import API from '../../../../helpers/api';
import {API_ADDRESS} from '../../../../helpers/env';
import Button from '../../../Button/Button';
import {Link, useNavigate} from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface Props {
    userAttributes: UserData;
    match: Match;
    token: string;
}

const ResultCard = (props: Props) => {
    const {userAttributes, match, token} = props;
    const [imageSrc, setImageSrc] = useState<any>(placeholder);
    const [betroffenerData, setBetroffenerData] = useState<any>(null)
    const {t} = useTranslation()

    const navigate = useNavigate();

    useEffect( () => {
        if (userAttributes?.baseUserData?.role == "normal_user") {
            const setUserAvatar = async () => {
                const userAvatar = await API.getUserAvatar(match.account);
                setImageSrc(userAvatar);
            };
            setUserAvatar();
        }

        if (userAttributes?.baseUserData?.role == "pate") {
            axios.get(`${API_ADDRESS}/user/userdata/${match}`, {
                headers: {
                    accept: 'application/json'
                }
            }).then(async (res) => {
                setBetroffenerData(res.data)
                const userAvatar = await API.getUserAvatar(res.data._id);
                setImageSrc(userAvatar);
            })
        }

    }, [match, userAttributes]);

    function within7Days(dateString: Date): boolean {
        const diff = new Date().getTime() - new Date(dateString).getTime();
        const diffDays = diff / (1000 * 3600 * 24);
        return diffDays < 7;
    }

    return (
        userAttributes?.baseUserData?.role == "normal_user" ?
            (
                <div
                    onClick={() => navigate(`/dashboard/search/user/${match.account}`, { state: {match , imageSrc}  })} >
                    <div className={classNames(styles.ResultCard)}>
                        {within7Days(match.date!) && <div className={classNames(styles.ResultCardNewTag)}>NEW</div>}
                        <img src={imageSrc} alt={match.firstName}/>
                        <div className={classNames(styles.ResultCardDetails)}>
                            <div>
                                <Headline className={classNames(styles.ResultCardDetailsName)}
                                          headline='p'>{match.firstName}</Headline>
                                <Headline className={classNames(styles.ResultCardDetailsLocation)}
                                          headline='p'>{match?.meetingPreference.location && t(`enum_regions_${match?.meetingPreference.location}`)}</Headline>
                                <div className={classNames(styles.ResultCardDetailsBackground)}/>
                            </div>
                        </div>
                    </div>
                </div>
            ) :
            userAttributes?.baseUserData?.role == "pate" ?
                (
                    <Link
                        to={`/dashboard/search/user/${match}`}>
                        <div className={classNames(styles.ResultCard)}>
                           <div className={classNames(styles.ResultCardNewTag)}>NEW</div>
                            <img src={imageSrc} alt={betroffenerData?.baseUserData?.firstName}/>
                            <div className={classNames(styles.ResultCardDetails)}>
                                <div>
                                    <Headline className={classNames(styles.ResultCardDetailsName)}
                                              headline='p'>{betroffenerData?.baseUserData.firstName}</Headline>
                                    <Headline className={classNames(styles.ResultCardDetailsLocation)}
                                              headline='p'>{betroffenerData?.meetingPreference.location && t(`enum_regions_${betroffenerData?.meetingPreference.location}`)}</Headline>
                                    <div className={classNames(styles.ResultCardDetailsBackground)}/>
                                </div>
                            </div>
                        </div>
                    </Link>
                ):
                null
    );
};

export default ResultCard;

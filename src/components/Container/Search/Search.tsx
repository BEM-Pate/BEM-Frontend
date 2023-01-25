import React, {useEffect, useState} from 'react';
import classNames from 'classnames';
import axios from 'axios';
import styles from './Search.module.scss';
import {API_ADDRESS} from '../../../helpers/env';
import ResultCard from './ResultCard/ResultCard';
import RequestedContactCard from './ResultCard/RequestedContactCard';

import {BaseUserData, PateData} from '../../../util/types';
import {useZustand} from "../../../zustand/store";

interface Props {
    userData: any;
}

interface ResultProps {
    paten: PateData[];
    userAttributes: any;
    token: string;
}

interface ContactRequest {
    userAttributes: any;
    token: string;
}


const Loading = () => (
    <p className={classNames(styles.SearchLoading)}>Loading</p>
);


const Results = (props: ResultProps) => {
    const {paten, userAttributes, token} = props;
    return (
        <div className={classNames(styles.SearchResults)}>
            {paten?.map((pate: PateData, index: any) => (
                <ResultCard
                    token={token}
                    key={index}
                    pate={pate}
                    userAttributes={userAttributes.baseUserData}
                />
            ))}
        </div>
    );
};


const PateSeite = (props: ContactRequest) => {
    const {userAttributes, token} = props;
    const [me, pendingContacts,fetchPendingContacts] = useZustand((state) =>
        [state.user, state.pendingContacts, state.fetchPendingContacts])

    console.log(pendingContacts)

    useEffect(() => {
        fetchPendingContacts()
    },[])


    return (
        <div className={classNames(styles.SearchResults)}>
            {pendingContacts?.map((contact: any, index: any) => (
                <RequestedContactCard
                    key={index}
                    contact={contact}
                    userAttributes={userAttributes.baseUserData}
                    token={token}
                />
            ))}
        </div>

    )
}

const Search = (props: Props) => {
    const {userData} = props;
    const [matches, setMatches] = useState<PateData[]>();
    const [userAttributes, setUserAttributes] = useState<any>();

    // console.log(userAttributes)
    useEffect(() => {
        axios
            .get(`${API_ADDRESS}/user/userdata`, {
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${userData.token}`,
                },
            })
            .then((res) => {
                if (res.status === 200) {
                    setUserAttributes(res.data);
                }
            });

        if(userData?.account?.baseUserData.role== 'normal_user') {
        axios
            .get(`${API_ADDRESS}/match/pate`, {
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${userData.token}`,
                },
            })
            .then((res) => {
                if (res.status === 200) {
                    setMatches(res.data);
                }
            });
        }
    }, []);


    return (
        <div className={classNames(styles.Search)}>
            <div className={classNames(styles.SearchBar)}/>
            <div>
                {matches && userAttributes?.baseUserData?.role == "normal_user" ? (
                    <Results token={userData.token} paten={matches} userAttributes={userAttributes}/>
                ) : userAttributes?.baseUserData?.role == "pate" ? (
                    <PateSeite token={userData.token} userAttributes={userAttributes}/>
                ) : (
                    <Loading/>
                )


                }
            </div>
        </div>
    );
};

export default Search;

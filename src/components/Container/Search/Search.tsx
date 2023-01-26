import React, {useEffect, useState} from "react";
import classNames from "classnames";
import axios from "axios";
import styles from "./Search.module.scss";
import {API_ADDRESS} from "../../../helpers/env";
import ResultCard from "./ResultCard/ResultCard";
import {BaseUserData, Match, PateData} from "../../../util/types";
import Headline from "../../Headline/Headline";
import Button from "../../Button/Button";
import magnifier from "../../../images/icons/ui/magnifier.svg";
import filter from "../../../images/icons/ui/filter.svg";
import Chip from "../../Chip/Chip";
import getEmoji from "../../../helpers/emoji";
import map_placeholder from "../../../images/map_placeholder.png"
import {useZustand} from "../../../zustand/store";
import RequestedContactCard from "./ResultCard/RequestedContactCard";

interface Props {
    userData: any;
}

interface ResultProps {
    paten: Match[];
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

            { paten.length > 0 ? paten.map((match: Match, index: any) => (
                <ResultCard
                    token={token}
                    key={index}
                    match={match}
                    userAttributes={userAttributes}
                />
            )):
            <p style={{marginLeft: "0.4rem"}}>Keine BEM-Paten verfügbar</p>
            }
        </div>
    );
};

const ResultsOfPate = (props: ContactRequest) => {
    const {userAttributes, token} = props;
    const [me, pendingContacts, fetchPendingContacts] = useZustand((state) =>
        [state.user, state.pendingContacts, state.fetchPendingContacts])

    console.log(pendingContacts)

    useEffect(() => {
        fetchPendingContacts()
    }, [])


    return (
        <div className={classNames(styles.SearchResults)} >
            {
                pendingContacts?.length > 0 ?
                    pendingContacts?.map((contact: any, index: any) => (
                        <ResultCard
                            token={token}
                            key={index}
                            match={contact}
                            userAttributes={userAttributes}
                        />
                    ))
                    :
                    <p style={{marginLeft: "0.4rem"}}>Keine neue Kontaktanfrage</p>}
        </div>

    )
}

const Search = (props: Props) =>
{
    const {userData} = props;
    const [matches, setMatches] = useState<Match[]>();
    const [userAttributes, setUserAttributes] = useState<any>();
    const [diseases, setDiseases] = useState<string[]>([]);

    useEffect(() => {
        axios
            .get(`${API_ADDRESS}/user/userdata`, {
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${userData.token}`,
                },
            })
            .then((res) => {
                if (res.status === 200) {
                    setUserAttributes(res.data);
                }
            });

        axios
            .get(`${API_ADDRESS}/match/pate`, {
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${userData.token}`,
                },
            })
            .then((res) => {
                if (res.status === 200) {
                    setMatches(res.data);
                }
            });

        axios
            .get(`${API_ADDRESS}/get/enums/diseases`, {
                headers: {
                    accept: "application/json",
                },
            })
            .then((res) => {
                if (res.status === 200) {
                    setDiseases(res.data);
                }
            });
    }, []);

    return (
        <div className={classNames(styles.Search)}>
            <div className={classNames(styles.SearchHeaders)}>
                <Headline
                    className={classNames(styles.SearchHeadersHeadlineH1)}
                    headline="h1"
                >
                    {userAttributes?.baseUserData?.role == "normal_user" ? " BEM-Pate finden" : "BEM-Kontaktanfragen"}
                </Headline>
                <div style={{display: "flex"}}>
                    <Button
                        icon
                        styling="outline"
                        className={classNames(styles.SearchHeadersButton)}
                    >
                        <img src={magnifier} alt="search"></img>
                    </Button>
                    <Button
                        icon
                        styling="outline"
                        className={classNames(styles.SearchHeadersButton)}
                    >
                        <img src={filter} alt="filter"></img>
                    </Button>
                </div>
            </div>
            <>
                {matches && userAttributes?.baseUserData?.role == "normal_user" ? (
                    <Results
                        token={userData.token}
                        paten={matches}
                        userAttributes={userAttributes}
                    />
                ) : userAttributes?.baseUserData?.role == "pate" ? (
                    <ResultsOfPate token={userData.token} userAttributes={userAttributes}/>
                ) : (
                    <Loading/>
                )}
            </>
            <Headline
                className={classNames(styles.SearchHeadersHeadlineH2)}
                headline="h2"
            >
                Krankheitsbild
            </Headline>
            <div className={classNames(styles.SearchDiseases)}>
                {userAttributes! && diseases.map((disease, index) => {

                    return (
                        <Chip
                            emoji={getEmoji(disease)}
                            id={disease}
                            key={index}
                            selected={userAttributes?.meetingPreference.diseaseConsultation.includes(disease)}
                        >
                            {disease}
                        </Chip>
                    );
                })}
            </div>
            <Headline
                className={classNames(styles.SearchHeadersHeadlineH2)}
                headline="h2"
            >
                {userAttributes?.baseUserData?.role == "normal_user" ? "Standorte von BEM-Paten" : "Standorte von BEM-Betroffenen"}

            </Headline>
            <div className={classNames(styles.SearchMap)}>
                <img src={map_placeholder} alt="map"></img>
            </div>
        </div>
    );
}
;

export default Search;

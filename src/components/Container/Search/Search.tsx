import React, {useCallback, useEffect, useState} from "react";
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
import {useNavigate} from "react-router-dom";
import {BottomSheet} from "react-spring-bottom-sheet";
import Dropdown from "../../Dropdown/Dropdown";
import CheckboxList from "../../CheckboxList/CheckboxList";
import qs from "qs";
import Textfield from "../../Textfield/Textfield";
import {useTranslation} from "react-i18next";
import API from "../../../helpers/api";
import {FormOption} from "../../FormularStepper/FormularTypes";
import LanguageDropdown from "../../LanguageDropdown/LanguageDropdown";

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

interface FilterData {
    diseases?: string[];
    location?: string;
    meeting?: string[];
    ageRange?: string[];
}

const Loading = () => (
    <p className={classNames(styles.SearchLoading)}>Loading</p>
);

const Results = (props: ResultProps) => {
    const {paten, userAttributes, token} = props;
    return (
        <div className={classNames(styles.SearchResults)}>
            {paten.length > 0 ? (
                paten.map((match: Match, index: any) => (
                    <ResultCard
                        token={token}
                        key={index}
                        match={match}
                        userAttributes={userAttributes}
                    />
                ))
            ) : (
                <p style={{marginLeft: "0.4rem"}}>Keine BEM-Paten verfügbar</p>
            )}
        </div>
    );
};

const ResultsOfPate = (props: ContactRequest) => {
    const {userAttributes, token} = props;
    const [me, pendingContacts, fetchPendingContacts] = useZustand((state) => [
        state.user,
        state.pendingContacts,
        state.fetchPendingContacts,
    ]);

    console.log(pendingContacts);

    useEffect(() => {
        fetchPendingContacts();
    }, []);

    return (
        <div className={classNames(styles.SearchResults)}>
            {pendingContacts?.length > 0 ? (
                pendingContacts?.map((contact: any, index: any) => (
                    <ResultCard
                        token={token}
                        key={index}
                        match={contact}
                        userAttributes={userAttributes}
                    />
                ))
            ) : (
                <p style={{marginLeft: "0.4rem"}}>Keine neue Kontaktanfrage</p>
            )}
        </div>
    );
};

const Search = (props: Props) => {
    const {userData} = props;
    const [matches, setMatches] = useState<Match[]>();
    const [userAttributes, setUserAttributes] = useState<any>();
    const [openFilter, setOpenFilter] = useState<boolean>(false);
    const [filterData, setfilterData] = useState<FilterData>({});

    const [ageranges, setAgeranges] = useState<FormOption[]>([]);
    const [diseases, setDiseases] = useState<FormOption[]>([]);
    const navigate = useNavigate();

    const {t} = useTranslation();

    const handleChange = (value: string, name: string) => {
        setfilterData({...filterData, [name]: value});
    };

    const applyFilter = useCallback(async () => {
        console.log("apply filter");
        const encodedJson = encodeURIComponent(JSON.stringify(filterData));
        try {
            axios
                .get(`${API_ADDRESS}/match/pate?filterobject=${encodedJson}`, {
                    headers: {
                        accept: "application/json",
                        Authorization: `Bearer ${userData.token}`,
                    },
                })
                .then((res) => {
                    console.log(res);
                    setMatches(res.data);
                });
        } catch (error) {
            console.error(error);
        }
        setOpenFilter(false);
    }, [filterData, userData]);

    useEffect(() => {
        console.log("t")
        const init = async () => {
            const d = await API.getEnums("diseases");
            const a = await API.getEnums("ageranges");

            setDiseases(
                d.map(
                    (s) =>
                        ({
                            value: s,
                            label: t(`enum_diseases_${s}`),
                        } as FormOption)
                )
            );
            setAgeranges(
                a.map(
                    (s) =>
                        ({
                            value: s,
                            label: t(`enum_ageranges_${s}`),
                        } as FormOption)
                )
            );
        };
        init();
    }, [t]);

    useEffect(() => {
        if(!userData) return
        console.log("2")
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

        if (userData?.baseUserData?.role === "normal_user") {
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
        }

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

    // console.log(filterData)
    console.log("sds")
    return (
        <div className={classNames(styles.Search)}>
            <div className={classNames(styles.SearchHeaders)}>
                <Headline
                    className={classNames(styles.SearchHeadersHeadlineH1)}
                    headline="h1"
                >
                    {userAttributes?.baseUserData?.role === "normal_user"
                        ? " BEM-Pate finden"
                        : "BEM-Kontaktanfragen"}
                </Headline>
                <div style={{display: "flex"}}>
                    <Button
                        icon
                        styling="outline"
                        onClick={() => navigate("/dashboard/category")}
                        className={classNames(styles.SearchHeadersButton)}
                    >
                        <img src={magnifier} alt="search"></img>
                    </Button>
                    <Button
                        icon
                        onClick={() => setOpenFilter(true)}
                        styling="outline"
                        className={classNames(styles.SearchHeadersButton)}
                    >
                        <img src={filter} alt="filter"></img>
                    </Button>
                </div>
            </div>
            <>
                {matches && userAttributes?.baseUserData?.role === "normal_user" ? (
                    <Results
                        token={userData.token}
                        paten={matches}
                        userAttributes={userAttributes}
                    />
                ) : userAttributes?.baseUserData?.role === "pate" ? (
                    <ResultsOfPate
                        token={userData.token}
                        userAttributes={userAttributes}
                    />
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
                {userAttributes! &&
                diseases.map((disease, index) => {
                    return (
                        <Chip
                            emoji={getEmoji(disease?.value)}
                            id={disease?.value}
                            key={index}
                            selected={userAttributes?.meetingPreference.diseaseConsultation.includes(
                                disease.value
                            )}
                        >
                            {disease.label}
                        </Chip>
                    );
                })}
            </div>

            <Headline
                className={classNames(styles.SearchHeadersHeadlineH2)}
                headline="h2"
            >
                {userAttributes?.baseUserData?.role === "normal_user"
                    ? "Standorte von BEM-Paten"
                    : "Standorte von BEM-Betroffenen"}
            </Headline>
            <div className={classNames(styles.SearchMap)}>
                <img src={map_placeholder} alt="map"/>
            </div>
            <BottomSheet open={openFilter} onDismiss={() => setOpenFilter(false)}>
                <div className={classNames(styles.SearchFilter)}>
                    <Headline
                        className={classNames(styles.SearchFilterHeadline)}
                        headline="h2"
                    >
                        Filter
                    </Headline>
                    <div>
                        <Headline
                            className={classNames(styles.SearchFilterSubtitle)}
                            headline="h3"
                        >
                            Präferenzen für Treffen
                        </Headline>
                        <CheckboxList
                            className={classNames(styles.SearchFilterBox)}
                            onChange={(e) => handleChange(e, "meeting")}
                            id="meeting"
                            options={[
                                {label: "In Person", value: "IN_PERSON"},
                                {label: "Virtuell", value: "VIRTUAL"},
                            ]}
                        />
                    </div>
                    <div>
                        <Headline
                            className={classNames(styles.SearchFilterSubtitle)}
                            headline="h3"
                        >
                            Region
                        </Headline>
                        <Textfield
                            id="filter_location"
                            defaultValue={filterData?.location}
                            onChange={(e) => handleChange(e, "location")}
                        />
                    </div>
                    <div>
                        <Headline
                            className={classNames(styles.SearchFilterSubtitle)}
                            headline="h3"
                        >
                            Altersspanne
                        </Headline>
                        <Dropdown
                            defaultValue={filterData.ageRange}
                            multiple
                            onChange={(e) => handleChange(e, "ageRange")}
                            id="ageranges"
                            options={ageranges}
                        />
                    </div>
                    <div className={classNames(styles.SearchFilterButtons)}>
                        <Button styling="outline" onClick={() => setOpenFilter(false)}>Cancel</Button>
                        <Button onClick={applyFilter}>Submit</Button>
                    </div>
                </div>
            </BottomSheet>
        </div>
    );
};
export default Search;

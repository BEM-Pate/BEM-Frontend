import React, { useCallback, useEffect, useState } from "react";
import classNames from "classnames";
import axios from "axios";
import styles from "./Search.module.scss";
import { API_ADDRESS } from "../../../helpers/env";
import ResultCard from "./ResultCard/ResultCard";
import { BaseUserData, Match, PateData } from "../../../util/types";
import Headline from "../../Headline/Headline";
import Button from "../../Button/Button";
import magnifier from "../../../images/icons/ui/magnifier.svg";
import filter from "../../../images/icons/ui/filter.svg";
import map_placeholder from "../../../images/map_placeholder.png";
import { useZustand } from "../../../zustand/store";
import { useNavigate } from "react-router-dom";
import { BottomSheet } from "react-spring-bottom-sheet";
import Dropdown from "../../Dropdown/Dropdown";
import CheckboxList from "../../CheckboxList/CheckboxList";
import Textfield from "../../Textfield/Textfield";
import { useTranslation } from "react-i18next";
import API from "../../../helpers/api";
import { FormOption } from "../../FormularStepper/FormularTypes";
import ChipList from "../../ChipList/ChipList";

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
  const { paten, userAttributes, token } = props;
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
        <p style={{ marginLeft: "0.4rem" }}>Keine BEM-Paten verfügbar</p>
      )}
    </div>
  );
};

const ResultsOfPate = (props: ContactRequest) => {
  const { userAttributes, token } = props;
  const [me, pendingContacts, fetchPendingContacts] = useZustand((state) => [
    state.user,
    state.pendingContacts,
    state.fetchPendingContacts,
  ]);

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
        <p style={{ marginLeft: "0.4rem" }}>Keine neue Kontaktanfrage</p>
      )}
    </div>
  );
};

const Search = (props: Props) => {
  const { userData } = props;
  const [matches, setMatches] = useState<Match[]>();
  const [userAttributes, setUserAttributes] = useState<any>();
  const [openFilter, setOpenFilter] = useState<boolean>(false);

  const [filterAgeRange, setFilterAgeRange] = useState<string[]>([]);
  const [filterMeeting, setFilterMeeting] = useState<string[]>([]);
  const [filterDiseases, setFilterDiseases] = useState<string[]>([]);
  const [filterLocation, setFilterLocation] = useState<string>("");

  const [ageranges, setAgeranges] = useState<FormOption[]>([]);
  const [diseases, setDiseases] = useState<FormOption[]>([]);
  const navigate = useNavigate();

  const { t } = useTranslation();

  const applyFilter = useCallback(async () => {
    if(userAttributes?.baseUserData.role === "normal_user") {
      const encodedJson = encodeURIComponent(JSON.stringify({location: filterLocation, meeting: filterMeeting, diseases: filterDiseases, ageRange: filterAgeRange}));
      try {
        axios
          .get(`${API_ADDRESS}/match/pate?filterobject=${encodedJson}`, {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${userData.token}`,
            },
          })
          .then((res) => {
            setMatches(res.data);
          });
      } catch (error) {
        console.error(error);
      }
    }
   
  }, [filterLocation, userData, filterMeeting, filterAgeRange, filterDiseases, userAttributes]);

  

  useEffect(() => {
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
    if (!userData) return;
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
  }, []);

  useEffect(() => {
    applyFilter(); 
  }, [filterDiseases])

  

  return (
    <div className={classNames(styles.Search)}>
      <div className={classNames(styles.SearchHeaders)}>
        <Headline
          className={classNames(styles.SearchHeadersHeadlineH1)}
          headline="h1"
        >
          {userData?.baseUserData?.role === "normal_user"
            ? " BEM-Pate finden"
            : "BEM-Kontaktanfragen"}
        </Headline>
        <div style={{ display: "flex" }}>
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
          <Loading />
        )}
      </>
      <Headline
        className={classNames(styles.SearchHeadersHeadlineH2)}
        headline="h2"
      >
        Krankheitsbilder
      </Headline>
      <div className={classNames(styles.SearchDiseases)}>
        <ChipList id="d" options={diseases} onChange={setFilterDiseases}></ChipList>
      </div>

      <Headline
        className={classNames(styles.SearchHeadersHeadlineH2)}
        headline="h2"
      >
        {userData?.baseUserData?.role === "normal_user"
          ? "Standorte von BEM-Paten"
          : "Standorte von BEM-Betroffenen"}
      </Headline>
      <div className={classNames(styles.SearchMap)}>
        <img src={map_placeholder} alt="map" />
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
              onChange={setFilterMeeting}
              id="meeting"
              options={[
                { label: "In Person", value: "IN_PERSON" },
                { label: "Virtuell", value: "VIRTUAL" },
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
              defaultValue={filterLocation!}
              onChange={setFilterLocation}
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
              defaultValue={filterAgeRange}
              multiple
               onChange={setFilterAgeRange}
              id="ageranges"
              options={ageranges}
            />
          </div>
          <div className={classNames(styles.SearchFilterButtons)}>
            <Button styling="outline" onClick={() => setOpenFilter(false)}>
              Cancel
            </Button>
            <Button onClick={() => {setOpenFilter(false); applyFilter()}}>Submit</Button>
          </div>
        </div>
      </BottomSheet>
    </div>
  );
};
export default Search;

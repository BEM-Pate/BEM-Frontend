import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import axios from 'axios';
import styles from './Search.module.scss';
import { API_ADDRESS } from '../../../helpers/env';
import ResultCard from './ResultCard/ResultCard';
import { PateData } from '../../../util/types';
import Headline from '../../Headline/Headline';
import Button from '../../Button/Button';
import magnifier from "../../../images/icons/ui/magnifier.svg";
import filter from "../../../images/icons/ui/filter.svg";


interface Props {
  userData: any;
}

interface ResultProps {
  paten: PateData[];
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
      {paten.map((pate: PateData, index: any) => (
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

const Search = (props: Props) => {
  const { userData } = props;
  const [matches, setMatches] = useState<PateData[]>();
  const [userAttributes, setUserAttributes] = useState(null);

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
  }, []);

  return (
    <div className={classNames(styles.Search)}>
      <div className={classNames(styles.SearchHeaders)}>
        <Headline className={classNames(styles.SearchHeadersHeadlineH1)} headline='h1'>BEM-Pate finden</Headline>
      <div>
      <Button icon styling='outline' className={classNames(styles.SearchHeadersButton)}>
        <img src={magnifier} alt="search"></img>
      </Button>
      <Button icon styling='outline' className={classNames(styles.SearchHeadersButton)} >
      <img src={filter} alt="filter"></img>
      </Button>
      </div>
      </div>
      <>
        {matches ? (
          <Results token={userData.token} paten={matches} userAttributes={userAttributes} />
        ) : (
          <Loading />
        )}
      </>
    </div>
  );
};

export default Search;

import React, { useEffect, useState } from "react";
import classNames from "classnames";
import styles from "./MatchList.module.scss";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { API_ADDRESS } from "../../helpers/env";
import { Match } from "../../util/types";
import placeholder from "../../images/default.png";
import API from "../../helpers/api";
import Headline from "../Headline/Headline";

interface Props {
  disease: string;
  token: string;
}
const MatchList = (props: Props) => {
  const { disease, token } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [matches, setMatches] = useState<Match[]>([]);
  const [imgs, setImgs] = useState<any>([]);

  useEffect(() => {
    const init = async () => {
      const encodedJson = encodeURIComponent(
        JSON.stringify({ diseases: [disease] })
      );
      const res = await axios.get(
        `${API_ADDRESS}/match/pate?filterobject=${encodedJson}`,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMatches(res.data);
    };
    init();
  }, [token, disease]);

  useEffect(() => {
    setImgs([]);
    const init = async () => {
      for (const match of matches) {
        const res = await API.getUserAvatar(match.account);
        setImgs((prev: any) => [...prev, res]);
      }
    };

    init();
  }, [matches]);

  return (

    <div className={classNames(styles.MatchList)}>
      {matches.map((match, index) => {
        return (
          <div
            className={classNames(styles.MatchListItem)}
            key={index}
            onClick={() => navigate(`/dashboard/search/user/${match.account}`, { state: {match }  })}
            style={{ backgroundImage: `url(${imgs[index] || placeholder})` }}
          >
            <div className={classNames(styles.MatchListItemDetails)}>
            <div
                className={classNames(styles.MatchListItemDetailsBackground)}
              />
              <div className={classNames(styles.MatchListItemDetailsInfo)}>
                <Headline headline="h2">{match?.firstName}</Headline>
                <Headline styling="caps" headline="h2">
                  {match?.meetingPreference.location && t(`enum_regions_${match?.meetingPreference.location}`)}
                </Headline>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MatchList;

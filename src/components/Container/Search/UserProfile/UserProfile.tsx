import React, { useCallback, useEffect, useState } from "react";
import classNames from "classnames";
import axios from "axios";
import styles from "./UserProfile.module.scss";
import { useParams, useNavigate } from "react-router";
import Button from "../../../Button/Button";
import API from "../../../../helpers/api";

import placeholder from "../../../../images/default.png";
import { API_ADDRESS } from "../../../../helpers/env";
import Headline from "../../../Headline/Headline";
import back_arrow from "../../../../images/icons/ui/arrow_back.svg";
import request_chat from "../../../../images/icons/ui/request_chat.svg";
import { PateData } from "../../../../util/types";
import Chip from "../../../Chip/Chip";
import getEmoji from "../../../../helpers/emoji";

import map_placeholder from "../../../../images/map_placeholder.png"
import male from "../../../../images/icons/ui/male.svg";
import female from "../../../../images/icons/ui/female.svg";
import calendar from "../../../../images/icons/ui/calendar.svg";
import meeting from "../../../../images/icons/ui/meeting.svg";


interface Props {
  userData: any;
}

const UserProfile = (props: Props) => {
  const { id } = useParams();
  const { userData } = props;
  const navigate = useNavigate();
  const [pateAvatar, setUserPateAvatar] = useState<any>(placeholder);
  const [pateData, setPateData] = useState<PateData>();

  useEffect(() => {
    const getPateData = async () => {
      const avatar = await API.getUserAvatar(id!);
      const data = await API.getBaseUserData(userData.token);
      setUserPateAvatar(avatar);
      setPateData(data as PateData);
    };
    getPateData();
  }, []);

  const requstContact = useCallback(() => {
    try {
      axios.post(`${API_ADDRESS}/match/request-contact/${id}`, "", {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${userData.token}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
    } catch (err) {
      console.error(err);
    }
  }, []);

  console.log(pateData);

  return (
    <div className={classNames(styles.UserProfile)}>
      <div className={classNames(styles.UserProfileHeader)}>
        <img src={pateAvatar} alt="pateAvatar"></img>
        <div className={classNames(styles.UserProfileHeaderBackground)}></div>
        <div className={classNames(styles.UserProfileHeaderContainer)}>
          <Button
            className={classNames(styles.UserProfileHeaderContainerBack)}
            onClick={() => navigate(-1)}
            icon
          >
            <img src={back_arrow} alt="back_arrow"></img>
          </Button>
          <div className={classNames(styles.UserProfileHeaderContainerDetails)}>
            <Headline
              className={classNames(
                styles.UserProfileHeaderContainerDetailsName
              )}
              headline="h1"
            >
              {`${pateData?.firstName} ${pateData?.lastName}`}
            </Headline>
            <Headline
              className={classNames(
                styles.UserProfileHeaderContainerDetailsLocation
              )}
              headline="h1"
            >
              {pateData?.meetingPreference.location}
            </Headline>
            <Button
              className={classNames(
                styles.UserProfileHeaderContainerDetailsRequest
              )}
              onClick={requstContact}
            >
              <img src={request_chat} alt="back_arrow"></img>
              <span>Hallo sagen</span>
            </Button>
          </div>
        </div>
      </div>
      <div className={classNames(styles.UserProfileInformation)}>
        <div className={classNames(styles.UserProfileInformationNotch)} />
        <div className={classNames(styles.UserProfileInformationBaseContainer)}>
        <Headline
          className={classNames(styles.UserProfileInformationHeadline)}
          headline="h6"
        >
          Erfahrungen & Motivation
        </Headline>
        <p>{pateData?.experience}</p>
        </div>
        <div className={classNames(styles.UserProfileInformationBaseContainer)}>
        <Headline
          className={classNames(styles.UserProfileInformationHeadline)}
          headline="h6"
        >
          Krankheitsbild
        </Headline>
          <Chip id="OVERLOAD" emoji={getEmoji("OVERLOAD")}>
            Overload
          </Chip>
          <Chip id="BURNOUT" emoji={getEmoji("BURNOUT")}>
            Burnout
          </Chip>
          <Chip id="FEAR" selected emoji={getEmoji("FEAR")}>
            Angst
          </Chip>
        </div>
        <div className={classNames(styles.UserProfileMisc)}>
            <div className={classNames(styles.UserProfileMiscItem)}>
                <div>
                    <img src={pateData?.gender === "FEMALE" ? female : male} alt="gender"/>
                </div>
                <div>
               <Headline className={classNames(styles.UserProfileMiscHeadline)} headline="h6">Geschlecht</Headline>
                <p>{pateData?.gender}</p>
               </div>
            </div>
            <div className={classNames(styles.UserProfileMiscItem)}>
                <div>
                    <img src={calendar} alt="calendar"/>
                </div>
                <div>
               <Headline className={classNames(styles.UserProfileMiscHeadline)} headline="h6">Alter</Headline>
                <p>54 Jahre alt</p>
               </div>
            </div>
            <div className={classNames(styles.UserProfileMiscItem)}>
                <div>
                    <img src={meeting} alt="meeting"/>
                </div>
               <div>
               <Headline className={classNames(styles.UserProfileMiscHeadline)} headline="h6">Treffen</Headline>
                <p>virtuell & persönlich</p>
               </div>
            </div>
        </div>
        <div className={classNames(styles.UserProfileInformationBaseContainer)}>
          <Headline
            className={classNames(styles.UserProfileInformationHeadline)}
            headline="h6"
          >
            Berufsfeld
          </Headline>
          <Chip id={pateData?.occupation!}>{pateData?.occupation}</Chip>{" "}
        </div>
        <div className={classNames(styles.UserProfileInformationBaseContainer)}>
          <Headline
            className={classNames(styles.UserProfileInformationHeadline)}
            headline="h6"
          >
            Standort
          </Headline>
          <img src={ map_placeholder} alt="map"></img>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

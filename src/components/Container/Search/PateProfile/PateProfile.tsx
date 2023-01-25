import React, { useEffect, useState } from "react";
import classNames from "classnames";
import axios from "axios";
import styles from "./PateProfile.module.scss";
import { useParams, useNavigate } from "react-router";
import Button from "../../../Button/Button";
import API from "../../../../helpers/api";

import placeholder from "../../../../images/default.png";
import { API_ADDRESS } from "../../../../helpers/env";
import Headline from "../../../Headline/Headline";
import back_arrow from "../../../../images/icons/ui/arrow_back.svg";
import request_chat from "../../../../images/icons/ui/request_chat.svg";
import { PateData, UserData } from "../../../../util/types";
import Chip from "../../../Chip/Chip";
import getEmoji from "../../../../helpers/emoji";

import map_placeholder from "../../../../images/map_placeholder.png"
import male from "../../../../images/icons/ui/male.svg";
import female from "../../../../images/icons/ui/female.svg";
import calendar from "../../../../images/icons/ui/calendar.svg";
import meeting from "../../../../images/icons/ui/meeting.svg";
import Paragraph from "../../../Paragraph/Paragraph";


interface Props {
  userData: any;
}

const PateProfile = (props: Props) => {
  const { id } = useParams();
  const { userData } = props;
  const navigate = useNavigate();
  const [pateAvatar, setUserPateAvatar] = useState<any>(placeholder);
  const [pateData, setPateData] = useState<PateData>();
  const [userAttributes, setUserAttributes] = useState<UserData>();


  useEffect(() => {
    const getPateData = async () => {
      const avatar = await API.getUserAvatar(id!);
      const data = await API.getPate(id!);
      const user = await API.getBaseUserData(userData.token)
      setUserAttributes(user);
      setUserPateAvatar(avatar);
      setPateData(data as PateData);
    };
    getPateData();
  }, [userData.token, id]);

  const requstContact = () => {
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
  }

  console.log(userAttributes)

  return (
    <div className={classNames(styles.PateProfile)}>
      <div className={classNames(styles.PateProfileHeader)}>
        <img src={pateAvatar} alt="pateAvatar"></img>
        <div className={classNames(styles.PateProfileHeaderBackground)}></div>
        <div className={classNames(styles.PateProfileHeaderContainer)}>
          <Button
            className={classNames(styles.PateProfileHeaderContainerBack)}
            onClick={() => navigate(-1)}
            icon
          >
            <img src={back_arrow} alt="back_arrow"></img>
          </Button>
          <div className={classNames(styles.PateProfileHeaderContainerDetails)}>
            <Headline
              className={classNames(
                styles.PateProfileHeaderContainerDetailsName
              )}
              headline="h1"
            >
             {`${pateData?.baseUserData.firstName} ${pateData?.baseUserData.lastName}`}
            </Headline>
            <Headline
              className={classNames(
                styles.PateProfileHeaderContainerDetailsLocation
              )}
              headline="h1"
            >
              {pateData?.meetingPreference.location}
            </Headline>
            <Button
              className={classNames(
                styles.PateProfileHeaderContainerDetailsRequest
              )}
              onClick={requstContact}
            >
              <img src={request_chat} alt="back_arrow"></img>
              <span>Hallo sagen</span>
            </Button>
          </div>
        </div>
      </div>
      <div className={classNames(styles.PateProfileInformation)}>
        <div className={classNames(styles.PateProfileInformationNotch)} />
        <div className={classNames(styles.PateProfileInformationBaseContainer)}>
        <Headline
          className={classNames(styles.PateProfileInformationHeadline)}
          headline="h6"
        >
          Erfahrungen & Motivation
        </Headline>
       <Paragraph collapse>
        {pateData?.baseUserData.experience}
        <br/>
        <br/>
        {pateData?.baseUserData.motivation}
       </Paragraph>
        </div>
        <div className={classNames(styles.PateProfileInformationBaseContainer)}>
        <Headline
          className={classNames(styles.PateProfileInformationHeadline)}
          headline="h6"
        >
          Krankheitsbild
        </Headline>
         <div>
        {
          pateData?.meetingPreference.diseaseConsultation?.map((disease, index) => {
           return <Chip toggleAble={false} key={index} id={disease} selected={userAttributes?.meetingPreference.diseaseConsultation?.includes(disease)} emoji={getEmoji(disease)}>
            {disease}
          </Chip>
         
          })
        }
         </div>
        </div>
        <div className={classNames(styles.PateProfileMisc)}>
            <div className={classNames(styles.PateProfileMiscItem)}>
                <div>
                    <img src={pateData?.baseUserData.gender === "FEMALE" ? female : male} alt="gender"/>
                </div>
                <div>
               <Headline className={classNames(styles.PateProfileMiscHeadline)} headline="h6">Geschlecht</Headline>
                <p>{pateData?.baseUserData.gender}</p>
               </div>
            </div>
            <div className={classNames(styles.PateProfileMiscItem)}>
                <div>
                    <img src={calendar} alt="calendar"/>
                </div>
                <div>
               <Headline className={classNames(styles.PateProfileMiscHeadline)} headline="h6">Alter</Headline>
                <p>{pateData?.baseUserData.ageRange}</p>
               </div>
            </div>
            <div className={classNames(styles.PateProfileMiscItem)}>
                <div>
                    <img src={meeting} alt="meeting"/>
                </div>
               <div>
               <Headline className={classNames(styles.PateProfileMiscHeadline)} headline="h6">Treffen</Headline>
                <p>{pateData?.meetingPreference.meeting?.map((meeting) => {
                  return <><span>{meeting}</span><br/></>
                })}</p>
               </div>
            </div>
        </div>
        <div className={classNames(styles.PateProfileInformationBaseContainer)}>
          <Headline
            className={classNames(styles.PateProfileInformationHeadline)}
            headline="h6"
          >
            Berufsfeld
          </Headline>
          <Chip id={pateData?.baseUserData.occupation!}>{pateData?.baseUserData.occupation}</Chip>{" "}
        </div>
        <div className={classNames(styles.PateProfileInformationBaseContainer)}>
          <Headline
            className={classNames(styles.PateProfileInformationHeadline)}
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

export default PateProfile;

/* eslint-disable */
import React, { useCallback, useEffect, useState } from "react";
import classNames from "classnames";
import axios from "axios";
import styles from "./Profile.module.scss";
import API from "../../../helpers/api";
import Textfield from "../../Textfield/Textfield";
import { UserData, PateData, MeetingPreference } from "../../../util/types";
import { API_ADDRESS } from "../../../helpers/env";
import Button from "../../Button/Button";
import Textarea from "../../Textarea/Textarea";
import Dropdown from "../../Dropdown/Dropdown";
import { FormOption } from "../../FormularStepper/FormularTypes";
import back_arrow from "../../../images/icons/ui/arrow_back.svg";
import Headline from "../../Headline/Headline";
import placeholder from "../../../images/default.png";
import camera from "../../../images/icons/ui/camera.svg";
import { useNavigate } from "react-router-dom";
import { t } from "i18next";
import ChipList from "../../ChipList/ChipList";
import CheckboxList from "../../CheckboxList/CheckboxList";
import FileInput from "../../FileInput/FileInput";

interface Props {
  userData: any;
}

const Profile = (props: Props) => {
  const { userData } = props;

  const [userAttributes, setUserAttributes] = useState<UserData | PateData>();
  const [avatar, setAvatar] = useState<any>(placeholder);

  const [updatedDiseases, setUpdatededDiseases] = useState<string[]>();
  const [updatedMeetings, setUpdatededMeetings] = useState<string[]>();
  const [updatedSupports, setUpdatededSupports] = useState<string[]>();
  const [updatedLocations, setUpdatedLocations] = useState<string>();

  const [updatedMotivation, setupdatedMotivation] = useState<string>();
  const [updatedExperience, setUpdatedExperience] = useState<string>();

  const [updatedOccupation, setUpdatededOccupation] = useState<string>();
  const [updatedAvatar, setUpdatedAvatar] = useState<File | null>(null);

  const [updatedFirstName, setUpdatededFirstName] = useState<string>();
  const [updatedLastName, setUpdatededLastName] = useState<string>();

  const [diseases, setDiseases] = useState<FormOption[]>([]);
  const [supports, setSupports] = useState<FormOption[]>([]); //TODO: Dropdown gets to large
  const [meetings, setMeetings] = useState<FormOption[]>([]);
  const [locations, setLocations] = useState<FormOption[]>([]);
  const [occupations, setOccupations] = useState<FormOption[]>([]); //TODO: Dropdown gets to large

  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      const data = await API.getBaseUserData(userData.token);
      const avatar = await API.getUserAvatar(userData.baseUserData.account);

      try {
        const [sup, d, m, o] = await Promise.all([
          (
            await axios.get(`${API_ADDRESS}/get/enums/supports`)
          ).data as string[],
          (
            await axios.get(`${API_ADDRESS}/get/enums/diseases`)
          ).data as string[],
          (
            await axios.get(`${API_ADDRESS}/get/enums/meetings`)
          ).data as string[],
          (
            await axios.get(`${API_ADDRESS}/get/enums/occupations`)
          ).data as string[],
        ]);

        setSupports(
          sup.map(
            (s) =>
              ({
                value: s,
                label: t(`enum_supports_${s}`),
              } as FormOption)
          )
        );
        setDiseases(
          d.map(
            (s) =>
              ({
                value: s,
                label: t(`enum_diseases_${s}`),
              } as FormOption)
          )
        );
        setMeetings(
          m.map(
            (s) =>
              ({
                value: s,
                label: t(`enum_meetings_${s}`),
              } as FormOption)
          )
        );
        setLocations(
          [
            "BW",
            "BV",
            "BE",
            "BB",
            "HB",
            "HH",
            "HE",
            "NI",
            "MV",
            "NW",
            "RP",
            "SL",
            "SN",
            "ST",
            "SH",
            "TH",
          ].map((value) => ({
            value: value,
            label: t(`enum_regions_${value}`),
          }))
        );
        setOccupations(
          o.map(
            (s) =>
              ({
                value: s,
                label: t(`enum_occupations_${s}`),
              } as FormOption)
          )
        );
      } catch (e) {
        console.error(e);
      }

      setAvatar(avatar);
      setUserAttributes(data);
    };
    init();
  }, []);

  const updateUserData = useCallback(() => {
    try {
      axios
        .put(
          `${API_ADDRESS}/user/userdata`,
          {
            baseUserData: {
              firstName: updatedFirstName,
              lastName: updatedLastName,
              occupation: updatedOccupation,
              experience: updatedExperience,
              motivation: updatedMotivation,
            },
            meetingPreference: {
              diseaseConsultation: updatedDiseases,
              support: updatedSupports,
              meeting: updatedMeetings,
              location: updatedLocations,
            },
          },
          {
            headers: {
              accept: "*/*",
              Authorization: `Bearer ${userData.token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => console.log(res));
    } catch (err) {
      console.error(err);
    }
  }, [
    updatedFirstName,
    updatedLastName,
    updatedOccupation,
    updatedDiseases,
    updatedSupports,
    updatedMeetings,
    updatedLocations,
    updatedExperience,
    updatedMotivation,
  ]);

  const updateAvatar = useCallback(
    (e: any) => {
      console.log(e);
    },
    [updatedAvatar]
  );

  function userIsPate(object: any): object is PateData {
    return object === undefined ? false : object.baseUserData.role === "pate";
  }

  useEffect(() => {
    if (updatedAvatar) {
      const init = async () => {
        const avatarData = new FormData();
        avatarData.append("avatar", updatedAvatar, updatedAvatar.name);
        const avatarResult = await axios.post(
          `${API_ADDRESS}/user/avatar`,
          avatarData,
          {
            headers: {
              Authorization: `Bearer ${userData.token}`,
              "Content-Type": "multipart/form-data",
            },
          }
          );
          if( avatarResult.status === 200) {
            setAvatar(URL.createObjectURL(updatedAvatar))
          }
        };
        init();
    }
  }, [updatedAvatar, userData]);

  return (
    <div className={classNames(styles.Profile)}>
      <div className={classNames(styles.ProfileHeader)}>
        <Button
          icon
          onClick={() => navigate(-1)}
          className={classNames(styles.ProfileHeaderButton)}
        >
          <img src={back_arrow} alt="back"></img>
        </Button>
        <Headline
          className={classNames(styles.ProfileHeaderHeadline)}
          headline="h1"
        >
          Profil anpassen
        </Headline>
      </div>
      <div className={classNames(styles.ProfilePicture)}>
        <img src={avatar} alt="profile_picture"></img>
        <Button className={classNames(styles.ProfilePictureButton)}>
          <label htmlFor="updateAvatar">
            <img src={camera} alt="change_photo"></img>
            Foto Ändern
            <input
              multiple={false}
              id="updateAvatar"
              accept="image/png, image/jpeg, image/jpeg4, image/jpeg"
              className={classNames(styles.ProfilePictureButtonInput)}
              onChange={(e) =>
                setUpdatedAvatar(e.target.files && e.target.files[0])
              }
              type="file"
            ></input>
          </label>
        </Button>
      </div>
      <Headline headline="h2" className={styles.ProfileHeadline}>
        persönliche angaben
      </Headline>
      <Textfield
        onChange={setUpdatededFirstName}
        id="firstName"
        label="Vorname"
        defaultValue={userAttributes?.baseUserData.firstName}
      ></Textfield>
      <Textfield
        id="lastName"
        label="Nachname"
        onChange={setUpdatededLastName}
        defaultValue={userAttributes?.baseUserData.lastName}
      ></Textfield>
      {userIsPate(userAttributes) && (
        <Textarea
          label="Erfahrung"
          onChange={setUpdatedExperience}
          defaultValue={userAttributes?.baseUserData.experience}
          id="experince"
        ></Textarea>
      )}
      {userIsPate(userAttributes) && (
        <Textarea
          label="Motivation"
          onChange={setupdatedMotivation}
          defaultValue={userAttributes?.baseUserData.motivation}
          id="motivation"
        ></Textarea>
      )}
      <div className={classNames(styles.ProfileDiseases)}>
        <ChipList
          id="diseases"
          onChange={setUpdatededDiseases}
          options={diseases}
          defaultValue={userAttributes?.meetingPreference.diseaseConsultation}
        ></ChipList>
      </div>

      <CheckboxList
        id="meeting"
        label="Meeting"
        options={meetings}
        onChange={setUpdatededMeetings}
        defaultValue={userAttributes?.meetingPreference.meeting}
      ></CheckboxList>

      <Dropdown
        id="locations"
        onChange={setUpdatedLocations}
        options={locations}
        label="Location"
      ></Dropdown>

      {/* <Dropdown id="supports" onChange={setUpdatededSupports} options={supports} label="Support"></Dropdown> */}

      {/*  <Dropdown onChange={setUpdatededOccupation} id="occupations" options={occupations} label="Occupations"></Dropdown> */}
      <Button onClick={updateUserData}>Änderungen speichern</Button>
    </div>
  );
};

export default Profile;

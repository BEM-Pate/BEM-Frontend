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
import Chip from "../../Chip/Chip";
import getEmoji from "../../../helpers/emoji";

interface Props {
  userData: any;
}

interface EnumProps {
  route: string;
}

const Profile = (props: Props) => {
  const { userData } = props;
  const enumRoutes = [
    "ageranges",
    "diseases",
    "genders",
    "languages",
    "meetings",
    "occupations",
    "processbem",
    "supports",
  ];

  /* eslint-disable */
  const [userAttributes, setUserAttributes] = useState<UserData | PateData>();
  const [newBaseUserData, setNewBaseUserData] = useState({});
  const [profilePicture, setProfilePicture] = useState<any>(placeholder);
  const [diseases, setDiseases] = useState<string[]>([]);
  const [newMeetingPreference, setNewMeetingPreference] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const setUpPage = async () => {
      const data = await API.getBaseUserData(userData.token);
      const avatar = await API.getUserAvatar(
        userData.account.baseUserData.account
      );
      const diseases = await API.getEnums("diseases");
      setDiseases(diseases);
      setProfilePicture(avatar);
      setUserAttributes(data);
    };
    setUpPage();
  }, []);

  const updateUserData = useCallback(() => {
    try {
      axios
        .put(
          `${API_ADDRESS}/user/userdata`,
          {
            baseUserData: {
              ...newBaseUserData,
            },
            meetingPreference: {
              ...newMeetingPreference,
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
  }, [newMeetingPreference, newBaseUserData]);

  function userIsPate(object: any): object is PateData {
    return object === undefined ? false : object.baseUserData.role === "pate";
  }

  const Enum = (props: EnumProps) => {
    const { route } = props;
    const FormOptions: FormOption[] = [];
    try {
      axios
        .get(`${API_ADDRESS}/get/enums/${route}`, {
          headers: {
            accept: "application/json",
          },
        })
        .then((res) => {
          res.data.map((data: string) => {
            const tempFormOption: FormOption = { label: data, value: data };
            FormOptions.push(tempFormOption);
          });
        });
    } catch (err) {
      console.error(err);
    }
    return (
      <Dropdown
        id={route}
        name={route}
        options={FormOptions}
        label={route.toUpperCase()!}
      />
    );
  };

  function foo(e:any) {
    setNewMeetingPreference((prev) => {
      console.log(prev);
      return prev = { ...prev, diseaseConsultation: [e]};
    })
  }

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
        <img src={profilePicture} alt="profile_picture"></img>
        <Button className={classNames(styles.ProfilePictureButton)}>
          <img src={camera} alt="change_photo"></img>
          <>Foto ändern</>
        </Button>
      </div>
      <Headline headline="h2" className={styles.ProfileHeadline}>
        persönliche angaben
      </Headline>
      <Textfield
        onChange={(e) =>
          setNewBaseUserData((prev) => (prev = { ...prev, firstName: e }))
        }
        id="firstName"
        label="Vorname"
        defaultValue={userAttributes?.baseUserData.firstName}
      ></Textfield>
      <Textfield
        id="lastName"
        label="Nachname"
        onChange={(e) =>
          setNewBaseUserData((prev) => (prev = { ...prev, lastName: e }))
        }
        defaultValue={userAttributes?.baseUserData.lastName}
      ></Textfield>
      {userIsPate(userAttributes) && (
        <Textarea
          label="Erfahrung"
          onChange={(e) =>
            setNewBaseUserData((prev) => (prev = { ...prev, experience: e }))
          }
          defaultValue={userAttributes?.baseUserData.experience}
          id="experince"
        ></Textarea>
      )}
      {userIsPate(userAttributes) && (
        <Textarea
        label="Motivation"
          onChange={(e) =>
            setNewBaseUserData((prev) => (prev = { ...prev, motivation: e }))
          }
          defaultValue={userAttributes?.baseUserData.motivation}
          id="motivation"
        ></Textarea>
      )}
      <div className={classNames(styles.ProfileDiseases)}>
        {diseases.map((disease, index) => {
          return (
            <Chip
              id={disease}
              key={index}
              selected={userAttributes?.meetingPreference.diseaseConsultation.includes(disease)}
              onClick={(e) => foo(e)}
              emoji={getEmoji(disease)}
            >
              
              {disease}
            </Chip>
          );
        })}
      </div>
      <Enum route="occupations"></Enum>
      <Textfield
        id="location"
        label="Region"
        onChange={(e) =>
          setNewMeetingPreference((prev) => (prev = { ...prev, location: e }))
        }
        defaultValue={userAttributes?.meetingPreference.location}
      ></Textfield>
      <Enum route="genders"></Enum>
      <Button onClick={updateUserData}>Änderungen speichern</Button>
    </div>
  );
};

export default Profile;

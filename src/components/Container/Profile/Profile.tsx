/* eslint-disable */
import React, { useCallback, useEffect, useState } from "react";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import axios from "axios";
import styles from "./Profile.module.scss";
import API from "../../../helpers/api";
import Textfield from "../../Textfield/Textfield";
import { BaseUserData, NormalUserData, PateData } from "../../../util/types";
import { API_ADDRESS } from "../../../helpers/env";
import Button from "../../Button/Button";
import Textarea from "../../Textarea/Textarea";
import Dropdown from "../../Dropdown/Dropdown";
import { FormOption } from "../../FormularStepper/FormularTypes";

interface Props {
  userData: any;
}

interface EnumProps {
  route: string;
}

const Profile = (props: Props) => {
  const { userData } = props;
  const { t } = useTranslation();
  const enumRoutes = ['ageranges', 'diseases', 'genders', 'languages', 'meetings', 'occupations', 'processbem', 'supports'];

  /* eslint-disable */
  const [oldUserBaseData, setOldUserBaseData] = useState<NormalUserData | BaseUserData | PateData>();
  const [newBaseUserData, setNewBaseUserData] = useState({});
  const [newMeetingPreference, setNewMeetingPreference] = useState({});

  useEffect(() => {
    const setUpPage = async () => {
      const baseDataResponse = await API.getBaseUserData(userData.token);
      setOldUserBaseData(baseDataResponse);
      /* setIsUserPate(baseDataResponse.role === "pate" ? true : false); */
    };
    setUpPage();
    /* setBaseUserData((prev) => (prev = { firstName: "5g6ghff" })); */
  }, []);

  const updateUserData = useCallback(() => {
   try {
    axios.put(
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
    );
   } catch (err) {
    console.error(err);
   }
  }, [newMeetingPreference, newBaseUserData]);

  function userIsPate (object: any) : object is PateData {
    return object === undefined ? false : object.role === "pate";
  }

  const Enum =  (props: EnumProps) => {
    const {route} = props;
    const FormOptions :FormOption[] = [];
    try {
      axios.get( `${API_ADDRESS}/get/enums/${route}`, {
        headers: {
            'accept': 'application/json'
        }
    }).then(res => {
        res.data.map((data:string) => {
          const tempFormOption : FormOption = {label: data, value: data}
          FormOptions.push(tempFormOption)
        })
    })
    } catch (err) {
      console.error(err);
    }
   
  /*   return (<div>
     <label htmlFor={route}>{route}</label>
     <select id={route}>
     { FormOptions?.map((data : FormOption, index) => {
          return <option key={index} value={data.value}>{data.label}</option>
        })}
     </select>
      
    </div>) */

    return <Dropdown 
    id={route} 
    name={route}
    options={FormOptions} 
    label={route.toUpperCase()!} 
    />
  } 


  //ToDo: Hasan Labels übersetzen
  return (
    <div className={classNames(styles.Profile)}>
      <Textfield
        id={`${t("labelFirstName")}`}
        label={`${t("labelFirstName")}`}
        defaultValue={oldUserBaseData?.firstName}
        placeholder={`${t("labelFirstName")}`}
        onChange={(e) => setNewBaseUserData((prev) => (prev = { ...prev, firstName: e }))}
      ></Textfield>
      <Textfield
        id={`${t("labelLastName")}`}
        label={`${t("labelLastName")}`}
        defaultValue={oldUserBaseData?.lastName}
        placeholder={oldUserBaseData?.lastName}
        onChange={(e) => setNewBaseUserData((prev) => (prev = { ...prev, lastName: e }))}
      ></Textfield>
      {/* ToDo FIX Location Update */}
{/*       <Textfield
        id="Location"
        label="Location"
        defaultValue={oldUserBaseData?.meetingPreference.location}
        placeholder={oldUserBaseData?.meetingPreference.location}
        onChange={(e) => setNewMeetingPreference((prev) => (prev = { ...prev, location: e }))}
      ></Textfield> */}
      {userIsPate(oldUserBaseData) ? <Textarea
      id="Experience"
      label="Experience"
      placeholder="Experience"
      defaultValue={oldUserBaseData.experience}
      onChange={(e) => setNewBaseUserData((prev) => (prev = { ...prev, experience: e }))}
      ></Textarea> : ""}
      {userIsPate(oldUserBaseData) ? <Textarea
      id="Motivation"
      label="Motivation"
      placeholder="Motivation"
      defaultValue={oldUserBaseData.motivation}
      onChange={(e) => setNewBaseUserData((prev) => (prev = { ...prev, motivation: e }))}
      ></Textarea> : ""}

      {enumRoutes.map((route, index) => {
        return <Enum key={index} route={route}></Enum>
      })}

      <Button onClick={updateUserData}>Update</Button>
      <Button onClick={updateUserData}>Update</Button>

    </div>
  );
};

export default Profile;

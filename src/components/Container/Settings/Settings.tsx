import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './Settings.module.scss';
import { API_ADDRESS } from '../../../helpers/env';
import Headline from '../../Headline/Headline';
import API from '../../../helpers/api';
import Button from '../../Button/Button';
import LanguageDropdown from '../../LanguageDropdown/LanguageDropdown';
import placeholder from '../../../images/default.png';
import { useNavigate } from 'react-router-dom';

interface Props {
  userData: any;
}

const Settings = (props: Props) => {
  const { userData } = props;
  const navigate = useNavigate();
  const [userAttributes, setUserAttributes] = useState<any | null>(null);
  const [imageData, setImageData] = useState<any>(placeholder);

  useEffect(() => {
    try {
      axios.get(`${API_ADDRESS}/user/userdata`, {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${userData.token}`,
        },
      }).then((res) => {
        if (res.status === 200) {
          setUserAttributes(res.data);
        }
      });
    } catch (err) {
      console.log('failed', err);
    }
  }, []);

  useEffect(() => {
    if (userAttributes) {
      const setUserAvatar = async () => {
        const userAvatar = await API.getUserAvatar(userAttributes.baseUserData.account);
        setImageData(userAvatar);
      };
      setUserAvatar();
    }
  }, [userAttributes]);

  return (
    <div className={classNames(styles.Settings)}>
      <div className={classNames(styles.SettingsProfile)}>
        <img src={imageData} alt="user_avatar" className={classNames(styles.SettingsProfilePicture)} />
        <Headline headline="h2" className={classNames(styles.SettingsProfileTitle)}>
          {`${userAttributes ? userAttributes.baseUserData.firstName : ''} ${userAttributes ? userAttributes.baseUserData.lastName : ''}`}
        </Headline>
        <Link to="/dashboard/profile">
          <Button styling="outline">Edit Profile</Button>
        </Link>
      </div>
      <div className={classNames(styles.SettingsPreferences)}>
        <Headline headline="h3">Preferences</Headline>
        <LanguageDropdown />
        <Button onClick={()=> navigate('/login')}>Logout</Button>
      </div>
    </div>
  );
};

export default Settings;

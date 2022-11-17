import React from 'react';
import style from './ImageAvatar.module.scss';
import avatarImage from './avatar-dummy.png';

const ImageAvatar = () => (
  <div>
    <img src={avatarImage} alt="avatarImage" className={style.cardContainerAvatarImage} />
  </div>
);
export default ImageAvatar;

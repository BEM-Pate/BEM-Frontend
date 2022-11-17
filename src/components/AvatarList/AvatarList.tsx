import React from 'react';
import style from './AvatarList.module.scss';
// import ColorAvatar from './ColorAvatar/ColorAvatar';
import ImageAvatar from './ImageAvatar/ImageAvatar';

const AvatarList = () => (
  <div className={style.mainContainer}>
    <div className={style.cardContainer}>
      <ImageAvatar />
      <h4 className={style.cardContainerHeaderText}>BEM-Pate 1</h4>

    </div>
    <p className={style.cardContainerDescriptionText}>
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod.
    </p>
  </div>

);
export default AvatarList;

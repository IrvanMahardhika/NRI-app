import React from 'react';

import styles from './UserProfile.module.scss';

import GreenCheckMark from 'assets/icons/greenCheckMark';
import LocationIcon from 'assets/icons/locationIcon';
import EmailIcon from 'assets/icons/emailIcon';
import MenuIcon from 'assets/icons/menuIcon';

const UserProfile: React.FC = () => {
  return (
    <div className={styles.userProfile}>
      <div className={styles.avatarContainer}>
        <img
          className={styles.avatarImg}
          src={
            'https://static.promediateknologi.id/crop/0x0:0x0/750x500/webp/photo/2022/02/10/2119491030.jpeg'
          }
          alt="avatar-img"
        />
      </div>
      <div className={styles.infoContainer}>
        <div>
          <span className={styles.nameText}>Melanie Tan</span>
          <GreenCheckMark />
        </div>
        <div className={styles.jobText}>Professional Food Photographer</div>
        <div>
          <LocationIcon />
          <span className={styles.locationText}>Bangkok</span>
          <EmailIcon />
          <span className={styles.emailText}>melanietan99@gmail.com</span>
        </div>
      </div>
      <div className={styles.menuButtonContainer}>
        <MenuIcon />
      </div>
    </div>
  );
};

export default UserProfile;

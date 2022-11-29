import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import styles from './LandingPage.module.scss';
import Button from '../../components/Button/Button';

interface LandingPageProps {
  children?: React.ReactNode;
}
const DATA = [
  {
    title: 'Bem-Pate finden',
    ref: '/register/affected',
  },
  {
    title: 'Bem-Pate werden',
    ref: '/register/mentor',
  },
  {
    title: 'Selbsthilfegruppe finden',
    ref: '/register/supportGroup',
  },
  {
    title: 'Selbsthilfegruppe gründen',
    ref: '/register/createSupportGroup',
  },
  {
    title: 'Videos',
    ref: '/register/video',
  },
];
const LandingPage = (props: LandingPageProps) => {
  const { children } = props;
  return (
    <div className={classNames(styles.LandingPage)}>
      <div>
        <h2>Willkommen beim BEMpsy Selbsthilfe-Portal.</h2>
        <p>
          Ein Austausch- und Vermittlungsportal für alle BEM-Berechtigten mit
          psychischen Beeinträchtigungen.
        </p>
        <h2>Was möchtest du tun?</h2>
      </div>
      {DATA.map((item) => (
        <div className={classNames(styles.landingPageButton)}>
          <Link to={item.ref}>
            <Button>
              {item.title}
            </Button>
          </Link>
        </div>
      ))}
      {children}
    </div>
  );
};

export default LandingPage;

import React, { MouseEventHandler } from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import styles from './ModalWindow.module.scss';

import successIcon from '../../images/icons/modalwindow/success.svg';
import Headline from '../Headline/Headline';
import Button from '../Button/Button';
import errorIcon from '../../images/icons/modalwindow/error.svg';
import warningIcon from '../../images/icons/modalwindow/warning.svg';

interface Props {
  show?: boolean;
  link?: string;
  type?: 'success' | 'error' | 'warning' | undefined;
  headline?: string | undefined;
  text?: string | undefined;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

function getModalImage(type:string) {
  switch (type) {
    case 'success':
      return successIcon;
    case 'error':
      return errorIcon;
    case 'warning':
      return warningIcon;
    default:
      return errorIcon;
  }
}

const ModalWindow = (props: Props) => {
  const { t } = useTranslation();

  const modalRoot = document.getElementById('modal-root') as HTMLElement;

  const {
    link = '', show = true, type = 'error', headline = t('modalWindowDefaultHeadline'), text = t('modalWindowDefaultText'), onClick = (() => {}),
  } = props;

  if (!show) return null;

  /* eslint-disable */
  return createPortal(<div className={classNames(styles.ModalWindow)}>
    <div className={classNames(styles.ModalWindowOverlay)}/>
    <div className={classNames(styles.ModalWindowPanel)}>
      <img alt={type} src={getModalImage(type)} className={classNames(styles.ModalWindowPanelIcon)} />
      <Headline headline='h2'>{headline}</Headline>
      <p>{text}</p>
      <Link to={`${link}`}>
        <Button onClick={onClick}>OK</Button>
      </Link>
    </div>
                      </div>, modalRoot); //TODO eslint scheint hier probleme zu haben, deshalb der disable
};

export default ModalWindow;

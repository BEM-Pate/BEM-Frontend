import React, { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import axios from 'axios';
import styles from './ResultCard.module.scss';
import Headline from '../../../Headline/Headline';
import { NormalUserData, PateData } from '../../../../util/types';
import placeholder from '../../../../images/default.png';
import API from '../../../../helpers/api';
import { API_ADDRESS } from '../../../../helpers/env';
import CustomButton from '../../../Button/Button';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


interface Props {
  userAttributes: NormalUserData;
  pate: PateData;
  token: string;
}

const ResultCard = (props: Props) => {
  const { userAttributes, pate, token } = props;
  const [isPending, setIsPending]= useState<Boolean>(userAttributes.pendingContact.includes(pate.account));
  const [show, setShow] = useState(false);

  const pendingContact = userAttributes?.pendingContact;
  const [imageSrc, setImageSrc] = useState<any>(placeholder);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    const setUserAvatar = async () => {
      const userAvatar = await API.getUserAvatar(pate.account);
      setImageSrc(userAvatar);
    };
    setUserAvatar();
  }, []);

  const requestContact = useCallback(() => {
    try {
      axios.post(
        `${API_ADDRESS}/match/request-contact/${pate.account}`,
        '',
        {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      ).then((res) => {
        console.log(res);
        if (res.status === 200) {
            setIsPending(true);
        }

      })
    } catch (err) {
      console.error(err);
    }
  }, []);
  const cancelRequest = useCallback(() => {
    try {
      axios.post(
          `${API_ADDRESS}/match/cancel-contact/${pate.account}`,
          '',
          {
            headers: {
              accept: 'application/json',
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          },
      ).then((res) => {
        if (res.status === 200) {
          setIsPending(false);
          setShow(false)
        }
      })
    } catch (err) {
      console.error(err);
    }
  }, []);


  return (
    <div className={classNames(styles.ResultCard)}>
      <div className={classNames(styles.ResultCardEssentials)}>
        <div className={classNames(styles.ResultCardEssentialsImageScore)}>
          <img src={imageSrc} alt={pate.firstName} />
          <span>{`${pate.score === undefined ? pate.score : pate.score * 100} %`}</span>
        </div>
        <div>
          <Headline headline="h3">{`${pate.firstName} ${pate.lastName}`}</Headline>
          <p>{pate.motivation}</p>
        </div>
      </div>
      <hr />
      <div className={classNames(styles.ResultCardAdditional)}>
        <Headline headline="p">Ich spreche</Headline>
        <div>
          {pate.languages.map((lang: string, index) => (
            <span
              className={classNames(
                styles.ResultCardTag,
                userAttributes.languages.includes(lang)
                  ? styles.ResultCardTagActive
                  : '',
              )}
              key={index}
            >
              {lang}
            </span>
          ))}
        </div>
        <Headline headline="p">Berufsfeld</Headline>
        <div>
          <span
            className={classNames(
              styles.ResultCardTag,
              userAttributes.occupation === pate.occupation
                ? styles.ResultCardTagActive
                : '',
            )}
          >
            {' '}
            {pate.occupation}
          </span>
        </div>
      </div>
      { isPending ?
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px'}}>
          <CustomButton>Anfrage gesendet</CustomButton>
              <CustomButton onClick={handleShow} icon>X</CustomButton>
              </div>
          :

          <CustomButton onClick={requestContact}>Kontakt anfragen</CustomButton>}


      <Modal caria-labelledby="example-custom-modal-styling-title" show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Anfrage stornieren</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p>Willst du die Anfrage zu {pate.firstName} {pate.lastName} wirklich stornieren?</p>
        </Modal.Body>
        <Modal.Footer>
          <CustomButton onClick={handleClose}>
            Abbrechen
          </CustomButton>
          <CustomButton onClick={cancelRequest}>
            Ja
          </CustomButton>
        </Modal.Footer>
      </Modal>
    </div>

  );
};

export default ResultCard;

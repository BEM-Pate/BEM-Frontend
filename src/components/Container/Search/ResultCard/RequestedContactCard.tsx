import React, {useCallback, useEffect, useState} from 'react';
import classNames from "classnames";
import styles from "./ResultCard.module.scss";
import Headline from "../../../Headline/Headline";
// import Button from "../../../Button/Button";
import axios from "axios";
import {API_ADDRESS} from "../../../../helpers/env";
import placeholder from "../../../../images/default.png";
import API from "../../../../helpers/api";
import Button from 'react-bootstrap/Button';
import Modal from "react-bootstrap/Modal";
import CustomButton from "../../../Button/Button";
import {useNavigate} from "react-router-dom";
import {useZustand} from "../../../../zustand/store";

const RequestedContactCard = (props: any) => {
    const {contact, userAttributes, token} = props;
    const [userData, setUserData] = useState<any>(null);
    const [userMeetingPreference, setUserMeetingPreference] = useState<any>(null);
    const [imageSrc, setImageSrc] = useState<any>(placeholder);
    const navigate = useNavigate();
    const [setRoute, fetchChatroom,fetchPendingContacts] = useZustand(state => [state.setCurrentRoute, state.fetchChatroom, state.fetchPendingContacts]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const acceptRequest = useCallback(() => {
        try {
            axios.post(
                `${API_ADDRESS}/match/verify-contact/${contact}`,
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
                    fetchChatroom()
                    // fetchPendingContacts()
                    handleShow()
                }
            })
        } catch (err) {
            console.error(err);
        }
    }, []);

    useEffect(() => {
        axios.get(`${API_ADDRESS}/user/userdata/${contact}`, {
            headers: {
                accept: 'application/json'
            }
        }).then(async (res) => {
            setUserData(res.data.baseUserData)
            setUserMeetingPreference(res.data.meetingPreference)
            const userAvatar = await API.getUserAvatar(res.data._id);
            setImageSrc(userAvatar);
        })
    },[])

    return (
        <div>
            <div className={classNames(styles.ResultCard)}>
                <div className={classNames(styles.ResultCardEssentials)}>
                    <div className={classNames(styles.ResultCardEssentialsImageScore)}>
                        <img src={imageSrc} alt={userData?.firstName} />
                    </div>
                    <div>
                        <Headline headline="h3">{`${userData?.firstName} ${userData?.lastName}`}</Headline>
                        <p><b>Ich brauche Hilfe in: </b>{userMeetingPreference?.diseaseConsultation}</p>
                        <p><b>Ich wohne in: </b>{userMeetingPreference?.location}</p>
                    </div>
                </div>
                <hr />
                <div className={classNames(styles.ResultCardAdditional)}>
                    <Headline headline="p">Ich spreche</Headline>
                    <div>
                        {userData?.languages?.map((lang: string, index: number) => (
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
                      userAttributes.occupation === userData?.occupation
                          ? styles.ResultCardTagActive
                          : '',
                  )}
              >
                {' '}
                  {userData?.occupation}
              </span>
                    </div>
                </div>
                <Button variant="success" onClick={acceptRequest}>Kontakt aufnehmen</Button>
                <Button variant="danger">Kontakt ablehnen</Button>
            </div>

            <Modal caria-labelledby="example-custom-modal-styling-title" show={show} onHide={handleClose} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Herzlichen Glückwunsch</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Du bist nun in Verbindung mit {userData?.firstName} {userData?.lastName}</p>
                </Modal.Body>
                <Modal.Footer>
                    <CustomButton onClick={handleClose}>
                        Schließen
                    </CustomButton>
                    <CustomButton onClick={() => {
                        navigate(`/dashboard/chatroom/${userData?.account}`)
                        setRoute(`/dashboard/chatroom/${userData?.account}`)
                    }}>
                        Hallo sagen
                    </CustomButton>
                </Modal.Footer>
            </Modal>
        </div>

    )

}

export default RequestedContactCard;
import React, {useEffect, useState} from "react";
import classNames from "classnames";
import axios from "axios";
import styles from "./UserProfile.module.scss";
import {useParams, useNavigate} from "react-router";
import Button from "../../../Button/Button";
import API from "../../../../helpers/api";

import placeholder from "../../../../images/default.png";
import {API_ADDRESS} from "../../../../helpers/env";
import Headline from "../../../Headline/Headline";
import back_arrow from "../../../../images/icons/ui/arrow_back.svg";
import request_chat from "../../../../images/icons/ui/request_chat.svg";
import add_friend from "../../../../images/icons/ui/add_friend.svg";
import mail from "../../../../images/icons/ui/mail.svg";
import {PateData, UserData} from "../../../../util/types";
import Chip from "../../../Chip/Chip";
import getEmoji from "../../../../helpers/emoji";

import map_placeholder from "../../../../images/map_placeholder.png"
import male from "../../../../images/icons/ui/male.svg";
import female from "../../../../images/icons/ui/female.svg";
import calendar from "../../../../images/icons/ui/calendar.svg";
import meeting from "../../../../images/icons/ui/meeting.svg";
import Paragraph from "../../../Paragraph/Paragraph";
import {Modal} from "react-bootstrap";
import {useZustand} from "../../../../zustand/store";


interface Props {
    userData: any;
}

const PateProfile = (props: Props) => {
    const {id} = useParams();
    const {userData} = props;
    const navigate = useNavigate();
    const [pateAvatar, setUserPateAvatar] = useState<any>(placeholder);
    const [pateData, setPateData] = useState<PateData>();
    const [userAttributes, setUserAttributes] = useState<UserData>();
    const [setRoute] = useZustand(state => [state.setCurrentRoute]);

    const [isPending, setIsPending] = useState<Boolean>(false);
    const [isVerifiedContact, setIsVerifiedContact] = useState<Boolean>();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        const getPateData = async () => {
            const avatar = await API.getUserAvatar(id!);
            const data = await API.getPublicUser(id!);
            const user = await API.getBaseUserData(userData.token)
            setUserAttributes(user);
            setUserPateAvatar(avatar);
            setPateData(data as PateData);
            setIsPending(user.baseUserData.pendingContact.includes(data._id));
            setIsVerifiedContact(user?.baseUserData?.verifiedContact.includes(data?._id));
        };
        getPateData();
    }, [userData.token, id]);

    const requestContact = () => {
        try {
            axios.post(`${API_ADDRESS}/match/request-contact/${id}`, "", {
                    headers: {
                        accept: "application/json",
                        Authorization: `Bearer ${userData.token}`,
                        "Content-Type": "application/x-www-form-urlencoded",
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
    }

    const cancelRequest = () => {
        try {
            axios.post(
                `${API_ADDRESS}/match/cancel-contact/${id}`,
                '',
                {
                    headers: {
                        accept: 'application/json',
                        Authorization: `Bearer ${userData.token}`,
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
    };


    return (
        <div className={classNames(styles.UserProfile)}>
            <div className={classNames(styles.UserProfileHeader)}>
                <img src={pateAvatar} alt="pateAvatar"/>
                <div className={classNames(styles.UserProfileHeaderBackground)}/>
                <div className={classNames(styles.UserProfileHeaderContainer)}>
                    <Button
                        className={classNames(styles.UserProfileHeaderContainerBack)}
                        onClick={() => navigate(-1)}
                        icon
                    >
                        <img src={back_arrow} alt="back_arrow"/>
                    </Button>
                    <div className={classNames(styles.UserProfileHeaderContainerDetails)}>
                        <Headline
                            className={classNames(
                                styles.UserProfileHeaderContainerDetailsName
                            )}
                            headline="h1"
                        >
                            {`${pateData?.baseUserData.firstName} ${pateData?.baseUserData.lastName}`}
                        </Headline>
                        <Headline
                            className={classNames(
                                styles.UserProfileHeaderContainerDetailsLocation
                            )}
                            headline="h1"
                        >
                            {pateData?.meetingPreference.location}
                        </Headline>
                        {
                            isVerifiedContact ? (
                                <Button
                                    className={classNames(
                                        styles.UserProfileHeaderContainerDetailsRequest
                                    )}
                                    onClick={() => {
                                        navigate(`/dashboard/chatroom/${pateData?._id}`)
                                        setRoute(`/dashboard/chatroom/${pateData?._id}`)
                                    }}>
                                    <img src={request_chat} alt="add_friend"/>
                                    <span>Befreundet. Hallo sagen!</span>
                                </Button>
                            ) :
                                isPending ? (
                                <div className={classNames(
                                    styles.UserProfileHeaderContainerDetailsButtonContainer
                                )}>

                                    <Button className={classNames(
                                        styles.UserProfileHeaderContainerDetailsRequest
                                    )} disabled>
                                        <img src={mail} alt="add_friend"/>
                                        <span>Kontaktanfrage gesendet</span>
                                    </Button>
                                    <Button onClick={handleShow} icon>X</Button>
                                </div>
                            ) : (

                            <Button className={classNames(
                            styles.UserProfileHeaderContainerDetailsRequest
                            )} onClick={requestContact}>
                            <img src={add_friend} alt="add_friend"/>
                            <span>Kontakt anfragen</span>
                            </Button>
                            )}
                    </div>
                </div>
            </div>
            <div className={classNames(styles.UserProfileInformation)}>
                <div className={classNames(styles.UserProfileInformationNotch)}/>
                <div className={classNames(styles.UserProfileInformationBaseContainer)}>
                    <Headline
                        className={classNames(styles.UserProfileInformationHeadline)}
                        headline="h6"
                    >
                        Erfahrungen & Motivation
                    </Headline>
                    <Paragraph collapse>
                        {pateData?.baseUserData.experience}
                        <br/>
                        <br/>
                        {pateData?.baseUserData.motivation}
                    </Paragraph>
                </div>
                <div className={classNames(styles.UserProfileInformationBaseContainer)}>
                    <Headline
                        className={classNames(styles.UserProfileInformationHeadline)}
                        headline="h6"
                    >
                        Krankheitsbild
                    </Headline>
                    <div>
                        {
                            pateData?.meetingPreference.diseaseConsultation?.map((disease, index) => {
                                return <Chip toggleAble={false} key={index} id={disease}
                                             selected={userAttributes?.meetingPreference.diseaseConsultation?.includes(disease)}
                                             emoji={getEmoji(disease)}>
                                    {disease}
                                </Chip>

                            })
                        }
                    </div>
                </div>
                <div className={classNames(styles.UserProfileMisc)}>
                    <div className={classNames(styles.UserProfileMiscItem)}>
                        <div>
                            <img src={pateData?.baseUserData.gender === "FEMALE" ? female : male} alt="gender"/>
                        </div>
                        <div>
                            <Headline className={classNames(styles.UserProfileMiscHeadline)}
                                      headline="h6">Geschlecht</Headline>
                            <p>{pateData?.baseUserData.gender}</p>
                        </div>
                    </div>
                    <div className={classNames(styles.UserProfileMiscItem)}>
                        <div>
                            <img src={calendar} alt="calendar"/>
                        </div>
                        <div>
                            <Headline className={classNames(styles.UserProfileMiscHeadline)}
                                      headline="h6">Alter</Headline>
                            <p>{pateData?.baseUserData.ageRange}</p>
                        </div>
                    </div>
                    <div className={classNames(styles.UserProfileMiscItem)}>
                        <div>
                            <img src={meeting} alt="meeting"/>
                        </div>
                        <div>
                            <Headline className={classNames(styles.UserProfileMiscHeadline)}
                                      headline="h6">Treffen</Headline>
                            <p>{pateData?.meetingPreference.meeting?.map((meeting) => {
                                return <><span>{meeting}</span><br/></>
                            })}</p>
                        </div>
                    </div>
                </div>
                <div className={classNames(styles.UserProfileInformationBaseContainer)}>
                    <Headline
                        className={classNames(styles.UserProfileInformationHeadline)}
                        headline="h6"
                    >
                        Berufsfeld
                    </Headline>
                    <Chip id={pateData?.baseUserData.occupation!}>{pateData?.baseUserData.occupation}</Chip>{" "}
                </div>
                <div className={classNames(styles.UserProfileInformationBaseContainer)}>
                    <Headline
                        className={classNames(styles.UserProfileInformationHeadline)}
                        headline="h6"
                    >
                        Standort
                    </Headline>
                    <img src={map_placeholder} alt="map"></img>
                </div>
            </div>
            <Modal caria-labelledby="example-custom-modal-styling-title" show={show} onHide={handleClose} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Anfrage stornieren</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Willst du die Anfrage zu {pateData?.baseUserData.firstName} {pateData?.baseUserData.lastName} wirklich stornieren?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose}>
                        Abbrechen
                    </Button>
                    <Button onClick={cancelRequest}>
                        Ja
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default PateProfile;

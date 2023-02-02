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
import {PateData, UserData} from "../../../../util/types";
import Chip from "../../../Chip/Chip";
import getEmoji from "../../../../helpers/emoji";

import map_placeholder from "../../../../images/map_placeholder.png"
import male from "../../../../images/icons/ui/male.svg";
import female from "../../../../images/icons/ui/female.svg";
import calendar from "../../../../images/icons/ui/calendar.svg";
import meeting from "../../../../images/icons/ui/meeting.svg";
import cross from "../../../../images/icons/ui/cross.svg";
import success from "../../../../images/icons/ui/success.svg";
import Paragraph from "../../../Paragraph/Paragraph";
import {useZustand} from "../../../../zustand/store";
import {Modal} from "react-bootstrap";
import mail from "../../../../images/icons/ui/mail.svg";
import Textarea from "../../../Textarea/Textarea";


interface Props {
    userData: any;
}

const BetroffenerProfile = (props: Props) => {
    const {id} = useParams();
    const {userData} = props;
    const navigate = useNavigate();
    const [betroffenerAvatar, setBetroffenerAvatar] = useState<any>(placeholder);
    const [betroffenerData, setBetroffenerData] = useState<UserData>();
    const [userAttributes, setUserAttributes] = useState<UserData>();
    const [fetchChatroom, setRoute, pendingContacts, fetchPendingContacts] = useZustand(state => [state.fetchChatroom, state.setCurrentRoute, state.pendingContacts, state.fetchPendingContacts]);
    const [showNewContact, setShowNewContact] = useState(false);
    const handleCloseNewContact = () => setShowNewContact(false);
    const handleShowNewContact = () => setShowNewContact(true);
    const [showDeclineContact, setShowDeclineContact] = useState(false);
    const handleCloseDeclineContact = () => setShowDeclineContact(false);
    const handleShowDeclineContact = () => setShowDeclineContact(true);
    const [isVerifiedContact, setIsVerifiedContact] = useState<Boolean>();
    const [declineReason, setDeclineReason] = useState<string>("");
    const [required, setRequired] = useState<boolean>(declineReason.length === 0);
    const [isRejectedContact, setIsRejectedContact] = useState<Boolean>(false);
    const [isPendingContact, setIsPendingContact] = useState<Boolean>(false);
    console.log("ispending? ",isPendingContact)
    console.log("contact", pendingContacts)
    useEffect(() => {
        const getPateData = async () => {
            const avatar = await API.getUserAvatar(id!);
            const data = await API.getPublicUser(id!);
            const user = await API.getBaseUserData(userData.token)
            setUserAttributes(user);
            setBetroffenerAvatar(avatar);
            setBetroffenerData(data as UserData);
            setIsVerifiedContact(user?.baseUserData?.verifiedContact.includes(data?._id));
        };
        getPateData();
    }, [userData.token, id]);
    useEffect(() => {fetchPendingContacts()}, [])
    useEffect(() => {
        console.log("trigger pendding")
        if (pendingContacts.includes(id))  {
            console.log("pedsf")
            setIsRejectedContact(false)
            setIsPendingContact(true)
        }
        else {
            setIsPendingContact(false)
        }

    }, [pendingContacts])
    useEffect(() => {
        if (declineReason.length > 0) setRequired(false)
    }, [declineReason]);

    const acceptRequest = () => {
        try {
            axios.post(
                `${API_ADDRESS}/match/verify-contact/${id}`,
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
                    fetchChatroom()
                    setIsVerifiedContact(true)
                    handleShowNewContact()
                }
            })
        } catch (err) {
            console.error(err);
        }
    }

    const declineRequest = () => {
        console.log(declineReason)
        if (declineReason.length === 0) {
            console.log("set require")
            setRequired(true)
        } else {
            try {
                axios.post(
                    `${API_ADDRESS}/match/reject-contact/${id}`,
                    {
                        "reason": declineReason
                    },
                    {
                        headers: {
                            accept: 'application/json',
                            Authorization: `Bearer ${userData.token}`,
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                    },
                ).then((res) => {
                    if (res.status === 200) {
                        handleCloseDeclineContact()
                        setIsRejectedContact(true)
                        setDeclineReason("")
                    }
                })
            } catch (err) {
                console.error(err);
            }
        }
    }


    return (
        <div className={classNames(styles.UserProfile)}>
            <div className={classNames(styles.UserProfileHeader)}>
                <img src={betroffenerAvatar} alt="pateAvatar"/>
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
                            {`${betroffenerData?.baseUserData.firstName} ${betroffenerData?.baseUserData.lastName}`}
                        </Headline>
                        <Headline
                            className={classNames(
                                styles.UserProfileHeaderContainerDetailsLocation
                            )}
                            headline="h1"
                        >
                            {betroffenerData?.meetingPreference.location}
                        </Headline>

                        {isVerifiedContact ? (
                            <Button
                                className={classNames(
                                    styles.UserProfileHeaderContainerDetailsRequest
                                )}
                                onClick={() => {
                                    navigate(`/dashboard/chatroom/${betroffenerData?._id}`)
                                    setRoute(`/dashboard/chatroom/${betroffenerData?._id}`)
                                }}>
                                <img src={request_chat} alt="add_friend"/>
                                <span> Hallo sagen</span>
                            </Button>
                        ) : isRejectedContact ? (
                            <Button
                                className={classNames(
                                    styles.UserProfileHeaderContainerDetailsRequest
                                )}
                                disabled>

                                <span> Kontakt abgelehnt</span>
                            </Button>
                        ) : isPendingContact ? (
                            <div className={classNames(
                                styles.UserProfileHeaderContainerDetailsButtonContainer
                            )}>
                                <Button
                                    className={classNames(
                                        styles.UserProfileHeaderContainerDetailsRequest
                                    )}
                                    onClick={acceptRequest}
                                >
                                    <img src={success} alt="accept-icon"/>
                                    <span> Annehmen</span>
                                </Button>

                                <Button
                                    className={classNames(
                                        styles.UserProfileHeaderContainerDetailsRequest
                                    )}
                                    onClick={handleShowDeclineContact}
                                >
                                    <img src={cross} alt="reject-icon"/>
                                    <span> Ablehnen</span>
                                </Button>
                            </div>
                        ) : null
                        }

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
                        Ich brauche Hilfe bei
                    </Headline>
                    <Paragraph collapse>
                        {betroffenerData?.meetingPreference.support.map((value) => {
                            return (
                                <p> {value === "CONSULTATION" ? "- BEM-Beratung allgemein" : "- BEM-Beratung auf ein bestimmtes Krankheitsbild bezogen"}</p>)
                        })}
                        <br/>
                        <br/>
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
                            betroffenerData?.meetingPreference.diseaseConsultation?.map((disease, index) => {
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
                            <img src={betroffenerData?.baseUserData.gender === "FEMALE" ? female : male} alt="gender"/>
                        </div>
                        <div>
                            <Headline className={classNames(styles.UserProfileMiscHeadline)}
                                      headline="h6">Geschlecht</Headline>
                            <p>{betroffenerData?.baseUserData.gender}</p>
                        </div>
                    </div>
                    <div className={classNames(styles.UserProfileMiscItem)}>
                        <div>
                            <img src={calendar} alt="calendar"/>
                        </div>
                        <div>
                            <Headline className={classNames(styles.UserProfileMiscHeadline)}
                                      headline="h6">Alter</Headline>
                            <p>{betroffenerData?.baseUserData.ageRange}</p>
                        </div>
                    </div>
                    <div className={classNames(styles.UserProfileMiscItem)}>
                        <div>
                            <img src={meeting} alt="meeting"/>
                        </div>
                        <div>
                            <Headline className={classNames(styles.UserProfileMiscHeadline)}
                                      headline="h6">Treffen</Headline>
                            <p>{betroffenerData?.meetingPreference.meeting?.map((meeting) => {
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
                    <Chip
                        id={betroffenerData?.baseUserData.occupation!}>{betroffenerData?.baseUserData.occupation}</Chip>{" "}
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

            <Modal show={showNewContact} onHide={handleCloseNewContact} size="lg"
                   centered>
                <Modal.Header closeButton>
                    <Modal.Title>Herzlichen Glückwunsch</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Du bist nun in Verbindung
                        mit <b>{betroffenerData?.baseUserData?.firstName} {betroffenerData?.baseUserData?.lastName}</b></p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleCloseNewContact}>
                        Schließen
                    </Button>
                    <Button
                        className={classNames(
                            styles.UserProfileHeaderContainerDetailsRequest
                        )}
                        onClick={() => {
                            navigate(`/dashboard/chatroom/${betroffenerData?._id}`)
                            setRoute(`/dashboard/chatroom/${betroffenerData?._id}`)
                        }}>
                        <img src={request_chat} alt="add_friend"/>
                        <span> Hallo sagen</span>
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showDeclineContact} onHide={handleCloseDeclineContact} size="lg"
                   centered>
                <Modal.Header closeButton>
                    <Modal.Title>Kontakt ablehnen</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Bitte einen Grund eingeben, warum du Kontakt
                        mit {betroffenerData?.baseUserData?.firstName} {betroffenerData?.baseUserData?.lastName} ablehnen
                        möchtest?</p>
                    {required && (<span style={{color: "red"}}>Bitte einen Grund eingeben</span>)}
                    <Textarea id="decline" onChange={setDeclineReason}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleCloseDeclineContact}>
                        Schließen
                    </Button>
                    <Button
                        className={classNames(
                            styles.UserProfileHeaderContainerDetailsRequest
                        )}
                        onClick={declineRequest}
                    >
                        <span>Bestätigen</span>
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default BetroffenerProfile;

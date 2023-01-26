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
    const [fetchChatroom, setRoute] = useZustand(state => [state.fetchChatroom, state.setCurrentRoute]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [isVerifiedContact, setIsVerifiedContact] = useState<Boolean>();

    useEffect(() => {
        const getPateData = async () => {
            const avatar = await API.getUserAvatar(id!);
            const data = await API.getPublicUser(id!);
            const user = await API.getBaseUserData(userData.token)
            setUserAttributes(user);
            setBetroffenerAvatar(avatar);
            setBetroffenerData(data as UserData);
            console.log(user)
            console.log(data)
            setIsVerifiedContact(user?.baseUserData?.verifiedContact.includes(data?._id));
        };
        getPateData();
    }, [userData.token, id]);

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
                    handleShow()
                }
            })
        } catch (err) {
            console.error(err);
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
                        ) : (
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
                                >
                                    <img src={cross} alt="reject-icon"/>
                                    <span> Ablehnen</span>
                                </Button>
                            </div>
                        )
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
                                <p> {value == "CONSULTATION" ? "- BEM-Beratung allgemein" : "- BEM-Beratung auf ein bestimmtes Krankheitsbild bezogen"}</p>)
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

            <Modal caria-labelledby="example-custom-modal-styling-title" show={show} onHide={handleClose} size="lg"
                   centered>
                <Modal.Header closeButton>
                    <Modal.Title>Herzlichen Glückwunsch</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Du bist nun in Verbindung
                        mit {betroffenerData?.baseUserData?.firstName} {betroffenerData?.baseUserData?.lastName}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose}>
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
        </div>
    );
};

export default BetroffenerProfile;

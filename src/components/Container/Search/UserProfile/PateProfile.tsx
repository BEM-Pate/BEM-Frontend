import React, {useEffect, useState} from "react";
import classNames from "classnames";
import axios from "axios";
import styles from "./UserProfile.module.scss";
import {useParams, useNavigate, useLocation} from "react-router";
import Button from "../../../Button/Button";
import API from "../../../../helpers/api";

import placeholder from "../../../../images/default.png";
import {API_ADDRESS} from "../../../../helpers/env";
import Headline from "../../../Headline/Headline";
import back_arrow from "../../../../images/icons/ui/arrow_back.svg";
import request_chat from "../../../../images/icons/ui/request_chat.svg";
import add_friend from "../../../../images/icons/ui/add_friend.svg";
import mail from "../../../../images/icons/ui/mail.svg";
import {Match, PateData, UserData} from "../../../../util/types";
import Chip from "../../../Chip/Chip";
import getEmoji from "../../../../helpers/emoji";

import map_placeholder from "../../../../images/map_placeholder.png";
import male from "../../../../images/icons/ui/male.svg";
import female from "../../../../images/icons/ui/female.svg";
import calendar from "../../../../images/icons/ui/calendar.svg";
import meeting from "../../../../images/icons/ui/meeting.svg";
import Paragraph from "../../../Paragraph/Paragraph";
import {Modal} from "react-bootstrap";
import {useZustand} from "../../../../zustand/store";
import {useTranslation} from "react-i18next";
import Textarea from "../../../Textarea/Textarea";

interface Props {
    userData: any;
}

const PateProfile = (props: Props) => {
    const {id} = useParams();
    const {userData} = props;
    const location = useLocation();
    const {t} = useTranslation();
    const [pateData, setPateData] = useState<PateData>();
    const [userAttributes, setUserAttributes] = useState<UserData>();
    const [match, setMatch] = useState<Match>();
    const [matchScore] = useState<number>(Math.ceil(location.state?.match?.score*100));

    const navigate = useNavigate();
    const [pateAvatar, setUserPateAvatar] = useState<any>(placeholder);
    const [setRoute, pendingContacts] = useZustand((state) => [
        state.setCurrentRoute,
        state.pendingContacts,
    ]);

    const [isPendingContact, setIsPendingContact] = useState<Boolean>(false);
    const [isVerifiedContact, setIsVerifiedContact] = useState<Boolean>();
    const [showAddModal, setShowAddModal] = useState(false);
    const handleShowAddModal = () => setShowAddModal(true);
    const handleCloseAddModal = () => setShowAddModal(false);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [message, setMessage] = useState<string>("");
    const [required, setRequired] = useState<boolean>(message.length === 0);


    useEffect(() => {
        pendingContacts?.includes(id)
            ? setIsPendingContact(true)
            : setIsPendingContact(false);
    }, [pendingContacts]);

    useEffect(() => {
        setUserPateAvatar(location.state.imageSrc);
        setMatch(location.state.match);

        const getPateData = async () => {
            const user = await API.getBaseUserData(userData.token);
            const data = await API.getPublicUser(id!);
            setIsPendingContact(user.baseUserData.pendingContact.includes(data._id));
            setIsVerifiedContact(
                user?.baseUserData?.verifiedContact.includes(data?._id)
            );
            const avatar = await API.getUserAvatar(id!);
            setUserAttributes(user);
            setUserPateAvatar(avatar);
            setPateData(data as PateData);
        };
        getPateData();
    }, [userData, id, location]);

    useEffect(() => {
        if (message.length > 0) setRequired(false)
    }, [message]);

    const requestContact = () => {
        if (message.length === 0) {
            setRequired(true)
        } else {
        try {
            axios
                .post(`${API_ADDRESS}/match/request-contact/${id}`,
                    {
                        "message": message
                    }, {
                    headers: {
                        accept: "application/json",
                        Authorization: `Bearer ${userData.token}`,
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                })
                .then((res) => {
                    console.log(res);
                    if (res.status === 200) {
                        setIsPendingContact(true);
                        handleCloseAddModal();
                        setMessage("")
                    }
                });
        } catch (err) {
            console.error(err);
        }
        }
    };

    const cancelRequest = () => {
        try {
            axios
                .post(`${API_ADDRESS}/match/cancel-contact/${id}`, "", {
                    headers: {
                        accept: "application/json",
                        Authorization: `Bearer ${userData.token}`,
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                })
                .then((res) => {
                    if (res.status === 200) {
                        setIsVerifiedContact(false);
                        setIsPendingContact(false);
                        setShow(false);
                    }
                });
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
                        {matchScore && <span className={classNames(styles.UserProfileHeaderContainerDetailsScore)}>{matchScore}% Match</span>}
                        <Headline
                            className={classNames(
                                styles.UserProfileHeaderContainerDetailsName
                            )}
                            headline="h1"
                        >
                            {`${match?.firstName || pateData?.baseUserData.firstName} ${
                                match?.lastName || pateData?.baseUserData.lastName
                            }`}
                        </Headline>
                        <Headline
                            className={classNames(
                                styles.UserProfileHeaderContainerDetailsLocation
                            )}
                            headline="h1"
                        >
                            {match?.meetingPreference.location ||
                            pateData?.meetingPreference.location}
                        </Headline>
                        {isVerifiedContact ? (
                            <Button
                                className={classNames(
                                    styles.UserProfileHeaderContainerDetailsRequest
                                )}
                                onClick={() => {
                                    navigate(`/dashboard/chatroom/${pateData?._id}`);
                                    setRoute(`/dashboard/chatroom/${pateData?._id}`);
                                }}
                            >
                                <img src={request_chat} alt="add_friend"/>
                                <span>{t('pateProfileSayHelloToFriend')}</span>
                            </Button>
                        ) : isPendingContact ? (
                            <div
                                className={classNames(
                                    styles.UserProfileHeaderContainerDetailsButtonContainer
                                )}
                            >
                                <Button
                                    className={classNames(
                                        styles.UserProfileHeaderContainerDetailsRequest
                                    )}
                                    disabled
                                >
                                    <img src={mail} alt="add_friend"/>
                                    <span>{t('pateProfileSentContact')}</span>
                                </Button>
                                <Button onClick={handleShow} icon>
                                    X
                                </Button>
                            </div>
                        ) : (
                            <Button
                                className={classNames(
                                    styles.UserProfileHeaderContainerDetailsRequest
                                )}
                                onClick={handleShowAddModal}
                            >
                                <img src={add_friend} alt="add_friend"/>
                                <span>{t('pateProfileContactRequest')}</span>
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
                        {t('pateProfileExperienceMotivation')}
                    </Headline>
                    <Paragraph collapse>
                        {match?.experience || pateData?.baseUserData.experience}
                        <br/>
                        <br/>
                        {match?.motivation || pateData?.baseUserData.motivation}
                    </Paragraph>
                </div>
                <div className={classNames(styles.UserProfileInformationBaseContainer)}>
                    <Headline
                        className={classNames(styles.UserProfileInformationHeadline)}
                        headline="h6"
                    >
                        {t('labelDiseaseProfile')}
                    </Headline>
                    <div>
                        {(pateData || match)?.meetingPreference.diseaseConsultation?.map(
                            (disease, index) => {
                                return (
                                    <Chip
                                        toggleAble={false}
                                        key={index}
                                        id={disease}
                                        selected={userAttributes?.meetingPreference.diseaseConsultation?.includes(
                                            disease
                                        )}
                                        emoji={getEmoji(disease)}
                                    >
                                        {t(`enum_diseases_${disease}`)}
                                    </Chip>
                                );
                            }
                        )}
                    </div>
                </div>
                <div className={classNames(styles.UserProfileMisc)}>
                    <div className={classNames(styles.UserProfileMiscItem)}>
                        <div>
                            <img
                                src={pateData?.baseUserData.gender === "FEMALE" ? female : male}
                                alt="gender"
                            />
                        </div>
                        <div>
                            <Headline
                                className={classNames(styles.UserProfileMiscHeadline)}
                                headline="h6"
                            >
                                {t('enum_genders')}
                            </Headline>
                            <p>
                                {t(
                                    `enum_genders_${
                                        match?.gender || pateData?.baseUserData.gender
                                    }`
                                )}
                            </p>
                        </div>
                    </div>
                    <div className={classNames(styles.UserProfileMiscItem)}>
                        <div>
                            <img src={calendar} alt="calendar"/>
                        </div>
                        <div>
                            <Headline
                                className={classNames(styles.UserProfileMiscHeadline)}
                                headline="h6"
                            >
                                {t('labelAge')}
                            </Headline>
                            <p>
                                {t(
                                    `enum_ageranges_${
                                        match?.ageRange || pateData?.baseUserData.ageRange
                                    }`
                                )}
                            </p>
                        </div>
                    </div>
                    <div className={classNames(styles.UserProfileMiscItem)}>
                        <div>
                            <img src={meeting} alt="meeting"/>
                        </div>
                        <div>
                            <Headline
                                className={classNames(styles.UserProfileMiscHeadline)}
                                headline="h6"
                            >
                                {t('registerPreferencesMeet')}
                            </Headline>
                            <p>
                                {(
                                    match?.meetingPreference.meeting ||
                                    pateData?.meetingPreference.meeting
                                )?.map((meeting, index) => {
                                    return (
                                        <div key={index}>
                      <span>
                        {index > 0 ? " & " : ""}
                          {t(`enum_meetings_${meeting}`)}
                      </span>
                                            <br/>
                                        </div>
                                    );
                                })}
                            </p>
                        </div>
                    </div>
                </div>
                <div className={classNames(styles.UserProfileInformationBaseContainer)}>
                    <Headline
                        className={classNames(styles.UserProfileInformationHeadline)}
                        headline="h6"
                    >
                        {t('enum_occupations')}
                    </Headline>
                    <Chip id="occupation">
                        {t(
                            `enum_occupations_${
                                match?.occupation || pateData?.baseUserData.occupation
                            }`
                        )}
                    </Chip>
                </div>
                <div className={classNames(styles.UserProfileInformationBaseContainer)}>
                    <Headline
                        className={classNames(styles.UserProfileInformationHeadline)}
                        headline="h6"
                    >
                        {t('labelLocation')}
                    </Headline>
                    <img src={map_placeholder} alt="map"/>
                </div>
            </div>
            <Modal
                show={show}
                onHide={handleClose}
                size="lg"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Anfrage stornieren</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        {t('pateProfileCancelRequest')} {pateData?.baseUserData.firstName}{" "}
                        {pateData?.baseUserData.lastName} 
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose}>{t('labelCancel')}</Button>
                    <Button onClick={cancelRequest}>{t('labelYes')}</Button>
                </Modal.Footer>
            </Modal>


            <Modal show={showAddModal} onHide={handleCloseAddModal} size="lg"
                   centered>
                <Modal.Header closeButton>
                    <Modal.Title>{t('pateProfileContact')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{t('pateProfileTellMore')}</p>
                    {required && (<span style={{color: "red"}}>Icebreaker-Text darf nicht leer sein</span>)}
                    <Textarea id="decline" onChange={setMessage} defaultValue={message.length > 0 ? message : null} />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleCloseAddModal}>
                        {t('seekerProfileClose')}
                    </Button>
                    <Button
                        className={classNames(
                            styles.UserProfileHeaderContainerDetailsRequest
                        )}
                        onClick={requestContact}
                    >
                        <span>{t('pateProfileConfirm')}</span>
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default PateProfile;

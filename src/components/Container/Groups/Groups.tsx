import React, {useEffect, useState} from 'react';
import classNames from 'classnames';
import styles from './Groups.module.scss';
import Headline from "../../Headline/Headline";
import Button from "../../Button/Button";
import magnifier from "../../../images/icons/ui/magnifier.svg";
import filter from "../../../images/icons/ui/filter.svg";
import pic1 from "../../../images/icons/selbsthilfegruppe/1.jpg";
import pic2 from "../../../images/icons/selbsthilfegruppe/2.jpg";
import pic3 from "../../../images/icons/selbsthilfegruppe/3.jpg";
import pic4 from "../../../images/icons/selbsthilfegruppe/4.jpg";
import pic5 from "../../../images/icons/selbsthilfegruppe/5.jpg";
import NextIcon from '../../../images/icons/selbsthilfegruppe/nextIcon.svg';
import LocationIcon from '../../../images/icons/selbsthilfegruppe/locationIcon.svg';
import LocationDropdown from '../../../images/icons/selbsthilfegruppe/locationDropdownIcon.svg';
import IconFilter from '../../../images/icons/selbsthilfegruppe/filterIcon.svg';
import { useTranslation } from 'react-i18next';

const GroupsMockData = [
    {title: "BEM während der Ausbildung", members: 124, id: 1, background: pic1},
    {title: "Heimlich depressiv?", members: 42, id: 2, background: pic2},
    {title: "BEMuda Dreieck in Ladenburg", members: 4, id: 3, background: pic3},
    {title: "Burnout - wie finde ich wieder Kraft?", members: 73, id: 4, background: pic4},
    {title: "Overwork - was macht man?", members: 100, id: 5, background: pic5},
]


const Groups = () => {
    const [groups, setGroups] = useState(GroupsMockData);
    const [isSearchClicked, setIsSearchClicked] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [isDecending, setIsDecending] = useState(false);

    const {t} = useTranslation();

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    }
    const sortMembers = () => {
        setGroups((groups) => [...groups.sort((a, b) => {
            if (isDecending) {
                setIsDecending(!isDecending);
                return b.members - a.members
            } else {
                setIsDecending(!isDecending);
                return a.members - b.members
            }
        })]);
    }

    useEffect(() => {
        if (searchValue.length > 0) {
            const filteredGroups = GroupsMockData.filter(group => group.title.toLowerCase().includes(searchValue.toLowerCase()));
            setGroups(filteredGroups);
        } else {
            setGroups(GroupsMockData);
        }
    }, [searchValue])

    return (
        <div className={classNames(styles.Groups)}>
            <div className={classNames(styles.GroupsLocationFilter)}>
                <img src={LocationIcon} alt="search"/>
                {t('groupsNationwide')}
                <img src={LocationDropdown} alt="search"/>

            </div>
            <div className={classNames(styles.GroupsHeaders)}>

                {
                    !isSearchClicked &&
                    <Headline
                        className={classNames(styles.GroupsHeadersHeadlineH1)}
                        headline="h1"
                    >
                        {t('groupsFindSupportGroups')}
                    </Headline>
                }
                {
                    isSearchClicked &&
                    <div className={classNames(styles.GroupsHeadersSearch)}>
                        <img className={classNames(styles.GroupsHeadersSearchImg)} src={magnifier} alt="search"/>
                        <input onChange={handleOnChange} className={classNames(styles.GroupsHeadersSearchInput)}
                               type={"text"} placeholder={t('groupsFindGroup')!} value={searchValue}/>
                    </div>
                }
                <div style={{display: "flex"}}>
                    <Button
                        icon
                        styling="outline"
                        className={classNames(styles.GroupsHeadersButton)}
                    >
                        <img onClick={() => {
                            setIsSearchClicked(!isSearchClicked)
                        }} src={magnifier} alt="search"/>
                    </Button>
                    {/*<Button*/}
                    {/*    icon*/}
                    {/*    styling="outline"*/}
                    {/*    className={classNames(styles.GroupsHeadersButton)}*/}
                    {/*>*/}
                    {/*    <img src={filter} alt="filter"/>*/}
                    {/*</Button>*/}
                </div>


            </div>
            <div className={classNames(styles.GroupsFilterContainer)}>
                <div className={classNames(styles.GroupsFilterContainerFilter)} onClick={sortMembers}>
                    {t('groupsLovly')}
                    <img src={IconFilter} alt="search"/>
                </div>
            </div>
            <div className={classNames(styles.GroupsContent)}>
                {groups.length === 0 && <div>Keine Ergebnisse für <span
                    className={classNames(styles.GroupsContentNoResults)}>{searchValue}</span> {t('groupsFound')}</div>}
                {groups.map((group) => (
                    <div className={classNames(styles.GroupsContentGroup)} key={group.id}>
                        <div className={classNames(styles.GroupsContentGroupBackground)}>
                            <img className={classNames(styles.GroupsContentGroupBackgroundImg)} src={group.background}
                                 alt="background"/>
                        </div>
                        <div className={classNames(styles.GroupsContentGroupDetails)}>
                            <div
                                className={classNames(styles.GroupsContentGroupTitle)}
                            >
                                {group.title}
                            </div>
                            <p className={classNames(styles.GroupsContentGroupMembers)}>
                                {group.members} {t('groupsMembers')}
                            </p>
                        </div>
                        <div className={classNames(styles.GroupsContentGroupNextButton)}>
                            <img src={NextIcon} alt="next"/>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
};

export default Groups;

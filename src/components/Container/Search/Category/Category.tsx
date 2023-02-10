import React, { useEffect, useState } from "react";
import classNames from "classnames";
import styles from "./Category.module.scss";
import Button from "../../../Button/Button";
import Headline from "../../../Headline/Headline";
import API from "../../../../helpers/api";
import { useTranslation } from "react-i18next";
import { FormOption } from "../../../FormularStepper/FormularTypes";
import { useNavigate } from "react-router-dom";

import LONG_COVID from "../../../../images/icons/diseases/LONG_COVID.svg";
import OVERLOAD from "../../../../images/icons/diseases/OVERLOAD.svg";
import ACUTE_CRISIS from "../../../../images/icons/diseases/ACUTE_CRISIS.svg";
import DEPRESSION from "../../../../images/icons/diseases/DEPRESSION.svg";
import ADDICTION from "../../../../images/icons/diseases/ADDICTION.svg";
import BURNOUT from "../../../../images/icons/diseases/BURNOUT.svg";
import FEAR from "../../../../images/icons/diseases/FEAR.svg";
import BIPOLAR from "../../../../images/icons/diseases/BIPOLAR.svg";
import axios from "axios";
import { API_ADDRESS } from "../../../../helpers/env";
import { Match } from "../../../../util/types";
import placeholder from '../../../../images/default.png';
import MatchList from "../../../MatchList/MatchList";

interface Props {
  userData: any;
}

interface PreviewProps {
  disease: string;
  token: string;
  className?: any;
}


const Preview = (props: PreviewProps) => {
  const { disease, token, className } = props;
  const [length, setLength] = useState<number>(0);
  const [matches, setMatches] = useState<Match[]>([]);
  const [imgs, setImgs] = useState<any>([]);

  
  const shuffleArray = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };
  

  useEffect(() => {
    const init = async () => {
    const encodedJson = encodeURIComponent(JSON.stringify({diseases: [disease]}));
      const res = await axios
      .get(`${API_ADDRESS}/match/pate?filterobject=${encodedJson}`, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      setLength(res.data.length);
      setMatches(shuffleArray(res.data).slice(0, 4));
      
    }
    init();
  }, [token, disease]);

  useEffect(() => {
    const init = async () => {
      for  (const match of matches) {
        const res = await API.getUserAvatar(match.account)
        setImgs((prev: any) => [...prev, res])
      }
    }
  
   init();
      

    
  }, [matches])

  return <div className={classNames(className)}>
    <div>
    {
    matches.map((matches, index) => {
      return <img src={imgs[index] || placeholder} alt="asd"></img>
    })
    }
    </div>
   <span>
   {`${length} Buddies`}
   </span>
  </div>
}

const Category = (props: Props) => {
  const { userData } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [diseases, setDiseases] = useState<FormOption[]>([]);
  const [diseaseMatches, setDiseaseMatches] = useState<string | null>(null);


  function getDiseaseIcon(disease: string) {
    switch (disease) {
      case "ACUTE_CRISIS":
        return ACUTE_CRISIS;
      case "OVERLOAD":
        return OVERLOAD;
      case "DEPRESSION":
        return DEPRESSION;
      case "ADDICTION":
        return ADDICTION;
      case "BURNOUT":
        return BURNOUT;
      case "FEAR":
        return FEAR;
      case "BIPOLAR":
        return BIPOLAR;
      case "LONG_COVID":
        return LONG_COVID;
      default:
        return OVERLOAD;
    }
  }

  useEffect(() => {
    const init = async () => {
      const d = await API.getEnums("diseases");
      setDiseases(
        d.map(
          (s) =>
            ({
              value: s,
              label: t(`enum_diseases_${s}`),
            } as FormOption)
        )
      );
    };
    init();
  }, [t]);

  return (
    <div className={classNames(styles.Category)}>
      <div className={classNames(styles.CategoryHeader)}>
      <Button styling="back" icon onClick={diseaseMatches ?  () => setDiseaseMatches(null) : () => navigate("/dashboard/search") }>
      </Button>
      <Headline styling="page"headline="h1">
        {diseaseMatches ? t(`enum_diseases_${diseaseMatches}`) : t("enum_diseases")}
      </Headline>
      </div>
      {diseaseMatches ? <MatchList disease={diseaseMatches} token={userData.token} /> : <div className={classNames(styles.CategoryList)}>
        {diseases?.map((disease, index) => {
          return (
            <div className={classNames(styles.CategoryListCard)} key={index} onClick={() => setDiseaseMatches(disease.value)}>
              <div className={classNames(styles.CategoryListCardDetails)}>
              <Headline headline="h2" className={classNames(styles.CategoryListCardDetailsHeadline)}>{t(`labelDiseaseProfile`)}
              <span> {disease.label}</span>
              </Headline>
              <Preview disease={disease.value} token={userData.token} className={classNames(styles.CategoryListCardDetailsPreview)}></Preview>
                </div>
              <div className={classNames(styles.CategoryListCardIcon)}>
                <img src={getDiseaseIcon(disease.value)} alt={disease.value} />
              </div>
            </div>
          );
        })}
      </div>}
    </div>
  );
};

export default Category;

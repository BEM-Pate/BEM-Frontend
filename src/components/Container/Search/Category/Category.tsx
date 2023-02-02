import React from "react";
import classNames from "classnames";
import styles from "./Category.module.scss";
import Button from "../../../Button/Button";
import Headline from "../../../Headline/Headline";

interface Props {
  children?: any;
  userData: any;
}

const Category = (props: Props) => {
  const { children, userData } = props;
  console.log(userData);
  return (
    <div className={classNames(styles.Category)}>
      <Button icon></Button>
      <Headline className={classNames(styles.CategoryHeadline)} headline="h1">Nach Krankheitsbildern</Headline>
    </div>
  );
};

export default Category;

import React, { useState } from "react";
import classNames from "classnames";
import styles from "./Paragraph.module.scss";

interface Props {
  children: any;
  className?: string;
  collapse?: boolean;
}

const Paragraph = (props: Props) => {
  const { children, collapse = false, className } = props;
  const [isCollapsed , setIsCollapsed] = useState(collapse);

  return (
    <>
      <p
        className={classNames(
          styles.Paragraph,
          isCollapsed ? styles.ParagraphCollapsed : "", className
        )}
      >
        {children}
      </p>
     {collapse &&  <button className={classNames(
          styles.ParagraphButton)} onClick={() => setIsCollapsed(!isCollapsed)}>
        {isCollapsed ? "Read More" : "Read Less" }
      </button>}
    </>
  );
};

export default Paragraph;

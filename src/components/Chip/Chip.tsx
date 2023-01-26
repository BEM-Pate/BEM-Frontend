import classNames from "classnames";
import React, { useState } from "react";
import styles from "./Chip.module.scss";

interface Props {
  id: string;
  emoji?: string;
  selected?: boolean;
  className?: string | undefined;
  children?: React.ReactNode;
  onClick?: (e: any) => void;
  toggleAble?: boolean;
}

const Chip = (props: Props) => {
  const { emoji, id, selected, className, children, onClick, toggleAble = true } = props;
  const [isSelected, setIsSelected] = useState<boolean>(selected!);

  const handleClick = () => {
   if(toggleAble) {
    setIsSelected(!isSelected);
   }
    if (onClick) {
      onClick(id);
    }
  };

  return (
    <div
      className={classNames(
        styles.Chip,
        isSelected ? styles.ChipActive : "",
        className
      )}
      onClick={handleClick}
    >
      {emoji! && <span>{emoji} </span>}
      {children}
    </div>
  );
};

export default Chip;

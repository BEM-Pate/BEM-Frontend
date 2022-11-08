import React from 'react';
import classNames from 'classnames';
import styles from './Headline.module.scss';

interface HeadlineProps extends React.HTMLAttributes<HTMLHeadingElement> {
  headline: React.ElementType;
}

/* if necessary add classname prop */
const Headline: React.FC<HeadlineProps> = ({ children, headline }) => {
  const Heading = headline;
  return <Heading className={classNames(styles.Headline)}>{children}</Heading>;
};

export default Headline;

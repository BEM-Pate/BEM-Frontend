import React from 'react';
import classNames from 'classnames';
import styles from './Headline.module.scss';

interface Props extends React.HTMLAttributes<HTMLHeadingElement> {
  headline: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
}

const Headline = (props: Props) => {
  const { headline, children, className } = props;
  const Heading = headline;
  return <Heading className={classNames(styles.Headline, className)}>{children}</Heading>;
};

export default Headline;

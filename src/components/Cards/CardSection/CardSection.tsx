import React from 'react';
import styles from './CardSection.module.scss';
import classNames from 'classnames';

type OwnProps = {
  children: React.ReactNode;
  className: string;
};

export const CardSection = ({ className, children }: OwnProps) => {
  return <div className={classNames(styles.section, className)}>{children}</div>;
};

import React from 'react';
import styles from './CardSection.module.scss';
import classNames from 'classnames';

export interface CardSectionProps {
  children?: React.ReactNode;
  className?: string;
}

export const CardSection = ({ className, children }: CardSectionProps) => {
  return <div className={classNames(styles.section, className)}>{children}</div>;
};

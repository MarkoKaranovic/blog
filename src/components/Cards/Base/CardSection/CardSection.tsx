import React from 'react';
import styles from './CardSection.module.scss';
import classNames from 'classnames';

export interface CardSectionProps {
  children?: React.ReactNode;
  className?: string;
  propsMessage?: string;
}

const componentName = 'Card Section';

export const CardSection = ({ className, propsMessage, children }: CardSectionProps) => {
  console.log(`${propsMessage} ${componentName}`);
  return <div className={classNames(styles.section, className)}>{children}</div>;
};

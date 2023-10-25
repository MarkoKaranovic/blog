import React, { Children, cloneElement, FC } from 'react';

import { CardSection, CardSectionProps } from './CardSection/CardSection';

import styles from './Card.module.scss';
import classNames from 'classnames';
import { getStyles } from '../../../utils';

export type CardSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | string;
export type CardNumberSize = CardSize | number | string;

type OwnProps = {
  className?: string;
  children: React.ReactNode;
  maw?: number;
  padding?: CardSize;
  radius?: CardSize;
  style?: Record<string, string>;
  unstyled?: boolean;
  withBorder?: boolean;
};

interface AccordionComponent extends FC<OwnProps> {
  Section: FC<CardSectionProps>;
}

export const Card: AccordionComponent = ({ children, ...props }) => {
  const { className, style, radius, withBorder, padding, unstyled, maw, ...other } = props;

  const getStyle = getStyles({
    padding,
    radius,
    withBorder,
    maw,
    style,
  });

  const _children = Children.toArray(children);

  const content = _children.map((child, index) => {
    if (typeof child === 'object' && child && 'type' in child && child.type === CardSection) {
      return cloneElement(child, {
        'data-first-section': index === 0 || undefined,
        'data-last-section': index === _children?.length - 1 || undefined,
      });
    }

    return child;
  });

  return (
    <div
      style={getStyle}
      className={classNames(styles.card, className, { [styles.unstyled]: unstyled })}
      {...other}
    >
      {content}
    </div>
  );
};

Card.Section = CardSection;

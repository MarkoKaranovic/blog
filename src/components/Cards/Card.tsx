import React, { Children, cloneElement } from 'react';

import { CardSection } from './CardSection/CardSection';

import styles from './Card.module.scss';
import classNames from 'classnames';

export type CardSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | (string & {});
export type CardNumberSize = CardSize | number | (string & {});

const Sizes: Record<string, number> = {
  xs: 0.5,
  sm: 1,
  md: 1.5,
  lg: 2,
  xl: 3,
};

export const Card: any = React.forwardRef(({ children, ...props }: any, ref) => {
  const {
    classNames: _classNames,
    className,
    style,
    shadow,
    radius,
    withBorder,
    padding,
    unstyled,
    maw,
    ...other
  } = props;

  const getStyle = getStyles({
    padding,
    shadow,
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
        'data-last-section': index === _children.length - 1 || undefined,
      });
    }

    return child;
  });

  return (
    <div
      ref={ref}
      style={getStyle}
      className={classNames(styles.card, className, { [styles.unstyled]: unstyled })}
      {...other}
    >
      {content}
    </div>
  );
});

const getStyles = ({ padding, radius, withBorder, shadow, maw, style }: any) => {
  return {
    '--card-padding': remResolver(Sizes[padding]),
    '--card-border-radius': remResolver(Sizes[radius]),
    border: withBorder ? 'var(--card-border)' : 'none',
    maxWidth: `${maw}%`,
    ...style,
  };
};

const remResolver = (value: number) => `${value}rem`;

Card.Section = CardSection;

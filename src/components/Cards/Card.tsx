import React, { Children, cloneElement } from 'react';

// import { Paper } from '../Paper';
import { CardSection } from './CardSection/CardSection';
// import { CardProvider } from './Card.context';
import classes from './Card.module.scss';

export type CardStylesNames = 'root' | 'section';
export type CardCssVariables = {
  root: '--card-padding';
};

// const varsResolver = createVarsResolver((_, { padding }) => ({
//   root: {
//     '--card-padding': getSpacing(padding),
//   },
// }));

export const Card = ({ children, ...props }: any) => {
  //   const getStyle = getStyles({
  //     name: 'Card',
  //     props,
  //     classes,
  //     className,
  //     style,
  //     classNames,
  //     styles,
  //     unstyled,
  //     vars,
  //     varsResolver,
  //   });

  const _children = Children.toArray(children);
  console.log(_children);
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
      // ref={ref}
      // unstyled={unstyled}
      // {...getStyles('root')}
      {...props}
    >
      {content}
    </div>
  );
};

Card.classes = classes;
Card.Section = CardSection;

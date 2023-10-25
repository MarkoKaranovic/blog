import classNames from 'classnames';
import styles from './Button.module.scss';
import React from 'react';
import { ButtonSize, ButtonTypes, Variants } from '../../types';

interface OwnProps {
  variant?: Variants.PRIMARY | Variants.SECONDARY;
  name?: string;
  size?: ButtonSize.SMALL | ButtonSize.MEDIUM | ButtonSize.LARGE | ButtonSize.XLARGE;
  className?: string;
  style?: Record<string, string>;
  type?: ButtonTypes.CIRCLE | ButtonTypes.SQUARE;
  children?: React.ReactNode;
  onClick?: () => void;
}

const dataTestId = 'btn';

const Button = ({
  variant = Variants.PRIMARY,
  style,
  size = ButtonSize.MEDIUM,
  type = ButtonTypes.SQUARE,
  className,
  children,
  ...rest
}: OwnProps) => {
  return (
    <div className={styles.buttonContainer}>
      <button
        data-testid={dataTestId}
        className={classNames(styles.button, className, {
          [styles[variant]]: variant,
          [styles[type]]: !!type,
          [styles[size]]: !!size,
        })}
        style={style}
        {...rest}
      >
        {children}
      </button>
    </div>
  );
};
export default Button;

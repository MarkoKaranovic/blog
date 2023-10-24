import classNames from 'classnames';
import styles from './Button.module.scss';
import React from 'react';

type OwnProps = {
  variant?: string;
  name?: string;
  size?: string;
  className?: string;
  style?: Record<string, string>;
  type?: string;
  children?: React.ReactNode;
  onClick?: () => void;
};

const Button = ({
  variant = 'primary',
  style,
  name = 'name',
  size = 'medium',
  type = 'square',
  className,
  children,
  ...rest
}: OwnProps) => {
  return (
    <div className={styles.buttonContainer}>
      <button
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

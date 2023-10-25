import classNames from 'classnames';
import styles from './Button.module.scss';
import React from 'react';

interface OwnProps {
  variant?: 'primary' | 'secondary';
  name?: string;
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  className?: string;
  style?: Record<string, string>;
  type?: 'circle' | 'square';
  children?: React.ReactNode;
  onClick?: () => void;
}

const Button = ({
  variant = 'primary',
  style,
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

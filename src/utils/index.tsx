import { CardSize } from '../components/Cards/Base/Card';
export const Sizes: Record<string, number> = {
  xs: 0.5,
  sm: 1,
  md: 1.5,
  lg: 2,
  xl: 3,
};
export const getStyles = ({
  padding,
  radius,
  withBorder,
  maw,
  style,
}: {
  padding?: CardSize;
  radius?: CardSize;
  withBorder?: boolean;
  maw?: number;
  style?: Record<string, string>;
}) => {
  return {
    '--card-padding': remResolver(Sizes[padding ?? 'sm']),
    '--card-border-radius': remResolver(Sizes[radius ?? 'sm']),
    border: withBorder ? 'var(--card-border)' : 'none',
    maxWidth: `${maw}%`,
    ...style,
  };
};

export const remResolver = (value: number) => `${value}rem`;

export const range = (start: number, end: number) => {
  const length = end - start + 1;

  return Array.from({ length }, (_, idx) => idx + start);
};

import { Theme } from '@mui/material/styles';
import { ButtonProps, IconButtonProps, SliderProps } from '@mui/material';

export type ButtonVariantProps = 'contained' | 'outlined' | 'text';
export type IconButtonShapeProps = 'rounded' | 'square';
type TooltipColor = 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error' | 'default';
export type ColorProps = ButtonProps['color'] | IconButtonProps['color'] | SliderProps['color'] | TooltipColor;
export type ExtendedStyleProps = {
  color: ColorProps;
  theme: Theme;
};

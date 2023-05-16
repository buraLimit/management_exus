import { forwardRef, ReactNode, ReactChild, ReactFragment, ReactPortal, Ref } from 'react';
import MuiIconButton from '@mui/material/IconButton';
import { alpha, styled, useTheme } from '@mui/material/styles';
import { IconButtonProps } from '@mui/material';
import getColors from 'utils/getColors';
import { ButtonVariantProps, ExtendedStyleProps, IconButtonShapeProps } from 'types/extended';

interface IconButtonStyleProps extends ExtendedStyleProps {
  variant?: ButtonVariantProps;
}

function getColorStyle({ variant, theme, color }: IconButtonStyleProps) {
  const colors = getColors(theme, color);
  const { dark, main, contrastText } = colors;

  const commonShadow = {
    '&::after': {
      boxShadow: `0 0 6px 6px ${alpha(main, 0.9)}`
    },
    '&:active::after': {
      boxShadow: `0 0 0 0 ${alpha(main, 0.9)}`
    },
    '&:focus-visible': {
      outline: `2px solid ${dark}`,
      outlineOffset: 2
    }
  };

  switch (variant) {
    case 'contained':
      return {
        color: contrastText,
        backgroundColor: main,
        '&:hover': {
          backgroundColor: dark
        },
        ...commonShadow
      };
    case 'outlined':
      return {
        '&:hover': {
          backgroundColor: 'transparent',
          color: dark,
          borderColor: dark
        },
        ...commonShadow
      };
  }
}

interface StyleProps extends IconButtonStyleProps {
  shape?: IconButtonShapeProps;
}

const IconButtonStyle = styled(MuiIconButton, { shouldForwardProp: (prop) => prop !== 'variant' && prop !== 'shape' })(
  ({ theme, variant, shape, color }: StyleProps) => ({
    position: 'relative',
    '::after': {
      content: '""',
      display: 'block',
      position: 'absolute',
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      borderRadius: 4,
      opacity: 0,
      transition: 'all 0.5s'
    },

    ':active::after': {
      position: 'absolute',
      borderRadius: shape === 'rounded' ? '50%' : 4,
      left: 0,
      top: 0,
      opacity: 1,
      transition: '0s'
    },
    ...(shape === 'rounded' && {
      borderRadius: '50%'
    }),
    ...(variant === 'outlined' && {
      border: '1px solid',
      borderColor: 'inherit'
    }),

    ...getColorStyle({ variant, theme, color })
  })
);

export interface Props extends IconButtonProps {
  shape?: IconButtonShapeProps;
  variant?: ButtonVariantProps;
  children: ReactNode;
  tooltip?: boolean | ReactChild | ReactFragment | ReactPortal;
}

const IconButton = forwardRef(
  ({ variant = 'text', shape = 'square', children, color = 'primary', tooltip, ...others }: Props, ref: Ref<HTMLButtonElement>) => {
    const theme = useTheme();

    return (
      <IconButtonStyle ref={ref} disableRipple variant={variant} shape={shape} theme={theme} color={color} {...others}>
        {children}
      </IconButtonStyle>
    );
  }
);

IconButton.displayName = 'IconButton';

export default IconButton;

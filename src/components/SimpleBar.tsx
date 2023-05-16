import { ReactNode } from 'react';
import { alpha, styled } from '@mui/material/styles';
import { Theme, Box } from '@mui/material';
import SimpleBar, { Props } from 'simplebar-react';
import { MUIStyledCommonProps } from '@mui/system';

const RootStyle = styled(Box)({
  flexGrow: 1,
  height: '100%',
  overflow: 'hidden'
});

const SimpleBarStyle = styled(SimpleBar)(({ theme }) => ({
  maxHeight: '100%',
  '& .simplebar-scrollbar': {
    '&:before': {
      backgroundColor: alpha(theme.palette.grey[500], 0.48)
    },
    '&.simplebar-visible:before': {
      opacity: 1
    }
  },
  '& .simplebar-track.simplebar-vertical': {
    width: 10
  },
  '& .simplebar-track.simplebar-horizontal .simplebar-scrollbar': {
    height: 6
  },
  '& .simplebar-mask': {
    zIndex: 'inherit'
  }
}));

export default function SimpleBarScroll({ children, sx, ...other }: MUIStyledCommonProps<Theme> & Props) {
  return (
    <RootStyle>
      <SimpleBarStyle timeout={500} clickOnTrack={false} sx={sx} {...other}>
        {children as ReactNode}
      </SimpleBarStyle>
    </RootStyle>
  );
}

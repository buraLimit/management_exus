import { useTheme } from '@mui/material/styles';
import DrawerHeaderStyled from './DrawerHeaderStyled';
import Logo from 'components/logo/Logo';

interface Props {
  open: boolean;
}

const DrawerHeader = ({ open }: Props) => {
  const theme = useTheme();

  return (
    <DrawerHeaderStyled
      theme={theme}
      open={open}
      sx={{
        minHeight: '60px',
        width: 'inherit',
        paddingTop: '8px',
        paddingBottom: '8px',
        paddingLeft: open ? '24px' : 0
      }}
    >
      <Logo sx={{ width: open ? 'auto' : 35, height: 35 }} />
    </DrawerHeaderStyled>
  );
};

export default DrawerHeader;

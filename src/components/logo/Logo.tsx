import { Link } from 'react-router-dom';
import { To } from 'history';
import { ButtonBase } from '@mui/material';
import { SxProps } from '@mui/system';
import logo from 'assets/logo.png';
import { APP_DEFAULT_PATH } from 'config';

interface Props {
  sx?: SxProps;
  to?: To;
}

const Logo = ({ sx, to }: Props) => (
  <ButtonBase disableRipple component={Link} to={!to ? APP_DEFAULT_PATH : to} sx={sx}>
    <img src={logo} alt="exus" width="50" />
  </ButtonBase>
);

export default Logo;

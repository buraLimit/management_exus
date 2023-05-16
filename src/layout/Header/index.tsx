import { ReactNode } from 'react';
import { useTheme } from '@mui/material/styles';
import { AppBar, Toolbar, AppBarProps } from '@mui/material';
import IconButton from 'components/@extended/IconButton';

import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import Profile from 'layout/Header/Profile';

interface Props {
  open: boolean;
  handleDrawerToggle?: () => void;
}

const Header = ({ open, handleDrawerToggle }: Props) => {
  const theme = useTheme();

  const iconBackColorOpen = 'grey.300';
  const iconBackColor = 'grey.100';

  const mainHeader: ReactNode = (
    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <IconButton
        aria-label="open drawer"
        onClick={handleDrawerToggle}
        edge="start"
        color="secondary"
        sx={{ color: 'text.primary', bgcolor: open ? iconBackColorOpen : iconBackColor, ml: { xs: 0, lg: -2 } }}
      >
        {!open ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </IconButton>
      <Profile />
    </Toolbar>
  );

  const appBar: AppBarProps = {
    position: 'fixed',
    color: 'inherit',
    elevation: 0,
    sx: {
      borderBottom: `1px solid ${theme.palette.divider}`,
      zIndex: 1200,
      width: open ? 'calc(100% - 260px)' : { xs: '100%', lg: 'calc(100% - 60px)' },
      boxShadow: 'rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px'
    }
  };

  return <AppBar {...appBar}>{mainHeader}</AppBar>;
};

export default Header;

import { forwardRef, useEffect, ForwardRefExoticComponent, RefAttributes } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { ListItemButton, ListItemIcon, ListItemText, Typography, useMediaQuery } from '@mui/material';
import { dispatch, useSelector } from 'store';
import { activeItem, openDrawer } from 'store/reducers/menu';
import { LinkTarget, NavItemType } from 'types/menu';
import { useTranslation } from 'react-i18next';

interface Props {
  item: NavItemType;
  level: number;
}

const NavItem = ({ item, level }: Props) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const menu = useSelector((state) => state.menu);
  const matchDownLg = useMediaQuery(theme.breakpoints.down('lg'));
  const { drawerOpen, openItem } = menu;

  let itemTarget: LinkTarget = '_self';
  if (item.target) {
    itemTarget = '_blank';
  }

  let listItemProps: {
    component: ForwardRefExoticComponent<RefAttributes<HTMLAnchorElement>> | string;
    href?: string;
    target?: LinkTarget;
  } = { component: forwardRef((props, ref) => <Link {...props} to={item.url!} target={itemTarget} />) };
  if (item?.external) {
    listItemProps = { component: 'a', href: item.url, target: itemTarget };
  }

  const Icon = item.icon!;
  const itemIcon = item.icon ? <Icon style={{ fontSize: drawerOpen ? '1rem' : '1.25rem' }} /> : false;

  const isSelected = openItem.findIndex((id) => id === item.id) > -1;

  const { pathname } = useLocation();

  // active menu item on page load
  useEffect(() => {
    if (pathname === item.url) {
      dispatch(activeItem({ openItem: [item.id] }));
    }
    // eslint-disable-next-line
  }, [pathname]);

  const textColor = 'text.primary';
  const iconSelectedColor = 'primary.main';

  return (
    <ListItemButton
      {...listItemProps}
      disabled={item.disabled}
      selected={isSelected}
      sx={{
        zIndex: 1201,
        pl: drawerOpen ? `${level * 28}px` : 1.5,
        py: !drawerOpen && level === 1 ? 1.25 : 1,
        ...(drawerOpen && {
          '&:hover': {
            bgcolor: 'primary.lighter'
          },
          '&.Mui-selected': {
            bgcolor: 'primary.lighter',
            borderRight: `2px solid ${theme.palette.primary.main}`,
            color: iconSelectedColor,
            '&:hover': {
              color: iconSelectedColor,
              bgcolor: 'primary.lighter'
            }
          }
        }),
        ...(!drawerOpen && {
          '&:hover': {
            bgcolor: 'transparent'
          },
          '&.Mui-selected': {
            '&:hover': {
              bgcolor: 'transparent'
            },
            bgcolor: 'transparent'
          }
        })
      }}
      {...(matchDownLg && {
        onClick: () => dispatch(openDrawer(false))
      })}
    >
      {itemIcon && (
        <ListItemIcon
          sx={{
            minWidth: 28,
            color: isSelected ? iconSelectedColor : textColor,
            ...(!drawerOpen && {
              borderRadius: 1.5,
              width: 36,
              height: 36,
              alignItems: 'center',
              justifyContent: 'center',
              '&:hover': {
                bgcolor: 'secondary.lighter'
              }
            }),
            ...(!drawerOpen &&
              isSelected && {
                bgcolor: 'primary.lighter',
                '&:hover': {
                  bgcolor: 'primary.lighter'
                }
              })
          }}
        >
          {itemIcon}
        </ListItemIcon>
      )}
      {drawerOpen && (
        <ListItemText
          primary={
            <Typography variant="h6" sx={{ color: isSelected ? iconSelectedColor : textColor }}>
              {t(item.title || 'No text')}
            </Typography>
          }
        />
      )}
    </ListItemButton>
  );
};

export default NavItem;

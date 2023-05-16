import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { Box, List, Typography } from '@mui/material';
import NavItem from './NavItem';
import { dispatch } from 'store';
import { activeID } from 'store/reducers/menu';
import { NavItemType } from 'types/menu';
import { RootStateProps } from 'types/root';

interface Props {
  item: NavItemType;
  setSelectedItems: React.Dispatch<React.SetStateAction<string | undefined>>;
  selectedItems: string | undefined;
  setSelectedLevel: React.Dispatch<React.SetStateAction<number>>;
  selectedLevel: number;
}

type VirtualElement = {
  getBoundingClientRect: () => DOMRect;
  contextElement?: Element;
};

const NavGroup = ({ item }: Props) => {
  const { pathname } = useLocation();

  const menu = useSelector((state: RootStateProps) => state.menu);
  const { drawerOpen } = menu;

  const [anchorEl, setAnchorEl] = useState<VirtualElement | (() => VirtualElement) | null | undefined>(null);
  const [currentItem, setCurrentItem] = useState(item);

  const openMini = Boolean(anchorEl);

  useEffect(() => {
    setCurrentItem(item);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  const checkOpenForParent = (child: NavItemType[], id: string) => {
    child.forEach((ele: NavItemType) => {
      if (ele.children?.length) {
        checkOpenForParent(ele.children, currentItem.id!);
      }
      if (ele.url === pathname) {
        dispatch(activeID(id));
      }
    });
  };

  const checkSelectedOnload = (data: NavItemType) => {
    const childrens = data.children ? data.children : [];
    childrens.forEach((itemCheck: NavItemType) => {
      if (itemCheck.children?.length) {
        checkOpenForParent(itemCheck.children, currentItem.id!);
      }
      if (itemCheck.url === pathname) {
        dispatch(activeID(currentItem.id!));
      }
    });
  };

  useEffect(() => {
    checkSelectedOnload(currentItem);
    if (openMini) setAnchorEl(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, currentItem]);

  const navItems = item.children?.map((menuItem, index) => {
    return <NavItem key={menuItem.id} item={menuItem} level={1} />;
  });

  return (
    <>
      <List
        subheader={
          item.title &&
          drawerOpen && (
            <Box sx={{ pl: 3, mb: 1.5 }}>
              <Typography variant="subtitle2" color={'text.secondary'}>
                {item.title}
              </Typography>
            </Box>
          )
        }
        sx={{ mt: drawerOpen && item.title ? 1.5 : 0, py: 0, zIndex: 0 }}
      >
        {navItems}
      </List>
    </>
  );
};

export default NavGroup;

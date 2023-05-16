import { useState } from 'react';
import { Box } from '@mui/material';
import NavGroup from './NavGroup';
import menuItem from 'menuItems';
import { useSelector } from 'store';
const Navigation = () => {
  const { drawerOpen } = useSelector((state) => state.menu);
  const [selectedItems, setSelectedItems] = useState<string | undefined>('');
  const [selectedLevel, setSelectedLevel] = useState<number>(0);

  let lastItemIndex = menuItem.items.length - 1;

  const navGroups = menuItem.items.slice(0, lastItemIndex + 1).map((item) => {
    if (item.type === 'group') {
      return (
        <NavGroup
          key={item.id}
          setSelectedItems={setSelectedItems}
          setSelectedLevel={setSelectedLevel}
          selectedLevel={selectedLevel}
          selectedItems={selectedItems}
          item={item}
        />
      );
    }
    return '';
  });
  return (
    <Box
      sx={{
        pt: drawerOpen ? 2 : 0,
        '& > ul:first-of-type': { mt: 0 },
        display: 'block'
      }}
    >
      {navGroups}
    </Box>
  );
};

export default Navigation;

import { styled } from '@mui/material/styles';
import { Toolbar, OutlinedInput, InputAdornment, FormControl } from '@mui/material';
import { ReactNode } from 'react';
import { SearchOutlined } from '@ant-design/icons';

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 76,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3),
  overflowX: 'auto'
}));

type TableToolbarProps = {
  searchQuery: string;
  onSearchQuery: (value: string) => void;
  placeholder: string;
  children?: ReactNode;
};

export default function TableToolbar({ searchQuery, onSearchQuery, placeholder, children }: TableToolbarProps) {
  return (
    <RootStyle>
      <FormControl sx={{ width: { xs: 154, sm: 224 } }}>
        <OutlinedInput
          size="small"
          id="header-search"
          startAdornment={
            <InputAdornment position="start" sx={{ mr: -0.5 }}>
              <SearchOutlined />
            </InputAdornment>
          }
          aria-describedby="header-search-text"
          inputProps={{
            'aria-label': 'weight'
          }}
          onChange={(e) => onSearchQuery(e.target.value)}
          placeholder={placeholder}
          value={searchQuery}
        />
      </FormControl>
      {children && children}
    </RootStyle>
  );
}

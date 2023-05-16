import { FormControl, Grid, MenuItem, Select, SelectChangeEvent, Stack, TextField, Typography } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import { useState } from 'react';

interface TableFooterProps {
  goToPage: (value: number) => void;
  setPageSize: (value: number) => void;
  pageIndex: number;
  pageSize: number;
  rows: number;
}

export default function TableFooter({ goToPage, rows, setPageSize, pageSize, pageIndex }: TableFooterProps) {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleChangePagination = (event: React.ChangeEvent<unknown>, value: number) => {
    goToPage(value);
  };

  const handleChange = (event: SelectChangeEvent<number>) => {
    setPageSize(+event.target.value);
  };

  return (
    <Grid
      container
      p={3}
      alignItems="center"
      justifyContent="space-between"
      sx={{ width: 'auto', boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px' }}
    >
      <Grid item>
        <Stack direction="row" spacing={1} alignItems="center">
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="caption" color="secondary">
              Row per page
            </Typography>
            <FormControl sx={{ m: 1 }}>
              <Select
                id="demo-controlled-open-select"
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                value={pageSize}
                onChange={handleChange}
                size="small"
                sx={{ '& .MuiSelect-select': { py: 0.75, px: 1.25 } }}
              >
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={25}>25</MenuItem>
                <MenuItem value={50}>50</MenuItem>
                <MenuItem value={100}>100</MenuItem>
              </Select>
            </FormControl>
          </Stack>
          <Typography variant="caption" color="secondary">
            Go to
          </Typography>
          <TextField
            size="small"
            type="number"
            value={pageIndex}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) : 0;
              goToPage(page);
            }}
            sx={{ '& .MuiOutlinedInput-input': { py: 0.75, px: 1.25, width: 36 } }}
          />
        </Stack>
      </Grid>
      <Grid item sx={{ mt: { xs: 2, sm: 0 } }}>
        <Pagination
          count={Math.ceil(rows / pageSize)}
          page={pageIndex}
          onChange={handleChangePagination}
          color="primary"
          variant="combined"
        />
      </Grid>
    </Grid>
  );
}

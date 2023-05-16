import { visuallyHidden } from '@mui/utils';
import { Box, TableRow, TableCell, TableHead as MuiTableHead, TableSortLabel } from '@mui/material';

type TableHeadProps = {
  order?: 'ASC' | 'DESC';
  orderBy?: string;
  headLabel: any[];
  onRequestSort?: (id: string) => void;
};

export default function TableHead({ order, orderBy, headLabel, onRequestSort }: TableHeadProps) {
  const getOrderValue = (orderValue?: 'ASC' | 'DESC') => {
    if (orderValue === 'ASC') {
      return 'asc';
    } else {
      return 'desc';
    }
  };
  return (
    <MuiTableHead>
      <TableRow>
        {headLabel.map((headCell) => (
          <TableCell key={headCell.id} align={'left'} sortDirection={orderBy === headCell.id ? getOrderValue(order) : false}>
            {headCell?.sort ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? getOrderValue(order) : 'asc'}
                onClick={() => onRequestSort && onRequestSort(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box sx={{ ...visuallyHidden }}>{order === 'DESC' ? 'sorted descending' : 'sorted ascending'}</Box>
                ) : null}
              </TableSortLabel>
            ) : (
              headCell.label
            )}
          </TableCell>
        ))}
      </TableRow>
    </MuiTableHead>
  );
}

import { TableBody, TableRow, TableCell } from '@mui/material';
import { ReactNode } from 'react';

interface EmptyTableProps {
  colSpan: number;
  children: ReactNode;
}

export default function EmptyTable({ children, colSpan }: EmptyTableProps) {
  return (
    <TableBody>
      <TableRow>
        <TableCell align="center" colSpan={colSpan} sx={{ py: 3 }}>
          {children}
        </TableCell>
      </TableRow>
    </TableBody>
  );
}

import { CircularProgress } from '@mui/material';
import { ReactNode } from 'react';
import EmptyTable from './EmptyTable';

interface TableWrapperProps {
  loading: boolean;
  listLength: boolean;
  children: ReactNode;
  colSpan: number;
}

export default function TableWrapper({ loading, listLength, children, colSpan }: TableWrapperProps) {
  return (
    <>
      {loading ? (
        <EmptyTable colSpan={colSpan}>
          <CircularProgress />
        </EmptyTable>
      ) : (
        children
      )}
      {!listLength && !loading && <EmptyTable colSpan={colSpan}>No results found</EmptyTable>}
    </>
  );
}

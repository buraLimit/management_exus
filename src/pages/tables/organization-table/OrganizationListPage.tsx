import { useState, useEffect } from 'react';
import { Button, Dialog, Table, TableContainer, Card } from '@mui/material';
import ScrollX from 'components/ScrollX';
import { useTranslation } from 'react-i18next';
import TableHead from 'components/table/TableHead';
import { ORGANIZATION_TABLE_HEAD } from '../tableHeadings';
import TableWrapper from 'components/table/TableWrapper';
import OrganizationsTable from './OrganizationsTable';
import { initialPagination } from '../constants';
import { useDispatch, useSelector } from 'store';
import TableToolbar from 'components/table/TableToolbar';
import { PlusOutlined } from '@ant-design/icons';
import TableFooter from 'components/table/TableFooter';
import OrganizationDialog from './OrganizationDialog';
import { PopupTransition } from 'components/@extended/Transitions';
import useDebounce from 'hooks/useDebounce';
import { Organization } from 'types/organization';
import { getOrganizationList } from 'store/reducers/organization';

const OrganizationListPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [pagination, setPagination] = useState(initialPagination);
  const [searchQuery, setSearchQuery] = useState('');
  const { organizations, totalItems, isLoading } = useSelector((state) => state.organization);
  const [organization, setOrganization] = useState<Organization | undefined>();
  const [open, setOpen] = useState<boolean>(false);

  const debouncedSearchTerm = useDebounce(searchQuery.trim(), 700, setPagination);

  const [sorting, setSorting] = useState<{ order: 'ASC' | 'DESC'; orderBy: string }>({
    order: 'ASC',
    orderBy: 'name'
  });

  const handleSearchByName = (searchQuery: string) => {
    setSearchQuery(searchQuery);
  };

  const handleEdit = (organization: Organization) => {
    setOrganization(organization);
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
    if (organization) {
      setOrganization(undefined);
    }
  };

  const handleRequestSort = (property: string) => {
    const isAsc = sorting.orderBy === property && sorting.order === 'ASC';
    setSorting({ order: isAsc ? 'DESC' : 'ASC', orderBy: property });
  };

  // TODO: add sorting?
  useEffect(() => {
    dispatch(
      getOrganizationList({
        _page: pagination.currentPage,
        _limit: pagination.itemsPerPage,
        _search: debouncedSearchTerm
      })
    );
  }, [pagination.currentPage, pagination.itemsPerPage, debouncedSearchTerm, dispatch]);

  return (
    <Card>
      <TableToolbar searchQuery={searchQuery} onSearchQuery={handleSearchByName} placeholder="Not supported...">
        <Button variant="contained" startIcon={<PlusOutlined />} onClick={() => setOpen(true)} size="small">
          {t('AddOrganization')}
        </Button>
      </TableToolbar>
      <ScrollX>
        <TableContainer>
          <Table>
            <TableHead
              order={sorting.order}
              orderBy={sorting.orderBy}
              headLabel={ORGANIZATION_TABLE_HEAD}
              onRequestSort={handleRequestSort}
            />
            <TableWrapper loading={isLoading} listLength={!!organizations?.length} colSpan={ORGANIZATION_TABLE_HEAD.length}>
              <OrganizationsTable handleEdit={handleEdit} />
            </TableWrapper>
          </Table>
        </TableContainer>
      </ScrollX>
      <TableFooter
        goToPage={(page) => setPagination((prev) => ({ ...prev, currentPage: page }))}
        setPageSize={(limit) => setPagination((prev) => ({ ...prev, itemsPerPage: limit }))}
        pageIndex={pagination.currentPage}
        pageSize={pagination.itemsPerPage}
        rows={totalItems}
      />
      {open && (
        <Dialog
          maxWidth="xs"
          TransitionComponent={PopupTransition}
          keepMounted
          fullWidth
          onClose={handleCancel}
          open={open}
          sx={{ '& .MuiDialog-paper': { p: 0 }, transition: 'transform 225ms' }}
          aria-describedby="alert-dialog-slide-description"
        >
          <OrganizationDialog organization={organization} onCancel={handleCancel} />
        </Dialog>
      )}
    </Card>
  );
};

export default OrganizationListPage;

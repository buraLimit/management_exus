import { TableRow, TableBody, TableCell, Stack, Tooltip, IconButton, useTheme } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'store';
import { EditTwoTone, DeleteTwoTone } from '@ant-design/icons';
import ConfirmationDialog from 'components/ConfirmationDialog';
import { Organization } from 'types/organization';
import { deleteOrganization } from 'store/reducers/organization';

interface UserTableProps {
  handleEdit: (organization: Organization) => void;
}

export default function OrganizationsTable({ handleEdit }: UserTableProps) {
  const [openConfirmtionDialog, setOpenConfirmtionDialog] = useState(false);
  const { organizations, isLoading } = useSelector((state) => state.organization);
  const [organizationDeleteId, setOrganizationDeleteId] = useState<number | null | undefined>();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const theme = useTheme();

  const handleClose = () => {
    setOpenConfirmtionDialog(false);
  };

  const handleSubmit = async () => {
    dispatch(deleteOrganization(organizationDeleteId));
    setOpenConfirmtionDialog(false);
  };

  return (
    <TableBody>
      {organizations?.map((organization) => {
        return (
          <TableRow hover key={organization?.id} tabIndex={-1} sx={{ cursor: 'pointer', verticalAlign: 'top' }}>
            <TableCell align="left">{organization?.id || '-'}</TableCell>
            <TableCell align="left">{organization?.name || '-'}</TableCell>
            <TableCell align="left"> {organization?.acronym || '-'}</TableCell>
            <TableCell align="left"> {organization?.country || '-'}</TableCell>
            <TableCell align="left"> {organization?.projectId ? '1' : '-'}</TableCell>
            <TableCell align="left"> {organization?.users?.length || '-'}</TableCell>
            <TableCell>
              <Stack direction="row" alignItems="center" justifyContent="center" spacing={0}>
                <Tooltip title={t('Edit')}>
                  <IconButton
                    color="primary"
                    onClick={() => {
                      handleEdit(organization);
                    }}
                  >
                    <EditTwoTone twoToneColor={theme.palette.primary.main} />
                  </IconButton>
                </Tooltip>
                <Tooltip title={t('Delete')}>
                  <IconButton
                    color="error"
                    onClick={() => {
                      setOpenConfirmtionDialog(true);
                      setOrganizationDeleteId(organization.id);
                    }}
                  >
                    <DeleteTwoTone twoToneColor={theme.palette.error.main} />
                  </IconButton>
                </Tooltip>
              </Stack>
            </TableCell>
          </TableRow>
        );
      })}

      <ConfirmationDialog
        openDialog={openConfirmtionDialog}
        handleClose={handleClose}
        title={'Are you sure you want to delete this user?'}
        handleSubmit={handleSubmit}
        isSubmitting={isLoading}
      />
    </TableBody>
  );
}

/* eslint-disable prettier/prettier */
import { TableRow, TableBody, TableCell, Stack, Tooltip, IconButton, useTheme } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'store';
import { EditTwoTone, DeleteTwoTone } from '@ant-design/icons';
import { deleteUser } from 'store/reducers/user';
import { User } from 'types/user';
import ConfirmationDialog from 'components/ConfirmationDialog';

interface UserTableProps {
  handleEdit: (user: User) => void;
}

export default function UsersTable({ handleEdit }: UserTableProps) {
  const [openConfirmtionDialog, setOpenConfirmtionDialog] = useState(false);
  const { users, isLoading } = useSelector((state) => state.user);
  const { organizations } = useSelector((state) => state.organization);
  const [userDeleteId, setUserDeleteId] = useState<number | null | undefined>();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const theme = useTheme();

  const handleClose = () => {
    setOpenConfirmtionDialog(false);
  };

  const handleSubmit = async () => {
    dispatch(deleteUser(userDeleteId));
    setOpenConfirmtionDialog(false);
  };

  const getOrganizationName = (organizationId: number | undefined): string => {
    return organizations.find((org) => org.id === organizationId)?.name || '-';
  };

  return (
    <TableBody>
      {users?.map((user) => {
        return (
          <TableRow hover key={user?.id} tabIndex={-1} sx={{ cursor: 'pointer', verticalAlign: 'top' }}>
            <TableCell align="left">{user?.id || '-'}</TableCell>
            <TableCell align="left">{user?.name || '-'}</TableCell>
            <TableCell align="left"> {user?.email || '-'}</TableCell>
            <TableCell align="left"> {getOrganizationName(user?.organizationId)}</TableCell>
            <TableCell>
              <Stack direction="row" alignItems="center" justifyContent="center" spacing={0}>
                <Tooltip title={t('Edit')}>
                  <IconButton
                    color="primary"
                    onClick={() => {
                      handleEdit(user);
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
                      setUserDeleteId(user.id);
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

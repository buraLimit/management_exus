import { TableRow, TableBody, TableCell, Stack, Tooltip, IconButton, useTheme } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'store';
import { EditTwoTone, DeleteTwoTone } from '@ant-design/icons';
import ConfirmationDialog from 'components/ConfirmationDialog';
import { deleteProject } from 'store/reducers/project';
import { Project } from 'types/project';

interface UserTableProps {
  handleEdit: (project: Project) => void;
}

export default function ProjectsTable({ handleEdit }: UserTableProps) {
  const [openConfirmtionDialog, setOpenConfirmtionDialog] = useState(false);
  const { projects, isLoading } = useSelector((state) => state.project);
  const [deleteProjectId, setDeleteProjectId] = useState<number | null | undefined>();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const theme = useTheme();

  const handleClose = () => {
    setOpenConfirmtionDialog(false);
  };

  const handleSubmit = async () => {
    dispatch(deleteProject(deleteProjectId));
    setOpenConfirmtionDialog(false);
  };

  return (
    <TableBody>
      {projects?.map((project) => {
        return (
          <TableRow hover key={project?.id} tabIndex={-1} sx={{ cursor: 'pointer', verticalAlign: 'top' }}>
            <TableCell align="left">{project?.id || '-'}</TableCell>
            <TableCell align="left">{project?.name || '-'}</TableCell>
            <TableCell align="left"> {project?.acronym || '-'}</TableCell>
            <TableCell align="left"> {project?.description || '-'}</TableCell>
            <TableCell align="left"> {project?.organizations?.length || '-'}</TableCell>
            <TableCell>
              <Stack direction="row" alignItems="center" justifyContent="center" spacing={0}>
                <Tooltip title={t('Edit')}>
                  <IconButton
                    color="primary"
                    onClick={() => {
                      handleEdit(project);
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
                      setDeleteProjectId(project.id);
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
        title={'Are you sure you want to delete this project?'}
        handleSubmit={handleSubmit}
        isSubmitting={isLoading}
      />
    </TableBody>
  );
}

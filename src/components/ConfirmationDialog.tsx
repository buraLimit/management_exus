import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';

interface ConfirmationDialogProps {
  handleClose: VoidFunction;
  handleSubmit: VoidFunction;
  openDialog: boolean;
  title: string;
  isSubmitting: boolean;
}
export default function ConfirmationDialog({ handleClose, handleSubmit, openDialog, title, isSubmitting }: ConfirmationDialogProps) {
  return (
    <Dialog open={openDialog} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogActions>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Yes
        </Button>
        <Button onClick={handleClose} autoFocus color="error" variant="outlined">
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
}

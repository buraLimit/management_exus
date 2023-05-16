import { SyntheticEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Button } from '@mui/material';
import MuiSnackbar from '@mui/material/Snackbar';
import IconButton from './IconButton';
import { CloseOutlined } from '@ant-design/icons';
import { RootStateProps } from 'types/root';
import { closeSnackbar } from 'store/reducers/snackbar';

const Snackbar = () => {
  const dispatch = useDispatch();
  const snackbar = useSelector((state: RootStateProps) => state.snackbar);
  const { actionButton, anchorOrigin, alert, close, message, open, variant, severity } = snackbar;

  const handleClose = (event: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(closeSnackbar());
  };

  return (
    <>
      {variant === 'alert' && (
        <MuiSnackbar anchorOrigin={anchorOrigin} open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            variant={alert.variant}
            color={alert.color}
            severity={severity}
            action={
              <>
                {actionButton !== false && (
                  <Button color={alert.color} size="small" onClick={handleClose}>
                    UNDO
                  </Button>
                )}
                {close !== false && (
                  <IconButton
                    sx={{ mt: 0.25 }}
                    size="small"
                    aria-label="close"
                    variant="contained"
                    color={alert.color}
                    onClick={handleClose}
                  >
                    <CloseOutlined />
                  </IconButton>
                )}
              </>
            }
            sx={{
              ...(alert.variant === 'outlined' && {
                bgcolor: 'grey.0'
              })
            }}
          >
            {message}
          </Alert>
        </MuiSnackbar>
      )}
    </>
  );
};

export default Snackbar;

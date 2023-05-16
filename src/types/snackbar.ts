import { AlertProps, SnackbarOrigin } from '@mui/material';

export type SnackbarActionProps = {
  payload?: SnackbarProps;
};

export interface SnackbarProps {
  action: boolean;
  open: boolean;
  message: string;
  anchorOrigin: SnackbarOrigin;
  variant: string;
  alert: AlertProps;
  close: boolean;
  actionButton: boolean;
  dense: boolean;
  maxStack: number;
  iconVariant: string;
  severity: SnackbarSeverity;
}

export enum SnackbarSeverity {
  Error = 'error',
  Warning = 'warning',
  Info = 'info',
  Success = 'success'
}

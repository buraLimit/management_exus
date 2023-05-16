import { ComponentClass, FunctionComponent } from 'react';
import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { AuthProps } from './auth';
import { MenuProps } from './menu';
import { SnackbarProps } from './snackbar';
import { UserStateProps } from './user';


export type RootStateProps = {
  auth: AuthProps;
  menu: MenuProps;
  snackbar: SnackbarProps;
  user: UserStateProps;
};

export type KeyedObject = {
  [key: string]: string | number | KeyedObject | any;
};

export type OverrideIcon =
  | (OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
      muiName: string;
    })
  | ComponentClass<any>
  | FunctionComponent<any>;

export interface GenericCardProps {
  title?: string;
  primary?: string | number | undefined;
  secondary?: string;
  content?: string;
  image?: string;
  dateTime?: string;
  iconPrimary?: OverrideIcon;
  color?: string;
  size?: string;
}

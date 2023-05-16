// material-ui
import { Theme } from '@mui/material/styles';

// third-party
import { merge } from 'lodash';

// project import
import ButtonBase from './ButtonBase';
import CardContent from './CardContent';
import Dialog from './Dialog';
import DialogTitle from './DialogTitle';
import IconButton from './IconButton';
import InputLabel from './InputLabel';
import LinearProgress from './LinearProgress';
import Link from './Link';
import ListItemButton from './ListItemButton';
import ListItemIcon from './ListItemIcon';
import OutlinedInput from './OutlinedInput';
import Pagination from './Pagination';
import TableBody from './TableBody';
import TableCell from './TableCell';
import TableHead from './TableHead';
import TableRow from './TableRow';
import Tooltip from './Tooltip';
import Typography from './Typography';

export default function ComponentsOverrides(theme: Theme) {
  return merge(
    ButtonBase(),
    CardContent(),
    Dialog(),
    DialogTitle(),
    IconButton(theme),
    InputLabel(theme),
    LinearProgress(),
    Link(),
    ListItemButton(theme),
    ListItemIcon(theme),
    OutlinedInput(theme),
    Pagination(),
    TableBody(theme),
    TableCell(theme),
    TableHead(theme),
    TableRow(),
    Tooltip(theme),
    Typography()
  );
}

import { combineReducers } from 'redux';
import menu from './menu';
import snackbar from './snackbar';
import user from './user';
import organization from './organization';
import project from './project';

const reducers = combineReducers({
  menu,
  snackbar,
  user,
  organization,
  project
});

export default reducers;

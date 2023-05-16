import { createSlice } from '@reduxjs/toolkit';
import axios from 'utils/axios';
import { dispatch } from '../index';
import { User, UserStateProps, NewUser } from 'types/user';
import { openSnackbar } from './snackbar';
import { SnackbarSeverity } from 'types/snackbar';
import { createRequestQuery, QueryParams } from 'utils/requestQuery';

const initialState: UserStateProps = {
  error: false,
  isLoading: false,
  users: [],
  totalItems: 0
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    hasError(state) {
      state.error = true;
      state.isLoading = false;
    },

    startLoading(state) {
      state.isLoading = true;
    },

    getUserListSuccess(state, action) {
      state.users = action.payload;
      state.totalItems = action.payload.meta?.totalItems;
      state.isLoading = false;
    },

    addUserSuccess(state, action) {
      state.users = [...state.users, action.payload];
      state.isLoading = false;
    },

    updateUserSuccess(state, action) {
      const updatedUser: User = action.payload;
      const updatedUserList = state.users.map((user) => {
        if (user.id === updatedUser.id) {
          return updatedUser;
        }
        return user;
      });

      state.users = updatedUserList;
      state.isLoading = false;
    },

    userDeleteSuccess(state, action) {
      const updatedUserId: number = action.payload;
      const updatedUserList = state.users.filter((user) => {
        return user.id !== updatedUserId;
      });

      state.users = updatedUserList;
      state.isLoading = false;
    }
  }
});

export default slice.reducer;

export function getUserList(requestParams?: QueryParams) {
  return async () => {
    dispatch(slice.actions.startLoading());

    const requestQuery = createRequestQuery(requestParams);
    try {
      const response = await axios.get(`/users?${requestQuery}`);
      dispatch(slice.actions.getUserListSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError());
    }
  };
}

export function deleteUser(id: number | null | undefined) {
  return async () => {
    if (!id) {
      return;
    }
    dispatch(slice.actions.startLoading());

    try {
      await axios.delete(`/users/${id.toString()}`);
      dispatch(slice.actions.userDeleteSuccess(id));
      dispatch(
        openSnackbar({
          open: true,
          severity: SnackbarSeverity.Success,
          message: 'DeleteUserSuccess',
          variant: 'alert',
          alert: {
            color: 'success'
          },
          close: false
        })
      );
    } catch (error: any) {
      let message = 'DeleteUserError';
      if (error && error?.message && typeof error?.message === 'string') {
        message = error.message;
      }

      dispatch(slice.actions.hasError());
      dispatch(
        openSnackbar({
          open: true,
          severity: SnackbarSeverity.Error,
          message: message,
          variant: 'alert',
          alert: {
            color: 'error'
          },
          close: false
        })
      );
    }
  };
}

export function createUser(user: NewUser) {
  return async () => {
    dispatch(slice.actions.startLoading());

    try {
      const response = await axios.post('/users', user);

      dispatch(slice.actions.addUserSuccess(response.data));
      dispatch(
        openSnackbar({
          open: true,
          severity: SnackbarSeverity.Success,
          message: 'AddUserSuccess',
          variant: 'alert',
          alert: {
            color: 'success'
          },
          close: false
        })
      );
    } catch (error: any) {
      let message = 'AddUserError';
      if (error && error?.message && typeof error?.message === 'string') {
        message = error.message;
      }

      dispatch(slice.actions.hasError());
      dispatch(
        openSnackbar({
          open: true,
          severity: SnackbarSeverity.Error,
          message: message,
          variant: 'alert',
          alert: {
            color: 'error'
          },
          close: false
        })
      );
    }
  };
}

export function updateUser(user: NewUser, id: string) {
  return async () => {
    dispatch(slice.actions.startLoading());

    try {
      const response = await axios.put(`/users/${id}`, user);
      dispatch(slice.actions.updateUserSuccess(response.data));
      dispatch(
        openSnackbar({
          open: true,
          severity: SnackbarSeverity.Success,
          message: 'UpdateUserSuccess',
          variant: 'alert',
          alert: {
            color: 'success'
          },
          close: false
        })
      );
    } catch (error: any) {
      let message = 'UpdateUserError';
      if (error && error?.message && typeof error?.message === 'string') {
        message = error.message;
      }

      dispatch(slice.actions.hasError());
      dispatch(
        openSnackbar({
          open: true,
          severity: SnackbarSeverity.Error,
          message: message,
          variant: 'alert',
          alert: {
            color: 'error'
          },
          close: false
        })
      );
    }
  };
}

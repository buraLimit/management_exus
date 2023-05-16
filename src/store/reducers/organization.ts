import { createSlice } from '@reduxjs/toolkit';
import axios from 'utils/axios';
import { dispatch } from '../index';
import { OrganizationStateProps, Organization, NewOrganization } from 'types/organization';
import { openSnackbar } from './snackbar';
import { SnackbarSeverity } from 'types/snackbar';
import { createRequestQuery, QueryParams } from 'utils/requestQuery';

const initialState: OrganizationStateProps = {
  error: false,
  isLoading: false,
  organizations: [],
  totalItems: 0
};

const slice = createSlice({
  name: 'organization',
  initialState,
  reducers: {
    hasError(state) {
      state.error = true;
      state.isLoading = false;
    },

    startLoading(state) {
      state.isLoading = true;
    },

    getOrganizationListSuccess(state, action) {
      state.organizations = action.payload;
      state.totalItems = action.payload.meta?.totalItems;
      state.isLoading = false;
    },

    addOrganizationSuccess(state, action) {
      state.organizations = [...state.organizations, action.payload];
      state.isLoading = false;
    },

    updateOrganizationSuccess(state, action) {
      const updatedOrganization: Organization = action.payload;
      const updatedOrganizationList = state.organizations.map((organization) => {
        if (organization.id === updatedOrganization.id) {
          return updatedOrganization;
        }
        return organization;
      });

      state.organizations = updatedOrganizationList;
      state.isLoading = false;
    },

    deleteOrganizationSuccess(state, action) {
      const deletedOrganizationId: number = action.payload;
      const updatedOrganizationList = state.organizations.filter((organization) => {
        return organization.id !== deletedOrganizationId;
      });

      state.organizations = updatedOrganizationList;
      state.isLoading = false;
    }
  }
});

export default slice.reducer;

export function getOrganizationList(requestParams?: QueryParams) {
  return async () => {
    dispatch(slice.actions.startLoading());

    const requestQuery = createRequestQuery(requestParams);
    try {
      const response = await axios.get(`/organizations?_embed=users${requestQuery}`);
      dispatch(slice.actions.getOrganizationListSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError());
    }
  };
}

export function deleteOrganization(id: number | null | undefined) {
  return async () => {
    if (!id) {
      return;
    }
    dispatch(slice.actions.startLoading());

    try {
      await axios.delete(`/organizations/${id.toString()}`);
      dispatch(slice.actions.deleteOrganizationSuccess(id));
      dispatch(
        openSnackbar({
          open: true,
          severity: SnackbarSeverity.Success,
          message: 'DeleteOrganizationSuccess',
          variant: 'alert',
          alert: {
            color: 'success'
          },
          close: false
        })
      );
    } catch (error: any) {
      let message = 'DeleteOrganizationError';
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

export function createOrganization(organization: NewOrganization) {
  return async () => {
    dispatch(slice.actions.startLoading());

    try {
      const response = await axios.post('/organizations', organization);

      dispatch(slice.actions.addOrganizationSuccess(response.data));
      dispatch(
        openSnackbar({
          open: true,
          severity: SnackbarSeverity.Success,
          message: 'AddOrganizationSuccess',
          variant: 'alert',
          alert: {
            color: 'success'
          },
          close: false
        })
      );
    } catch (error: any) {
      let message = 'AddOrganizationError';
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

export function updateOrganization(organization: NewOrganization, id: string) {
  return async () => {
    dispatch(slice.actions.startLoading());

    try {
      const response = await axios.put(`/organizations/${id}`, organization);
      dispatch(slice.actions.updateOrganizationSuccess(response.data));
      dispatch(
        openSnackbar({
          open: true,
          severity: SnackbarSeverity.Success,
          message: 'UpdateOrganizationSuccess',
          variant: 'alert',
          alert: {
            color: 'success'
          },
          close: false
        })
      );
    } catch (error: any) {
      let message = 'UpdateOrganizationError';
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

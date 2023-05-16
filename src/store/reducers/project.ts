import { createSlice } from '@reduxjs/toolkit';
import axios from 'utils/axios';
import { dispatch } from '../index';
import { openSnackbar } from './snackbar';
import { SnackbarSeverity } from 'types/snackbar';
import { createRequestQuery, QueryParams } from 'utils/requestQuery';
import { NewProject, Project, ProjectStateProps } from 'types/project';

const initialState: ProjectStateProps = {
  error: false,
  isLoading: false,
  projects: [],
  totalItems: 0
};

const slice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    hasError(state) {
      state.error = true;
      state.isLoading = false;
    },

    startLoading(state) {
      state.isLoading = true;
    },

    getProjectListSuccess(state, action) {
      state.projects = action.payload;
      state.totalItems = action.payload.meta?.totalItems;
      state.isLoading = false;
    },

    addProjectSuccess(state, action) {
      state.projects = [...state.projects, action.payload];
      state.isLoading = false;
    },

    updateProjectSuccess(state, action) {
      const updatedProject: Project = action.payload;
      const updatedProjectList = state.projects.map((project) => {
        if (project.id === updatedProject.id) {
          return updatedProject;
        }
        return project;
      });

      state.projects = updatedProjectList;
      state.isLoading = false;
    },

    deleteProjectSuccess(state, action) {
      const deletedProjectId: number = action.payload;
      const updatedProjectList = state.projects.filter((project) => {
        return project.id !== deletedProjectId;
      });

      state.projects = updatedProjectList;
      state.isLoading = false;
    }
  }
});

export default slice.reducer;

export function getProjectList(requestParams?: QueryParams) {
  return async () => {
    dispatch(slice.actions.startLoading());

    const requestQuery = createRequestQuery(requestParams);
    try {
      const response = await axios.get(`/projects?_embed=organizations${requestQuery}`);
      dispatch(slice.actions.getProjectListSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError());
    }
  };
}

export function deleteProject(id: number | null | undefined) {
  return async () => {
    if (!id) {
      return;
    }
    dispatch(slice.actions.startLoading());

    try {
      await axios.delete(`/projects/${id.toString()}`);
      dispatch(slice.actions.deleteProjectSuccess(id));
      dispatch(
        openSnackbar({
          open: true,
          severity: SnackbarSeverity.Success,
          message: 'DeleteProjectSuccess',
          variant: 'alert',
          alert: {
            color: 'success'
          },
          close: false
        })
      );
    } catch (error: any) {
      let message = 'DeleteProjectError';
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

export function createProject(project: NewProject) {
  return async () => {
    dispatch(slice.actions.startLoading());

    try {
      const response = await axios.post('/projects', project);

      dispatch(slice.actions.addProjectSuccess(response.data));
      dispatch(
        openSnackbar({
          open: true,
          severity: SnackbarSeverity.Success,
          message: 'AddProjectSuccess',
          variant: 'alert',
          alert: {
            color: 'success'
          },
          close: false
        })
      );
    } catch (error: any) {
      let message = 'AddProjectError';
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

export function updateProject(project: NewProject, id: string) {
  return async () => {
    dispatch(slice.actions.startLoading());

    try {
      const response = await axios.put(`/projects/${id}`, project);
      dispatch(slice.actions.updateProjectSuccess(response.data));
      dispatch(
        openSnackbar({
          open: true,
          severity: SnackbarSeverity.Success,
          message: 'UpdateProjectSuccess',
          variant: 'alert',
          alert: {
            color: 'success'
          },
          close: false
        })
      );
    } catch (error: any) {
      let message = 'UpdateProjectError';
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

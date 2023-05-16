import { useDispatch } from 'store';
import { Button, DialogActions, DialogContent, DialogTitle, Divider, Grid, InputLabel, Stack, TextField } from '@mui/material';
import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { NewProject, Project } from 'types/project';
import { createProject, updateProject } from 'store/reducers/project';

export interface Props {
  onCancel: () => void;
  project?: Project;
}

const ProjectDialog = ({ project, onCancel }: Props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: project ? project.name : '',
      acronym: project ? project.acronym : '',
      description: project ? project.description : ''
    },
    validationSchema: Yup.object().shape({
      name: Yup.string()
        .max(50, t('NameTooLong') || 'This fields Name is longer than the 50 character limit')
        .required(t('NameRequired') || 'Name is required'),
      description: Yup.string()
        .max(100)
        .required(t('DescriptionRequired') || 'Description is required'),
      acronym: Yup.string()
        .max(100)
        .required(t('AcronymRequired') || 'Acronym is required')
    }),
    onSubmit: (values, { setSubmitting, resetForm }) => {
      const newProject: NewProject = {
        name: values.name,
        acronym: values.acronym,
        description: values.description
      };
      if (project) {
        dispatch(updateProject(newProject, project.id.toString()));
      } else {
        dispatch(createProject(newProject));
      }

      resetForm();
      setSubmitting(false);
      onCancel();
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <DialogTitle>{project ? t('EditProject') : t('NewProject')}</DialogTitle>
          <Divider />
          <DialogContent sx={{ p: 2.5 }}>
            <Stack spacing={3}>
              <Stack spacing={1}>
                <InputLabel htmlFor="project-name">{t('Name')}</InputLabel>
                <TextField
                  fullWidth
                  id="project-name"
                  placeholder={t('EnterName') || 'Enter Name'}
                  {...getFieldProps('name')}
                  error={Boolean(touched.name && errors.name)}
                  helperText={touched.name && errors.name}
                />
              </Stack>
              <Stack spacing={1}>
                <InputLabel htmlFor="project-acronym">{t('Acronym')}</InputLabel>
                <TextField
                  fullWidth
                  id="project-acronym"
                  placeholder={t('EnterAcronym') || 'Enter Acronym'}
                  {...getFieldProps('acronym')}
                  error={Boolean(touched.acronym && errors.acronym)}
                  helperText={touched.acronym && errors.acronym}
                />
              </Stack>
              <Stack spacing={1}>
                <InputLabel htmlFor="project-description">{t('Country')}</InputLabel>
                <TextField
                  fullWidth
                  id="project-description"
                  placeholder={t('EnterDescription') || 'Enter Description'}
                  {...getFieldProps('description')}
                  error={Boolean(touched.description && errors.description)}
                  helperText={touched.description && errors.description}
                />
              </Stack>
            </Stack>
          </DialogContent>
          <Divider />
          <DialogActions sx={{ p: 2.5 }}>
            <Grid container justifyContent="space-between" alignItems="center" flexDirection="row-reverse">
              <Grid item>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Button color="error" onClick={onCancel}>
                    {t('Cancel')}
                  </Button>
                  <Button type="submit" variant="contained" disabled={isSubmitting}>
                    {project ? t('Edit') : t('Add')}
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </DialogActions>
        </Form>
      </FormikProvider>
    </>
  );
};

export default ProjectDialog;

import { useDispatch, useSelector } from 'store';
import { Button, DialogActions, DialogContent, DialogTitle, Divider, Grid, InputLabel, MenuItem, Stack, TextField } from '@mui/material';
import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { createOrganization, updateOrganization } from 'store/reducers/organization';
import { NewOrganization, Organization } from 'types/organization';
import { getProjectList } from 'store/reducers/project';
import { useEffect } from 'react';

export interface Props {
  onCancel: () => void;
  organization?: Organization;
}

const OrganizationDialog = ({ organization, onCancel }: Props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { projects } = useSelector((state) => state.project);

  useEffect(() => {
    dispatch(getProjectList());
  }, [dispatch]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: organization ? organization.name : '',
      country: organization ? organization.country : '',
      acronym: organization ? organization.acronym : '',
      projectId: organization ? organization.projectId : undefined
    },
    validationSchema: Yup.object().shape({
      name: Yup.string()
        .max(50, t('NameTooLong') || 'This fields Name is longer than the 50 character limit')
        .required(t('NameRequired') || 'Name is required'),
      country: Yup.string()
        .max(100)
        .required(t('CountryRequired') || 'Country is required'),
      acronym: Yup.string()
        .max(100)
        .required(t('AcronymRequired') || 'Acronym is required'),
      projectId: Yup.string()
        .max(100)
        .required(t('ProjectRequired') || 'Project is required')
    }),
    onSubmit: (values, { setSubmitting, resetForm }) => {
      const newOrganization: NewOrganization = {
        name: values.name,
        country: values.country,
        acronym: values.acronym,
        projectId: values.projectId
      };
      if (organization) {
        dispatch(updateOrganization(newOrganization, organization.id.toString()));
      } else {
        dispatch(createOrganization(newOrganization));
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
          <DialogTitle>{organization ? t('EditOrganization') : t('NewOrganization')}</DialogTitle>
          <Divider />
          <DialogContent sx={{ p: 2.5 }}>
            <Stack spacing={3}>
              <Stack spacing={1}>
                <InputLabel htmlFor="organization-name">{t('Name')}</InputLabel>
                <TextField
                  fullWidth
                  id="organization-name"
                  placeholder={t('EnterName') || 'Enter Name'}
                  {...getFieldProps('name')}
                  error={Boolean(touched.name && errors.name)}
                  helperText={touched.name && errors.name}
                />
              </Stack>
              <Stack spacing={1}>
                <InputLabel htmlFor="organization-country">{t('Country')}</InputLabel>
                <TextField
                  fullWidth
                  id="organization-country"
                  placeholder={t('EnterCountry') || 'Enter Country'}
                  {...getFieldProps('country')}
                  error={Boolean(touched.country && errors.country)}
                  helperText={touched.country && errors.country}
                />
              </Stack>
              <Stack spacing={1}>
                <InputLabel htmlFor="organization-acronym">{t('Acronym')}</InputLabel>
                <TextField
                  fullWidth
                  id="organization-acronym"
                  placeholder={t('EnterAcronym') || 'Enter Acronym'}
                  {...getFieldProps('acronym')}
                  error={Boolean(touched.acronym && errors.acronym)}
                  helperText={touched.acronym && errors.acronym}
                />
              </Stack>
              <Stack spacing={1}>
                <InputLabel htmlFor="organization-projectId">{t('Project')}</InputLabel>
                <TextField
                  id="organization-projectId"
                  select
                  fullWidth
                  placeholder={t('AssignProject') || 'Assign Project'}
                  {...getFieldProps('projectId')}
                  error={Boolean(touched.projectId && errors.projectId)}
                  helperText={touched.projectId && errors.projectId}
                >
                  {projects?.map((option, index) => (
                    <MenuItem key={`${option.name}-${option.id}`} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
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
                    {organization ? t('Edit') : t('Add')}
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

export default OrganizationDialog;

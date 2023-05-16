import { useDispatch, useSelector } from 'store';
import { Button, DialogActions, DialogContent, DialogTitle, Divider, Grid, InputLabel, MenuItem, Stack, TextField } from '@mui/material';
import { useFormik, Form, FormikProvider } from 'formik';
import { createUser, updateUser } from 'store/reducers/user';
import { User, NewUser } from 'types/user';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

export interface Props {
  onCancel: () => void;
  user?: User;
}

const UserDialog = ({ user, onCancel }: Props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { organizations } = useSelector((state) => state.organization);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: user ? user.name : '',
      email: user ? user.email : '',
      organizationId: user ? user.organizationId : undefined
    },
    validationSchema: Yup.object().shape({
      name: Yup.string()
        .max(50, t('NameTooLong') || 'This fields Name is longer than the 50 character limit')
        .required(t('NameRequired') || 'Name is required'),
      email: Yup.string()
        .max(255, t('EmailTooLong') || 'This fields Email is longer than the 255 character limit')
        .required(t('EmailRequired') || 'Email is required')
        .email(t('MustBeValidEmail') || 'Must be a valid email'),
      organizationId: Yup.string()
        .max(100)
        .required(t('OrganizationRequired') || 'Organization is required')
    }),
    onSubmit: (values, { setSubmitting, resetForm }) => {
      const newUser: NewUser = {
        name: values.name,
        email: values.email,
        organizationId: values.organizationId || undefined
      };
      if (user) {
        dispatch(updateUser(newUser, user.id.toString()));
      } else {
        dispatch(createUser(newUser));
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
          <DialogTitle>{user ? t('EditUser') : t('NewUser')}</DialogTitle>
          <Divider />
          <DialogContent sx={{ p: 2.5 }}>
            <Stack spacing={3}>
              <Stack spacing={1}>
                <InputLabel htmlFor="user-name">{t('Name')}</InputLabel>
                <TextField
                  fullWidth
                  id="user-name"
                  placeholder={t('EnterUserName') || 'Enter User Name'}
                  {...getFieldProps('name')}
                  error={Boolean(touched.name && errors.name)}
                  helperText={touched.name && errors.name}
                />
              </Stack>
              <Stack spacing={1}>
                <InputLabel htmlFor="user-email">{t('Email')}</InputLabel>
                <TextField
                  fullWidth
                  id="user-email"
                  placeholder={t('EnterUserEmail') || 'Enter User Email'}
                  {...getFieldProps('email')}
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                />
              </Stack>
              <Stack spacing={1}>
                <InputLabel htmlFor="user-organization">{t('Organization')}</InputLabel>
                <TextField
                  id="user-organization"
                  select
                  fullWidth
                  placeholder={t('EnterUserOrganization') || 'Enter User Organization'}
                  {...getFieldProps('organizationId')}
                  error={Boolean(touched.organizationId && errors.organizationId)}
                  helperText={touched.organizationId && errors.organizationId}
                >
                  {organizations?.map((option, index) => (
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
                    {user ? t('Edit') : t('Add')}
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

export default UserDialog;

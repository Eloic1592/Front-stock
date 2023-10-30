import { LoadingButton } from '@mui/lab';
import { Card, Grid, TextField, useTheme } from '@mui/material';
import { Box, styled } from '@mui/material';
import {  NavLink,useNavigate } from 'react-router-dom';
import useAuth from 'app/hooks/useAuth';
import { Formik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';

const FlexBox = styled(Box)(() => ({ display: 'flex', alignItems: 'center' }));

const JustifyBox = styled(FlexBox)(() => ({ justifyContent: 'center' }));

const ContentBox = styled(Box)(() => ({
  height: '100%',
  padding: '32px',
  position: 'relative',
  background: 'rgba(0, 0, 0, 0.01)'
}));

const JWTRoot = styled(JustifyBox)(() => ({
  background: '#00a65a',
  minHeight: '100% !important',
  '& .card': {
    maxWidth: 800,
    minHeight: 400,
    margin: '1rem',
    display: 'flex',
    alignItems: 'center'
  }
}));

// inital login credentials
const initialValues = {
  code: '',
  password: '',
  remember: true
};

// form field validation schema
const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(1, 'Le mot de passe doit contenir au moins 1 caractere!')
    .required('Mot de passe requis'),
code: Yup.string().email('Adresse email invalide').required('Adresse email requis!')
});

const LoginTech = () => {
  const theme=useTheme();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  const handleFormSubmit = async (values) => {
    setLoading(true);
    try {
      await login(values.email, values.password);
      navigate('/');
    } catch (e) {
      setLoading(false);
    }
  };

  return (
    <JWTRoot>
      <Card className="card">
        <Grid container>
          <Grid item sm={6} xs={12}>
            <JustifyBox p={4} height="100%" sx={{ minWidth: 320 }}>
              <img src="/assets/images/illustrations/dreamer.svg" width="100%" alt="" />
            </JustifyBox>
          </Grid>

          <Grid item sm={6} xs={12}>
            <div>
            <h2>Connexion-Technicien</h2>
            </div>
            <ContentBox>
              <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={validationSchema}
              >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                  <form onSubmit={handleSubmit}>
                    <TextField
                      fullWidth
                      size="small"
                      type="text"
                      name="code"
                      label="code"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.code}
                      onChange={handleChange}
                      helperText={touched.code && errors.code}
                      error={Boolean(errors.code && touched.code)}
                      sx={{ mb: 3 }}
                    />

                    <TextField
                      fullWidth
                      size="small"
                      name="password"
                      type="password"
                      label="Mot de passe"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.password}
                      onChange={handleChange}
                      helperText={touched.password && errors.password}
                      error={Boolean(errors.password && touched.password)}
                      sx={{ mb: 1.5 }}
                    />
                    <LoadingButton
                      type="submit"
                      color="primary"
                      loading={loading}
                      variant="contained"
                      sx={{ my: 2, mr: 2 }} // Ajout de mr: 2 pour l'espacement horizontal
                    >
                      Connexion
                    </LoadingButton>

                    <NavLink to="/tech/registertech" style={{ color: theme.palette.primary.main }}>
                      <LoadingButton
                        type="submit"
                        color="secondary"
                        loading={loading}
                        variant="contained"
                        sx={{ my: 6 }} // Tu peux ajuster ce paramètre pour l'espacement vertical
                      >
                        S'inscrire
                      </LoadingButton>
                    </NavLink>

                  </form>
                )}
              </Formik>
            </ContentBox>
          </Grid>
        </Grid>
      </Card>
    </JWTRoot>
  );
};

export default LoginTech;

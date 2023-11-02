import { Card, Grid, TextField,Button } from '@mui/material';
import { Box, styled } from '@mui/material';
import { Formik } from 'formik';
import { useState } from 'react';
import getUselink from 'app/views/getuseLink';
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
  email: '',
  password: '',
  remember: true
};

// form field validation schema
const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(1, 'Le mot de passe doit contenir au moins 1 caractere!')
    .required('Mot de passe requis'),
  email: Yup.string().email('Adresse email invalide').required('Adresse email requis!')
});

const LoginAdmin = () => {
 
  const [loading, setLoading] = useState(false);
  const [message,setMessage]= useState({
    message: '',
    state: false,
    color:'green',
  });
  const handleFormSubmit = async (values) => {

    const admin = {
      "email": values.email,
      "mdp": values.password
    }

    try {
      const response = await fetch(getUselink() + 'signinAdmin', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(admin)
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        setMessage({
          message: errorMessage,
          state: true,
          color: 'red',
        });
      } else {
        const data = await response.json();
        if (data == null) {
          setMessage({
            message: 'Email ou mot de passe incorrect',
            state: true,
            color: 'red',
          });
        } else {
          localStorage.setItem("token_ad", data.token);
          localStorage.setItem("idadmin", data.idadmin.id);
          window.location.replace('/admin/calendriertech');
        }
      }
    } catch (error) {
      console.log(error);
      setMessage({
        message: 'Une erreur est survenue, veuillez réessayer plus tard',
        state: true,
        color: 'red',
      });
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
          <Box p={4} height="100%">
            <div>
            <h2>Connexion-Administrateur</h2>
            </div>
            <ContentBox>
              <Formik
                
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleFormSubmit}
              >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                  <form onSubmit={handleSubmit}>
                    <TextField
                      fullWidth
                      size="small"
                      type="email"
                      name="email"
                      label="Email"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.email}
                      onChange={handleChange}
                      helperText={touched.email && errors.email}
                      error={Boolean(errors.email && touched.email)}
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
                    {message && (
                        <div style={{ color: message.color }}>
                          {message.message}
                        </div>
                    )}

                    <Button
                      type="submit"
                      color="primary"
                      loading={loading}
                      variant="contained"
                      sx={{ my: 2 }}
                    >
                      Connexion
                    </Button>
                  </form>
                )}
              </Formik>
            </ContentBox>
              </Box>
          </Grid>
        </Grid>
      </Card>
    </JWTRoot>
  );
};

export default LoginAdmin;

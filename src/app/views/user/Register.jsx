// import { useTheme } from '@emotion/react';
import { LoadingButton } from '@mui/lab';
import { Card,Grid, TextField,Radio, RadioGroup, FormControlLabel } from '@mui/material';
import { Box, styled } from '@mui/material';
// import { Paragraph } from 'app/components/Typography';
import useAuth from 'app/hooks/useAuth';
import { Formik } from 'formik';
import { useState } from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import * as Yup from 'yup';

const FlexBox = styled(Box)(() => ({ display: 'flex', alignItems: 'center' }));

const JustifyBox = styled(FlexBox)(() => ({ justifyContent: 'center' }));

const ContentBox = styled(JustifyBox)(() => ({
  height: '100%',
  padding: '32px',
  background: 'rgba(0, 0, 0, 0.01)'
}));

const JWTRegister = styled(JustifyBox)(() => ({
  background: '#00a65a',
  minHeight: '100vh !important',
  '& .card': {
    maxWidth: 800,
    minHeight: 400,
    margin: '1rem',
    display: 'flex',
    borderRadius: 12,
    alignItems: 'center'
  }
}));

// inital login credentials
const initialValues = {
  nom:'',
  prenom:'',
  code:'',
  email: '',
  password: '',
  username: '',
  remember: true
};

// form field validation schema
const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, 'Le mot de passe doit contenir au moins 1 caractere!')
    .required('Mot de passe requis!'),
  email: Yup.string().email('email invalide').required('un email est requis!'),
  nom: Yup.string().required('nom requis'),
  prenom: Yup.string().required('prenom requis'),

});




const JwtRegister = () => {
  // const theme = useTheme();
  const { register } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');

  const handleSelectRadio = (event) => {
    setSelectedValue(event.target.value);
    if (selectedValue === "1") {
      document.getElementById("code").type  = "text";
    } else {
      document.getElementById("code").type  = "hidden";
    }
  };


  const handleFormSubmit = (values) => {
    setLoading(true);

    try {
      register(values.email, values.username, values.password);
      navigate('/');
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  return (
    <JWTRegister>
      <Card className="card">
        <Grid container>
          <Grid item sm={6} xs={12}>
            <ContentBox>
              <img
                width="100%"
                alt="Register"
                src="/assets/images/illustrations/posting_photo.svg"
              />
            </ContentBox>
          </Grid>

          <Grid item sm={6} xs={12}>
            <Box p={4} height="100%">
          <div>
            <h2>Inscription-utilisateur</h2>
            </div>
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
                      name="nom"
                      label="Votre nom"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.nom}
                      onChange={handleChange}
                      helperText={touched.nom && errors.nom}
                      error={Boolean(errors.nom && touched.nom)}
                      sx={{ mb: 3 }}
                    />
                                        
                    <TextField
                      fullWidth
                      size="small"
                      type="text"
                      name="prenom"
                      label="Votre prenom"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.prenom}
                      onChange={handleChange}
                      helperText={touched.prenom && errors.prenom}
                      error={Boolean(errors.prenom && touched.prenom)}
                      sx={{ mb: 3 }}
                    />

                    <div>
                      <RadioGroup
                        aria-label="options"
                        name="options"
                        value={selectedValue}
                        onChange={handleSelectRadio}
                      >
                        <Box display="flex" flexDirection="row">
                          <FormControlLabel value="1" control={<Radio />} label="Etudiant" select/>
                          <FormControlLabel value="2" control={<Radio />} label="Professeur" />
                          <FormControlLabel value="3" control={<Radio />} label="Autres" />
                        </Box>
                      </RadioGroup>

                      <TextField
                        fullWidth
                        size="small"
                        type={selectedValue === "1" ? "text" : "hidden"}
                        name="code"
                        id="code"
                        label={selectedValue === "1" ? "code" : " "}
                        placeholder="Numero Etudiant: ETU0000----"
                        onBlur={handleBlur}
                        value={values.code}
                        onChange={handleChange}
                        helperText={touched.code && errors.code}
                        error={Boolean(errors.code && touched.code)}
                        sx={{ mb: 3 }}
                      />
                    </div>

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
                      sx={{ mb: 2 }}
                    />
                    <LoadingButton
                      type="submit"
                      color="primary"
                      loading={loading}
                      variant="contained"
                      sx={{ mb: 2, mt: 3 }}
                    >
                      Enregistrer
                    </LoadingButton>

                    {/* <Paragraph>
                      Already have an account?
                      <NavLink
                        to="/session/signin"
                        style={{ color: theme.palette.secondary.main, marginLeft: 5 }}
                      >
                        Login
                      </NavLink>
                    </Paragraph> */}
                  </form>
                )}
              </Formik>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </JWTRegister>
  );
};

export default JwtRegister;
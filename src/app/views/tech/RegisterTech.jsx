import { LoadingButton } from '@mui/lab';
import { Button, Card,Grid, TextField,useTheme } from '@mui/material';
import { Box, styled } from '@mui/material';
import useAuth from 'app/hooks/useAuth';
import { Formik, validateYupSchema } from 'formik';
import { useState } from 'react';
import { useNavigate,NavLink } from 'react-router-dom';
import getUselink from 'app/views/getuseLink';
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
  // code:'',
  email: '',
  password: '',
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
  // code: Yup.string().required('codee requis!')

});




const RegisterTech = () => {
  const theme = useTheme();
  const [message,setMessage]= useState({
    message: '',
    state: false,
    color:'green',
  });


  const handleInsertion = async (values) => {    
    const { nom, prenom, email, password } = values;


    const NewTech={
      "nom":nom,
      "prenom":prenom,
      "email":email,
      "mdp":password,
      "etat":0
    }
    try {

    await validationSchema.validate(NewTech);
      const response = await fetch(getUselink()+'inserttechnicien', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(NewTech),
      });
  
      // Vérifier si la requête a réussi (statut HTTP 2xx)
      if (response.ok) {
        setMessage({
          message:'Informationn enregistree',
          state:true,
          color:'green',

      });
      } else {
          setMessage({
            message:'Une erreur s\'est produite '+response.statusText,
            state:true,
            color:'red',

        });
      }
    
    } catch (error) {
       setMessage({
        message:'Une erreur s\'est produite',error,
        state:true,
        color:'red',
         
       });
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
            <h2>Inscription-Technicien</h2>
            </div>
              <Formik

                initialValues={initialValues}
                validationSchema={validationSchema}
              >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                  <form>
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
                    {message && (
                        <div style={{ color: message.color }}>
                          {message.message}
                        </div>
                    )}
                    <Button
                      type="submit"
                      color="primary"
                      variant="contained"
                      onClick={() => handleInsertion(values)} // Appel de la fonction avec les valeurs du formulaire
                      sx={{ my: 2, mr: 2 }}
                    >
                      Enregistrer
                    </Button>

                    <NavLink to="/tech/connexion" style={{ color: theme.palette.primary.main }}>
                      <LoadingButton
                        type="submit"
                        color="secondary"
                        // loading={loading}
                        variant="contained"
                        sx={{ my: 6 }} // Tu peux ajuster ce paramètre pour l'espacement vertical
                      >
                        Retour
                      </LoadingButton>
                    </NavLink>

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

export default RegisterTech;

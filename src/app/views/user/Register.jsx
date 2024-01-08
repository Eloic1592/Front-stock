import { LoadingButton } from '@mui/lab';
import { Card,Grid, TextField,Radio, RadioGroup, FormControlLabel,useTheme,Button } from '@mui/material';
import { Box, styled } from '@mui/material';
import { Formik } from 'formik';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';


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
  dtn:new Date(),
  code:'',
  email: '',
  password: '',
  username: '',
  remember: true
};

// form field validation schema
const validationSchema = Yup.object().shape({
  nom: Yup.string().required('nom requis'),
  prenom: Yup.string().required('prenom requis'),
  dtn:Yup.date().required('Date requise'),
  email: Yup.string().email('email invalide').required('un email est requis!'),
  password: Yup.string().min(6, 'Le mot de passe doit contenir au moins 1 caractere!')
  
});




const JwtRegister = () => {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');
  const [message,setMessage]= useState({
    message: '',
    state: false,
    color:'green',
  });

  const handleSelectRadio = (event) => {
    setSelectedValue(event.target.value);
    if (selectedValue === "1") {
      document.getElementById("code").type  = "text";
    } else {
      document.getElementById("code").type  = "hidden";
    }
  };


  const handleFormSubmit = async (values) => {    
    const { nom, prenom,dtn,code, email, password } = values;


    const NewUser={
      "nom":nom,
      "prenom":prenom,
      "dtn":dtn,
      "code":code,
      "email":email,
      "mdp":password,
      "idtypeUtilisateur":selectedValue,
      "etat":0
    }
    try {

    await validationSchema.validate(NewUser);
      const response = await fetch(getUselink()+'insertuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(NewUser),
      });
  
      // Vérifier si la requête a réussi (statut HTTP 2xx)
      if (response.ok) {
        setMessage({
          message:'Informationn enregistree',
          state:true,
          color:'green',

      });
      } else {
          console.log(response.statusText);
          setMessage({
            message:'Une erreur s\'est produite '+ response.statusText,
            state:true,
            color:'red',

        });
      }
    
    } catch (error) {
      console.log(error);

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
            <h2>Inscription-Utilisateur</h2>
            </div>
              <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={validationSchema}
              >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                  <form onSubmit={handleSubmit}>
                    <div>
                      <RadioGroup
                        aria-label="options"
                        name="options"
                        value={selectedValue}
                        onChange={handleSelectRadio}

                      >
                        <Box display="flex" flexDirection="row">
                          <FormControlLabel value="1" control={<Radio />} label="Etudiant" />
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
                        label={selectedValue === "1" ? "Numero Etudiant" : " "}
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
                      type="text"
                      name="nom"
                      label="Nom"
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
                      label="Prenom"
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
                      type="date"
                      name="dtn"
                      label=""
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.dtn}
                      onChange={handleChange}
                      helperText={touched.dtn && errors.dtn}
                      error={Boolean(errors.dtn && touched.dtn)}
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
                      sx={{ my: 2, mr: 2 }}
                    >
                      Enregistrer
                    </Button>

                    <NavLink to="/user/connexion" style={{ color: theme.palette.primary.main }}>
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

export default JwtRegister;

import { Box, TextField, Snackbar, Alert, Grid, MenuItem, Select } from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { Container } from 'app/views/style/style';
import { baseUrl } from 'app/utils/constant';
import { useParams } from 'react-router-dom';

const Editnaturemouvement = () => {
  const idnaturemouvement = useParams();
  const handleAlertClose = () => setMessage({ open: false });
  const [message, setMessage] = useState({
    text: 'Information enregistree',
    severity: 'success',
    open: false
  });

  // Input
  const [naturemouvement, setnaturemouvement] = useState('');

  const handleSubmit = () => {
    if (!naturemouvement) {
      setMessage({
        text: 'Veuillez remplir tous les champs obligatoires.',
        severity: 'error',
        open: true
      });
      return;
    }
    let params = {
      idnaturemouvement: idnaturemouvement.idnaturemouvement,
      naturemouvement: naturemouvement
    };
    let url = baseUrl + '/naturemouvement/createnatmouvement';
    fetch(url, {
      crossDomain: true,
      method: 'POST',
      body: JSON.stringify(params),
      headers: { 'Content-Type': 'application/json' }
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        setTimeout(() => {
          window.location.reload();
        }, 2000);

        setMessage({
          text: 'Information enregistrée',
          severity: 'success',
          open: true
        });
      })
      .catch(() => {
        setMessage({
          text: "L'insertion dans la base de données a échoué.",
          severity: 'error',
          open: true
        });
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let naturemouvementParams = {
          idnaturemouvement: idnaturemouvement.idnaturemouvement
        };
        let url = baseUrl + '/naturemouvement/getnaturemouvement';
        const response = await fetch(url, {
          crossDomain: true,
          method: 'POST',
          body: JSON.stringify(naturemouvementParams),
          headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`);
        }

        const responseData = await response.json();
        setnaturemouvement(responseData.naturemouvement);
      } catch {
        setMessage({
          text: "Aucune donnee n 'a ete recuperee,veuillez verifier si le serveur est actif",
          severity: 'error',
          open: true
        });
      }
    };
    fetchData();
  }, [idnaturemouvement.idnaturemouvement]);

  const handleCancel = () => {
    window.location.replace('/admin/typemouvement');
  };

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: 'naturemouvement', path: 'admin/naturemouvement' },
            { name: 'naturemouvement' }
          ]}
        />
      </Box>
      <SimpleCard title="Modifier naturemouvement">
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="nature mouvement"
                variant="outlined"
                value={naturemouvement}
                onChange={(e) => setnaturemouvement(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} container justifyContent="flex-end" alignItems="center" spacing={2}>
              <Grid item>
                <Button variant="contained" color="secondary" onClick={handleCancel}>
                  Annuler
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" color="primary" type="submit" onClick={handleSubmit}>
                  Valider
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </SimpleCard>
      <Snackbar open={message.open} autoHideDuration={3000} onClose={handleAlertClose}>
        <Alert severity={message.severity} sx={{ width: '100%' }} variant="filled">
          {message.text}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Editnaturemouvement;

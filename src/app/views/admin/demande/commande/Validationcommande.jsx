import { Box, TextField, Snackbar, Alert, Grid } from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { Container } from 'app/views/style/style';
import { baseUrl } from 'app/utils/constant';
import { useParams } from 'react-router-dom';

const Validationcommande = () => {
  const idcommande = useParams();
  const handleAlertClose = () => setMessage({ open: false });
  // Data
  // Commande
  const [datereception, setDatereception] = useState('');
  const [commande, setCommande] = useState('');

  // Message
  const [message, setMessage] = useState({
    text: 'Information enregistree',
    severity: 'success',
    open: false
  });

  const handleSubmit = () => {
    if (!datereception) {
      setMessage({
        text: 'Les champs suivants sont obligatoires : datereception',
        severity: 'error',
        open: true
      });
      return;
    }

    let reception = {
      idcommande: commande,
      datereception: datereception,
      statut: 0
    };

    let url = baseUrl + '/commande/createreception';
    fetch(url, {
      crossDomain: true,
      method: 'POST',
      body: JSON.stringify(reception),
      headers: { 'Content-Type': 'application/json' }
    })
      .then((response) => response.json())
      .then((response) => {
        setTimeout(() => {
          window.location.reload();
        }, 2000);

        setMessage({
          text: 'Information enregistree',
          severity: 'success',
          open: true
        });
      })
      .catch((err) => {
        setMessage({
          text: err,
          severity: 'error',
          open: true
        });
      });
  };

  useEffect(() => {
    setCommande(idcommande.idcommande);
  }, [idcommande.idcommande]);

  const handleCancel = () => {
    window.location.replace('/admin/commande');
  };

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[{ name: 'Commande', path: 'admin/commande' }, { name: 'Commande' }]}
        />
      </Box>
      <SimpleCard title="Valider cette commande en tant que recu">
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                autoFocus
                id="commande"
                type="text"
                margin="dense"
                label="commande"
                name="commande"
                value={commande}
                onChange={(event) => setCommande(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                type="date"
                value={datereception}
                onChange={(e) => setDatereception(e.target.value)}
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

export default Validationcommande;

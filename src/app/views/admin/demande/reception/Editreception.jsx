import { Box, TextField, Snackbar, Alert, Grid } from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { Container } from 'app/views/style/style';
import { baseUrl } from 'app/utils/constant';
import { useParams } from 'react-router-dom';
import { formatDate } from 'app/utils/utils';

const Editreception = () => {
  const idreception = useParams();
  const handleAlertClose = () => setMessage({ open: false });

  // Data
  // Commande
  const [idcommande, setIdcommande] = useState('');
  const [datereception, setDatereception] = useState('');
  const [data, setData] = useState({});

  // Message
  const [message, setMessage] = useState({
    text: 'Information enregistree',
    severity: 'success',
    open: false
  });

  const handleSubmit = () => {
    if (!datereception) {
      setMessage({
        text: 'Les champs suivants sont obligatoires : datereception, client, libelle',
        severity: 'error',
        open: true
      });
      return;
    }

    let reception = {
      idreception: idreception.idreception,
      idcommande: idcommande,
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
    const fetchData = async () => {
      try {
        let commandeParams = {
          idreception: idreception.idreception
        };
        let url = baseUrl + '/commande/getreception';
        const response = await fetch(url, {
          crossDomain: true,
          method: 'POST',
          body: JSON.stringify(commandeParams),
          headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`);
        }

        const responseData = await response.json();
        setDatereception(formatDate(responseData.datereception));
        setIdcommande(responseData.idcommande);
      } catch (error) {
        setMessage({
          text: "Aucune donnee n 'a ete recuperee,veuillez verifier si le serveur est actif",
          severity: 'error',
          open: true
        });
      }
    };
    fetchData();
  }, [idreception.idreception]);

  const handleCancel = () => {
    window.location.replace('/admin/reception');
  };

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[{ name: 'Reception', path: 'admin/reception' }, { name: 'Reception' }]}
        />
      </Box>
      <SimpleCard title="Modifier reception de commande">
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="date de reception"
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

export default Editreception;

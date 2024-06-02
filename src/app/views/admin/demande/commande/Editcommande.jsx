import { Box, TextField, Snackbar, Alert, Grid } from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { Container } from 'app/views/style/style';
import { baseUrl } from 'app/utils/constant';
import { useParams } from 'react-router-dom';
import Datalistclient from '../../Datagrid/Datalistclient';
import { formatDate } from 'app/utils/utils';

const Editcommande = () => {
  const idcommande = useParams();
  const handleAlertClose = () => setMessage({ open: false });

  const [openetugrid, setopenetutugrid] = useState(false);
  const handleClickOpenetugrid = () => setopenetutugrid(true);
  const handleCloseOpenetugrid = () => {
    setopenetutugrid(false);
  };

  // Data
  // Commande
  const [datecommande, setDatecommande] = useState('');
  const [client, setClient] = useState('');
  const [libelle, setLibelle] = useState('');
  const [data, setData] = useState({
    clients: [],
    articles: []
  });

  // Message
  const [message, setMessage] = useState({
    text: 'Information enregistree',
    severity: 'success',
    open: false
  });

  const handleSubmit = () => {
    if (!datecommande || !client || !libelle) {
      setMessage({
        text: 'Les champs suivants sont obligatoires : datecommande, client, libelle',
        severity: 'error',
        open: true
      });
      return;
    }

    let commande = {
      idcommande: idcommande.idcommande,
      idclient: client,
      datecommande: datecommande,
      statut: 0,
      libelle: libelle
    };

    let url = baseUrl + '/commande/createcommande';
    fetch(url, {
      crossDomain: true,
      method: 'POST',
      body: JSON.stringify(commande),
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
          idcommande: idcommande.idcommande
        };
        let url = baseUrl + '/commande/getcommande';
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
        const newData = {
          clients: responseData.clients || [],
          articles: responseData.articles || []
        };
        setData(newData);
        setDatecommande(formatDate(responseData.commande.datecommande));
        setClient(responseData.commande.idclient);
        setLibelle(responseData.commande.libelle);
      } catch (error) {
        setMessage({
          text: "Aucune donnee n 'a ete recuperee,veuillez verifier si le serveur est actif",
          severity: 'error',
          open: true
        });
      }
    };
    fetchData();
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
      <SimpleCard title="Modifier commande">
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="datecommande"
                variant="outlined"
                type="date"
                value={datecommande}
                onChange={(e) => setDatecommande(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Grid item container spacing={1} xs={12}>
                <Grid item xs={11}>
                  <TextField
                    fullWidth
                    type="text"
                    name="idclient"
                    label="Client"
                    variant="outlined"
                    value={client}
                    onChange={setClient}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={1}>
                  <Datalistclient
                    Client={data.clients}
                    state={openetugrid}
                    handleClose={handleCloseOpenetugrid}
                    setClient={setClient}
                  />
                  <Button color="inherit" variant="contained" onClick={handleClickOpenetugrid}>
                    ...
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                autoFocus
                id="libelle"
                type="text"
                margin="dense"
                label="libelle"
                name="libelle"
                value={libelle}
                onChange={(event) => setLibelle(event.target.value)}
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

export default Editcommande;

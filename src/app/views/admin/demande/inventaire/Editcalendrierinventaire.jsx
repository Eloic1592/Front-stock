import { Box, TextField, Snackbar, Alert, Grid } from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { Container } from 'app/views/style/style';
import { baseUrl } from 'app/utils/constant';
import { useParams } from 'react-router-dom';
import { formatDate, formattodatetimelocal } from 'app/utils/utils';

const Editcalendrierinventaire = () => {
  const idcalendrierinventaire = useParams();

  // Form dialog
  const handleAlertClose = () => setMessage({ open: false });

  // Inventaire
  const [datecalendrier, setDatecalendrier] = useState('');
  const [heuredebut, setHeureDebut] = useState(0);
  const [heurefin, setHeurefin] = useState(0);
  const [description, setDescription] = useState('');

  // Message
  const [message, setMessage] = useState({
    text: 'Information enregistree',
    severity: 'success',
    open: false
  });

  // Validation form
  const handleSubmit = () => {
    if (!datecalendrier || !heuredebut || !heurefin) {
      setMessage({
        text: 'Les champs suivants sont obligatoires : datecalendrier, heuredebut, heurefin',
        severity: 'error',
        open: true
      });
      return;
    }
    let calendrierinventaire = {
      idcalendrierinventaire: idcalendrierinventaire.idcalendrierinventaire,
      datecalendrier: datecalendrier,
      heuredebut: heuredebut + ':00.0000',
      heurefin: heurefin + ':00.0000',
      description: description
    };

    let url = baseUrl + '/inventory/createcalendrier';
    fetch(url, {
      crossDomain: true,
      method: 'POST',
      body: JSON.stringify(calendrierinventaire),
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
  const handleCancel = () => {
    window.location.replace('/admin/calendrierinventaire');
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        let inventoryParams = {
          idcalendrierinventaire: idcalendrierinventaire.idcalendrierinventaire
        };
        let url = baseUrl + '/inventory/getcalendrier';
        const response = await fetch(url, {
          crossDomain: true,
          method: 'POST',
          body: JSON.stringify(inventoryParams),
          headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`);
        }

        const responseData = await response.json();
        setDatecalendrier(formatDate(responseData.datecalendrier));
        setHeureDebut(formattodatetimelocal(responseData.heuredebut));
        setHeurefin(formattodatetimelocal(responseData.heurefin));
        setDescription(responseData.description);
      } catch (error) {
        setMessage({
          text: "Aucune donnee n 'a ete recuperee,veuillez verifier si le serveur est actif",
          severity: 'error',
          open: true
        });
      }
    };
    fetchData();
  }, [idcalendrierinventaire.idcalendrierinventaire]);

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: 'Inventaire', path: 'admin/calendrierinventaire' },
            { name: 'Inventaire' }
          ]}
        />
      </Box>
      <SimpleCard title="Modifier planning inventaire">
        <Box>
          <Grid container direction="row" spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                autoFocus
                id="dateinventaire"
                type="date"
                margin="dense"
                name="dateinventaire"
                value={datecalendrier}
                onChange={(event) => setDatecalendrier(event.target.value)}
              />
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  autoFocus
                  id="heuredebut"
                  type="datetime-local"
                  margin="dense"
                  label="heuredebut"
                  name="heuredebut"
                  value={heuredebut}
                  onChange={(event) => setHeureDebut(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  autoFocus
                  id="heurefin"
                  type="datetime-local"
                  margin="dense"
                  label="heurefin"
                  name="heurefin"
                  value={heurefin}
                  onChange={(event) => setHeurefin(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={9}
                  variant="outlined"
                  label="Description"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  sx={{ mb: 3 }}
                />
              </Grid>
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

export default Editcalendrierinventaire;

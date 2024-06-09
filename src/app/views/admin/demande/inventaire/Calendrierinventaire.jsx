import {
  Box,
  TextField,
  Snackbar,
  Alert,
  DialogContent,
  DialogActions,
  DialogTitle,
  Dialog,
  Grid
} from '@mui/material';
import { Breadcrumb } from 'app/components';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { Container } from 'app/views/style/style';
import { baseUrl } from 'app/utils/constant';
import Calendrier from './Calendrier';

const Calendrierinventaire = () => {
  // Form dialog
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleAlertClose = () => setMessage({ open: false });

  // Data
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

  useEffect(() => {}, []);

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[{ name: 'Inventaire', path: 'admin/inventaire' }, { name: 'Inventaire' }]}
        />
      </Box>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Grid container direction="row" spacing={2}>
            <Grid item>
              <Button variant="contained" onClick={handleClickOpen} color="primary">
                Nouveau planning inventaire
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Box>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="form-dialog-title"
              fullWidth
              maxWidth="md"
            >
              <DialogTitle id="form-dialog-title"> Nouveau planning inventaire</DialogTitle>
              <DialogContent>
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
                </Grid>
              </DialogContent>

              <DialogActions>
                <Button variant="contained" color="error" onClick={handleClose}>
                  Annuler
                </Button>
                <Button onClick={handleSubmit} color="primary" variant="contained">
                  Valider
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
        </Grid>
      </Grid>
      <Snackbar open={message.open} autoHideDuration={3000} onClose={handleAlertClose}>
        <Alert severity={message.severity} sx={{ width: '100%' }} variant="filled">
          {message.text}
        </Alert>
      </Snackbar>

      <Calendrier />
    </Container>
  );
};

export default Calendrierinventaire;

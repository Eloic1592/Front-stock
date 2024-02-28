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
import { useState } from 'react';
import Button from '@mui/material/Button';
import Listedepot from './Listedepot';
import { Container } from 'app/views/style/style';
import { baseUrl } from 'app/utils/constant';

const Depot = () => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleAlertClose = () => setMessage({ open: false });
  const [message, setMessage] = useState({
    text: 'Information enregistree',
    severity: 'success',
    open: false
  });

  const [depot, setDepot] = useState('');

  const handleSubmit = () => {
    if (!depot) {
      setMessage({
        text: 'Veuillez saisir un nom de dépôt.',
        severity: 'error',
        open: true
      });
      return;
    }

    let params = {
      depot: depot
    };
    let url = baseUrl + '/depot/createdepot';
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
  const getstock = () => {
    window.location.replace('/admin/stockdepot');
  };
  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: 'Depot', path: 'admin/depot' }, { name: 'Depot' }]} />
      </Box>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Grid container direction="row" spacing={2}>
            <Grid item>
              <Button variant="contained" onClick={handleClickOpen} color="primary">
                Nouveau depot
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={getstock} color="secondary">
                Stock depot
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Box>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Nouveau Depot</DialogTitle>
              <DialogContent>
                <TextField
                  fullWidth
                  autoFocus
                  id="depot"
                  type="text"
                  margin="dense"
                  label="depot"
                  name="depot"
                  value={depot}
                  onChange={(event) => setDepot(event.target.value)}
                />
              </DialogContent>

              <DialogActions>
                <Button variant="outlined" color="secondary" onClick={handleClose}>
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
      <Listedepot />
    </Container>
  );
};

export default Depot;

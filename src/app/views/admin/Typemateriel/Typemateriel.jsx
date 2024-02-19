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
import Listetypemateriel from './Listetypemateriel';
import { Container } from 'app/views/style/style';
import { baseUrl } from 'app/utils/constant';

const Typemateriel = () => {
  // Form dialog
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleAlertClose = () => setMessage({ open: false });
  const [typemateriel, setTypemateriel] = useState('');
  const [message, setMessage] = useState({
    text: 'Information enregistree',
    severity: 'success',
    open: false
  });

  // Validation form
  const handleSubmit = () => {
    if (!typemateriel) {
      setMessage({
        text: 'Veuillez saisir un nom de type.',
        severity: 'error',
        open: true
      });
      return;
    }

    let params = {
      typemateriel: typemateriel
    };
    let url = baseUrl + '/typemateriel/createtypemateriel';
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
        handleClose();
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

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: 'Type de materiel', path: 'admin/typemateriel' },
            { name: 'Type de materiel' }
          ]}
        />
      </Box>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Box>
            <Button variant="contained" onClick={handleClickOpen} color="primary">
              Nouveau type de materiel
            </Button>
          </Box>
        </Grid>
        <Grid item>
          <Box>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Nouveau type de materiel</DialogTitle>
              <DialogContent>
                <TextField
                  fullWidth
                  size="small"
                  type="text"
                  name="typemateriel"
                  label="type de materiel"
                  value={typemateriel}
                  onChange={(event) => setTypemateriel(event.target.value)}
                />
              </DialogContent>

              <DialogActions>
                <Button variant="outlined" color="secondary" onClick={handleClose}>
                  Annuler
                </Button>
                <Button onClick={handleSubmit} color="primary">
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
      <Listetypemateriel />
    </Container>
  );
};

export default Typemateriel;

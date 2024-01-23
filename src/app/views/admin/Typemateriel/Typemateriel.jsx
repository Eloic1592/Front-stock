import {
  Box,
  TextField,
  Snackbar,
  Alert,
  DialogContent,
  DialogActions,
  DialogTitle,
  Dialog
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
  const [message, setMessage] = useState({
    text: 'Information enregistree',
    severity: 'success',
    open: false
  });

  const [typemateriel, setTypemateriel] = useState('');

  // Validation form
  const handleSubmit = () => {
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
      .then((response) => response.json())
      .then((response) => {
        setTimeout(() => {
          window.location.reload();
        }, 2000);
        handleClose();
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
      <Box>
        <p>
          <Button variant="contained" onClick={handleClickOpen} color="primary">
            Nouveau type de materiel
          </Button>
          &nbsp;&nbsp;
        </p>
      </Box>
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

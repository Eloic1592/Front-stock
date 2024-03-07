import {
  Box,
  TextField,
  Snackbar,
  Alert,
  DialogContent,
  DialogActions,
  DialogTitle,
  Dialog,
  Grid,
  Button,
  Select,
  MenuItem
} from '@mui/material';
import { Breadcrumb } from 'app/components';

import { useState } from 'react';
import Listenaturemouvement from './Listenaturemouvement';
import { Container } from 'app/views/style/style';
import { baseUrl } from 'app/utils/constant';

const Naturemouvement = () => {
  // Form dialog
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleAlertClose = () => setMessage({ open: false });
  const [naturemouvement, setNaturemouvement] = useState('');
  const [typemouvement, setTypemouvement] = useState('1');

  // Message
  const [message, setMessage] = useState({
    text: 'Information enregistree',
    severity: 'success',
    open: false
  });

  const handleSubmit = () => {
    if (!naturemouvement) {
      setMessage({
        text: 'Veuillez saisir un nom de mouvement.',
        severity: 'error',
        open: true
      });
      return;
    }

    let params = {
      naturemouvement: naturemouvement,
      typemouvement: typemouvement
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

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: 'Type de mouvement', path: 'admin/TypeMouvement' },
            { name: 'Type de mouvement' }
          ]}
        />
      </Box>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Box>
            <Button variant="contained" onClick={handleClickOpen} color="primary">
              Nouveau type de mouvement
            </Button>
          </Box>
        </Grid>
        <Grid item>
          <Box>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Nouveau type de mouvement</DialogTitle>
              <DialogContent>
                <TextField
                  fullWidth
                  autoFocus
                  id="typemouvement"
                  type="text"
                  margin="dense"
                  label="type de mouvement"
                  name="typemouvement"
                  value={naturemouvement}
                  onChange={(event) => setNaturemouvement(event.target.value)}
                />
                <Select
                  fullWidth
                  labelId="select-label"
                  value={typemouvement}
                  onChange={(event) => setTypemouvement(event.target.value)}
                >
                  <MenuItem value="1" key="1">
                    Physique
                  </MenuItem>
                  <MenuItem value="0" key="0">
                    Fictif
                  </MenuItem>
                </Select>
              </DialogContent>

              <DialogActions>
                <Button variant="contained" color="secondary" onClick={handleClose}>
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

      <Listenaturemouvement />
    </Container>
  );
};

export default Naturemouvement;

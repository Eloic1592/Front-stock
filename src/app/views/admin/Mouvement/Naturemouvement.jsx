import {
  Box,
  TextField,
  Snackbar,
  Alert,
  DialogContent,
  DialogActions,
  DialogTitle,
  Dialog,
  // Select,
  // MenuItem,
  Button
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

  // Input
  const [naturemouvement, setNaturemouvement] = useState('');
  // const [categoriemouvement, setCategoriemouvement] = useState('1');

  // Message
  const [message, setMessage] = useState({
    text: 'Information enregistree',
    severity: 'success',
    open: false
  });

  // Validation form
  const handleSubmit = () => {
    let params = {
      naturemouvement: naturemouvement
    };
    let url = baseUrl + '/naturemouvement/createnatmouvement';
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
            { name: 'Type de mouvement', path: 'admin/TypeMouvement' },
            { name: 'Type de mouvement' }
          ]}
        />
      </Box>
      <Box>
        <p>
          <Button variant="contained" onClick={handleClickOpen} color="primary">
            Nouveau type de mouvement
          </Button>
          &nbsp;&nbsp;
        </p>
      </Box>
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
            {/* <Select
              fullWidth
              labelId="select-label"
              value={categoriemouvement}
              onChange={(event) => setCategoriemouvement(event.target.value)}
            >
              <MenuItem value="1">Physique</MenuItem>
              <MenuItem value="2">Fictif</MenuItem>
            </Select> */}
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

      <Listenaturemouvement />
    </Container>
  );
};

export default Naturemouvement;

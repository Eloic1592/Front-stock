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
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { deleteData, Finddata, insertData, UpdateData } from '../../functions';
import Listecommande from './Listecommande';
import { Container } from 'app/views/style/style';

const Commande = () => {
  // Form dialog
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleAlertClose = () => setMessage({ open: false });

  // Data

  // Input
  const [materiel, setMateriel] = useState('');
  const [icon, setIcon] = useState('');

  // Message
  const [message, setMessage] = useState({
    text: 'Information enregistree',
    severity: 'success',
    open: false
  });

  // Validation form
  const handleSubmit = async () => {};

  useEffect(() => {}, []);

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[{ name: 'Commande', path: 'admin/commande' }, { name: 'Commande' }]}
        />
      </Box>
      <p>
        <Button variant="contained" onClick={handleClickOpen} color="primary">
          Nouveau bon de commande
        </Button>
        &nbsp;&nbsp;
        <Button variant="contained" color="secondary">
          Importer un bon
        </Button>
      </p>
      <Box>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Nouveau bon de commande</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              autoFocus
              id="datebon"
              type="date"
              margin="dense"
              name="datebon"
              value={materiel}
              onChange={(event) => setMateriel(event.target.value)}
            />
            <TextField
              fullWidth
              autoFocus
              id="nom"
              type="text"
              margin="dense"
              label="Nom du client"
              name="nom"
              value={icon}
              onChange={(event) => setIcon(event.target.value)}
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
      <Listecommande />
    </Container>
  );
};

export default Commande;

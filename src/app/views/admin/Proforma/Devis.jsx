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
import { Breadcrumb, SimpleCard } from 'app/components';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { deleteData, Finddata, insertData, UpdateData } from '../../functions';
import Listedevis from './Listedevis';
import { Container, AutoComplete } from 'app/views/style/style';

const Devis = () => {
  // Form dialog
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleAlertClose = () => setMessage({ open: false });

  // Data

  const [materielfilter, setMaterielfilter] = useState('');
  // const listematfilter = filtremateriel(listemateriel,materielfilter);

  // Input
  const [datedevis, setDatedevis] = useState('');

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
        <Breadcrumb routeSegments={[{ name: 'Devis', path: 'admin/devis' }, { name: 'Devis' }]} />
      </Box>
      <p>
        <Button variant="contained" onClick={handleClickOpen} color="primary">
          Nouveau devis
        </Button>
      </p>
      <Box>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Nouveau devis</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              autoFocus
              id="datedevis"
              type="date"
              margin="dense"
              name="datedevis"
              value={datedevis}
              onChange={(event) => setDatedevis(event.target.value)}
            />
            <AutoComplete
              fullWidth
              // options={suggestions}
              getOptionLabel={(option) => option.label}
              // onChange={(event) => setIdcommande(event.target.value)}
              // value={idcommande}
              renderInput={(params) => (
                <TextField {...params} label="Commande" variant="outlined" fullWidth />
              )}
            />
            <AutoComplete
              fullWidth
              // options={suggestions}
              getOptionLabel={(option) => option.label}
              // onChange={(event) => setIdclient(event.target.value)}
              // value={idclient}
              renderInput={(params) => (
                <TextField {...params} label="Nom du client" variant="outlined" fullWidth />
              )}
              name="idmateriel"
              id="idmateriel"
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

      <Listedevis />
    </Container>
  );
};

export default Devis;

function filtremateriel(listemateriel, materiel) {
  return listemateriel.filter((Item) => {
    return Item.materiel.toLowerCase().includes(materiel.toLowerCase());
  });
}

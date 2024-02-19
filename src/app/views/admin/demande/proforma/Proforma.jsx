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
  Button
} from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';
import { useState, useEffect } from 'react';
import { deleteData, Finddata, insertData, UpdateData } from '../../../functions';
import Listeproforma from './Listeproforma';
import { Container, AutoComplete } from 'app/views/style/style';

const Proforma = () => {
  // Form dialog
  const handleAlertClose = () => setMessage({ open: false });
  const [file, setFile] = useState('');
  const handleFileOpen = () => setFileOpen(true);
  const handleFileClose = () => setFileOpen(false);
  const [fileOpen, setFileOpen] = useState(false);

  // Data
  const [datedevis, setDatedevis] = useState('');

  // Input

  // Message
  const [message, setMessage] = useState({
    text: 'Information enregistree',
    severity: 'success',
    open: false
  });

  useEffect(() => {}, []);
  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[{ name: 'Proforma', path: 'admin/proforma' }, { name: 'Proforma' }]}
        />
      </Box>
      <p>
        <Button variant="contained" onClick={handleFileOpen} color="secondary">
          Exporter des données
        </Button>
      </p>
      <Box>
        <Dialog open={fileOpen} onClose={handleFileClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Exporter des donnees</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              size="small"
              type="number"
              name="annee"
              label="De quel annee ?"
              value={file}
              onChange={(event) => setFile(event.target.value)}
            />
          </DialogContent>

          <DialogActions>
            <Button variant="outlined" color="secondary" onClick={handleFileClose}>
              Annuler
            </Button>
            <Button /*onClick={handleSubmit}*/ color="primary">Valider</Button>
          </DialogActions>
        </Dialog>
      </Box>

      <Snackbar open={message.open} autoHideDuration={3000} onClose={handleAlertClose}>
        <Alert severity={message.severity} sx={{ width: '100%' }} variant="filled">
          {message.text}
        </Alert>
      </Snackbar>

      <Listeproforma />
    </Container>
  );
};

export default Proforma;
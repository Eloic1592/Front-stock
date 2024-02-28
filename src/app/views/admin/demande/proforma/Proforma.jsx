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
import { Breadcrumb } from 'app/components';
import { useState, useEffect } from 'react';

import Listeproforma from './Listeproforma';
import { Container } from 'app/views/style/style';

const Proforma = () => {
  // Form dialog
  const handleAlertClose = () => setMessage({ open: false });
  const [file, setFile] = useState('');
  const handleFileClose = () => setFileOpen(false);
  const [fileOpen, setFileOpen] = useState(false);

  // Data
  // const [datedevis, setDatedevis] = useState('');

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
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Grid container direction="column" spacing={2}></Grid>
        </Grid>
        <Grid item>
          <Box>
            <Dialog open={fileOpen} onClose={handleFileClose} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Exporter des donnees</DialogTitle>
              <DialogContent>
                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  InputProps={{ inputProps: { min: 0 } }}
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
        </Grid>
      </Grid>
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

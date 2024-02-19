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
import Listedetailproforma from './Listedetailproforma';

const Detaildevis = () => {
  // Colonne
  // const columns = [
  //   { label: 'ID', field: 'iddetaildevis', align: 'center' },
  //   { label: 'Marque', field: 'marque', align: 'center' },
  //   { label: 'Modele', field: 'modele', align: 'center' },
  //   { label: 'Quantite', field: 'quantite', align: 'center' },
  //   { label: 'Prix unitaire', field: 'pu', align: 'center' },
  //   { label: 'Total', field: 'total', align: 'center' }
  // ];

  // Form dialog
  const [open, setOpen] = useState(false);
  // const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleAlertClose = () => setMessage({ open: false });
  const [filename, setFilename] = useState('');
  const [message, setMessage] = useState({
    text: 'Information enregistree',
    severity: 'success',
    open: false
  });

  // Export pdf

  useEffect(() => {}, []);

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: 'Detail proforma', path: 'admin/proforma/detailproforma' },
            { name: 'Detail proforma' }
          ]}
        />
      </Box>
      <Grid container direction="column" spacing={2}>
        {/* <Grid item>
          <Box>
            <Button variant="contained" onClick={handleClickOpen} color="secondary">
              Exporter PDF
            </Button>
          </Box>
        </Grid> */}
        <Grid item>
          <Box>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth>
              <DialogTitle id="form-dialog-title">Exportation proforma</DialogTitle>
              <DialogContent>
                <Grid container direction="column" spacing={1}>
                  <Grid item xs={4}>
                    <TextField
                      fullWidth
                      id="filename"
                      type="text"
                      name="filename"
                      value={filename}
                      label="Nom du fichier"
                      onChange={(event) => setFilename(event.target.value)}
                    />
                  </Grid>
                </Grid>
              </DialogContent>

              <DialogActions>
                <Button variant="outlined" color="secondary" onClick={handleClose}>
                  Annuler
                </Button>
                <Button variant="contained" color="primary">
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
      <Listedetailproforma />
    </Container>
  );
};

export default Detaildevis;

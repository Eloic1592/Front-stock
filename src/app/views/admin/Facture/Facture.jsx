import {
  Box,
  TextField,
  Snackbar,
  Alert,
  DialogContent,
  DialogActions,
  DialogTitle,
  Dialog,
  MenuItem,
  Select
} from '@mui/material';
import { Breadcrumb } from 'app/components';
import { useState, useEffect } from 'react';
import CustomizedTable from 'app/views/material-kit/tables/CustomizedTable';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Listefacture from './Listefacture';
import { Container } from 'app/views/style/style';

const Facture = () => {
  // Input
  const [idmouvement, setIdmouvement] = useState('');
  const [datefacture, setDatefacture] = useState('');
  const [quantite, setQuantite] = useState(0);
  const [prixunitaire, setPrixunitaire] = useState(0);
  const [formData, setFormData] = useState([]);
  const [file, setFile] = useState('');
  const handleFileOpen = () => setFileOpen(true);
  const handleFileClose = () => setFileOpen(false);
  const [fileOpen, setFileOpen] = useState(false);
  const handleAlertClose = () => setMessage({ open: false });
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [message, setMessage] = useState({
    text: 'Information enregistree',
    severity: 'success',
    open: false
  });

  // Validation form
  const handleSubmit = (event) => {
    event.preventDefault();

    const newData = {
      article: '1',
      quantite: '2',
      prixunitaire: '4',
      total: '8' // Remplacez par la valeur réelle du nom du client
    };

    setFormData([...formData, newData]);
  };

  // Reset data to null
  const resetData = () => {
    setQuantite(0);
    setIdmouvement('');
    setDatefacture('');
    setPrixunitaire(0);
    setFormData([]);
  };

  // Page onLoad
  useEffect(() => {}, []);

  const columnsdetails = [
    { label: 'article', field: 'article', align: 'center' },
    { label: 'quantite', field: 'quantite', align: 'center' },
    { label: 'prix unitaire', field: 'prixunitaire', align: 'center' },
    { label: 'total', field: 'total', align: 'center' }
  ];
  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[{ name: 'Facture', path: 'admin/facture' }, { name: 'Facture' }]}
        />
      </Box>
      <p>
        <Button variant="contained" onClick={handleClickOpen} color="primary">
          Nouvelle facture
        </Button>
        &nbsp;&nbsp;
        <Button variant="contained" color="inherit">
          Exporter la facture
        </Button>
        &nbsp;&nbsp;
        <Button variant="contained" onClick={handleFileOpen} color="secondary">
          Importer la facture
        </Button>
      </p>
      <Box>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
          fullWidth
          maxWidth="xl"
        >
          <DialogTitle id="form-dialog-title">Nouvelle facture</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  autoFocus
                  id="idmouvement"
                  type="text"
                  margin="dense"
                  label="Id du mouvement"
                  name="idmouvement"
                  value={idmouvement}
                  onChange={(event) => setIdmouvement(event.target.value)}
                />
              </Grid>
              <Grid item xs={4}>
                <Select fullWidth autoFocus labelId="select-label" value={'1'} margin="dense">
                  <MenuItem value="1">Client 1</MenuItem>
                  <MenuItem value="2">Client 2</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  autoFocus
                  id="datefacture"
                  type="date"
                  margin="dense"
                  name="datefacture"
                  value={datefacture}
                  onChange={(event) => setDatefacture(event.target.value)}
                />
              </Grid>
            </Grid>
            <h3>Details de la facture</h3>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  InputProps={{ inputProps: { min: 0 } }}
                  name="quantite"
                  label="Quantite"
                  variant="outlined"
                  value={quantite}
                  onChange={(event) => setQuantite(event.target.value)}
                  sx={{ mb: 3 }}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  InputProps={{ inputProps: { min: 0 } }}
                  name="prixunitaire"
                  label="Prix unitaire"
                  variant="outlined"
                  value={prixunitaire}
                  onChange={(event) => setPrixunitaire(event.target.value)}
                  sx={{ mb: 3 }}
                />
              </Grid>
              <Grid item xs={3}>
                <Select
                  fullWidth
                  autoFocus
                  labelId="select-label"
                  value={'1'}
                  margin="dense"
                  size="small"
                >
                  <MenuItem value="1">Article 1</MenuItem>
                  <MenuItem value="2">Article 2</MenuItem>
                </Select>
              </Grid>

              <Grid item xs={3}>
                <Button variant="outlined" color="secondary" onClick={handleSubmit}>
                  Inserer
                </Button>
              </Grid>
            </Grid>
            <CustomizedTable columns={columnsdetails} data={formData} />
          </DialogContent>

          <DialogActions>
            <Button onClick={resetData} color="inherit" variant="contained">
              Reinitialiser
            </Button>
            <Button variant="contained" color="secondary" onClick={handleClose}>
              Annuler
            </Button>
            <Button onClick={handleSubmit} color="primary" variant="contained">
              Enregistrer
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
      <Box>
        <Dialog open={fileOpen} onClose={handleFileClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Importer des donnees</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              size="small"
              type="file"
              name="filename"
              label="Fichier"
              value={file}
              onChange={(event) => setFile(event.target.value)}
            />
          </DialogContent>

          <DialogActions>
            <Button variant="outlined" color="secondary" onClick={handleFileClose}>
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

      <Listefacture />
    </Container>
  );
};

export default Facture;

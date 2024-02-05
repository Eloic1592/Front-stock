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
  Select,
  MenuItem
} from '@mui/material';
import { Breadcrumb } from 'app/components';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { Container, AutoComplete } from 'app/views/style/style';
import CustomizedTable from 'app/views/material-kit/tables/CustomizedTable';
import { baseUrl } from 'app/utils/constant';
import Listedetaildevis from './Listedetaildevis';
import { useParams } from 'react-router-dom';
import Listedetailproforma from './Listedetailproforma';

const Detaildevis = () => {
  const iddevis = useParams();
  console.log(iddevis.iddevis);

  // Form dialog
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleAlertClose = () => setMessage({ open: false });
  const handlecancelOpen = () => setAlertOpen(true);
  const handlecancelClose = () => setAlertOpen(false);
  const [filename, setFilename] = useState('');
  const [alertOpen, setAlertOpen] = useState(false);

  const [message, setMessage] = useState({
    text: 'Information enregistree',
    severity: 'success',
    open: false
  });

  // Message

  // Validation form
  const handleSubmit = () => {
    // let url = baseUrl + '/devis/createdetaildevis';
    setMessage({
      text: "Aucune donnee n'a ete ajoutee!",
      severity: 'error',
      open: true
    });
  };

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
        <Grid item>
          <Box>
            <Button variant="contained" onClick={handleClickOpen} color="secondary">
              Exporter PDF
            </Button>
          </Box>
        </Grid>
        <Grid item>
          <Box>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth>
              <DialogTitle id="form-dialog-title">Exportation proforma</DialogTitle>
              <DialogContent>
                {' '}
                <Grid container direction="column" spacing={1}>
                  <Grid item xs={4}>
                    {' '}
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
                <Button variant="contained" onClick={handleSubmit} color="primary">
                  Valider
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
          <Box>
            <Dialog
              open={alertOpen}
              onClose={handlecancelClose}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">
                Voulez-vous vraiment tout reinitialiser ?
              </DialogTitle>

              <DialogActions>
                <Button variant="outlined" color="secondary" onClick={handlecancelClose}>
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
      <Listedetailproforma />
    </Container>
  );
};

export default Detaildevis;

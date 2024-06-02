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
import { useState } from 'react';
import Button from '@mui/material/Button';
import Listecategoriemateriel from './Listecategoriemateriel';
import { Container } from 'app/views/style/style';
import { baseUrl } from 'app/utils/constant';

const Categoriemateriel = () => {
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

  const [categoriemateriel, setCategoriemateriel] = useState('');
  const [val, setVal] = useState('');

  // Validation form
  const handleSubmit = () => {
    if (!categoriemateriel) {
      setMessage({
        text: 'Veuillez saisir un nom de categorie de materiel.',
        severity: 'error',
        open: true
      });
      return;
    }
    let params = {
      categoriemateriel: categoriemateriel,
      val: val
    };
    let url = baseUrl + '/categoriemateriel/createcategoriemateriel';
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
            { name: 'Categorie de materiel', path: 'admin/categoriemateriel' },
            { name: 'Categorie de materiel' }
          ]}
        />
      </Box>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Box>
            <Button variant="contained" onClick={handleClickOpen} color="primary">
              Nouvelle categorie de materiel
            </Button>
          </Box>
        </Grid>
        <Grid item>
          <Box>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="form-dialog-title"
              fullWidth
              maxWidth="md"
            >
              <DialogTitle id="form-dialog-title">Nouvelle categorie de materiel</DialogTitle>
              <DialogContent>
                <Grid container direction="column" spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      autoFocus
                      id="categoriemateriel"
                      type="text"
                      name="categoriemateriel"
                      margin="dense"
                      label="categorie de materiel"
                      placeholder="Bureautique,informatique ou autre..."
                      value={categoriemateriel}
                      onChange={(event) => setCategoriemateriel(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      autoFocus
                      id="code"
                      type="text"
                      margin="dense"
                      label="code"
                      name="code"
                      placeholder="EX: INF, BUR..."
                      value={val}
                      onChange={(event) => setVal(event.target.value)}
                    />
                  </Grid>
                </Grid>
              </DialogContent>

              <DialogActions>
                <Button variant="contained" color="error" onClick={handleClose}>
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

      <Listecategoriemateriel />
    </Container>
  );
};

export default Categoriemateriel;

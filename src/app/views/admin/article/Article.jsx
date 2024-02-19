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
import ListeArticle from './Listearticle';
import { Container } from 'app/views/style/style';
import { baseUrl } from 'app/utils/constant';

const Article = () => {
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

  // Input
  const [codearticle, setCodearticle] = useState('');
  const [marque, setMarque] = useState('');
  const [modele, setModele] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    if (!marque || !modele || !codearticle) {
      setMessage({
        text: 'Veuillez remplir tous les champs obligatoires.',
        severity: 'error',
        open: true
      });
      return;
    }
    let params = {
      marque: marque,
      modele: modele,
      codearticle: codearticle,
      description: description
    };
    let url = baseUrl + '/article/createarticle';
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
        handleClose();
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
        <Breadcrumb routeSegments={[{ name: 'Depot', path: 'admin/depot' }, { name: 'Depot' }]} />
      </Box>
      <Box>
        <p>
          <Button variant="contained" onClick={handleClickOpen} color="primary">
            Nouvel article
          </Button>
          &nbsp;&nbsp;
        </p>
      </Box>
      <Box>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Nouvel article</DialogTitle>
          <DialogContent>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  autoFocus
                  id="marque"
                  type="text"
                  margin="dense"
                  label="Marque (obligatoire)"
                  name="marque"
                  value={marque}
                  onChange={(event) => setMarque(event.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  autoFocus
                  id="modele"
                  type="text"
                  margin="dense"
                  label="Nom du modele  (obligatoire)"
                  name="modele"
                  value={modele}
                  onChange={(event) => setModele(event.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  autoFocus
                  id="description"
                  type="text"
                  margin="dense"
                  label="Description"
                  name="description"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  autoFocus
                  id="codearticle"
                  type="text"
                  margin="dense"
                  label="Code article (obligatoire)"
                  name="codearticle"
                  value={codearticle}
                  onChange={(event) => setCodearticle(event.target.value)}
                />
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions>
            <Button variant="outlined" color="secondary" onClick={handleClose}>
              Annuler
            </Button>
            <Button onClick={handleSubmit} color="primary" variant="contained">
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
      <ListeArticle />
    </Container>
  );
};

export default Article;

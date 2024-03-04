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
  MenuItem,
  Select
} from '@mui/material';
import { Breadcrumb } from 'app/components';
import { useState, useEffect } from 'react';
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
  const [data, setData] = useState({
    typemateriels: []
  });

  // Input
  const [typemateriel, setTypemateriel] = useState('1');
  const [marque, setMarque] = useState('');
  const [modele, setModele] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    if (!marque || typemateriel === '1') {
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
      idtypemateriel: typemateriel,
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = baseUrl + '/article/contentarticle';
        const response = await fetch(url, {
          crossDomain: true,
          method: 'POST',
          body: JSON.stringify({}),
          headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`);
        }

        const responseData = await response.json();

        const newData = {
          typemateriels: responseData.typemateriels || []
        };

        setData(newData);
      } catch {
        setMessage({
          text: "Aucune donnee n'ete recuperee,veuillez verifier si le serveur est actif",
          severity: 'error',
          open: true
        });
      }
    };
    fetchData();
  }, []);

  const getstock = () => {
    window.location.replace('/admin/stocksarticle');
  };

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[{ name: 'Article', path: 'admin/admin/article' }, { name: 'Article' }]}
        />
      </Box>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Grid container direction="row" spacing={2}>
            <Grid item>
              <Button variant="contained" onClick={handleClickOpen} color="primary">
                Nouvel article
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={getstock} color="secondary">
                Stock article
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Box>
            <Dialog
              open={open}
              fullWidth
              onClose={handleClose}
              aria-labelledby="form-dialog-title"
              maxWidth="md"
            >
              <DialogTitle id="form-dialog-title">Nouvel article</DialogTitle>
              <DialogContent>
                <Grid container direction="column" spacing={1}>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      autoFocus
                      id="marque"
                      type="text"
                      margin="dense"
                      label="Marque"
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
                      label="Nom du modele"
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
                      rows={4}
                      multiline
                      value={description}
                      onChange={(event) => setDescription(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Select
                      fullWidth
                      labelId="select-label"
                      variant="outlined"
                      size="small"
                      value={typemateriel}
                      onChange={(event) => setTypemateriel(event.target.value)}
                      sx={{ mb: 3 }}
                    >
                      <MenuItem value="1">Selectionner un type</MenuItem>
                      {data.typemateriels.map((row) => (
                        <MenuItem key={row.idtypemateriel} value={row.idtypemateriel}>
                          {row.typemateriel}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button variant="contained" color="secondary" onClick={handleClose}>
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
      <Grid container direction="column" spacing={1}>
        <ListeArticle />
      </Grid>
    </Container>
  );
};

export default Article;

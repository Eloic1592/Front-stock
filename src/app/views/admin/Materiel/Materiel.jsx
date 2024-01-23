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
  Select,
  Grid
} from '@mui/material';
import { Breadcrumb } from 'app/components';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Listemateriel from './Listemateriel';
import { Container, AutoComplete } from 'app/views/style/style';
import { baseUrl } from 'app/utils/constant';

const Materiel = () => {
  // Form dialog
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleAlertClose = () => setMessage({ open: false });
  const [typemateriel, setTypemateriel] = useState('');
  const [article, setArticle] = useState('Choisir un article');
  const [categoriemateriel, setCategorietmateriel] = useState('');
  const [couleur, setCouleur] = useState(' ');
  const [numserie, setNumserie] = useState('');
  const [description, setDescription] = useState('');
  const [prixvente, setPrixvente] = useState(0);
  const [caution, setCaution] = useState(0);
  const [file, setFile] = useState('');
  const handleFileOpen = () => setFileOpen(true);
  const handleFileClose = () => setFileOpen(false);
  const [fileOpen, setFileOpen] = useState(false);

  // Message
  const [message, setMessage] = useState({
    text: 'Information enregistree',
    severity: 'success',
    open: false
  });

  const [data, setData] = useState('');

  // Validation form
  const handleSubmit = () => {
    let params = {
      idtypemateriel: typemateriel,
      idcategoriemateriel: categoriemateriel,
      idarticle: article,
      numserie: numserie,
      prixvente: prixvente,
      caution: caution,
      couleur: couleur,
      description: description
    };
    console.log(typemateriel);
    console.log(categoriemateriel);
    console.log(article);
    // let url = baseUrl + '/materiel/createmateriel';
    // fetch(url, {
    //   crossDomain: true,
    //   method: 'POST',
    //   body: JSON.stringify(params),
    //   headers: { 'Content-Type': 'application/json' }
    // })
    //   .then((response) => response.json())
    //   .then((response) => {
    //     setTimeout(() => {
    //       window.location.reload();
    //     }, 2000);
    //     handleClose();
    //     setMessage({
    //       text: 'Information enregistree',
    //       severity: 'success',
    //       open: true
    //     });
    //   })
    //   .catch((err) => {
    //     setMessage({
    //       text: err,
    //       severity: 'error',
    //       open: true
    //     });
    //   });
  };
  useEffect(() => {
    let url = baseUrl + '/materiel/contentmateriel';
    fetch(url, {
      crossDomain: true,
      method: 'POST',
      body: JSON.stringify({}),
      headers: { 'Content-Type': 'application/json' }
    })
      .then((response) => response.json())
      .then((response) => {
        setData(response);
        console.log(data);
      });
  }, []);
  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[{ name: 'Materiel', path: 'admin/listemateriel' }, { name: 'Materiel' }]}
        />
      </Box>
      <p>
        <Button variant="contained" onClick={handleClickOpen} color="primary">
          Nouveau materiel
        </Button>
        &nbsp;&nbsp;
        <Button variant="contained" onClick={handleFileOpen} color="secondary">
          Exporter des données
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
          <DialogTitle id="form-dialog-title">Nouveau Materiel</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <AutoComplete
                  fullWidth
                  options={data.typemateriels}
                  getOptionLabel={(option) => option.typemateriel}
                  renderInput={(params) => (
                    <TextField {...params} label="Type de materiel" variant="outlined" fullWidth />
                  )}
                  name="typemateriel"
                  id="typemateriel"
                  value={typemateriel}
                  onChange={(event, newValue) => {
                    setTypemateriel(newValue ? newValue.idtypemateriel : '');
                  }}
                  sx={{ mb: 3 }}
                />
              </Grid>
              <Grid item xs={6}>
                <AutoComplete
                  fullWidth
                  options={data.articles}
                  getOptionLabel={(option) => option.marque + '-' + option.modele}
                  renderInput={(params) => (
                    <TextField {...params} label="Article" variant="outlined" fullWidth />
                  )}
                  name="article"
                  id="idarticle"
                  value={article}
                  onChange={(event, newValue) => {
                    setArticle(newValue ? newValue.idarticle : '');
                  }}
                  sx={{ mb: 3 }}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <AutoComplete
                  fullWidth
                  options={data.categoriemateriels}
                  getOptionLabel={(option) => option.categoriemateriel}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Categorie de materiel"
                      variant="outlined"
                      fullWidth
                    />
                  )}
                  name="categoriemateriel"
                  id="idcategoriemateriel"
                  value={categoriemateriel}
                  onChange={(event, newValue) => {
                    setCategorietmateriel(newValue ? newValue.idcategoriemateriel : '');
                  }}
                  sx={{ mb: 3 }}
                />
              </Grid>
              <Grid item xs={6}>
                <Select
                  fullWidth
                  labelId="select-label"
                  value={couleur}
                  onChange={(event) => setCouleur(event.target.value)}
                >
                  <MenuItem value=" ">Choisir une couleur</MenuItem>
                  <MenuItem value="1">Noir</MenuItem>
                  <MenuItem value="1">Gris</MenuItem>
                </Select>
              </Grid>
            </Grid>

            <TextField
              fullWidth
              autoFocus
              id="numeroserie"
              type="text"
              margin="dense"
              label="Numero de serie"
              name="numserie"
              value={numserie}
              onChange={(event) => setNumserie(event.target.value)}
            />

            <TextField
              fullWidth
              autoFocus
              id="description"
              type="text"
              margin="dense"
              label="Description du materiel"
              rows={4}
              multiline
              name="description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />

            <TextField
              fullWidth
              autoFocus
              id="prixvente"
              type="number"
              margin="dense"
              label="Prix de vente"
              name="prixvente"
              value={prixvente}
              onChange={(event) => setPrixvente(event.target.value)}
            />
            <TextField
              fullWidth
              autoFocus
              id="caution"
              type="number"
              margin="dense"
              label="Caution"
              name="caution"
              value={caution}
              onChange={(event) => setCaution(event.target.value)}
            />
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
      <Box>
        <Dialog open={fileOpen} onClose={handleFileClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Exporter des donnees</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              size="small"
              type="text"
              name="filename"
              label="Nom du fichier"
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

      <Listemateriel />
    </Container>
  );
};

export default Materiel;

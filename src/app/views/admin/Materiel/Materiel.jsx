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
  const [typemateriel, setTypemateriel] = useState(['1']);
  const [categoriemateriel, setCategoriemateriel] = useState(['1']);
  const [couleur, setCouleur] = useState(['1']);
  const [article, setArticle] = useState('');
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

  const [data, setData] = useState([]);

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
    let url = baseUrl + '/materiel/createmateriel';
    fetch(url, {
      crossDomain: true,
      method: 'POST',
      body: JSON.stringify(params),
      headers: { 'Content-Type': 'application/json' }
    })
      .then((response) => response.json())
      .then((response) => {
        setTimeout(() => {
          window.location.reload();
        }, 2000);
        handleClose();
        setMessage({
          text: 'Information enregistree',
          severity: 'success',
          open: true
        });
      })
      .catch((err) => {
        setMessage({
          text: err,
          severity: 'error',
          open: true
        });
      });
  };
  useEffect(() => {
    // Charger les données de votre API ou de toute autre source de données
    // Remplacez cette logique par la manière dont vous chargez vos catégories de matériel
    const fetchData = async () => {
      try {
        // Exemple de requête fetch pour obtenir les catégories de matériel depuis une API
        const response = await fetch('/materiel/contenmateriel');
        const data = await response.json();

        // Mettre à jour l'état avec les catégories de matériel récupérées
        setCategoriemateriel(data.categoriemateriels);
      } catch (error) {
        console.error('Erreur lors du chargement des catégories de matériel :', error);
      }
    };

    // Appeler la fonction fetchData lors du montage du composant
    fetchData();
  }, []); // Le tableau vide en tant que deuxième argument signifie que cela ne doit être exécuté qu'une seule fois lors du montage

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
              <Grid item xs={6}>
                <Select
                  labelId="select-label"
                  sx={{ mb: 3 }}
                  value={categoriemateriel}
                  onChange={(event) => setCategoriemateriel(event.target.value)}
                  fullWidth
                >
                  <MenuItem value="1" disabled>
                    Choisir une categorie
                  </MenuItem>
                  {data.categoriemateriels.map((row) => (
                    <MenuItem value={row.idcategoriemateriel}>{row.categoriemateriel}</MenuItem>
                  ))}
                </Select>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Select
                  labelId="select-label"
                  sx={{ mb: 3 }}
                  value={typemateriel}
                  onChange={(event) => setTypemateriel(event.target.value)}
                  fullWidth
                >
                  <MenuItem value="1" disabled>
                    Choisir un type
                  </MenuItem>
                  {/* {data.typemateriels.map((row) => (
                    <MenuItem value={row.idtypemateriel}>{row.typemateriel}</MenuItem>
                  ))} */}
                </Select>
              </Grid>
              <Grid item xs={6}>
                <Select
                  fullWidth
                  labelId="select-label"
                  value={couleur}
                  onChange={(event) => setCouleur(event.target.value)}
                >
                  <MenuItem value="1" disabled>
                    Choisir une couleur
                  </MenuItem>
                  <MenuItem value="Noir">Noir</MenuItem>
                  <MenuItem value="Blanc">Blanc</MenuItem>
                  <MenuItem value="Gris">Gris</MenuItem>
                  <MenuItem value="Rouge">Rouge</MenuItem>
                  <MenuItem value="Bleu">Bleu</MenuItem>
                  <MenuItem value="Vert">Vert</MenuItem>
                  <MenuItem value="Jaune">Jaune</MenuItem>
                  <MenuItem value="Marron">Marron</MenuItem>
                  <MenuItem value="Violet">Violet</MenuItem>
                  <MenuItem value="Rose">Rose</MenuItem>
                  <MenuItem value="Orange">Orange</MenuItem>
                  <MenuItem value="Beige">Beige</MenuItem>
                  <MenuItem value="Turquoise">Turquoise</MenuItem>
                  <MenuItem value="Argenté">Argenté</MenuItem>
                  <MenuItem value="Doré">Doré</MenuItem>
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

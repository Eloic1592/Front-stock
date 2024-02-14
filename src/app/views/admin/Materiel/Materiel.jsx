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
import { Container } from 'app/views/style/style';
import { baseUrl } from 'app/utils/constant';

const Materiel = () => {
  // Form dialog
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleAlertClose = () => setMessage({ open: false });

  const [couleur, setCouleur] = useState(['1']);
  const [article, setArticle] = useState(['1']);
  const [categoriemateriel, setCategoriemateriel] = useState(['1']);
  const [typemateriel, setTypemateriel] = useState(['1']);

  const [numserie, setNumserie] = useState('');
  const [description, setDescription] = useState('');
  const [prixvente, setPrixvente] = useState();
  const [caution, setCaution] = useState();
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

  const [data, setData] = useState({
    materiels: [],
    articles: [],
    typemateriels: [],
    categoriemateriels: [],
    listemateriels: []
  });

  // Validation form
  const handleSubmit = () => {
    if (
      typemateriel == 1 ||
      categoriemateriel == 1 ||
      article == 1 ||
      !numserie ||
      !prixvente ||
      !caution ||
      couleur == 1
    ) {
      setMessage({
        text: 'Les champs suivants sont obligatoires : typemateriel, categoriemateriel, article, numserie, prixvente, caution, couleur',
        severity: 'error',
        open: true
      });
      return; // Arrêter l'exécution de la fonction si un champ est vide
    }

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
    const fetchData = async () => {
      try {
        let url = baseUrl + '/materiel/contentform';
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
          articles: responseData.articles || [],
          typemateriels: responseData.typemateriels || [],
          categoriemateriels: responseData.categoriemateriels || [],
          listemateriels: responseData.listemateriels || []
        };

        setData(newData);
      } catch {
        setMessage({
          text: "Aucune donnee n'ete recuperee,veuillez verifier si le serveur est actif",
          severity: 'error',
          open: true
        });
        // Gérer les erreurs de requête Fetch ici
      }
    };
    fetchData();
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
          PDF
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
                <Select
                  labelId="select-label"
                  sx={{ mb: 3 }}
                  value={article}
                  onChange={(event) => setArticle(event.target.value)}
                  fullWidth
                >
                  <MenuItem value="1" disabled>
                    Choisir un article
                  </MenuItem>
                  {data.articles.map((row) => (
                    <MenuItem key={row.idarticle} value={row.idarticle}>
                      {row.modele}/{row.codearticle}
                    </MenuItem>
                  ))}
                </Select>
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
                    <MenuItem key={row.idcategoriemateriel} value={row.idcategoriemateriel}>
                      {row.categoriemateriel}
                    </MenuItem>
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
                  {data.typemateriels.map((row) => (
                    <MenuItem key={row.idtypemateriel} value={row.idtypemateriel}>
                      {row.typemateriel}
                    </MenuItem>
                  ))}
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

      <Listemateriel />
    </Container>
  );
};

export default Materiel;

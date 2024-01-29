import {
  Box,
  Button,
  TextField,
  DialogContent,
  DialogActions,
  DialogTitle,
  Dialog,
  Select,
  MenuItem,
  Grid
} from '@mui/material';
import { Breadcrumb } from 'app/components';
import { useState, useEffect } from 'react';
import CustomizedTable from 'app/views/material-kit/tables/CustomizedTable';
import Listestockphysique from './Listestockphysique';
import { Container } from 'app/views/style/style';
import { baseUrl } from 'app/utils/constant';

const Stockphysique = () => {
  // Input
  const [datedepot, setDatedepot] = useState('');
  const [typemouvement, setTypemouvement] = useState(['0']);
  const [naturemouvement, setNaturemouvement] = useState(['1']);
  const [article, setArticle] = useState(['1']);
  const [quantite, setQuantite] = useState(0);
  const [prixunitaire, setPrixunitaire] = useState(0);
  const [depot, setDepot] = useState(['1']);
  const [prixstock, setPrixstock] = useState(0);
  const [description, setDescription] = useState('');
  const [commentaire, setCommentaire] = useState('');
  const [file, setFile] = useState('');
  const handleFileOpen = () => setFileOpen(true);
  const handleFileClose = () => setFileOpen(false);
  const [fileOpen, setFileOpen] = useState(false);
  const handlecancelOpen = () => setAlertOpen(true);
  const handlecancelClose = () => setAlertOpen(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [data, setData] = useState({
    mouvementStocks: [],
    mouvementphysiques: [],
    mouvementfictifs: [],
    naturemouvements: [],
    depot: [],
    listemateriels: [],
    articles: []
  });

  // Data
  const [formData, setFormData] = useState([]);

  // Message
  const [message, setMessage] = useState({
    text: 'Information enregistree',
    severity: 'success',
    open: false
  });
  const handleAlertClose = () => setMessage({ open: false });

  // Form dialog
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);

  // Close form
  const handleClose = () => setOpen(false);

  // Validation form
  const handledetails = () => {
    const newData = {
      idarticle: article,
      quantite: quantite,
      pu: prixunitaire,
      prixstock: prixstock,
      total: quantite * prixunitaire,
      iddepot: depot,
      statut: 0,
      description: description,
      commentaire: commentaire
      // Remplacez par la valeur réelle du nom du client
    };
    setFormData([...formData, newData]);
  };

  const handleSubmit = () => {
    let params = {
      datedepot: datedepot,
      typemouvement: typemouvement,
      idnaturemouvement: naturemouvement,
      statut: 0,
      mouvementphysiques: formData
    };
    console.log(params.mouvementphysiques.length);

    let url = baseUrl + '/mouvementstock/createstockphysique';
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

  // Reset data to null
  const resetData = () => {
    setArticle(['1']);
    setDatedepot('');
    setQuantite(0);
    setPrixstock(0);
    setPrixunitaire(0);
    setTypemouvement(['0']);
    setNaturemouvement(['1']);
    setDescription('');
    setCommentaire('');
    setDepot(['1']);
    setFormData([]);
    handlecancelClose();
  };

  const columnsdetails = [
    { label: 'article', field: 'article', align: 'center' },
    { label: 'quantite', field: 'quantite', align: 'center' },
    { label: 'prix unitaire', field: 'prixunitaire', align: 'center' },
    { label: 'prix stock', field: 'prixstock', align: 'center' },
    { label: 'depot', field: 'depot', align: 'center' },
    { label: 'total', field: 'total', align: 'center' }
    // Other columns...
  ];
  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = baseUrl + '/mouvementstock/contentstock';
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
          materiels: responseData.materiels || [],
          mouvementphysiques: responseData.mouvementphysiques || [],
          mouvementfictifs: responseData.mouvementfictifs || [],
          naturemouvements: responseData.naturemouvements || [],
          depot: responseData.depots || [],
          articles: responseData.articles || [],
          listemateriels: responseData.listemateriels || []
        };

        setData(newData);
      } catch (error) {
        console.log("Aucune donnee n'ete recuperee,veuillez verifier si le serveur est actif");
        // Gérer les erreurs de requête Fetch ici
      }
    };
    fetchData();
  }, []);

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: 'Mouvement de stock', path: 'admin/stock/mouvementphysique' },
            { name: 'mouvement de stock physique' }
          ]}
        />
        <p>
          <Button variant="contained" onClick={handleClickOpen} color="primary">
            Nouveau mouvement
          </Button>
          &nbsp;&nbsp;
          <Button variant="contained" color="inherit">
            Exporter les mouvements
          </Button>
          &nbsp;&nbsp;
          <Button variant="contained" onClick={handleFileOpen} color="secondary">
            Importer des données
          </Button>
        </p>
      </Box>

      <Box>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
          fullWidth
          maxWidth="xl"
        >
          <DialogTitle id="form-dialog-title">Nouveau mouvement de stock</DialogTitle>
          <DialogContent>
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <Select
                  fullWidth
                  labelId="select-label"
                  value={naturemouvement}
                  onChange={(event) => setNaturemouvement(event.target.value)}
                >
                  <MenuItem value="1">Choisir un mouvement</MenuItem>
                  {data.naturemouvements.map((row) => (
                    <MenuItem value={row.idnaturemouvement}>{row.naturemouvement}</MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  id="datedepot"
                  type="date"
                  name="datedepot"
                  value={datedepot}
                  onChange={(event) => setDatedepot(event.target.value)}
                />
              </Grid>
              <Grid item xs={4}>
                <Select
                  fullWidth
                  labelId="select-label"
                  value={typemouvement}
                  onChange={(event) => setTypemouvement(event.target.value)}
                >
                  <MenuItem value="0">Choisir la nature du mouvement</MenuItem>
                  <MenuItem value="1">Entree</MenuItem>
                  <MenuItem value="-1">Sortie</MenuItem>
                </Select>
              </Grid>
            </Grid>
            <h3>Details du mouvement physique</h3>
            <Grid container spacing={1}>
              <Grid item xs={2}>
                <Select
                  fullWidth
                  size="small"
                  labelId="select-label"
                  margin="dense"
                  label="Article"
                  value={article}
                  onChange={(event) => setArticle(event.target.value)}
                >
                  <MenuItem value="1">Choisir un article</MenuItem>
                  {data.articles.map((row) => (
                    <MenuItem value={row.idarticle}>
                      {row.modele}/{row.codearticle}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={2}>
                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  name="quantite"
                  label="Quantite"
                  variant="outlined"
                  value={quantite}
                  onChange={(event) => setQuantite(event.target.value)}
                  sx={{ mb: 3 }}
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  name="prixunitaire"
                  label="Prix unitaire"
                  variant="outlined"
                  value={prixunitaire}
                  onChange={(event) => setPrixunitaire(event.target.value)}
                  sx={{ mb: 3 }}
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  name="prixstock"
                  label="Prix en stock"
                  variant="outlined"
                  value={prixstock}
                  onChange={(event) => setPrixstock(event.target.value)}
                  sx={{ mb: 3 }}
                />
              </Grid>
              <Grid item xs={2}>
                <Select
                  fullWidth
                  autoFocus
                  labelId="select-label"
                  value={depot}
                  margin="dense"
                  size="small"
                  onChange={(event) => setDepot(event.target.value)}
                >
                  <MenuItem value="1">Choisir un depot</MenuItem>
                  {data.depot.map((row) => (
                    <MenuItem value={row.iddepot}>{row.depot}</MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={2}>
                <Button variant="outlined" color="secondary" sx={{ mb: 3 }} onClick={handledetails}>
                  Inserer
                </Button>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  variant="outlined"
                  placeholder="Description"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  sx={{ mb: 3 }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  variant="outlined"
                  placeholder="Remarques"
                  value={commentaire}
                  onChange={(event) => setCommentaire(event.target.value)}
                  sx={{ mb: 3 }}
                />
              </Grid>
            </Grid>
            <p></p>
            <CustomizedTable columns={columnsdetails} data={formData} />
          </DialogContent>

          <DialogActions>
            <Button onClick={handlecancelOpen} color="inherit" variant="contained">
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
        <Dialog open={alertOpen} onClose={handlecancelClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">
            Voulez-vous vraiment tout reinitialiser ?
          </DialogTitle>

          <DialogActions>
            <Button variant="outlined" color="secondary" onClick={handlecancelClose}>
              Annuler
            </Button>
            <Button onClick={resetData} color="primary">
              Valider
            </Button>
          </DialogActions>
        </Dialog>
      </Box>

      <Box>
        <Dialog open={fileOpen} onClose={handleFileClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Importer des donnees</DialogTitle>
          <DialogContent>
            <TextField
              variant="outlined"
              fullWidth
              label="Nom du fichier"
              value={file}
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <Button variant="contained" component="label">
                    Importer
                    <input type="file" hidden onChange={(event) => setFile(event.target.value)} />
                  </Button>
                )
              }}
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

      {/* Liste des donnees */}
      <Listestockphysique />
    </Container>
  );
};

export default Stockphysique;

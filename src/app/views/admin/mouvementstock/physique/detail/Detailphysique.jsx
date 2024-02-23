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
  Alert,
  Snackbar,
  Grid
} from '@mui/material';
import { Breadcrumb } from 'app/components';
import { useState, useEffect } from 'react';
import CustomizedTable from 'app/views/material-kit/tables/CustomizedTable';
import ListeDetailphysique from '../ListeDetailphysique';
import { Container } from 'app/views/style/style';
import { baseUrl } from 'app/utils/constant';
import { useParams } from 'react-router-dom';

const Detailphysique = () => {
  // Input
  const idmouvementstock = useParams();
  console.log(idmouvementstock.idmouvementstock);

  const [article, setArticle] = useState(['1']);
  const [quantite, setQuantite] = useState(0);
  const [prixunitaire, setPrixunitaire] = useState(0);
  const [depot, setDepot] = useState(['1']);
  const [prixstock, setPrixstock] = useState(0);
  const [description, setDescription] = useState('');
  const [commentaire, setCommentaire] = useState('');
  const [file, setFile] = useState('');
  const [fileOpen, setFileOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [data, setData] = useState({
    depot: [],
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
  const handleFileClose = () => setFileOpen(false);
  const handlecancelOpen = () => setAlertOpen(true);
  const handlecancelClose = () => setAlertOpen(false);
  const handleClose = () => setOpen(false);

  // Validation form
  const handledetails = () => {
    const newData = {
      idmouvement: idmouvementstock.idmouvementstock,
      idarticle: article,
      quantite: quantite,
      pu: prixunitaire,
      prixstock: prixstock,
      total: quantite * prixunitaire,
      iddepot: depot,
      restestock: 0,
      statut: 0,
      description: description,
      commentaire: commentaire
    };
    setFormData([...formData, newData]);
  };

  const handleSubmit = () => {
    let url = baseUrl + '/mouvementstock/createdetailphysique';
    if (formData.length !== 0) {
      fetch(url, {
        crossDomain: true,
        method: 'POST',
        body: JSON.stringify(formData),
        headers: { 'Content-Type': 'application/json' }
      })
        .then((response) => response.json())
        .then((response) => {
          setTimeout(() => {
            window.location.reload();
          }, 2000);

          setMessage({
            text: 'Information enregistree',
            severity: 'success',
            open: true
          });
        })
        .catch((err) => {
          setMessage({
            text: "L'insertion a echouee,veuillez verifier si tous les champs sont remplis!",
            severity: 'error',
            open: true
          });
        });
    }
    setMessage({
      text: "Aucune donnee n'a ete ajoutee!",
      severity: 'error',
      open: true
    });
  };

  // Reset data to null
  const resetData = () => {
    setArticle(['1']);
    setQuantite(0);
    setPrixstock(0);
    setPrixunitaire(0);
    setDescription('');
    setCommentaire('');
    setDepot(['1']);
    setFormData([]);
    handlecancelClose();
  };

  const columnsdetails = [
    { label: 'article', field: 'idarticle', align: 'center' },
    { label: 'quantite', field: 'quantite', align: 'center' },
    { label: 'prix unitaire', field: 'pu', align: 'center' },
    { label: 'prix stock', field: 'prixstock', align: 'center' },
    { label: 'depot', field: 'iddepot', align: 'center' },
    { label: 'total', field: 'total', align: 'center' }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = baseUrl + '/mouvementstock/contentstockphysique';
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
          mouvementphysiques: responseData.mouvementphysiques || [],
          naturemouvements: responseData.naturemouvements || [],
          depot: responseData.depots || [],
          articles: responseData.articles || []
        };

        setData(newData);
      } catch (error) {
        console.log("Aucune donnee n'ete recuperee,veuillez verifier si le serveur est actif");
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
      </Box>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Box>
            <Grid container spacing={2}>
              <Grid item>
                <Button variant="contained" onClick={handleClickOpen} color="primary">
                  Nouveau detail
                </Button>
              </Grid>
              {/* <Grid item>
                <Button variant="contained" color="secondary">
                  PDF
                </Button>
              </Grid> */}
            </Grid>
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
              <DialogTitle id="form-dialog-title">Nouveau detail</DialogTitle>
              <DialogContent>
                <Grid container direction="column" spacing={1}>
                  <Grid item xs={4}>
                    <Select
                      fullWidth
                      labelId="select-label"
                      margin="dense"
                      label="Article"
                      value={article}
                      onChange={(event) => setArticle(event.target.value)}
                    >
                      <MenuItem value="1">Choisir un article</MenuItem>
                      {data.articles.map((row, index) => (
                        <MenuItem key={index} value={row.idarticle}>
                          {row.marque}/{row.modele}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                  <Grid item xs={4}>
                    <Select
                      fullWidth
                      labelId="select-label"
                      margin="dense"
                      label="Depot"
                      value={depot}
                      onChange={(event) => setDepot(event.target.value)}
                    >
                      <MenuItem value="1">Choisir un depot</MenuItem>
                      {data.depot.map((row, index) => (
                        <MenuItem key={index} value={row.iddepot}>
                          {row.depot}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      fullWidth
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
                  <Grid item xs={4}>
                    <TextField
                      fullWidth
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
                  <Grid item xs={4}>
                    <TextField
                      fullWidth
                      type="number"
                      InputProps={{ inputProps: { min: 0 } }}
                      name="prixstock"
                      label="Prix stock"
                      variant="outlined"
                      value={prixstock}
                      onChange={(event) => setPrixstock(event.target.value)}
                      sx={{ mb: 3 }}
                    />
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      multiline
                      rows={8}
                      variant="outlined"
                      label="Description"
                      value={description}
                      onChange={(event) => setDescription(event.target.value)}
                      sx={{ mb: 3 }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      multiline
                      rows={8}
                      variant="outlined"
                      label="Commentaire"
                      value={commentaire}
                      onChange={(event) => setCommentaire(event.target.value)}
                      sx={{ mb: 3 }}
                    />
                  </Grid>
                  <Grid item>
                    <Button variant="contained" onClick={handledetails} color="secondary">
                      Inserer la ligne
                    </Button>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={12}>
                    <CustomizedTable columns={columnsdetails} data={formData} />
                  </Grid>
                </Grid>
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
                <Button onClick={resetData} color="primary" variant="contained">
                  Valider
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
        </Grid>
      </Grid>
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

      <Snackbar open={message.open} autoHideDuration={3000} onClose={handleAlertClose}>
        <Alert severity={message.severity} sx={{ width: '100%' }} variant="filled">
          {message.text}
        </Alert>
      </Snackbar>
      {/* Liste des donnees */}
      <ListeDetailphysique />
    </Container>
  );
};

export default Detailphysique;

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
  const [fileOpen, setFileOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);

  // Data
  const [quantite, setQuantite] = useState(0);
  const [prixunitaire, setPrixunitaire] = useState(0);
  const [description, setDescription] = useState('');
  const [article, setArticle] = useState(['1']);
  const [formData, setFormData] = useState([]);
  const [data, setData] = useState({
    articles: []
  });
  const [message, setMessage] = useState({
    text: 'Information enregistree',
    severity: 'success',
    open: false
  });
  const handledetails = () => {
    if (article == 1) {
      setMessage({
        text: 'Les champs suivants sont obligatoires : article',
        severity: 'error',
        open: true
      });
      return; // Arrêter l'exécution de la fonction si un champ est vide
    }
    const newData = {
      iddevis: iddevis.iddevis,
      idarticle: article,
      quantite: quantite,
      pu: prixunitaire,
      total: quantite * prixunitaire,
      description: description
    };
    setFormData([...formData, newData]);
  };
  // Message

  // Validation form
  const handleSubmit = () => {
    let url = baseUrl + '/devis/createdetaildevis';
    if (formData.length != 0) {
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
    setPrixunitaire(0);
    setDescription('');
    setFormData([]);
    handlecancelClose();
  };

  const columnsdetails = [
    { label: 'article', field: 'idarticle', align: 'center' },
    { label: 'quantite', field: 'quantite', align: 'center' },
    { label: 'prix unitaire', field: 'pu', align: 'center' },
    { label: 'total', field: 'total', align: 'center' }
    // Other columns...
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = baseUrl + '/devis/contentform';
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
          clients: responseData.clients || [],
          articles: responseData.articles || []
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
        <Breadcrumb routeSegments={[{ name: 'Devis', path: 'admin/devis' }, { name: 'Devis' }]} />
      </Box>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Box>
            <Button variant="contained" onClick={handleClickOpen} color="primary">
              Nouveau detail
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
                          {row.modele}/{row.codearticle}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      fullWidth
                      type="number"
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
                      name="prixunitaire"
                      label="Prix unitaire"
                      variant="outlined"
                      value={prixunitaire}
                      onChange={(event) => setPrixunitaire(event.target.value)}
                      sx={{ mb: 3 }}
                    />
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      multiline
                      rows={10}
                      variant="outlined"
                      label="Description"
                      value={description}
                      onChange={(event) => setDescription(event.target.value)}
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
                <Button onClick={resetData} color="primary">
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
      <Listedetaildevis />
    </Container>
  );
};

export default Detaildevis;

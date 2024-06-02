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
  Icon
} from '@mui/material';
import { Breadcrumb } from 'app/components';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { Container } from 'app/views/style/style';
import CustomizedTable from 'app/views/material-kit/tables/CustomizedTable';
import { baseUrl } from 'app/utils/constant';
import { useParams } from 'react-router-dom';
import Listedetailcommande from './Listedetailcommande';
import Datalistarticle from '../../Datagrid/Datalistarticle';

const Detailcommande = () => {
  const idcommande = useParams();
  console.log(idcommande.idcommande);

  // Form dialog
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleAlertClose = () => setMessage({ open: false });
  const handlecancelOpen = () => setAlertOpen(true);
  const handlecancelClose = () => setAlertOpen(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [opendatagrid, setOpendatagrid] = useState(false);
  const handleClickOpendatagrid = () => setOpendatagrid(true);
  const handleCloseOpendatagrid = () => {
    setOpendatagrid(false);
  };

  // Data
  const [quantite, setQuantite] = useState(0);
  const [prixunitaire, setPrixunitaire] = useState(0);
  const [description, setDescription] = useState('');
  const [article, setArticle] = useState('');
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
    if (article === 1) {
      setMessage({
        text: 'Les champs suivants sont obligatoires : article',
        severity: 'error',
        open: true
      });
      return;
    }
    const newData = {
      idcommande: idcommande.idcommande,
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
    let url = baseUrl + '/commande/createdetailcommande';
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
  //Retour page retour
  const redirect = () => {
    window.location.replace('/admin/commande');
  };

  // Reset data to null
  const resetData = () => {
    setArticle('');
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
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = baseUrl + '/commande/detailcontentpage';
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
        console.log("Aucune donnee n 'a ete recuperee,veuillez verifier si le serveur est actif");
      }
    };
    fetchData();
  }, []);
  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: 'Details commande', path: 'admin/detailcommande' },
            { name: 'Details commande' }
          ]}
        />
      </Box>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Grid container direction="row" spacing={2}>
            <Grid item>
              <Button variant="contained" color="inherit" onClick={redirect}>
                <Icon>arrow_backward</Icon>
              </Button>
            </Grid>
            <Grid item>
              <Box>
                <Button variant="contained" onClick={handleClickOpen} color="primary">
                  Nouveau detail
                </Button>
              </Box>
            </Grid>
          </Grid>
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
                  <Grid item container xs={12} spacing={1}>
                    <Grid item xs={11}>
                      <TextField
                        fullWidth
                        type="text"
                        name="article"
                        label="Article"
                        variant="outlined"
                        value={article}
                        onChange={setArticle}
                        InputProps={{ readOnly: true }}
                      />
                    </Grid>
                    <Grid item xs={1}>
                      <Datalistarticle
                        articles={data.articles}
                        state={opendatagrid}
                        handleClose={handleCloseOpendatagrid}
                        setArticle={setArticle}
                      />
                      <Button color="inherit" variant="contained" onClick={handleClickOpendatagrid}>
                        ...
                      </Button>
                    </Grid>
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
                <Button variant="contained" color="error" onClick={handleClose}>
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
                <Button variant="contained" color="error" onClick={handlecancelClose}>
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
      <Snackbar open={message.open} autoHideDuration={3000} onClose={handleAlertClose}>
        <Alert severity={message.severity} sx={{ width: '100%' }} variant="filled">
          {message.text}
        </Alert>
      </Snackbar>
      <Listedetailcommande />
    </Container>
  );
};

export default Detailcommande;

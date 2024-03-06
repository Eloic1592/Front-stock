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
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Listedevis from './Listedevis';
import { Container } from 'app/views/style/style';
import CustomizedTable from 'app/views/material-kit/tables/CustomizedTable';
import { baseUrl } from 'app/utils/constant';
import Datalistclient from '../../Datagrid/Datalistclient';
import Datalistarticle from '../../Datagrid/Datalistarticle';
const Devis = () => {
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
  const [openetugrid, setopenetutugrid] = useState(false);
  const handleClickOpenetugrid = () => setopenetutugrid(true);
  const handleCloseOpenetugrid = () => {
    setopenetutugrid(false);
  };

  // Data
  const [datedevis, setDatedevis] = useState('');
  const [libelle, setLibelle] = useState('');
  const [quantite, setQuantite] = useState(0);
  const [prixunitaire, setPrixunitaire] = useState(0);
  const [description, setDescription] = useState('');
  const [article, setArticle] = useState('');
  const [client, setClient] = useState('');
  const [formData, setFormData] = useState([]);
  const [data, setData] = useState({
    clients: [],
    articles: []
  });

  const handledetails = () => {
    const newData = {
      idarticle: article,
      quantite: quantite,
      pu: prixunitaire,
      total: quantite * prixunitaire,
      description: description
    };
    setFormData([...formData, newData]);
  };

  // Message
  const [message, setMessage] = useState({
    text: 'Information enregistree',
    severity: 'success',
    open: false
  });

  // Validation form
  const handleSubmit = () => {
    if (!datedevis || !client || !libelle) {
      setMessage({
        text: 'Les champs suivants sont obligatoires : datedevis, client, libelle',
        severity: 'error',
        open: true
      });
      return;
    }

    let params = {
      idclient: client,
      datedevis: datedevis,
      statut: 0,
      libelle: libelle,
      detaildevis: formData
    };

    let url = baseUrl + '/devis/createdevis';
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
    setClient(['1']);
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
        setMessage({
          text: "Aucune donnee n 'a ete recuperee,veuillez verifier si le serveur est actif",
          severity: 'error',
          open: true
        });
      }
    };
    fetchData();
  }, []);
  // const handleClientChange = (event, newValue) => {
  //   if (newValue) {
  //     setClient(newValue.idClient);
  //   } else {
  //     setClient(null);
  //   }
  // };

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: 'Devis', path: 'admin/devis' }, { name: 'Devis' }]} />
      </Box>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Box>
            <Button variant="contained" onClick={handleClickOpen} color="primary">
              Nouveau devis
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
              maxWidth="xl"
            >
              <DialogTitle id="form-dialog-title">Nouveau devis</DialogTitle>
              <DialogContent>
                {' '}
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    {' '}
                    <TextField
                      fullWidth
                      id="datedevis"
                      type="date"
                      name="datedevis"
                      value={datedevis}
                      onChange={(event) => setDatedevis(event.target.value)}
                    />
                  </Grid>
                  <Grid item container spacing={1} xs={4}>
                    <Grid item xs={10}>
                      <TextField
                        fullWidth
                        type="text"
                        name="idclient"
                        label="Client"
                        variant="outlined"
                        value={client}
                        onChange={setClient}
                        InputProps={{ readOnly: true }}
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <Datalistclient
                        Client={data.clients}
                        state={openetugrid}
                        handleClose={handleCloseOpenetugrid}
                        setClient={setClient}
                      />
                      <Button color="inherit" variant="contained" onClick={handleClickOpenetugrid}>
                        ...
                      </Button>
                    </Grid>
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      fullWidth
                      id="datedevis"
                      type="text"
                      name="libelle"
                      label="Libelle"
                      value={libelle}
                      onChange={(event) => setLibelle(event.target.value)}
                    />
                  </Grid>
                </Grid>
                <h3>Details du devis</h3>
                <Grid container spacing={1}>
                  <Grid item container xs={3} spacing={1}>
                    <Grid item xs={9}>
                      <TextField
                        fullWidth
                        size="small"
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
                  <Grid item xs={3}>
                    <TextField
                      fullWidth
                      size="small"
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
                  <Grid item xs={3}>
                    <TextField
                      fullWidth
                      size="small"
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

                  <Grid item xs={3}>
                    <Button
                      fullWidth
                      variant="outlined"
                      color="secondary"
                      sx={{ mb: 3 }}
                      onClick={handledetails}
                    >
                      Inserer
                    </Button>
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

      <Listedevis />
    </Container>
  );
};

export default Devis;

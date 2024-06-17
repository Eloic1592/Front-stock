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
  // Icon
} from '@mui/material';
import { Breadcrumb } from 'app/components';
import { useState, useEffect } from 'react';
import ListeDetailphysique from './ListeDetailphysique';
import { Container } from 'app/views/style/style';
import { baseUrl } from 'app/utils/constant';
import Datalistarticle from '../../Datagrid/Datalistarticle';
import InputAdornment from '@mui/material/InputAdornment';
import * as XLSX from 'xlsx';

const Stockphysique = () => {
  // Input
  const [datedepot, setDatedepot] = useState('');
  const [typemouvement, setTypemouvement] = useState(['0']);
  const [naturemouvement, setNaturemouvement] = useState(['1']);
  const [article, setArticle] = useState('');
  const [quantite, setQuantite] = useState(0);
  const [prixunitaire, setPrixunitaire] = useState(0);
  const [depot, setDepot] = useState(['1']);
  const [description, setDescription] = useState('');
  const [commentaire, setCommentaire] = useState('');
  const [csvFile, setCsvFile] = useState(null);
  const [fileOpen, setFileOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [data, setData] = useState({
    mouvementStocks: [],
    mouvementphysiques: [],
    naturemouvements: [],
    depot: [],
    listearticles: []
  });

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
  const handleClose = () => setOpen(false);
  const handlecancelOpen = () => setAlertOpen(true);
  const handlecancelClose = () => setAlertOpen(false);
  const [opendatagrid, setOpendatagrid] = useState(false);
  const handleClickOpendatagrid = () => setOpendatagrid(true);
  const handleCloseOpendatagrid = () => {
    setOpendatagrid(false);
  };
  const handleFileClickOpen = () => setFileOpen(true);
  const handleFileClose = () => setFileOpen(false);

  // Importation csv
  const handleChange = (event) => {
    setCsvFile(event.target.files[0]);
  };

  const importData = () => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });

      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      const formattedData = jsonData.map((row) => ({
        numserie: row[3],
        marque: row[4],
        signature: row[5],
        prixvente: 0,
        caution: 0,
        disponibilite: 1,
        statut: 0
      }));

      const url = baseUrl + '/mouvementstock/importmouvementphysique';
      fetch(url, {
        method: 'POST',
        body: JSON.stringify(formattedData),
        headers: { 'Content-Type': 'application/json' }
      })
        .then((response) => response.json())
        .then((response) => {
          setTimeout(() => {
            window.location.reload();
          }, 2000);

          setMessage({
            text: 'Information importee',
            severity: 'success',
            open: true
          });
        })
        .catch((err) => {
          setMessage({
            text: 'Veuillez verifier que votre serveur est actif',
            severity: 'error',
            open: true
          });
        });
    };
    reader.readAsArrayBuffer(csvFile);
  };

  const handleSubmit = () => {
    let params = {
      idarticle: article,
      datedepot: datedepot,
      typemouvement: typemouvement,
      idnaturemouvement: naturemouvement,
      pu: prixunitaire,
      quantite: typemouvement * quantite,
      iddepot: depot,
      description: description,
      commentaire: commentaire,
      total: quantite * prixunitaire,
      statut: 0
    };

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
  };

  // Reset data to null
  const resetData = () => {
    setArticle('');
    setDatedepot('');
    setQuantite(0);
    setPrixunitaire(0);
    setTypemouvement(['0']);
    setNaturemouvement(['1']);
    setDescription('');
    setCommentaire('');
    setDepot(['1']);
    handlecancelClose();
  };

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
          listearticles: responseData.listearticles || []
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
                  Nouveau mouvement
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" onClick={handleFileClickOpen} color="success">
                  Import csv
                </Button>
              </Grid>
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
              <DialogTitle id="form-dialog-title">Nouveau mouvement de stock</DialogTitle>
              <DialogContent>
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <Select
                      fullWidth
                      labelId="select-label"
                      value={naturemouvement}
                      onChange={(event) => setNaturemouvement(event.target.value)}
                    >
                      <MenuItem value="1">Choisir un mouvement</MenuItem>
                      {data.naturemouvements.map((row) => (
                        <MenuItem value={row.idnaturemouvement} key={row.idnaturemouvement}>
                          {row.naturemouvement}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      id="datedepot"
                      type="date"
                      name="datedepot"
                      value={datedepot}
                      onChange={(event) => setDatedepot(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Select
                      fullWidth
                      labelId="select-label"
                      value={typemouvement}
                      onChange={(event) => setTypemouvement(event.target.value)}
                    >
                      <MenuItem value="0">Choisir la nature du mouvement</MenuItem>
                      <MenuItem value="1" key="1">
                        Entree
                      </MenuItem>
                      <MenuItem value="-1" key="-1">
                        Sortie
                      </MenuItem>
                    </Select>
                  </Grid>
                  <Grid item xs={6}>
                    <Select
                      fullWidth
                      autoFocus
                      labelId="select-label"
                      value={depot}
                      margin="dense"
                      onChange={(event) => setDepot(event.target.value)}
                    >
                      <MenuItem value="1">Choisir un depot</MenuItem>
                      {data.depot.map((row) => (
                        <MenuItem value={row.iddepot} key={row.iddepot}>
                          {row.depot} - {row.codedep}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      type="text"
                      name="article"
                      label="Article"
                      variant="outlined"
                      value={article}
                      onChange={setArticle}
                      InputProps={{
                        readOnly: true,
                        endAdornment: (
                          <InputAdornment position="end">
                            <Button
                              color="inherit"
                              variant="contained"
                              onClick={handleClickOpendatagrid}
                            >
                              ...
                            </Button>
                          </InputAdornment>
                        )
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Datalistarticle
                      articles={data.listearticles}
                      state={opendatagrid}
                      handleClose={handleCloseOpendatagrid}
                      setArticle={setArticle}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      type="number"
                      InputProps={{ inputProps: { min: 0 } }}
                      name="quantite"
                      label="Quantite"
                      variant="outlined"
                      value={quantite}
                      onChange={(event) => setQuantite(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      type="number"
                      InputProps={{ inputProps: { min: 0 } }}
                      name="prixunitaire"
                      label="Prix unitaire"
                      variant="outlined"
                      value={prixunitaire}
                      onChange={(event) => setPrixunitaire(event.target.value)}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      multiline
                      rows={6}
                      variant="outlined"
                      placeholder="Description"
                      value={description}
                      onChange={(event) => setDescription(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      multiline
                      rows={6}
                      variant="outlined"
                      placeholder="Remarques"
                      value={commentaire}
                      onChange={(event) => setCommentaire(event.target.value)}
                    />
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
                <Button onClick={handleSubmit} color="primary" variant="contained">
                  Enregistrer
                </Button>
              </DialogActions>
            </Dialog>
          </Box>

          <Box>
            <Dialog
              fullWidth
              maxWidth="md"
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
      <Box>
        <Dialog open={fileOpen} onClose={handleFileClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Importer des donnees</DialogTitle>
          <DialogContent>
            <TextField
              type="file"
              variant="outlined"
              fullWidth
              label="Nom du fichier"
              onChange={handleChange}
              InputProps={{
                readOnly: true
              }}
            />
          </DialogContent>

          <DialogActions>
            <Button variant="contained" color="secondary" onClick={handleFileClose}>
              Annuler
            </Button>
            <Button onClick={importData} color="primary" variant="contained">
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

export default Stockphysique;

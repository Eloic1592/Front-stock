import {
  Box,
  TextField,
  DialogContent,
  DialogActions,
  DialogTitle,
  Dialog,
  Select,
  MenuItem,
  Alert,
  Snackbar
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { Breadcrumb } from 'app/components';
import { useState, useEffect } from 'react';
import CustomizedTable from 'app/views/material-kit/tables/CustomizedTable';
import Button from '@mui/material/Button';
import Listemouvementfictif from './Listemouvementfictif';
import { Container } from 'app/views/style/style';
import { baseUrl } from 'app/utils/constant';
import Datalistmateriel from '../../Datagrid/Datalistmateriel';
import Datalistetudiant from '../../Datagrid/Datalistetudiant';
import InputAdornment from '@mui/material/InputAdornment';

const Stockfictif = () => {
  // Input
  const [datedepot, setDatedepot] = useState(null);
  const [naturemouvement, setNaturemouvement] = useState(['1']);
  const [typemouvement, setTypemouvement] = useState(['0']);
  const [caution, setCaution] = useState(0);
  const [datedeb, setDatedeb] = useState('');
  const [datefin, setDatefin] = useState('');
  const [depot, setDepot] = useState(['1']);
  const [idetudiant, setIdetudiant] = useState('');
  const [idmateriel, setIdmateriel] = useState('');
  const [description, setDescription] = useState('');
  const [commentaire, setCommentaire] = useState('');
  const [alertOpen, setAlertOpen] = useState(false);
  const [formData, setFormData] = useState([]);
  const [data, setData] = useState({
    naturemouvements: [],
    depot: [],
    listemateriels: [],
    etudiants: []
  });

  const [file, setFile] = useState('');
  const [fileOpen, setFileOpen] = useState(false);

  const handleFileClose = () => setFileOpen(false);
  const handlecancelOpen = () => setAlertOpen(true);
  const handlecancelClose = () => setAlertOpen(false);
  const handleAlertClose = () => setMessage({ open: false });

  // Message
  const [message, setMessage] = useState({
    text: 'Information enregistree',
    severity: 'success',
    open: false
  });

  // Form dialog
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
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

  // Close form
  const handleClose = () => setOpen(false);

  // Validation form
  const handledetails = () => {
    const newData = {
      datedeb: datedeb,
      datefin: datefin,
      caution: caution,
      idmateriel: idmateriel,
      iddepot: depot,
      description: description,
      commentaire: commentaire,
      statut: 0
    };
    setFormData([...formData, newData]);
  };

  const handleSubmit = () => {
    let params = {
      datedepot: datedepot,
      typemouvement: typemouvement,
      idnaturemouvement: naturemouvement,
      idetudiant: idetudiant,
      statut: 0,
      mouvementfictifs: formData
    };
    console.log(params.mouvementfictifs.length);

    let url = baseUrl + '/mouvementstock/createstockfictif';
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
    setIdmateriel('');
    setIdetudiant('');
    setDepot(['1']);
    setDatedepot(0);
    setDatedeb('');
    setDatefin('');
    setCaution(0);
    setTypemouvement(['0']);
    setNaturemouvement('1');
    setDescription('');
    setCommentaire('');
    setFormData([]);
    handlecancelClose();
  };

  const columnsdetails = [
    { label: 'materiel', field: 'idmateriel', align: 'center' },
    { label: 'date debut', field: 'datedeb', align: 'center' },
    { label: 'date fin', field: 'datefin', align: 'center' },
    { label: 'caution', field: 'caution', align: 'center' },
    { label: 'depot', field: 'iddepot', align: 'center' }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = baseUrl + '/mouvementstock/contentformfictif';
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
          naturemouvements: responseData.naturemouvements || [],
          depot: responseData.depots || [],
          listemateriels: responseData.listemateriels || [],
          etudiants: responseData.etudiants || []
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
            { name: 'Mouvement de stock', path: 'admin/stock/mouvementfictif' },
            { name: 'mouvement de stock fictif' }
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
              maxWidth="xl"
            >
              <DialogTitle id="form-dialog-title">Nouveau mouvement de stock</DialogTitle>
              <DialogContent>
                <Grid container direction="row" spacing={3}>
                  <Grid item xs={6}>
                    <Select
                      fullWidth
                      labelId="select-label"
                      value={naturemouvement}
                      onChange={(event) => setNaturemouvement(event.target.value)}
                    >
                      <MenuItem value="1" key="1">
                        Choisir un mouvement
                      </MenuItem>
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
                      <MenuItem value="0" key="0">
                        Choisir la nature du mouvement
                      </MenuItem>
                      <MenuItem value="1" key="1">
                        Entree
                      </MenuItem>
                      <MenuItem value="-1" key="-1">
                        Sortie
                      </MenuItem>
                    </Select>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      type="text"
                      name="idetudiant"
                      label="Etudiant"
                      variant="outlined"
                      value={idetudiant}
                      onChange={setIdetudiant}
                      InputProps={{
                        readOnly: true,
                        endAdornment: (
                          <InputAdornment position="end">
                            <Button
                              color="inherit"
                              variant="contained"
                              onClick={handleClickOpenetugrid}
                            >
                              ...
                            </Button>
                          </InputAdornment>
                        )
                      }}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <Datalistetudiant
                      Etudiant={data.etudiants}
                      state={openetugrid}
                      handleClose={handleCloseOpenetugrid}
                      setetudiant={setIdetudiant}
                    />
                  </Grid>
                </Grid>
                <h3>Details du mouvement fictif</h3>
                <Grid container spacing={3}>
                  <Grid item container spacing={1} xs={3}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        size="small"
                        type="text"
                        name="idmateriel"
                        label="Materiel"
                        variant="outlined"
                        value={idmateriel}
                        onChange={setIdmateriel}
                        InputProps={{
                          readOnly: true,
                          endAdornment: (
                            <InputAdornment position="end">
                              <Button
                                style={{ width: '30px', height: '20px' }}
                                size="small"
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
                    <Grid item xs={2}>
                      <Datalistmateriel
                        Materiels={data.listemateriels}
                        state={opendatagrid}
                        handleClose={handleCloseOpendatagrid}
                        setmateriel={setIdmateriel}
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      fullWidth
                      size="small"
                      type="date"
                      name="datedebut"
                      label="Date debut"
                      focused
                      variant="outlined"
                      value={datedeb}
                      onChange={(event) => setDatedeb(event.target.value)}
                      sx={{ mb: 3 }}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      fullWidth
                      size="small"
                      type="date"
                      name="datefin"
                      label="Date fin"
                      focused
                      variant="outlined"
                      value={datefin}
                      onChange={(event) => setDatefin(event.target.value)}
                      sx={{ mb: 3 }}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      fullWidth
                      size="small"
                      type="number"
                      InputProps={{ inputProps: { min: 0 } }}
                      name="caution"
                      label="Caution"
                      variant="outlined"
                      value={caution}
                      onChange={(event) => setCaution(event.target.value)}
                      sx={{ mb: 3 }}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Select
                      fullWidth
                      size="small"
                      autoFocus
                      labelId="select-label"
                      value={depot}
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

                  <Grid item xs={3}>
                    <Button
                      variant="contained"
                      color="secondary"
                      sx={{ mb: 3 }}
                      onClick={handledetails}
                    >
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
                <Button onClick={handleSubmit} color="primary" variant="contained">
                  Enregistrer
                </Button>
              </DialogActions>
            </Dialog>
          </Box>

          {/* Form validation */}
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
      <Listemouvementfictif />
    </Container>
  );
};

export default Stockfictif;

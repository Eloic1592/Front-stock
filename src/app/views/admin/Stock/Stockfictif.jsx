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
import Listestockfictif from './Listestockfictif';
import { Container } from 'app/views/style/style';
import { baseUrl } from 'app/utils/constant';

const Stockfictif = () => {
  // Input
  const [datedepot, setDatedepot] = useState('');
  const [typemouvement, setTypemouvement] = useState(['0']);
  const [caution, setCaution] = useState(0);
  const [datedeb, setDatedeb] = useState('');
  const [datefin, setDatefin] = useState('');
  const [depot, setDepot] = useState(['1']);
  const [idetudiant, setIdetudiant] = useState(['1']);
  const [idmateriel, setIdmateriel] = useState(['1']);
  const [description, setDescription] = useState('');
  const [commentaire, setCommentaire] = useState('');
  const [alertOpen, setAlertOpen] = useState(false);
  const [naturemouvement, setNaturemouvement] = useState(['1']);
  const [formData, setFormData] = useState([]);
  const [data, setData] = useState({
    mouvementStocks: [],
    mouvementphysiques: [],
    mouvementfictifs: [],
    naturemouvements: [],
    depot: [],
    listemateriels: [],
    etudiants: []
  });

  const [file, setFile] = useState('');
  const [fileOpen, setFileOpen] = useState(false);

  const handleFileOpen = () => setFileOpen(true);
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

  // Close form
  const handleClose = () => setOpen(false);

  // Validation form
  const handledetails = () => {
    const newData = {
      datedeb: datedeb,
      datefin: datefin,
      idetudiant: idetudiant,
      caution: caution,
      idmateriel: idmateriel,
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
    setIdmateriel(['1']);
    setIdetudiant(['1']);
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
    { label: 'ID Etudiant', field: 'idetudiant', align: 'center' },
    { label: 'caution', field: 'caution', align: 'center' },
    { label: 'depot', field: 'iddepot', align: 'center' }

    // Other columns...
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = baseUrl + '/mouvementstock/contentstockfictif';
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
          mouvementfictifs: responseData.mouvementfictifs || [],
          naturemouvements: responseData.naturemouvements || [],
          depot: responseData.depots || [],
          listemateriels: responseData.listemateriels || [],
          etudiants: responseData.etudiants || []
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
              <Grid item>
                <Button variant="contained" color="inherit">
                  Exporter les mouvements
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" onClick={handleFileOpen} color="secondary">
                  Importer des données
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
                <h3>Details du mouvement fictif</h3>
                <Grid container spacing={3}>
                  <Grid item xs={3}>
                    <Select
                      fullWidth
                      size="small"
                      labelId="select-label"
                      value={idmateriel}
                      margin="dense"
                      onChange={(event) => setIdmateriel(event.target.value)}
                    >
                      <MenuItem value="1">Choisir un materiel</MenuItem>
                      {data.listemateriels.map((row) => (
                        <MenuItem value={row.idmateriel}>
                          {row.marque}/{row.modele}-{row.numserie}
                        </MenuItem>
                      ))}
                    </Select>
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
                        <MenuItem value={row.iddepot}>{row.depot}</MenuItem>
                      ))}
                    </Select>
                  </Grid>
                  <Grid item xs={3}>
                    <Select
                      fullWidth
                      autoFocus
                      labelId="select-label"
                      value={idetudiant}
                      margin="dense"
                      size="small"
                      onChange={(event) => setIdetudiant(event.target.value)}
                    >
                      <MenuItem value="1">Choisir un etudiant</MenuItem>
                      {data.etudiants.map((row) => (
                        <MenuItem value={row.idetudiant}>{row.idetudiant}</MenuItem>
                      ))}
                    </Select>
                  </Grid>

                  <Grid item xs={3}>
                    <Button
                      variant="outlined"
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
                <Button variant="contained" color="secondary" onClick={handleClose}>
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
              \
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
      <Listestockfictif />
    </Container>
  );
};

export default Stockfictif;

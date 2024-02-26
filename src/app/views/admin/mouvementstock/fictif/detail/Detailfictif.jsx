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
  Grid,
  Icon
} from '@mui/material';
import { Breadcrumb } from 'app/components';
import { useState, useEffect } from 'react';
import CustomizedTable from 'app/views/material-kit/tables/CustomizedTable';
import ListeDetailfictif from './ListeDetailfictif';
import { Container } from 'app/views/style/style';
import { baseUrl } from 'app/utils/constant';
import { useParams } from 'react-router-dom';

const Detailfictif = () => {
  // Input
  const idmouvementstock = useParams();
  console.log(idmouvementstock.idmouvementstock);

  const [caution, setCaution] = useState(0);
  const [datedeb, setDatedeb] = useState('');
  const [datefin, setDatefin] = useState('');
  const [depot, setDepot] = useState('1');
  const [idmateriel, setIdmateriel] = useState(['1']);
  const [description, setDescription] = useState('');
  const [commentaire, setCommentaire] = useState('');
  const [file, setFile] = useState('');
  const [fileOpen, setFileOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [data, setData] = useState({
    depot: [],
    etudiants: [],
    materiels: []
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
      idmateriel: idmateriel,
      caution: caution,
      datedeb: datedeb,
      datefin: datefin,
      iddepot: depot,
      description: description,
      commentaire: commentaire,
      statut: 0
    };
    setFormData([...formData, newData]);
  };

  const handleSubmit = () => {
    let url = baseUrl + '/mouvementstock/createdetailfictif';
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
      text: "L'insertion a echouee,veuillez verifier si tous les champs sont remplis!",
      severity: 'error',
      open: true
    });
  };

  // Reset data to null
  const resetData = () => {
    setIdmateriel(['1']);
    setDatedeb('');
    setDatefin('');
    setDescription('');
    setCommentaire('');
    setCaution(0);
    setDepot(['1']);
    setFormData([]);
    handlecancelClose();
  };

  const columnsdetails = [
    { label: 'materiel', field: 'idmateriel', align: 'center' },
    { label: 'caution', field: 'caution', align: 'center' },
    { label: 'date debut', field: 'datedeb', align: 'center' },
    { label: 'date fin', field: 'datefin', align: 'center' },
    { label: 'depot', field: 'iddepot', align: 'center' }
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
          depot: responseData.depots || [],
          etudiants: responseData.etudiants || [],
          materiels: responseData.listemateriels || []
        };

        setData(newData);
      } catch (error) {
        setMessage({
          text: "Aucune donnee n'ete recuperee,veuillez verifier si le serveur est actif",
          severity: 'error',
          open: true
        });
      }
    };
    fetchData();
  }, []);

  //Retour page retour
  const redirect = () => {
    window.location.replace('/admin/mouvementfictif');
  };

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
                <Button variant="contained" color="inherit" onClick={redirect}>
                  <Icon>arrow_backward</Icon>
                </Button>
              </Grid>
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
                      label="Materiel"
                      value={idmateriel}
                      onChange={(event) => setIdmateriel(event.target.value)}
                    >
                      <MenuItem value="1">Choisir un materiel</MenuItem>
                      {data.materiels.map((row, index) => (
                        <MenuItem key={index} value={row.idmateriel}>
                          {row.marque}/{row.modele}-{row.numserie}
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
                      type="date"
                      name="datedeb"
                      variant="outlined"
                      label="Date debut"
                      focused
                      value={datedeb}
                      onChange={(event) => setDatedeb(event.target.value)}
                      sx={{ mb: 3 }}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      fullWidth
                      type="date"
                      name="datefin"
                      label="Date fin"
                      variant="outlined"
                      focused
                      value={datefin}
                      onChange={(event) => setDatefin(event.target.value)}
                      sx={{ mb: 3 }}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      fullWidth
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
      <ListeDetailfictif />
    </Container>
  );
};

export default Detailfictif;

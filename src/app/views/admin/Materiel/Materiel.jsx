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
import * as XLSX from 'xlsx';
const Materiel = () => {
  // Form dialog
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleAlertClose = () => setMessage({ open: false });

  const [marque, setMarque] = useState('');
  const [modele, setModele] = useState('');
  const [typemateriel, setTypemateriel] = useState(['1']);

  const [numserie, setNumserie] = useState('');
  const [description, setDescription] = useState('');
  const [prixvente, setPrixvente] = useState(0);
  const [caution, setCaution] = useState(0);
  const [disponibilite, setDisponibilite] = useState('2');
  const [signature, setSignature] = useState('1');
  const [csvFile, setCsvFile] = useState(null);
  const [filetypemateriel, setFiletypemateriel] = useState(['1']);
  const [fileOpen, setFileOpen] = useState(false);
  const handleFileClickOpen = () => setFileOpen(true);
  const handleFileClose = () => setFileOpen(false);

  // Message
  const [message, setMessage] = useState({
    text: 'Information enregistree',
    severity: 'success',
    open: false
  });

  const [data, setData] = useState({
    materiels: [],
    typemateriels: []
  });

  // Validation form
  const handleSubmit = () => {
    if (
      !marque ||
      !caution ||
      typemateriel === 1 ||
      disponibilite === 1 ||
      !numserie ||
      !prixvente ||
      !caution
    ) {
      setMessage({
        text: 'Les champs suivants sont obligatoires : typemateriel,marque, modele, article, numserie, prixvente, caution, couleur,disponibilite',
        severity: 'error',
        open: true
      });
      return;
    }

    let params = {
      marque: marque,
      modele: modele,
      idtypemateriel: typemateriel,
      numserie: numserie,
      prixvente: prixvente,
      caution: caution,
      description: description,
      statut: disponibilite,
      signature: signature
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

  // Importation csv
  const handleChange = (event) => {
    setCsvFile(event.target.files[0]);
  };

  const importData = () => {
    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        const formattedData = jsonData.map((row) => ({
          numserie: row['NUM DE SERIE'],
          marque: row['MARQUE'],
          signature: row['signature'] === 'Perso' ? row['signature'] : 'ITU',
          idtypemateriel: filetypemateriel,
          prixvente: 0,
          caution: 0,
          disponibilite: 1,
          statut: 0
        }));

        const url = baseUrl + '/materiel/importmateriel';
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
    } catch {
      setMessage({
        text: 'Veuillez selectionner un fichier a importer et un type de materiel',
        severity: 'error',
        open: true
      });
    }
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
          typemateriels: responseData.typemateriels || []
        };

        setData(newData);
      } catch {
        setMessage({
          text: "Aucune donnee n 'a ete recuperee,veuillez verifier si le serveur est actif",
          severity: 'error',
          open: true
        });
      }
    };
    fetchData();
  }, []);

  const getstock = () => {
    window.location.replace('/admin/stockmateriel');
  };

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[{ name: 'Materiel', path: 'admin/listemateriel' }, { name: 'Materiel' }]}
        />
      </Box>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Grid container direction="row" spacing={2}>
            <Grid item>
              <Button variant="contained" onClick={handleClickOpen} color="primary">
                Nouveau materiel
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={getstock} color="secondary">
                Stock materiel
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={handleFileClickOpen} color="success">
                Import csv{' '}
              </Button>
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
              maxWidth="xl"
            >
              <DialogTitle id="form-dialog-title">Nouveau Materiel</DialogTitle>
              <DialogContent>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      autoFocus
                      id="marque"
                      type="text"
                      margin="dense"
                      label="Marque"
                      name="marque"
                      value={marque}
                      onChange={(event) => setMarque(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      autoFocus
                      id="modele"
                      type="text"
                      margin="dense"
                      label="Modele"
                      name="modele"
                      value={modele}
                      onChange={(event) => setModele(event.target.value)}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
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
                          {row.typemateriel}-{row.val}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
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
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      autoFocus
                      id="prixvente"
                      type="number"
                      InputProps={{ inputProps: { min: 0 } }}
                      margin="dense"
                      label="Prix de vente"
                      name="prixvente"
                      value={prixvente}
                      onChange={(event) => setPrixvente(event.target.value)}
                    />
                  </Grid>
                </Grid>

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
                  id="caution"
                  type="number"
                  InputProps={{ inputProps: { min: 0 } }}
                  margin="dense"
                  label="Caution"
                  name="caution"
                  value={caution}
                  onChange={(event) => setCaution(event.target.value)}
                />
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Select
                      labelId="select-label"
                      sx={{ mb: 3 }}
                      value={disponibilite}
                      onChange={(event) => setDisponibilite(event.target.value)}
                      fullWidth
                    >
                      <MenuItem value="2" disabled>
                        Choisir la disponibilite
                      </MenuItem>
                      <MenuItem value="0">Libre</MenuItem>
                      <MenuItem value="1">Occupe</MenuItem>
                    </Select>
                  </Grid>
                  <Grid item xs={6}>
                    <Select
                      labelId="select-label"
                      sx={{ mb: 3 }}
                      value={signature}
                      onChange={(event) => setSignature(event.target.value)}
                      fullWidth
                    >
                      <MenuItem value="1" disabled>
                        Choisir une signature
                      </MenuItem>
                      <MenuItem value="Perso">Perso</MenuItem>
                      <MenuItem value="ITU">ITU</MenuItem>
                    </Select>
                  </Grid>
                </Grid>
              </DialogContent>

              <DialogActions>
                <Button variant="contained" color="error" onClick={handleClose}>
                  Annuler
                </Button>
                <Button onClick={handleSubmit} color="primary" variant="contained">
                  Valider
                </Button>
              </DialogActions>
            </Dialog>
          </Box>

          {/* IMPORTATION DES DONNEES */}
          <Box>
            <Dialog
              fullWidth
              maxWidth="md"
              open={fileOpen}
              onClose={handleFileClose}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">Importer des donnees</DialogTitle>
              <DialogContent>
                <Grid container direction="column" spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      type="file"
                      variant="outlined"
                      onChange={handleChange}
                      fullWidth
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <Select
                      fullWidth
                      labelId="select-label"
                      value={filetypemateriel}
                      onChange={(event) => setFiletypemateriel(event.target.value)}
                      sx={{ mb: 3 }}
                      required={true}
                    >
                      <MenuItem value="1" disabled>
                        Choisir le type
                      </MenuItem>
                      {data.typemateriels.map((row) => (
                        <MenuItem key={row.idtypemateriel} value={row.idtypemateriel}>
                          {row.typemateriel}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                </Grid>
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
        </Grid>
      </Grid>
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

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
import { colors } from 'app/utils/utils';

const Materiel = () => {
  // Form dialog
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleAlertClose = () => setMessage({ open: false });

  const [couleur, setCouleur] = useState(['1']);
  const [marque, setMarque] = useState('');
  const [modele, setModele] = useState('');
  const [typemateriel, setTypemateriel] = useState(['1']);

  const [numserie, setNumserie] = useState('');
  const [description, setDescription] = useState('');
  const [prixvente, setPrixvente] = useState();
  const [caution, setCaution] = useState();
  const [signature, setSignature] = useState('1');
  const [file, setFile] = useState('');
  const handleFileClose = () => setFileOpen(false);
  const [fileOpen, setFileOpen] = useState(false);

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
      !modele ||
      !caution ||
      typemateriel === 1 ||
      !numserie ||
      !prixvente ||
      !caution ||
      couleur === 1
    ) {
      setMessage({
        text: 'Les champs suivants sont obligatoires : typemateriel,marque, modele, article, numserie, prixvente, caution, couleur',
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
      couleur: couleur,
      description: description,
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
          text: "Aucune donnee n'ete recuperee,veuillez verifier si le serveur est actif",
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
          routeSegments={[{ name: 'Materiel', path: 'admin/listemateriel' }, { name: 'Materiel' }]}
        />
      </Box>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Button variant="contained" onClick={handleClickOpen} color="primary">
            Nouveau materiel
          </Button>
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
                  <Grid item xs={6}>
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
                          {row.typemateriel}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                  <Grid item xs={6}>
                    <Select
                      fullWidth
                      labelId="select-label"
                      value={couleur}
                      onChange={(event) => setCouleur(event.target.value)}
                      sx={{ mb: 3 }}
                    >
                      <MenuItem value="1">Choisir une couleur</MenuItem>
                      {colors.map((color, index) => (
                        <MenuItem key={index} value={color}>
                          {color}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                </Grid>

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
                  id="prixvente"
                  type="number"
                  margin="dense"
                  label="Prix de vente"
                  name="prixvente"
                  value={prixvente}
                  onChange={(event) => setPrixvente(event.target.value)}
                />
                <TextField
                  fullWidth
                  autoFocus
                  id="caution"
                  type="number"
                  margin="dense"
                  label="Caution"
                  name="caution"
                  value={caution}
                  onChange={(event) => setCaution(event.target.value)}
                />
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
                  <MenuItem value="Aucun appartenance">Aucun appartenance</MenuItem>
                </Select>
              </DialogContent>

              <DialogActions>
                <Button variant="outlined" color="secondary" onClick={handleClose}>
                  Annuler
                </Button>
                <Button onClick={handleSubmit} color="primary" variant="contained">
                  Valider
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
          <Box>
            <Dialog open={fileOpen} onClose={handleFileClose} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Exporter des donnees</DialogTitle>
              <DialogContent>
                <TextField
                  fullWidth
                  size="small"
                  type="text"
                  name="filename"
                  label="Nom du fichier"
                  value={file}
                  onChange={(event) => setFile(event.target.value)}
                />
              </DialogContent>

              <DialogActions>
                <Button variant="outlined" color="secondary" onClick={handleFileClose}>
                  Annuler
                </Button>
                <Button onClick={handleSubmit} color="primary" variant="contained">
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

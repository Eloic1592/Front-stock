import {
  Box,
  TextField,
  DialogContent,
  DialogActions,
  DialogTitle,
  Dialog,
  Select,
  MenuItem
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { Breadcrumb } from 'app/components';
import { useState, useEffect } from 'react';
import CustomizedTable from 'app/views/material-kit/tables/CustomizedTable';
import Button from '@mui/material/Button';
import Listestockfictif from './Listestockfictif';
import { Container } from 'app/views/style/style';
import id from 'date-fns/esm/locale/id/index.js';

const Stockfictif = () => {
  // Input
  const [datedepot, setDatedepot] = useState('');
  const [typemouvement, setTypemouvement] = useState('');
  const [idnaturemouvement, setIdnaturemouvement] = useState('');
  const [caution, setCaution] = useState(0);
  const [datedeb, setDatedeb] = useState('');
  const [datefin, setDatefin] = useState('');
  const [depot, setDepot] = useState(' ');
  const [idetudiant, setIdetudiant] = useState(' ');
  const [idmateriel, setIdmateriel] = useState(' ');
  const [description, setDescription] = useState('');
  const [commentaire, setCommentaire] = useState('');
  const [file, setFile] = useState('');
  const handleFileOpen = () => setFileOpen(true);
  const handleFileClose = () => setFileOpen(false);
  const [fileOpen, setFileOpen] = useState(false);
  const handlecancelOpen = () => setAlertOpen(true);
  const handlecancelClose = () => setAlertOpen(false);
  const [alertOpen, setAlertOpen] = useState(false);

  // Data
  const [listemouvementstock, setListemouvementstock] = useState([]);
  const [naturemouvement, setNaturemouvement] = useState([]);
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

  // Close form
  const handleClose = () => setOpen(false);

  // Validation form
  const handleSubmit = (event) => {
    event.preventDefault();

    const newData = {
      materiel: idmateriel,
      datedeb: datedeb,
      datefin: datefin,
      idetudiant: idetudiant,
      caution: caution,
      depot: depot,
      statut: 0
    };

    setFormData([...formData, newData]);
  };

  // Reset data to null
  const resetData = () => {
    setIdmateriel(' ');
    setIdetudiant(' ');
    setDepot(' ');
    setDatedepot(0);
    setDatedeb('');
    setDatefin('');
    setCaution(0);
    setTypemouvement('');
    setNaturemouvement('1');
    setDescription('');
    setCommentaire('');
    setFormData([]);
    handlecancelClose();
  };

  const columnsdetails = [
    { label: 'materiel', field: 'materiel', align: 'center' },
    { label: 'date debut', field: 'datedeb', align: 'center' },
    { label: 'date fin', field: 'datefin', align: 'center' },
    { label: 'ID Etudiant', field: 'idetudiant', align: 'center' },
    { label: 'caution', field: 'caution', align: 'center' },
    { label: 'depot', field: 'depot', align: 'center' },
    { label: 'statut', field: 'statut', align: 'center' }

    // Other columns...
  ];
  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: 'Mouvement de stock', path: 'admin/stock/mouvementfictif' },
            { name: 'mouvement de stock fictif' }
          ]}
        />
        <p>
          <Button variant="contained" onClick={handleClickOpen} color="primary">
            Nouveau mouvement
          </Button>
          &nbsp;&nbsp;
          <Button variant="contained" color="inherit">
            Exporter les mouvements
          </Button>
          &nbsp;&nbsp;
          <Button variant="contained" onClick={handleFileOpen} color="secondary">
            Importer des données
          </Button>
        </p>
      </Box>
      {/* Form insertion */}
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
                <Select fullWidth labelId="select-label" value={'1'}>
                  <MenuItem value="1">Perte</MenuItem>
                  <MenuItem value="2">Transfert</MenuItem>
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
                <Select fullWidth labelId="select-label" value={'1'}>
                  <MenuItem value="1">Entree</MenuItem>
                  <MenuItem value="2">Sortie</MenuItem>
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
                  label="Materiel"
                  onChange={(event) => setIdmateriel(event.target.value)}
                >
                  <MenuItem value=" ">Choisir un materiel</MenuItem>
                  <MenuItem value="1">Materiel 1</MenuItem>
                  <MenuItem value="2">Materiel 2</MenuItem>
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
                  autoFocus
                  labelId="select-label"
                  value={depot}
                  margin="dense"
                  size="small"
                  onChange={(event) => setDepot(event.target.value)}
                >
                  <MenuItem value=" ">Choisir un depot</MenuItem>
                  <MenuItem value="1">Depot 1</MenuItem>
                  <MenuItem value="2">Depot 2</MenuItem>
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
                  <MenuItem value=" ">Choisir un etudiant</MenuItem>
                  <MenuItem value="1">Etudiant 1</MenuItem>
                  <MenuItem value="2">Etudiant 2</MenuItem>
                </Select>
              </Grid>

              <Grid item xs={3}>
                <Button variant="outlined" color="secondary" sx={{ mb: 3 }} onClick={handleSubmit}>
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

            <CustomizedTable columns={columnsdetails} data={formData} />
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
        <Dialog open={alertOpen} onClose={handlecancelClose} aria-labelledby="form-dialog-title">
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

      {/* Liste des donnees */}
      <Listestockfictif />
    </Container>
  );
};

export default Stockfictif;

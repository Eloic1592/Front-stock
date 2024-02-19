import {
  Box,
  TextField,
  Select,
  MenuItem,
  DialogContent,
  DialogActions,
  DialogTitle,
  Dialog
} from '@mui/material';
import { Breadcrumb } from 'app/components';
import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Listehistorique from './Listehistorique';
import { Container } from 'app/views/style/style';

const Historique = () => {
  // Form dialog
  const [open, setOpen] = useState(false);
  const [mouvement, setMouvement] = useState('1');
  const [mois, setMois] = useState('1');
  const [filename, setFilename] = useState('');
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Validation form
  const handleSubmit = async () => {};

  useEffect(() => {}, []);

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[{ name: 'Historique', path: 'admin/historique' }, { name: 'Historique' }]}
        />
      </Box>
      <p>
        <Button variant="contained" onClick={handleClickOpen} color="inherit">
          Exporter des donnees
        </Button>
        &nbsp;&nbsp;
      </p>

      {/* Formulaire */}
      <Box mb={2}>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Importation de donnees</DialogTitle>
          <DialogContent>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Select
                  fullWidth
                  labelId="select-label"
                  value={mouvement}
                  onChange={(event) => setMouvement(event.target.value)}
                >
                  <MenuItem value="1">Entree</MenuItem>
                  <MenuItem value="-1"> Sortie</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={6}>
                <Select
                  fullWidth
                  labelId="select-label"
                  value={mois}
                  onChange={(event) => setMois(event.target.value)}
                >
                  <MenuItem value="1">Janvier</MenuItem>
                  <MenuItem value="2">Fevrier</MenuItem>
                  <MenuItem value="3">Mars</MenuItem>
                  <MenuItem value="4">Avril</MenuItem>
                  <MenuItem value="5">Mai</MenuItem>
                  <MenuItem value="6">Juin</MenuItem>
                  <MenuItem value="7">Juillet</MenuItem>
                  <MenuItem value="8">Aout</MenuItem>
                  <MenuItem value="9">Septembre</MenuItem>
                  <MenuItem value="10">Octobre</MenuItem>
                  <MenuItem value="11">Novembre</MenuItem>
                  <MenuItem value="12">Decembre</MenuItem>
                </Select>
              </Grid>
            </Grid>
            <TextField
              fullWidth
              autoFocus
              id="filename"
              type="text"
              margin="dense"
              label="Nom du fichier"
              name="filename"
              value={filename}
              onChange={(event) => setFilename(event.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" color="secondary" onClick={handleClose}>
              Annuler
            </Button>
            <Button onClick={handleSubmit} color="primary">
              Imprimer
            </Button>
          </DialogActions>
        </Dialog>
      </Box>

      <Box mb={2}></Box>

      <Box>
        <Listehistorique />
      </Box>
    </Container>
  );
};

export default Historique;

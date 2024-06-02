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
  MenuItem,
  Select
} from '@mui/material';
import { Breadcrumb } from 'app/components';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Listetypemateriel from './Listetypemateriel';
import { Container } from 'app/views/style/style';
import { baseUrl } from 'app/utils/constant';

const Typemateriel = () => {
  // Form dialog
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleAlertClose = () => setMessage({ open: false });

  const [message, setMessage] = useState({
    text: 'Information enregistree',
    severity: 'success',
    open: false
  });

  const [data, setData] = useState({
    categoriemateriels: []
  });

  const [typemateriel, setTypemateriel] = useState('');
  const [categoriemateriel, setCategoriemateriel] = useState('1');
  const [val, setVal] = useState('');

  // Validation form
  const handleSubmit = () => {
    if (!typemateriel) {
      setMessage({
        text: 'Veuillez saisir un nom de type.',
        severity: 'error',
        open: true
      });
      return;
    }

    let params = {
      typemateriel: typemateriel,
      val: val,
      idcategoriemateriel: categoriemateriel
    };
    let url = baseUrl + '/typemateriel/createtypemateriel';
    fetch(url, {
      crossDomain: true,
      method: 'POST',
      body: JSON.stringify(params),
      headers: { 'Content-Type': 'application/json' }
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        setTimeout(() => {
          window.location.reload();
        }, 2000);

        setMessage({
          text: 'Information enregistrée',
          severity: 'success',
          open: true
        });
      })
      .catch(() => {
        setMessage({
          text: "L'insertion dans la base de données a échoué.",
          severity: 'error',
          open: true
        });
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = baseUrl + '/typemateriel/contenttypemateriel';
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
          categoriemateriels: responseData.categoriemateriels || []
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

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: 'Type de materiel', path: 'admin/typemateriel' },
            { name: 'Type de materiel' }
          ]}
        />
      </Box>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Box>
            <Button variant="contained" onClick={handleClickOpen} color="primary">
              Nouveau type de materiel
            </Button>
          </Box>
        </Grid>
        <Grid item>
          <Box>
            <Dialog
              fullWidth
              maxWidth="md"
              open={open}
              onClose={handleClose}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">Nouveau type de materiel</DialogTitle>
              <DialogContent>
                <Grid container direction="column" spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      type="text"
                      name="typemateriel"
                      label="type de materiel"
                      value={typemateriel}
                      onChange={(event) => setTypemateriel(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      type="text"
                      name="val"
                      label="code"
                      placeholder="EX: LAP,CHR ou autre..."
                      value={val}
                      onChange={(event) => setVal(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Select
                      labelId="select-label"
                      sx={{ mb: 3 }}
                      value={categoriemateriel}
                      onChange={(event) => setCategoriemateriel(event.target.value)}
                      fullWidth
                    >
                      <MenuItem value="1" disabled>
                        Choisir une categorie
                      </MenuItem>
                      {data.categoriemateriels.map((row) => (
                        <MenuItem key={row.idcategoriemateriel} value={row.idcategoriemateriel}>
                          {row.categoriemateriel} - {row.val}
                        </MenuItem>
                      ))}
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
        </Grid>
      </Grid>
      <Snackbar open={message.open} autoHideDuration={3000} onClose={handleAlertClose}>
        <Alert severity={message.severity} sx={{ width: '100%' }} variant="filled">
          {message.text}
        </Alert>
      </Snackbar>
      <Listetypemateriel />
    </Container>
  );
};

export default Typemateriel;

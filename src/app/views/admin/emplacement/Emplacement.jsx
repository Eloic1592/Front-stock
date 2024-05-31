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
  Select,
  Icon
} from '@mui/material';
import { Breadcrumb } from 'app/components';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { Container } from 'app/views/style/style';
import Listemplacement from './Listeemplacement';
import { baseUrl } from 'app/utils/constant';
import { useParams } from 'react-router-dom';
const Emplacement = () => {
  const iddepot = useParams();
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
    depot: []
  });

  const [depot, setDepot] = useState('1');
  const [codeemp, setCodeemp] = useState('');
  const [capacite, setCapacite] = useState(0);

  //Retour page retour
  const redirect = () => {
    window.location.replace('/admin/depot');
  };

  // Validation form
  const handleSubmit = () => {
    let params = {
      codeemp: codeemp,
      iddepot: depot,
      capacite: capacite
    };
    let url = baseUrl + '/emplacement/createemplacement';
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
        let url = baseUrl + '/emplacement/contentemplacement';
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
          depot: responseData.depot || []
        };

        setData(newData);
        setDepot(iddepot.iddepot);
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
            { name: 'Type de materiel', path: 'admin/emplacement' },
            { name: 'Type de materiel' }
          ]}
        />
      </Box>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Grid container direction="row" spacing={2}>
            <Grid item>
              <Button variant="contained" color="inherit" onClick={redirect}>
                <Icon>arrow_backward</Icon>
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={handleClickOpen} color="primary">
                Nouvel emplacement
              </Button>
            </Grid>
          </Grid>
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
              <DialogTitle id="form-dialog-title">Nouvel emplacement</DialogTitle>
              <DialogContent>
                <Grid container direction="column" spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      type="text"
                      name="val"
                      label="code emplacement"
                      placeholder="EX: TI1-L1-C1-INF"
                      value={codeemp}
                      onChange={(event) => setCodeemp(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      type="text"
                      name="capacite"
                      label="capacite"
                      value={capacite}
                      onChange={(event) => setCapacite(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Select
                      labelId="select-label"
                      value={depot}
                      onChange={(event) => setDepot(event.target.value)}
                      fullWidth
                      disabled
                    >
                      <MenuItem value="1" disabled>
                        Choisir un depot
                      </MenuItem>
                      {data.depot.map((row) => (
                        <MenuItem key={row.iddepot} value={row.iddepot}>
                          {row.depot} - {row.codedep}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                </Grid>
              </DialogContent>

              <DialogActions>
                <Button variant="contained" color="secondary" onClick={handleClose}>
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
      <Listemplacement />
    </Container>
  );
};

export default Emplacement;

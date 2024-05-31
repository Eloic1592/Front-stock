import { Box, TextField, Snackbar, Alert, Grid } from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { Container } from 'app/views/style/style';
import { baseUrl } from 'app/utils/constant';
import { useParams } from 'react-router-dom';

const Editdepot = () => {
  const iddepot = useParams();
  const handleAlertClose = () => setMessage({ open: false });
  const [message, setMessage] = useState({
    text: 'Information enregistree',
    severity: 'success',
    open: false
  });

  // Input
  const [depot, setDepot] = useState('');
  const [codedep, setCodedep] = useState('');
  const [capacite, setCapacite] = useState(0);

  const handleSubmit = () => {
    if (!depot) {
      setMessage({
        text: 'Veuillez remplir tous les champs obligatoires.',
        severity: 'error',
        open: true
      });
      return;
    }
    let params = {
      iddepot: iddepot.iddepot,
      depot: depot,
      codedep: codedep,
      capacite: capacite
    };
    let url = baseUrl + '/depot/createdepot';
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
        let depotParams = {
          iddepot: iddepot.iddepot
        };
        let url = baseUrl + '/depot/getdepot';
        const response = await fetch(url, {
          crossDomain: true,
          method: 'POST',
          body: JSON.stringify(depotParams),
          headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`);
        }

        const responseData = await response.json();
        setDepot(responseData.depot);
        setCodedep(responseData.codedep);
        setCapacite(responseData.capacite);
      } catch {
        setMessage({
          text: "Aucune donnee n 'a ete recuperee,veuillez verifier si le serveur est actif",
          severity: 'error',
          open: true
        });
      }
    };
    fetchData();
  }, [iddepot.iddepot]);

  const handleCancel = () => {
    window.location.replace('/admin/depot');
  };

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: 'Depot', path: 'admin/depot' }, { name: 'Depot' }]} />
      </Box>
      <SimpleCard title="Modifier depot">
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Depot"
                variant="outlined"
                value={depot}
                onChange={(e) => setDepot(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                autoFocus
                id="codedep"
                type="text"
                margin="dense"
                label="codedep"
                name="codedep"
                value={codedep}
                placeholder="Ex: S1"
                onChange={(event) => setCodedep(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                autoFocus
                id="capacite"
                type="text"
                margin="dense"
                label="capacite"
                name="capacite"
                value={capacite}
                onChange={(event) => setCapacite(event.target.value)}
              />
            </Grid>

            <Grid item xs={12} container justifyContent="flex-end" alignItems="center" spacing={2}>
              <Grid item>
                <Button variant="contained" color="secondary" onClick={handleCancel}>
                  Annuler
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" color="primary" type="submit" onClick={handleSubmit}>
                  Valider
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </SimpleCard>
      <Snackbar open={message.open} autoHideDuration={3000} onClose={handleAlertClose}>
        <Alert severity={message.severity} sx={{ width: '100%' }} variant="filled">
          {message.text}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Editdepot;

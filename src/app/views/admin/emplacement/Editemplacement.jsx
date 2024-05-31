import { Box, TextField, Snackbar, Alert, Grid, MenuItem, Select } from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { Container } from 'app/views/style/style';
import { baseUrl } from 'app/utils/constant';
import { useParams } from 'react-router-dom';

const Editemplacement = () => {
  const idemplacement = useParams();
  const handleAlertClose = () => setMessage({ open: false });
  const [message, setMessage] = useState({
    text: 'Information enregistree',
    severity: 'success',
    open: false
  });
  const [data, setData] = useState({ depot: [] });

  // Input

  const [depot, setDepot] = useState('1');
  const [codeemp, setCodeemp] = useState('');
  const [capacite, setCapacite] = useState(0);

  const handleSubmit = () => {
    let params = {
      idemplacement: idemplacement.idemplacement,
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
        let emplacementParams = {
          idemplacement: idemplacement.idemplacement
        };
        let url = baseUrl + '/emplacement/getemplacement';
        const response = await fetch(url, {
          crossDomain: true,
          method: 'POST',
          body: JSON.stringify(emplacementParams),
          headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`);
        }

        const responseData = await response.json();
        setData(responseData);
        setCodeemp(responseData.emplacement.codeemp);
        setCapacite(responseData.emplacement.capacite);
        setDepot(responseData.emplacement.iddepot);
      } catch {
        setMessage({
          text: "Aucune donnee n 'a ete recuperee,veuillez verifier si le serveur est actif",
          severity: 'error',
          open: true
        });
      }
    };
    fetchData();
  }, [idemplacement.idemplacement]);

  const handleCancel = (iddepot) => {
    window.location.replace('/admin/emplacement/' + iddepot);
  };

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: 'typemateriel', path: 'admin/typemateriel' },
            { name: 'typemateriel' }
          ]}
        />
      </Box>
      <SimpleCard title="Modifier typemateriel">
        <Box>
          <Grid container spacing={2}>
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

export default Editemplacement;

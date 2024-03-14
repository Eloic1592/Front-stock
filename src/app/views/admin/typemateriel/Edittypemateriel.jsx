import { Box, TextField, Snackbar, Alert, Grid, MenuItem, Select } from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { Container } from 'app/views/style/style';
import { baseUrl } from 'app/utils/constant';
import { useParams } from 'react-router-dom';

const Edittypemateriel = () => {
  const idtypemateriel = useParams();
  const handleAlertClose = () => setMessage({ open: false });
  const [message, setMessage] = useState({
    text: 'Information enregistree',
    severity: 'success',
    open: false
  });
  const [data, setData] = useState({
    categoriemateriels: [],
    typemateriel: {
      id: 0,
      idtypemateriel: '',
      typemateriel: '',
      idcategoriemateriel: ''
    }
  });

  // Input
  const [typemateriel, settypemateriel] = useState('');
  const [categoriemateriel, setCategoriemateriel] = useState('');

  const handleSubmit = () => {
    if (!typemateriel) {
      setMessage({
        text: 'Veuillez remplir tous les champs obligatoires.',
        severity: 'error',
        open: true
      });
      return;
    }
    let params = {
      idtypemateriel: idtypemateriel.idtypemateriel,
      typemateriel: typemateriel,
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
        let typematerielParams = {
          idtypemateriel: idtypemateriel.idtypemateriel
        };
        let url = baseUrl + '/typemateriel/gettypemateriel';
        const response = await fetch(url, {
          crossDomain: true,
          method: 'POST',
          body: JSON.stringify(typematerielParams),
          headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`);
        }

        const responseData = await response.json();
        const newData = {
          categoriemateriels: responseData.categoriemateriels || [],
          typemateriel: responseData.typemateriel || null
        };
        setData(newData);
        settypemateriel(newData.typemateriel.typemateriel);
        setCategoriemateriel(newData.typemateriel.idcategoriemateriel);
      } catch {
        setMessage({
          text: "Aucune donnee n 'a ete recuperee,veuillez verifier si le serveur est actif",
          severity: 'error',
          open: true
        });
      }
    };
    fetchData();
  }, [idtypemateriel.idtypemateriel]);

  const handleCancel = () => {
    window.location.replace('/admin/typemateriel');
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
                label="Type de materiel"
                variant="outlined"
                value={typemateriel}
                onChange={(e) => settypemateriel(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Select
                fullWidth
                labelId="select-label"
                variant="outlined"
                value={categoriemateriel}
                onChange={(event) => setCategoriemateriel(event.target.value)}
                sx={{ mb: 3 }}
              >
                <MenuItem value="1">Selectionner une categorie de materiel</MenuItem>
                {data.categoriemateriels.map((row) => (
                  <MenuItem key={row.idcategoriemateriel} value={row.idcategoriemateriel}>
                    {row.categoriemateriel}
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

export default Edittypemateriel;

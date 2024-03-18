import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  Alert,
  Snackbar,
  Grid
  // Icon
} from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';
import { useState, useEffect } from 'react';
import { Container } from 'app/views/style/style';
import { baseUrl } from 'app/utils/constant';
import { formatDate } from 'app/utils/utils';
import Datalistetudiant from '../../Datagrid/Datalistetudiant';
import InputAdornment from '@mui/material/InputAdornment';
import { useParams } from 'react-router-dom';
const Editmouvementfictif = () => {
  const idmouvementstock = useParams();

  // Input
  const [datedepot, setDatedepot] = useState('');
  const [naturemouvement, setNaturemouvement] = useState(['1']);
  const [typemouvement, setTypemouvement] = useState(['0']);
  const [idetudiant, setIdetudiant] = useState('');

  const [data, setData] = useState({
    mouvementstock: {
      idmouvementstock: '',
      typemouvement: 0,
      idnaturemouvement: '',
      datedepot: '',
      idetudiant: '',
      statut: 0
    },
    naturemouvements: [],
    etudiants: []
  });

  // Message
  const [message, setMessage] = useState({
    text: 'Information enregistree',
    severity: 'success',
    open: false
  });
  const handleAlertClose = () => setMessage({ open: false });

  // Form dialog
  const [openetugrid, setopenetutugrid] = useState(false);
  const handleClickOpenetugrid = () => setopenetutugrid(true);
  const handleCloseOpenetugrid = () => {
    setopenetutugrid(false);
  };

  const handleSubmit = () => {
    let params = {
      idmouvementstock: idmouvementstock.idmouvementstock,
      typemouvement: typemouvement,
      idnaturemouvement: naturemouvement,
      datedepot: datedepot,
      idetudiant: idetudiant,
      statut: 0
    };

    let url = baseUrl + '/mouvementstock/createstockfictif';
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
          text: "L'insertion a echouee,veuillez verifier si tous les champs sont remplis!",
          severity: 'error',
          open: true
        });
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let mouvementstockParams = {
          idmouvementstock: idmouvementstock.idmouvementstock
        };
        let url = baseUrl + '/mouvementstock/getmouvementstock';
        const response = await fetch(url, {
          crossDomain: true,
          method: 'POST',
          body: JSON.stringify(mouvementstockParams),
          headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`);
        }

        const responseData = await response.json();

        const newData = {
          naturemouvements: responseData.naturemouvements || [],
          etudiants: responseData.etudiants || [],
          mouvementstock: responseData.mouvementstock || null
        };

        setData(newData);
        setNaturemouvement(newData.mouvementstock.idnaturemouvement);
        setIdetudiant(newData.mouvementstock.idetudiant);
        setDatedepot(formatDate(newData.mouvementstock.datedepot));
        setTypemouvement(newData.mouvementstock.typemouvement);
      } catch (error) {
        setMessage({
          text: "Aucune donnee n 'a ete recuperee,veuillez verifier si le serveur est actif",
          severity: 'error',
          open: true
        });
      }
    };
    fetchData();
  }, [idmouvementstock.idmouvementstock]);

  const handleCancel = () => {
    window.location.replace('/admin/mouvementfictif');
  };

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: 'Mouvement de stock', path: '/admin/mouvementfictif' },
            { name: 'mouvement de stock fictif' }
          ]}
        />
      </Box>
      <SimpleCard title="Modifier ce detail">
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Box>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <Select
                    fullWidth
                    labelId="select-label"
                    value={naturemouvement}
                    onChange={(event) => setNaturemouvement(event.target.value)}
                  >
                    <MenuItem value="1" key="1">
                      Choisir un mouvement
                    </MenuItem>
                    {data.naturemouvements.map((row) => (
                      <MenuItem value={row.idnaturemouvement} key={row.idnaturemouvement}>
                        {row.naturemouvement}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    id="datedepot"
                    type="date"
                    name="datedepot"
                    value={datedepot}
                    onChange={(event) => setDatedepot(event.target.value)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Select
                    fullWidth
                    labelId="select-label"
                    value={typemouvement}
                    onChange={(event) => setTypemouvement(event.target.value)}
                  >
                    <MenuItem value="0">Choisir la nature du mouvement</MenuItem>
                    <MenuItem value="1" key="1">
                      Entree
                    </MenuItem>
                    <MenuItem value="-1" key="-1">
                      Sortie
                    </MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    type="text"
                    name="idetudiant"
                    label="Etudiant"
                    variant="outlined"
                    value={idetudiant}
                    onChange={setIdetudiant}
                    InputProps={{
                      readOnly: true,
                      endAdornment: (
                        <InputAdornment position="end">
                          <Button
                            color="inherit"
                            variant="contained"
                            onClick={handleClickOpenetugrid}
                          >
                            ...
                          </Button>
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
                <Grid item xs={2}>
                  <Datalistetudiant
                    Etudiant={data.etudiants}
                    state={openetugrid}
                    handleClose={handleCloseOpenetugrid}
                    setetudiant={setIdetudiant}
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12} container justifyContent="flex-end" alignItems="center" spacing={2}>
            <Grid item>
              <Button variant="contained" color="secondary" onClick={handleCancel}>
                Annuler
              </Button>
            </Grid>
            <Grid item>
              <Button onClick={handleSubmit} color="primary" variant="contained">
                Valider
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </SimpleCard>

      <Snackbar open={message.open} autoHideDuration={3000} onClose={handleAlertClose}>
        <Alert severity={message.severity} sx={{ width: '100%' }} variant="filled">
          {message.text}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Editmouvementfictif;

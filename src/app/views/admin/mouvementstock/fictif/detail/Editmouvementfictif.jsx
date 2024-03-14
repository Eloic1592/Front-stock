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
import InputAdornment from '@mui/material/InputAdornment';
import { useParams } from 'react-router-dom';
import Datalistmateriel from 'app/views/admin/Datagrid/Datalistmateriel';
const Editmouvementfictif = () => {
  const iddetailmouvementfictif = useParams();

  // Input
  const [idmouvement, setIdmouvement] = useState('');
  const [caution, setCaution] = useState(0);
  const [datedeb, setDatedeb] = useState('');
  const [datefin, setDatefin] = useState('');
  const [depot, setDepot] = useState(['1']);
  const [idmateriel, setIdmateriel] = useState('');
  const [description, setDescription] = useState('');
  const [commentaire, setCommentaire] = useState('');
  const [data, setData] = useState({
    mouvementfictif: {
      iddetailmouvementfictif: '',
      idnaturemouvement: '',
      datedeb: '',
      datefin: '',
      caution: 0,
      quantite: '',
      idmateriel: '',
      iddepot: '',
      description: '',
      commentaire: ''
    },
    listemateriels: [],
    depots: [],
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
  const [opendatagrid, setOpendatagrid] = useState(false);
  const handleClickOpendatagrid = () => setOpendatagrid(true);
  const handleCloseOpendatagrid = () => {
    setOpendatagrid(false);
  };

  const handleSubmit = () => {
    let params = {
      iddetailmouvementfictif: iddetailmouvementfictif.iddetailmouvementfictif,
      idmouvement: idmouvement,
      datedeb: datedeb,
      datefin: datefin,
      caution: caution,
      idmateriel: idmateriel,
      iddepot: depot,
      description: description,
      commentaire: commentaire,
      statut: 0
    };

    let url = baseUrl + '/mouvementstock/createsingledetailfictif';
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
          iddetailmouvementfictif: iddetailmouvementfictif.iddetailmouvementfictif
        };
        let url = baseUrl + '/mouvementstock/getmouvementfictif';
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
          listemateriels: responseData.listemateriels || [],
          depots: responseData.depots || [],
          etudiants: responseData.etudiants || [],
          mouvementfictif: responseData.mouvementfictif || null
        };

        setData(newData);
        setIdmouvement(newData.mouvementfictif.idmouvement);
        setIdmateriel(newData.mouvementfictif.idmateriel);
        setDescription(newData.mouvementfictif.description);
        setCommentaire(newData.mouvementfictif.commentaire);
        setCaution(newData.mouvementfictif.caution);
        setDepot(newData.mouvementfictif.iddepot);
        setDatedeb(formatDate(newData.mouvementfictif.datedeb));
        setDatefin(formatDate(newData.mouvementfictif.datefin));
      } catch (error) {
        setMessage({
          text: "Aucune donnee n 'a ete recuperee,veuillez verifier si le serveur est actif",
          severity: 'error',
          open: true
        });
      }
    };
    fetchData();
  }, [iddetailmouvementfictif.iddetailmouvementfictif]);

  const handleCancel = () => {
    window.location.replace('/admin/mouvementfictif');
  };

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: 'Mouvement de stock', path: 'admin/stock/mouvementfictif' },
            { name: 'mouvement de stock physique' }
          ]}
        />
      </Box>
      <SimpleCard title="Modifier ce detail">
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Box>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    id="datedeb"
                    type="date"
                    name="datedeb"
                    value={datedeb}
                    onChange={(event) => setDatedeb(event.target.value)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    id="datefin"
                    type="date"
                    name="datefin"
                    value={datefin}
                    onChange={(event) => setDatefin(event.target.value)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    id="caution"
                    type="number"
                    name="caution"
                    value={caution}
                    onChange={(event) => setCaution(event.target.value)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Select
                    fullWidth
                    autoFocus
                    labelId="select-label"
                    value={depot}
                    margin="dense"
                    onChange={(event) => setDepot(event.target.value)}
                  >
                    <MenuItem value="1">Choisir un depot</MenuItem>
                    {data.depots.map((row) => (
                      <MenuItem value={row.iddepot} key={row.iddepot}>
                        {row.depot}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    type="text"
                    name="idmateriel"
                    label="Materiel"
                    variant="outlined"
                    value={idmateriel}
                    onChange={setIdmateriel}
                    InputProps={{
                      readOnly: true,
                      endAdornment: (
                        <InputAdornment position="end">
                          <Button
                            style={{ width: '30px', height: '20px' }}
                            color="inherit"
                            variant="contained"
                            onClick={handleClickOpendatagrid}
                          >
                            ...
                          </Button>
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Datalistmateriel
                    Materiels={data.listemateriels}
                    state={opendatagrid}
                    handleClose={handleCloseOpendatagrid}
                    setmateriel={setIdmateriel}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    multiline
                    rows={6}
                    variant="outlined"
                    placeholder="Description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    multiline
                    rows={6}
                    variant="outlined"
                    placeholder="Remarques"
                    value={commentaire}
                    onChange={(event) => setCommentaire(event.target.value)}
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

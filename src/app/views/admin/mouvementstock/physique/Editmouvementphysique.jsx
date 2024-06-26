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
import Datalistarticle from '../../Datagrid/Datalistarticle';
import InputAdornment from '@mui/material/InputAdornment';
import { useParams } from 'react-router-dom';
const Editmouvementphysique = () => {
  const iddetailmouvementphysique = useParams();

  // Input
  const [datedepot, setDatedepot] = useState('');
  const [typemouvement, setTypemouvement] = useState(['0']);
  const [naturemouvement, setNaturemouvement] = useState(['1']);
  const [article, setArticle] = useState('');
  const [quantite, setQuantite] = useState(0);
  const [prixunitaire, setPrixunitaire] = useState(0);
  const [depot, setDepot] = useState(['1']);
  const [description, setDescription] = useState('');
  const [commentaire, setCommentaire] = useState('');
  const [data, setData] = useState({
    mouvementphysique: {
      iddetailmouvementphysique: '',
      typemouvement: 0,
      idnaturemouvement: '',
      datedepot: '',
      quantite: '',
      idarticle: '',
      pu: '',
      iddepot: '',
      description: '',
      commentaire: ''
    },
    naturemouvements: [],
    depots: [],
    listearticles: []
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
      iddetailmouvementphysique: iddetailmouvementphysique.iddetailmouvementphysique,
      idarticle: article,
      datedepot: datedepot,
      typemouvement: typemouvement,
      idnaturemouvement: naturemouvement,
      pu: prixunitaire,
      quantite: quantite,
      iddepot: depot,
      description: description,
      commentaire: commentaire,
      statut: 0
    };

    let url = baseUrl + '/mouvementstock/createstockphysique';
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
          iddetailmouvementphysique: iddetailmouvementphysique.iddetailmouvementphysique
        };
        let url = baseUrl + '/mouvementstock/getmouvementphysique';
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
          depots: responseData.depots || [],
          listearticles: responseData.listearticles || [],
          mouvementphysique: responseData.mouvementphysique || null
        };

        setData(newData);
        setArticle(newData.mouvementphysique.idarticle);
        setDescription(newData.mouvementphysique.description);
        setCommentaire(newData.mouvementphysique.commentaire);
        setQuantite(newData.mouvementphysique.quantite);
        setPrixunitaire(newData.mouvementphysique.pu);
        setDepot(newData.mouvementphysique.iddepot);
        setDatedepot(formatDate(newData.mouvementphysique.datedepot));
        setNaturemouvement(newData.mouvementphysique.idnaturemouvement);
        setTypemouvement(newData.mouvementphysique.typemouvement);
      } catch (error) {
        setMessage({
          text: "Aucune donnee n 'a ete recuperee,veuillez verifier si le serveur est actif",
          severity: 'error',
          open: true
        });
      }
    };
    fetchData();
  }, [iddetailmouvementphysique.iddetailmouvementphysique]);

  const handleCancel = () => {
    window.location.replace('/admin/mouvementphysique');
  };

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: 'Mouvement de stock', path: 'admin/stock/mouvementphysique' },
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
                  <Select
                    fullWidth
                    labelId="select-label"
                    value={naturemouvement}
                    onChange={(event) => setNaturemouvement(event.target.value)}
                  >
                    <MenuItem value="1">Choisir un mouvement</MenuItem>
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
                        {row.depot} - {row.codedep}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    type="text"
                    name="article"
                    label="Article"
                    variant="outlined"
                    value={article}
                    onChange={setArticle}
                    InputProps={{
                      readOnly: true,
                      endAdornment: (
                        <InputAdornment position="end">
                          <Button
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
                  <Datalistarticle
                    articles={data.listearticles}
                    state={opendatagrid}
                    handleClose={handleCloseOpendatagrid}
                    setArticle={setArticle}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    type="number"
                    InputProps={{ inputProps: { min: 0 } }}
                    name="quantite"
                    label="Quantite"
                    variant="outlined"
                    value={quantite}
                    onChange={(event) => setQuantite(event.target.value)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    type="number"
                    InputProps={{ inputProps: { min: 0 } }}
                    name="prixunitaire"
                    label="Prix unitaire"
                    variant="outlined"
                    value={prixunitaire}
                    onChange={(event) => setPrixunitaire(event.target.value)}
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

export default Editmouvementphysique;

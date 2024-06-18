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
  Select,
  MenuItem,
  Radio,
  RadioGroup,
  FormControlLabel
} from '@mui/material';
import { Breadcrumb } from 'app/components';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Listedistribution from './Listedistribution';
import { Container } from 'app/views/style/style';
import { baseUrl } from 'app/utils/constant';
import Datalistarticle from '../../Datagrid/Datalistarticle';
import Datalistmateriel from '../../Datagrid/Datalistmateriel';
const Distribution = () => {
  // Form dialog
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleAlertClose = () => setMessage({ open: false });
  const [opendatagrid, setOpendatagrid] = useState(false);
  const handleClickOpendatagrid = () => setOpendatagrid(true);
  const handleCloseOpendatagrid = () => {
    setOpendatagrid(false);
  };
  const [opendatagrid1, setOpendatagrid1] = useState(false);
  const handleClickOpendatagrid1 = () => setOpendatagrid1(true);
  const handleCloseOpendatagrid1 = () => {
    setOpendatagrid1(false);
  };

  // Data
  // Distribution
  const [datedistribution, setDistribution] = useState('');
  const [article, setArticle] = useState('');
  const [materiel, setMateriel] = useState('');
  const [quantite, setQuantite] = useState(0);
  const [depot, setDepot] = useState('1');
  const [emplacement, setEmplacement] = useState('1');
  const [etatdistribue, setEtatdistribue] = useState('2');
  const [choix, setChoix] = useState('depot');
  const [choixmat, setChoixmat] = useState('article');
  const [data, setData] = useState({
    articles: [],
    depots: [],
    listeemplacements: [],
    materiels: []
  });

  // Message
  const [message, setMessage] = useState({
    text: 'Information enregistree',
    severity: 'success',
    open: false
  });

  // Validation form
  const handleSubmit = () => {
    if (!datedistribution || !quantite) {
      setMessage({
        text: 'Les champs suivants sont obligatoires : datedistribution, article, quantite',
        severity: 'error',
        open: true
      });
      return;
    }

    let distribution = {
      idarticle: article,
      datedistribution: datedistribution,
      quantite: quantite,
      iddepot: depot === '1' ? '' : depot,
      idemplacement: emplacement === '1' ? '' : emplacement,
      etatdistribue: etatdistribue,
      statut: 0,
      idmateriel: materiel
    };

    let url = baseUrl + '/inventory/createdistribution';
    fetch(url, {
      crossDomain: true,
      method: 'POST',
      body: JSON.stringify(distribution),
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
          text: err,
          severity: 'error',
          open: true
        });
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = baseUrl + '/inventory/distributionform';
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
          articles: responseData.articles || [],
          materiels: responseData.materiels || [],
          depots: responseData.depots || [],
          listeemplacements: responseData.listeemplacements || []
        };
        setData(newData);
      } catch (error) {
        setMessage({
          text: "Aucune donnee n 'a ete recuperee,veuillez verifier si le serveur est actif",
          severity: 'error',
          open: true
        });
      }
    };
    fetchData();
  }, []);
  const redirect = () => {
    window.location.replace('/admin/distributionmateriel');
  };
  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: 'Distribution', path: 'admin/distribution' },
            { name: 'Distribution' }
          ]}
        />
      </Box>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Grid container direction="row" spacing={2}>
            <Grid item>
              <Button variant="contained" onClick={handleClickOpen} color="primary">
                Nouvel distribution
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={redirect} color="secondary">
                Distribution materiel
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Box>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="form-dialog-title"
              fullWidth
              maxWidth="md"
            >
              <DialogTitle id="form-dialog-title">Nouvel distribution</DialogTitle>
              <DialogContent>
                <Grid container direction="row" spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      autoFocus
                      id="datedistribution"
                      type="date"
                      margin="dense"
                      name="datedistribution"
                      value={datedistribution}
                      onChange={(event) => setDistribution(event.target.value)}
                    />
                    <Grid item container xs={12} spacing={1}>
                      <Grid item xs={12}>
                        <RadioGroup
                          row
                          aria-label="option"
                          name="option"
                          value={choixmat}
                          onChange={(event) => setChoixmat(event.target.value)}
                        >
                          <FormControlLabel value="article" control={<Radio />} label="Article" />
                          <FormControlLabel value="materiel" control={<Radio />} label="Materiel" />
                        </RadioGroup>
                      </Grid>

                      <Grid item container xs={12} spacing={1}>
                        <Grid item xs={11}>
                          <TextField
                            fullWidth
                            type="text"
                            name="article"
                            label="Article"
                            variant="outlined"
                            value={article}
                            onChange={setArticle}
                            InputProps={{ readOnly: true }}
                          />
                        </Grid>
                        <Grid item xs={1}>
                          <Button
                            color="inherit"
                            variant="contained"
                            onClick={handleClickOpendatagrid}
                            disabled={choixmat !== 'article'}
                          >
                            ...
                          </Button>{' '}
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Datalistarticle
                          articles={data.articles}
                          state={opendatagrid}
                          handleClose={handleCloseOpendatagrid}
                          setArticle={setArticle}
                        />
                      </Grid>

                      <Grid item container xs={12} spacing={1}>
                        <Grid item xs={11}>
                          <TextField
                            fullWidth
                            type="text"
                            name="materiel"
                            label="Materiel"
                            variant="outlined"
                            value={materiel}
                            onChange={setMateriel}
                            InputProps={{ readOnly: true }}
                          />
                        </Grid>
                        <Grid item xs={1}>
                          <Button
                            color="inherit"
                            variant="contained"
                            onClick={handleClickOpendatagrid1}
                            disabled={choixmat !== 'materiel'}
                          >
                            ...
                          </Button>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Datalistmateriel
                          Materiels={data.materiels}
                          state={opendatagrid1}
                          handleClose={handleCloseOpendatagrid1}
                          setmateriel={setMateriel}
                        />
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        autoFocus
                        id="quantite"
                        type="text"
                        margin="dense"
                        label="quantite"
                        name="quantite"
                        value={quantite}
                        onChange={(event) => setQuantite(event.target.value)}
                      />
                    </Grid>
                    <Grid item container xs={12} spacing={1}>
                      <Grid item xs={12}>
                        <Select
                          fullWidth
                          labelId="select-label"
                          value={etatdistribue}
                          onChange={(event) => setEtatdistribue(event.target.value)}
                        >
                          <MenuItem key="2" value="2">
                            Selectionner un etat
                          </MenuItem>
                          <MenuItem key="0" value="0">
                            Abime
                          </MenuItem>
                          <MenuItem key="1" value="1">
                            Bon etat
                          </MenuItem>
                        </Select>
                      </Grid>
                      <Grid item xs={12}>
                        <RadioGroup
                          row
                          aria-label="option"
                          name="option"
                          value={choix}
                          onChange={(event) => setChoix(event.target.value)}
                        >
                          <FormControlLabel value="depot" control={<Radio />} label="Depot" />
                          <FormControlLabel
                            value="emplacement"
                            control={<Radio />}
                            label="Emplacement"
                          />
                        </RadioGroup>
                      </Grid>
                      <Grid item xs={12}>
                        <Select
                          fullWidth
                          labelId="select-label"
                          value={depot}
                          onChange={(event) => setDepot(event.target.value)}
                          disabled={choix !== 'depot'}
                        >
                          <MenuItem key="1" value="1">
                            Selectionner un depot
                          </MenuItem>
                          {data.depots.map((row, index) => (
                            <MenuItem key={index} value={row.iddepot}>
                              {row.depot} - {row.codedep}
                            </MenuItem>
                          ))}
                        </Select>
                      </Grid>
                      <Grid item xs={12}>
                        <Select
                          fullWidth
                          labelId="select-label"
                          value={emplacement}
                          onChange={(event) => setEmplacement(event.target.value)}
                          disabled={choix !== 'emplacement'}
                        >
                          <MenuItem key="1" value="1">
                            Selectionner un emplacement precis
                          </MenuItem>
                          {data.listeemplacements.map((row, index) => (
                            <MenuItem key={index} value={row.idemplacement}>
                              {row.codeemp}
                            </MenuItem>
                          ))}
                        </Select>
                      </Grid>
                    </Grid>
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

      <Listedistribution />
    </Container>
  );
};

export default Distribution;

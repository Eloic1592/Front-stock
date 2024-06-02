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
  MenuItem
} from '@mui/material';
import { Breadcrumb } from 'app/components';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Listedistribution from './Listedistribution';
import { Container } from 'app/views/style/style';
import { baseUrl } from 'app/utils/constant';
import Datalistarticle from '../../Datagrid/Datalistarticle';
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

  // Data
  // Distribution
  const [datedistribution, setDistribution] = useState('');
  const [article, setArticle] = useState('');
  const [quantite, setQuantite] = useState(0);
  const [depot, setDepot] = useState(['1']);
  const [data, setData] = useState({
    articles: [],
    depots: []
  });

  // Message
  const [message, setMessage] = useState({
    text: 'Information enregistree',
    severity: 'success',
    open: false
  });

  // Validation form
  const handleSubmit = () => {
    if (!datedistribution || !article || !quantite) {
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
      iddepot: depot,
      statut: 0
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
          depots: responseData.depots || []
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
                        <Datalistarticle
                          articles={data.articles}
                          state={opendatagrid}
                          handleClose={handleCloseOpendatagrid}
                          setArticle={setArticle}
                        />
                        <Button
                          color="inherit"
                          variant="contained"
                          onClick={handleClickOpendatagrid}
                        >
                          ...
                        </Button>
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
                    <Grid item xs={12}>
                      <Select
                        fullWidth
                        labelId="select-label"
                        value={depot}
                        onChange={(event) => setDepot(event.target.value)}
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

      <Listedistribution />
    </Container>
  );
};

export default Distribution;

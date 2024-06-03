import { Box, TextField, Snackbar, Alert, Grid, Select, MenuItem } from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { Container } from 'app/views/style/style';
import { baseUrl } from 'app/utils/constant';
import { useParams } from 'react-router-dom';
import Datalistarticle from '../../Datagrid/Datalistarticle';
import { formatDate } from 'app/utils/utils';

const Editstockage = () => {
  const idstockage = useParams();
  console.log(idstockage.idstockage);
  const handleAlertClose = () => setMessage({ open: false });
  const [opendatagrid, setOpendatagrid] = useState(false);
  const handleClickOpendatagrid = () => setOpendatagrid(true);
  const handleCloseOpendatagrid = () => {
    setOpendatagrid(false);
  };
  // Data
  // Stockage
  const [datestockage, setDatestockage] = useState('');
  const [article, setArticle] = useState('');
  const [quantite, setQuantite] = useState(0);
  const [etatstocke, setEtatstocke] = useState('2');
  const [data, setData] = useState({
    articles: []
  });

  // Message
  const [message, setMessage] = useState({
    text: 'Information enregistree',
    severity: 'success',
    open: false
  });

  const handleSubmit = () => {
    if (!datestockage || !quantite || !article) {
      setMessage({
        text: 'Les champs suivants sont obligatoires : datestockage, quantite, article',
        severity: 'error',
        open: true
      });
      return;
    }

    let stockage = {
      idstockage: idstockage.idstockage,
      idarticle: article,
      datestockage: datestockage,
      quantite: quantite,
      etatstocke: etatstocke,
      statut: 0
    };

    let url = baseUrl + '/inventory/createstockage';
    fetch(url, {
      crossDomain: true,
      method: 'POST',
      body: JSON.stringify(stockage),
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
        let inventoryParams = {
          idstockage: idstockage.idstockage
        };
        let url = baseUrl + '/inventory/getstockage';
        const response = await fetch(url, {
          crossDomain: true,
          method: 'POST',
          body: JSON.stringify(inventoryParams),
          headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`);
        }

        const responseData = await response.json();
        const newData = {
          articles: responseData.articles || []
        };
        setData(newData);
        setQuantite(responseData.stockage.quantite);
        setDatestockage(formatDate(responseData.stockage.datestockage));
        setArticle(responseData.stockage.idarticle);
        setEtatstocke(responseData.stockage.etatstocke);
      } catch (error) {
        setMessage({
          text: "Aucune donnee n 'a ete recuperee,veuillez verifier si le serveur est actif",
          severity: 'error',
          open: true
        });
      }
    };
    fetchData();
  }, [idstockage.idstockage]);

  const handleCancel = () => {
    window.location.replace('/admin/stockage');
  };

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[{ name: 'Stockage', path: 'admin/stockage' }, { name: 'Stockage' }]}
        />
      </Box>
      <SimpleCard title="Modifier stockage">
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="datestockage"
                variant="outlined"
                type="date"
                value={datestockage}
                onChange={(e) => setDatestockage(e.target.value)}
              />
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
                <Datalistarticle
                  articles={data.articles}
                  state={opendatagrid}
                  handleClose={handleCloseOpendatagrid}
                  setArticle={setArticle}
                />
                <Button color="inherit" variant="contained" onClick={handleClickOpendatagrid}>
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
                value={etatstocke}
                onChange={(event) => setEtatstocke(event.target.value)}
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

export default Editstockage;

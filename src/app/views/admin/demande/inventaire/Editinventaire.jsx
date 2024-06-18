import { Box, TextField, Snackbar, Alert, Grid, Select, MenuItem } from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { Container } from 'app/views/style/style';
import { baseUrl } from 'app/utils/constant';
import { useParams } from 'react-router-dom';
import Datalistarticle from '../../Datagrid/Datalistarticle';
import { formatDate } from 'app/utils/utils';

const Editinventaire = () => {
  const idinventaire = useParams();
  console.log(idinventaire.idinventaire);
  const handleAlertClose = () => setMessage({ open: false });
  const [opendatagrid, setOpendatagrid] = useState(false);
  const handleClickOpendatagrid = () => setOpendatagrid(true);
  const handleCloseOpendatagrid = () => {
    setOpendatagrid(false);
  };
  // Data
  // Inventaire
  const [dateinventaire, setDateinventaire] = useState('');
  const [article, setArticle] = useState('');
  const [quantitereel, setQuantitereel] = useState(0);
  const [quantitetheorique, setQuantitetheorique] = useState(0);
  const [description, setDescription] = useState('');
  const [etatinventaire, setEtatinventaire] = useState('2');
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
    if (!dateinventaire || !article || !quantitereel || !quantitetheorique) {
      setMessage({
        text: 'Les champs suivants sont obligatoires : dateinventaire, article, quantitereel,quantitetheorique',
        severity: 'error',
        open: true
      });
      return;
    }

    let inventaire = {
      idinventaire: idinventaire.idinventaire,
      idarticle: article,
      dateinventaire: dateinventaire,
      quantitereel: quantitereel,
      quantitetheorique: quantitetheorique,
      description: description,
      etatinventaire: etatinventaire,
      statut: 0
    };

    let url = baseUrl + '/inventory/createinventaire';
    fetch(url, {
      crossDomain: true,
      method: 'POST',
      body: JSON.stringify(inventaire),
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
          idinventaire: idinventaire.idinventaire
        };
        let url = baseUrl + '/inventory/getinventaire';
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
        setQuantitereel(responseData.inventaire.quantitereel);
        setQuantitetheorique(responseData.inventaire.quantitetheorique);
        setDateinventaire(formatDate(responseData.inventaire.dateinventaire));
        setArticle(responseData.inventaire.idarticle);
        setEtatinventaire(responseData.inventaire.etatinventaire);
        setDescription(responseData.inventaire.description);
      } catch (error) {
        setMessage({
          text: "Aucune donnee n 'a ete recuperee,veuillez verifier si le serveur est actif",
          severity: 'error',
          open: true
        });
      }
    };
    fetchData();
  }, [idinventaire.idinventaire]);

  const handleCancel = () => {
    window.location.replace('/admin/inventaire');
  };

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[{ name: 'Inventaire', path: 'admin/inventaire' }, { name: 'Inventaire' }]}
        />
      </Box>
      <SimpleCard title="Modifier inventaire">
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="dateinventaire"
                variant="outlined"
                type="date"
                value={dateinventaire}
                onChange={(e) => setDateinventaire(e.target.value)}
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
                id="quantitereel"
                type="text"
                margin="dense"
                label="quantite reel"
                name="quantitereel"
                value={quantitereel}
                onChange={(event) => setQuantitereel(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                autoFocus
                id="quantitereel"
                type="text"
                margin="dense"
                label="quantitetheorique"
                name="quantitetheorique"
                value={quantitetheorique}
                onChange={(event) => setQuantitetheorique(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={9}
                variant="outlined"
                label="Description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                sx={{ mb: 3 }}
              />
            </Grid>
            <Grid item xs={12}>
              <Select
                fullWidth
                labelId="select-label"
                value={etatinventaire}
                onChange={(event) => setEtatinventaire(event.target.value)}
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

export default Editinventaire;

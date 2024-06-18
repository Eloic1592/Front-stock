import { Box, TextField, Snackbar, Alert, Grid, MenuItem, Select } from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { Container } from 'app/views/style/style';
import { baseUrl } from 'app/utils/constant';
import { useParams } from 'react-router-dom';

const Editarticle = () => {
  const idarticle = useParams();
  const handleAlertClose = () => setMessage({ open: false });
  const [message, setMessage] = useState({
    text: 'Information enregistree',
    severity: 'success',
    open: false
  });
  const [data, setData] = useState({
    typemateriels: [],
    article: {
      id: 0,
      idarticle: '',
      idtypemateriel: '',
      typemateriel: '',
      marque: '',
      modele: '',
      description: ''
    }
  });

  // Input
  const [typemateriel, setTypemateriel] = useState('1');
  const [marque, setMarque] = useState('');
  const [modele, setModele] = useState('');
  const [codearticle, setCodearticle] = useState('');
  const [description, setDescription] = useState('');
  const [prix, setPrix] = useState(0);
  const [quantitestock, setQuantitestock] = useState(0);
  const [stocksecurite, setStocksecurite] = useState(0);

  const handleSubmit = () => {
    if (!marque || typemateriel === '1') {
      setMessage({
        text: 'Veuillez remplir tous les champs obligatoires.',
        severity: 'error',
        open: true
      });
      return;
    }
    let params = {
      idarticle: idarticle.idarticle,
      marque: marque,
      modele: modele,
      codearticle: codearticle,
      idtypemateriel: typemateriel,
      description: description,
      prix: prix,
      quantitestock: quantitestock,
      stocksecurite: stocksecurite
    };
    let url = baseUrl + '/article/createarticle';
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
        let articleParams = {
          idarticle: idarticle.idarticle
        };
        let url = baseUrl + '/article/getarticle';
        const response = await fetch(url, {
          crossDomain: true,
          method: 'POST',
          body: JSON.stringify(articleParams),
          headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`);
        }

        const responseData = await response.json();

        const newData = {
          typemateriels: responseData.typemateriels || [],
          article: responseData.article || null
        };
        setData(newData);
        setMarque(newData.article.marque);
        setTypemateriel(newData.article.idtypemateriel);
        setCodearticle(newData.article.codearticle);
        setModele(newData.article.modele);
        setDescription(newData.article.description);
        setPrix(newData.article.prix);
        setQuantitestock(newData.article.quantitestock);
        setStocksecurite(newData.article.stocksecurite);
      } catch {
        setMessage({
          text: "Aucune donnee n 'a ete recuperee,veuillez verifier si le serveur est actif",
          severity: 'error',
          open: true
        });
      }
    };
    fetchData();
  }, [idarticle.idarticle]);

  const handleCancel = () => {
    window.location.replace('/admin/article');
  };

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[{ name: 'Article', path: 'admin/article' }, { name: 'Article' }]}
        />
      </Box>
      <SimpleCard title="Modifier un article">
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Marque"
                variant="outlined"
                value={marque}
                onChange={(e) => setMarque(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Modèle"
                variant="outlined"
                value={modele}
                onChange={(e) => setModele(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                autoFocus
                id="codearticle"
                type="text"
                margin="dense"
                label="Code article"
                name="codearticle"
                value={codearticle}
                onChange={(event) => setCodearticle(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                variant="outlined"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12}>
              <Select
                fullWidth
                labelId="select-label"
                variant="outlined"
                value={typemateriel}
                onChange={(event) => setTypemateriel(event.target.value)}
                sx={{ mb: 3 }}
              >
                <MenuItem value="1">Selectionner un type de materiel</MenuItem>
                {data.typemateriels.map((row) => (
                  <MenuItem key={row.idtypemateriel} value={row.idtypemateriel}>
                    {row.typemateriel} - {row.val}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                autoFocus
                id="prix"
                type="text"
                margin="dense"
                label="Prix"
                name="prix"
                value={prix}
                onChange={(event) => setPrix(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                autoFocus
                id="quantitestock"
                type="text"
                margin="dense"
                label="Quantite en stock"
                name="quantitestock"
                value={quantitestock}
                onChange={(event) => setQuantitestock(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                autoFocus
                id="stocksecurite"
                type="text"
                margin="dense"
                label="Stock securite"
                name="stocksecurite"
                value={stocksecurite}
                onChange={(event) => setStocksecurite(event.target.value)}
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

export default Editarticle;

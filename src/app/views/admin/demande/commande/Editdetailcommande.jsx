import { Box, TextField, Snackbar, Alert, Grid } from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { Container } from 'app/views/style/style';
import { baseUrl } from 'app/utils/constant';
import { useParams } from 'react-router-dom';
import Datalistarticle from '../../Datagrid/Datalistarticle';

const Editdetailcommande = () => {
  const iddetailcommande = useParams();
  const handleAlertClose = () => setMessage({ open: false });
  const [opendatagrid, setOpendatagrid] = useState(false);
  const handleClickOpendatagrid = () => setOpendatagrid(true);
  const handleCloseOpendatagrid = () => {
    setOpendatagrid(false);
  };

  // Data
  // DetailCommande
  const [idcommande, setIdcommande] = useState('');
  const [quantite, setQuantite] = useState(0);
  const [prixunitaire, setPrixunitaire] = useState(0);
  const [description, setDescription] = useState('');
  const [article, setArticle] = useState('');
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
    const detailcommande = {
      iddetailcommande: iddetailcommande.iddetailcommande,
      idcommande: idcommande,
      idarticle: article,
      quantite: quantite,
      pu: prixunitaire,
      total: quantite * prixunitaire,
      description: description
    };
    let url = baseUrl + '/commande/singledetails';
    fetch(url, {
      crossDomain: true,
      method: 'POST',
      body: JSON.stringify(detailcommande),
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

    setMessage({
      text: "Aucune donnee n'a ete ajoutee!",
      severity: 'error',
      open: true
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let commandeParams = {
          iddetailcommande: iddetailcommande.iddetailcommande
        };
        let url = baseUrl + '/commande/getdetailcommande';
        const response = await fetch(url, {
          crossDomain: true,
          method: 'POST',
          body: JSON.stringify(commandeParams),
          headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`);
        }

        const responseData = await response.json();
        const newData = {
          clients: responseData.clients || [],
          articles: responseData.articles || []
        };
        setData(newData);
        setArticle(responseData.detailcommande.idarticle);
        setPrixunitaire(responseData.detailcommande.pu);
        setQuantite(responseData.detailcommande.quantite);
        setDescription(responseData.detailcommande.description);
        setIdcommande(responseData.detailcommande.idcommande);
      } catch (error) {
        setMessage({
          text: "Aucune donnee n 'a ete recuperee,veuillez verifier si le serveur est actif",
          severity: 'error',
          open: true
        });
      }
    };
    fetchData();
  }, [iddetailcommande.iddetailcommande]);

  const handleCancel = () => {
    window.location.replace('/admin/detailcommande/' + idcommande);
  };

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: 'Details commande', path: 'admin/detailcommande' },
            { name: 'Details commande' }
          ]}
        />
      </Box>
      <SimpleCard title="Modifier detail commande">
        <Box>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="text"
                name="commande"
                label="Commande"
                variant="outlined"
                value={idcommande}
                onChange={(event) => setIdcommande(event.target.value)}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12}>
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
              </Grid>{' '}
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                type="number"
                InputProps={{ inputProps: { min: 0 } }}
                name="quantite"
                label="Quantite"
                variant="outlined"
                value={quantite}
                onChange={(event) => setQuantite(event.target.value)}
                sx={{ mb: 3 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="number"
                InputProps={{ inputProps: { min: 0 } }}
                name="prixunitaire"
                label="Prix unitaire"
                variant="outlined"
                value={prixunitaire}
                onChange={(event) => setPrixunitaire(event.target.value)}
                sx={{ mb: 3 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={10}
                variant="outlined"
                label="Description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                sx={{ mb: 3 }}
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

export default Editdetailcommande;

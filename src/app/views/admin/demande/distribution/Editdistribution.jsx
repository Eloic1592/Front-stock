import {
  Box,
  TextField,
  Snackbar,
  Alert,
  Grid,
  Select,
  MenuItem,
  Radio,
  RadioGroup,
  FormControlLabel
} from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { Container } from 'app/views/style/style';
import { baseUrl } from 'app/utils/constant';
import { useParams } from 'react-router-dom';
import Datalistarticle from '../../Datagrid/Datalistarticle';
import { formatDate } from 'app/utils/utils';

const Editdistribution = () => {
  const iddistribution = useParams();
  console.log(iddistribution.iddistribution);
  const handleAlertClose = () => setMessage({ open: false });
  const [opendatagrid, setOpendatagrid] = useState(false);
  const handleClickOpendatagrid = () => setOpendatagrid(true);
  const handleCloseOpendatagrid = () => {
    setOpendatagrid(false);
  };
  // Data
  // Distribution
  const [datedistribution, setDatedistribution] = useState('');
  const [article, setArticle] = useState('');
  const [quantite, setQuantite] = useState(0);
  const [depot, setDepot] = useState(['1']);
  const [etatdistribue, setEtatdistribue] = useState('2');
  const [emplacement, setEmplacement] = useState('1');
  const [choix, setChoix] = useState('depot');
  const [data, setData] = useState({
    depots: [],
    articles: [],
    listeemplacements: []
  });

  // Message
  const [message, setMessage] = useState({
    text: 'Information enregistree',
    severity: 'success',
    open: false
  });

  const handleSubmit = () => {
    if (!datedistribution || !quantite || !article) {
      setMessage({
        text: 'Les champs suivants sont obligatoires : datedistribution, quantite, article',
        severity: 'error',
        open: true
      });
      return;
    }

    let distribution = {
      iddistribution: iddistribution.iddistribution,
      idarticle: article,
      datedistribution: datedistribution,
      quantite: quantite,
      iddepot: depot === '1' ? '' : depot,
      idemplacement: emplacement === '1' ? '' : emplacement,
      etatdistribue: etatdistribue,
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
        let inventoryParams = {
          iddistribution: iddistribution.iddistribution
        };
        let url = baseUrl + '/inventory/getdistribution';
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
          articles: responseData.articles || [],
          depots: responseData.depots || [],
          listeemplacements: responseData.listeemplacements || []
        };
        setData(newData);
        setQuantite(responseData.distribution.quantite);
        setDatedistribution(formatDate(responseData.distribution.datedistribution));
        setArticle(responseData.distribution.idarticle);
        setDepot(!responseData.distribution.iddepot ? '1' : responseData.distribution.iddepot);
        setEmplacement(
          !responseData.distribution.idemplacement ? '1' : responseData.distribution.idemplacement
        );
        setEtatdistribue(responseData.distribution.etatdistribue);
      } catch (error) {
        setMessage({
          text: "Aucune donnee n 'a ete recuperee,veuillez verifier si le serveur est actif",
          severity: 'error',
          open: true
        });
      }
    };
    fetchData();
  }, [iddistribution.iddistribution]);

  const handleCancel = () => {
    window.location.replace('/admin/distribution');
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
      <SimpleCard title="Modifier distribution">
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="datedistribution"
                variant="outlined"
                type="date"
                value={datedistribution}
                onChange={(e) => setDatedistribution(e.target.value)}
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
                  <FormControlLabel value="emplacement" control={<Radio />} label="Emplacement" />
                </RadioGroup>
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

export default Editdistribution;

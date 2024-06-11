import { Box, TextField, Snackbar, Alert, Grid, MenuItem, Select } from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';
import { signatures } from 'app/utils/utils';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { Container } from 'app/views/style/style';
import { baseUrl } from 'app/utils/constant';
import { useParams } from 'react-router-dom';

const Editmateriel = () => {
  const idmateriel = useParams();
  const handleAlertClose = () => setMessage({ open: false });
  const [message, setMessage] = useState({
    text: 'Information enregistree',
    severity: 'success',
    open: false
  });
  const [data, setData] = useState({
    typemateriels: [],
    listemateriel: {
      id: 0,
      idmateriel: '',
      idtypemateriel: '',
      typemateriel: '',
      marque: '',
      modele: '',
      numserie: '',
      couleur: '',
      description: '',
      prixvente: 0,
      caution: 0,
      signature: '',
      etat: '',
      statut: ''
    }
  });

  // Input
  const [couleur, setCouleur] = useState(['1']);
  const [marque, setMarque] = useState('');
  const [modele, setModele] = useState('');
  const [typemateriel, setTypemateriel] = useState(['1']);

  const [numserie, setNumserie] = useState('');
  const [description, setDescription] = useState('');
  const [prixvente, setPrixvente] = useState(0);
  const [caution, setCaution] = useState(0);
  const [disponibilite, setDisponibilite] = useState('2');
  const [signature, setSignature] = useState('1');

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
      idmateriel: idmateriel.idmateriel,
      marque: marque,
      modele: modele,
      idtypemateriel: typemateriel,
      description: description,
      numserie: numserie,
      prixvente: prixvente,
      caution: caution,
      couleur: couleur,
      statut: disponibilite,
      signature: signature
    };
    let url = baseUrl + '/materiel/createmateriel';
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
        let materielParams = {
          idmateriel: idmateriel.idmateriel
        };
        let url = baseUrl + '/materiel/getmateriel';
        const response = await fetch(url, {
          crossDomain: true,
          method: 'POST',
          body: JSON.stringify(materielParams),
          headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`);
        }

        const responseData = await response.json();

        const newData = {
          typemateriels: responseData.typemateriels || [],
          listemateriel: responseData.listemateriel || null
        };
        setData(newData);
        setMarque(newData.listemateriel.marque);
        setTypemateriel(newData.listemateriel.idtypemateriel);
        setModele(newData.listemateriel.modele);
        setDescription(newData.listemateriel.description);
        setNumserie(newData.listemateriel.numserie);
        setPrixvente(newData.listemateriel.prixvente);
        setCaution(newData.listemateriel.caution);
        setCouleur(newData.listemateriel.couleur);
        setSignature(newData.listemateriel.signature);
        setDisponibilite(newData.listemateriel.statutmateriel);
      } catch {
        setMessage({
          text: "Aucune donnee n 'a ete recuperee,veuillez verifier si le serveur est actif",
          severity: 'error',
          open: true
        });
      }
    };
    fetchData();
  }, [idmateriel]);

  const handleCancel = () => {
    window.location.replace('/admin/listemateriel');
  };

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[{ name: 'Materiel', path: 'admin/materiel' }, { name: 'Materiel' }]}
        />
      </Box>
      <SimpleCard title="Modifier un materiel">
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
                labelId="select-label"
                sx={{ mb: 3 }}
                value={typemateriel}
                onChange={(event) => setTypemateriel(event.target.value)}
                fullWidth
              >
                <MenuItem value="1" disabled>
                  Choisir un type
                </MenuItem>
                {data.typemateriels.map((row) => (
                  <MenuItem key={row.idtypemateriel} value={row.idtypemateriel}>
                    {row.typemateriel}
                  </MenuItem>
                ))}
              </Select>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                autoFocus
                id="numeroserie"
                type="text"
                margin="dense"
                label="Numero de serie"
                name="numserie"
                value={numserie}
                onChange={(event) => setNumserie(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                autoFocus
                id="prixvente"
                type="number"
                InputProps={{ inputProps: { min: 0 } }}
                margin="dense"
                label="Prix de vente"
                name="prixvente"
                value={prixvente}
                onChange={(event) => setPrixvente(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                autoFocus
                id="caution"
                type="number"
                InputProps={{ inputProps: { min: 0 } }}
                margin="dense"
                label="Caution"
                name="caution"
                value={caution}
                onChange={(event) => setCaution(event.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <Select
                labelId="select-label"
                sx={{ mb: 3 }}
                value={disponibilite}
                onChange={(event) => setDisponibilite(event.target.value)}
                fullWidth
              >
                <MenuItem value="2" disabled>
                  Choisir la disponibilite
                </MenuItem>
                <MenuItem value="0">Libre</MenuItem>
                <MenuItem value="1">Occupe</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={6}>
              <Select
                fullWidth
                labelId="select-label"
                value={signature}
                onChange={(event) => setSignature(event.target.value)}
                sx={{ mb: 3 }}
              >
                <MenuItem value="1">Toutes Signatures</MenuItem>
                {signatures.map((signature, index) => (
                  <MenuItem key={index} value={signature}>
                    {signature}
                  </MenuItem>
                ))}
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

export default Editmateriel;

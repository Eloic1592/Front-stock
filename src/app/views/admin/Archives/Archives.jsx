import { Box, Icon, Snackbar, Alert } from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';
import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { Container } from 'app/views/style/style';

const Archives = () => {
  const handleAlertClose = () => setMessage({ open: false });
  const [message, setMessage] = useState({
    text: 'Information enregistree',
    severity: 'success',
    open: false
  });
  useEffect(() => {
    setMessage({
      text: "Aucune donnee n'ete recuperee,veuillez verifier si le serveur est actif",
      severity: 'error',
      open: true
    });
  }, []);

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: 'Archives des stocks', path: 'admin/historique' },
            { name: 'Historique' }
          ]}
        />
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={4}>
          <SimpleCard title="Archives 2015">
            <Link to="/admin/historique">
              <Icon style={{ fontSize: 50 }}>folder</Icon>
              <Typography variant="subtitle1" color="textSecondary">
                Proforma 2015
              </Typography>
            </Link>
          </SimpleCard>
        </Grid>
        <Grid item xs={4}>
          <SimpleCard title="Archives 2016">
            <Icon style={{ fontSize: 50 }}>folder</Icon>
            <Typography variant="subtitle1" color="textSecondary">
              Proforma 2016
            </Typography>
          </SimpleCard>
        </Grid>
        <Grid item xs={4}>
          <SimpleCard title="Archives 2017">
            <Icon style={{ fontSize: 50 }}>folder</Icon>
            <Typography variant="subtitle1" color="textSecondary">
              Proforma 2017
            </Typography>
          </SimpleCard>
        </Grid>
        <Grid item xs={4}>
          <SimpleCard title="Archives 2018">
            <Icon style={{ fontSize: 50 }}>folder</Icon>
            <Typography variant="subtitle1" color="textSecondary">
              Proforma 2018
            </Typography>
          </SimpleCard>
        </Grid>
        <Grid item xs={4}>
          <SimpleCard title="Archives 2019">
            <Icon style={{ fontSize: 50 }}>folder</Icon>
            <Typography variant="subtitle1" color="textSecondary">
              Proforma 2019
            </Typography>
          </SimpleCard>
        </Grid>
        <Grid item xs={4}>
          <SimpleCard title="Archives 2020">
            <Icon style={{ fontSize: 50 }}>folder</Icon>
            <Typography variant="subtitle1" color="textSecondary">
              Proforma 2020
            </Typography>
          </SimpleCard>
        </Grid>
      </Grid>
      <Snackbar open={message.open} autoHideDuration={3000} onClose={handleAlertClose}>
        <Alert severity={message.severity} sx={{ width: '100%' }} variant="filled">
          {message.text}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Archives;

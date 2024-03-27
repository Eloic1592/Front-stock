import { Box, TextField, Select, MenuItem, Grid } from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';
import { months } from 'app/utils/utils';
import { useEffect, useState } from 'react';
import { baseUrl } from 'app/utils/constant';
import { Container } from 'app/views/style/style';
import FIFO from './FIFO';
import LIFO from './LIFO';
import Rotationstock from './Rotationstock';

const Dashboard = () => {
  // Input
  const [annee, setAnnee] = useState(0);
  const [month, setMonth] = useState('0');
  const [method, setMethod] = useState('0');
  const [initialDataFetched, setInitialDataFetched] = useState(false);
  const [message, setMessage] = useState({
    text: 'Information enregistree',
    severity: 'success',
    open: false
  });

  const [data, setData] = useState({
    rotationstocks: [],
    fifos: [],
    lifos: []
  });

  //  Use effect
  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = baseUrl + '/dashboard/dashboard';
        const response = await fetch(url, {
          crossDomain: true,
          method: 'POST',
          body: JSON.stringify({}),
          headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
          setMessage({
            text: "Il y a un probleme, aucune donnee n'a ete recuperee",
            severity: 'error',
            open: true
          });
        }
        const responseData = await response.json();
        const newData = {
          rotationstocks: responseData.rotationstocks || [],
          lifos: responseData.lifos || [],
          fifos: responseData.fifos || []
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

    if (!initialDataFetched) {
      fetchData();
      setInitialDataFetched(true);
    }
  }, []);

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: 'Tableau de bord', path: 'admin/dashboard' },
            { name: 'Tableau de bord' }
          ]}
        />
      </Box>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <SimpleCard title="" sx={{ marginBottom: '16px' }}>
            <form>
              <div style={{ display: 'flex', gap: '16px' }}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Select
                      fullWidth
                      labelId="month-select-label"
                      variant="outlined"
                      size="small"
                      value={month}
                      onChange={(event) => setMonth(event.target.value)}
                      sx={{ mb: 3 }}
                    >
                      <MenuItem value="0">Tous les mois</MenuItem>
                      {months.map((monthName, index) => (
                        <MenuItem key={index + 1} value={index + 1}>
                          {monthName}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                  <Grid item xs={6}>
                    <Select
                      fullWidth
                      labelId="month-select-label"
                      variant="outlined"
                      size="small"
                      value={method}
                      onChange={(event) => setMethod(event.target.value)}
                      sx={{ mb: 3 }}
                    >
                      <MenuItem value="0">Rotation de stock</MenuItem>
                      <MenuItem key="1" value="1">
                        FIFO
                      </MenuItem>
                      <MenuItem key="2" value="2">
                        LIFO
                      </MenuItem>
                    </Select>
                  </Grid>
                </Grid>
              </div>
            </form>
          </SimpleCard>
        </Grid>
        <Grid item>
          <Rotationstock rotationstocks={data.rotationstocks} />
        </Grid>
        <Grid item>
          <FIFO fifos={data.fifos} />
        </Grid>
        <Grid item>
          <LIFO lifos={data.lifos} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;

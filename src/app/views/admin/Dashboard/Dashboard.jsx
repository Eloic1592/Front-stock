import { Box, TextField, Select, MenuItem, Grid } from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';
import { months } from 'app/utils/utils';
import { useEffect, useState } from 'react';
import { Container } from 'app/views/style/style';

const Dashboard = () => {
  // Input
  const [annee, setAnnee] = useState(0);
  const [month, setMonth] = useState('0');

  // // Message
  // const [message, setMessage] = useState({
  //   text: 'Information enregistree',
  //   severity: 'success',
  //   open: false
  // });

  useEffect(() => {}, []);

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
      <SimpleCard title="" sx={{ marginBottom: '16px' }}>
        <form>
          <div style={{ display: 'flex', gap: '16px' }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  InputProps={{ inputProps: { min: 0 } }}
                  name="annee"
                  label="Annee"
                  variant="outlined"
                  value={annee}
                  onChange={(event) => setAnnee(event.target.value)}
                  sx={{ mb: 3 }}
                />
              </Grid>
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
            </Grid>
          </div>
        </form>
      </SimpleCard>
    </Container>
  );
};

export default Dashboard;

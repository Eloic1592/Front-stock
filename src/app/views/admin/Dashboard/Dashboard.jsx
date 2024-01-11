import { Box, TextField, Select, MenuItem, Grid } from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';

import { useEffect, useState } from 'react';
import PaginationTable from 'app/views/material-kit/tables/PaginationTable';
import { deleteData, Finddata, insertData, UpdateData } from '../../functions';
import { Container, AutoComplete } from 'app/views/style/style';

const Dashboard = () => {
  // Input
  const [annee, setAnnee] = useState(0);
  const [mois, setMois] = useState(0);

  // Message
  const [message, setMessage] = useState({
    text: 'Information enregistree',
    severity: 'success',
    open: false
  });

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
                  size="small"
                  labelId="select-label"
                  value={'1'}
                  //  onChange={handleChange}
                >
                  <MenuItem value="1">Janvier</MenuItem>
                  <MenuItem value="2">Fevrier</MenuItem>
                  <MenuItem value="3">Mars</MenuItem>
                  <MenuItem value="4">Avril</MenuItem>
                  <MenuItem value="5">Mai</MenuItem>
                  <MenuItem value="6">Juin</MenuItem>
                  <MenuItem value="7">Juillet</MenuItem>
                  <MenuItem value="8">Aout</MenuItem>
                  <MenuItem value="9">Septembre</MenuItem>
                  <MenuItem value="10">Octobre</MenuItem>
                  <MenuItem value="11">Novembre</MenuItem>
                  <MenuItem value="12">Decembre</MenuItem>
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

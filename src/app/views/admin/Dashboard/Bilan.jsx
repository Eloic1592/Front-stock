import { Box, TextField, Select, MenuItem } from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';
import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Container } from 'app/views/style/style';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { grey } from '@mui/material/colors';
const Bilan = () => {
  // Utiliser moment pour les dates
  const localizer = momentLocalizer(moment);
  const events = [
    {
      id: 1,
      title: 'Inventaire Clavier',
      start: new Date(2024, 5, 7, 10, 0), // Date et heure de début (année, mois, jour, heure, minute)
      end: new Date(2024, 5, 7, 12, 0), // Date et heure de fin
      desc: "Réunion avec l'équipe de projet"
    },
    {
      id: 2,
      title: 'Inventaire Unite centrale',
      start: new Date(2024, 5, 8, 12, 0),
      end: new Date(2024, 5, 8, 13, 0),
      desc: 'Déjeuner avec un client'
    },
    {
      id: 3,
      title: 'Inventaire Laptop',
      start: new Date(2024, 5, 10, 14, 0),
      end: new Date(2024, 5, 10, 16, 0),
      desc: 'Inventaire Laptop'
    }
    // Ajoutez d'autres événements si nécessaire
  ];

  useEffect(() => {}, []);

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[{ name: 'Inventaire', path: 'admin/bilan' }, { name: 'Inventaire' }]}
        />
      </Box>
      <Grid container spacing={2} direction="row">
        <Grid item xs={12}>
          <SimpleCard title="Calendrier d'inventaire" sx={{ marginBottom: '16px' }}>
            <div>
              <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }} // Ajustez la hauteur selon vos besoins
              />
            </div>
          </SimpleCard>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" style={{ fontWeight: 'bold', fontSize: '1.0rem' }}>
            Pour aujourd'hui
          </Typography>{' '}
        </Grid>
        <Grid item xs={12}>
          <SimpleCard title="Inventaire du 05 Juin 2024">
            <Typography
              variant="body1"
              style={{ fontWeight: 'bold', fontSize: '1.0rem', color: grey, opacity: 0.8 }}
            >
              Inventaire laptop et clavier
            </Typography>{' '}
          </SimpleCard>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Bilan;

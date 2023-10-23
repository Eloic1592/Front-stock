import React from 'react';
import { Box,Card, Grid,styled} from '@mui/material';
import { Breadcrumb} from "app/components";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Fragment } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import {frenchTranslations} from 'app/views/frenchtransalations';

const localizer = momentLocalizer(moment);

// const localizer = momentLocalizer(moment); // Assurez-vous d'importer moment
const ContentBox = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: { margin: '16px' },
  }));
  
  
const Calendrier = () => {

  const frenchDayNames = [
    'Dimanche',
    'Lundi',
    'Mardi',
    'Mercredi',
    'Jeudi',
    'Vendredi',
    'Samedi'
  ];

  return (
    <Fragment>
      <ContentBox className="analytics">
        <Grid container spacing={6}>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Card sx={{ px: 3, py: 2, mb: 2 }}>
              <Box className="breadcrumb">
                <Breadcrumb routeSegments={[{ name: "Agenda" }]} />
              </Box>
            </Card>
            <div>
              <h1>Calendrier des disponibilités</h1>
              <Calendar
                localizer={localizer}
                events={[
                  {
                    title: 'Indisponibilite tech',
                    start: new Date(),
                    end: new Date(),
                  },
                  // Ajoutez d'autres événements ici
                ]}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }} // Ajustez la hauteur selon vos préférences
                messages={frenchTranslations}
                dayPropGetter={date => ({
                  className: '',
                  style: {
                    textAlign: 'center'
                  },
                  'data-tooltip': frenchDayNames[date.getDay()] // Utilisez les noms des jours en français
                })}
              />
            </div>
          </Grid>
        </Grid>
      </ContentBox>
    </Fragment>
  );
}

export default Calendrier;

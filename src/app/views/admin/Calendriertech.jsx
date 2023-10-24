import React from 'react';
import { Box,Card, Grid,styled} from '@mui/material';
import { Breadcrumb} from "app/components";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Fragment,useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import {frenchTranslations} from 'app/views/frenchtransalations';
import moment from 'moment';

const localizer = momentLocalizer(moment);

const ContentBox = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: { margin: '16px' },
  }));

  
const Calendriertech = () => {
    const [events, setEvents] = useState([
        {
          title: "Indisponibilite tech",
          start: new Date(),
          end: new Date(),
        },
        {
          title: "Rendez-vous client",
          start: new Date(),
          end: new Date(),
        },
        {
          title: "Rendez-vous client",
          start: new Date(),
          end: new Date(),
        },
        {
          title: "Rendez-vous client",
          start: new Date(),
          end: new Date(),
        },
      ]);

    return (
    <Fragment>
      <ContentBox className="analytics">
        <Grid container spacing={6}>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Card sx={{ px: 3, py: 2, mb: 2 }}>
              <Box className="breadcrumb">
                <Breadcrumb routeSegments={[{ name: "Agenda des techniciens" }]} />
              </Box>
            </Card>
              <h1>Agenda des techniciens</h1>
              <div>             
              <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }} // Ajustez la hauteur selon vos préférences
                messages={frenchTranslations}
              />
            </div>
          </Grid>
        </Grid>
      </ContentBox>
    </Fragment>
  );
}

export default Calendriertech;

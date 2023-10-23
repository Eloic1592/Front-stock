import React from 'react';
import { Box,Card, Grid,styled} from '@mui/material';
import { Breadcrumb} from "app/components";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Fragment } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

const localizer = momentLocalizer(moment);

// const localizer = momentLocalizer(moment); // Assurez-vous d'importer moment
const ContentBox = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: { margin: '16px' },
  }));
  
  
const Calendrier = () => {
  return (
    <Fragment>
      <ContentBox className="analytics">
        <Grid container spacing={6}>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Card sx={{ px: 3, py: 2, mb: 2 }}>
              <Box className="breadcrumb">
                <Breadcrumb routeSegments={[{ name: "Calendrier" }]} />
              </Box>
            </Card>
            <div>
              <h1>Calendrier</h1>
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
              />
            </div>
          </Grid>
        </Grid>
      </ContentBox>
    </Fragment>
  );
}

export default Calendrier;

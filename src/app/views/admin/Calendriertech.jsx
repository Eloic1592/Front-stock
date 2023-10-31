import React from 'react';
import { Box,Card, Grid,styled,Autocomplete,TextField} from '@mui/material';
import { Breadcrumb,SimpleCard} from "app/components";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Fragment } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import {frenchTranslations} from 'app/views/frenchtransalations';
import moment from 'moment';
import useData from 'app/useData';

const localizer = momentLocalizer(moment);

const ContentBox = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: { margin: '16px' },
  }));

const AutoComplete = styled(Autocomplete)(() => ({
    width: 300,
    marginBottom: '16px',
}));

  
const Calendriertech = () => {
  const listdisponibilite=useData('getalldisponibilite');
  const technicien=useData('gettechnicien');


      const events = listdisponibilite.map(listdisponibilite => ({

        title: listdisponibilite.motif, // Le titre de l'événement

        start: new Date(listdisponibilite.dateDebut), // Date de début

        end: new Date(listdisponibilite.dateFin) // Date de fin

      }));

      

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
              <SimpleCard title="Rechercher un materiel" sx={{ marginBottom: '16px' }}>        
              <form /* onSubmit={this.handleSubmit}*/>
              <div style={{ display: 'flex', gap: '16px' }}>
              <AutoComplete
                     options={technicien}
                     getOptionLabel={(option) => option.code}
                     renderInput={(params) => (
                       <TextField {...params} label="Technicien" variant="outlined" fullWidth />
                     )}
                     name="idtcechnicien"
                     id="idtcechnicien"
                   />
            </div>
            </form>
              </SimpleCard>

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

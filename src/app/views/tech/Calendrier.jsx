import React from 'react';
import { Box,Card, Grid,styled,Button,Dialog,TextField,DialogTitle,DialogActions,DialogContent} from '@mui/material';
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



  
const Calendrier = () => {
    // Liste des evenements
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
    ]);
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
      
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
                 <p>
               <Button variant="contained" onClick={handleClickOpen} color="primary">
                   Nouvel evenement
                 </Button>
                </p>
                 <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                 <DialogTitle id="form-dialog-title">Nouvel evenement</DialogTitle>
                 <DialogContent>
                 <TextField
                     fullWidth
                     autoFocus
                     id="idtechnicien"
                     type="hidden"
                     name="idtechnicien"
                   />
                  <TextField
                     fullWidth
                     autoFocus
                     id="motif"
                     type="text"
                     margin="dense"
                     label="Motif"
                     name="salle"
                   />
                  <TextField
                     fullWidth
                     autoFocus
                     id="date_debut"
                     type="text"
                     margin="dense"
                     label="Date debut"
                     name="date_debut"
                   />
                    <TextField
                     fullWidth
                     autoFocus
                     id="date_fin"
                     type="text"
                     margin="dense"
                     label="Date fin"
                     name="date_fin"
                   />
                 </DialogContent>

                 <DialogActions>
                   <Button variant="outlined" color="secondary" onClick={handleClose}>
                     Annuler
                   </Button>

                   <Button onClick={handleClose} color="primary">
                     Valider
                   </Button>
                 </DialogActions>
               </Dialog>
                 <h1>Calendrier des disponibilités</h1>

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

export default Calendrier;

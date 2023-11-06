import React from 'react';
import { Box,Card, Grid,styled,Button,Dialog,TextField,DialogTitle,DialogActions,DialogContent,Snackbar,Alert} from '@mui/material';
import { Breadcrumb} from "app/components";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Fragment,useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import {frenchTranslations} from 'app/views/frenchtransalations';
import moment from 'moment';
import getUselink from 'app/views/getuseLink';
import useData from 'app/useData';
import {insertData} from 'app/views/insertData';



const localizer = momentLocalizer(moment);

const ContentBox = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: { margin: '16px' },
  }));




  
const Calendrier = () => {
  // Data
  const idtechnicien=localStorage.getItem('idtechnicien');
  const listdisponibilite=useData('getvdisponibilite/'+idtechnicien);
  
      // Form input
      const [open, setOpen] = useState(false);
      const handleClickOpen = () => setOpen(true);
      const handleClose = () => setOpen(false);
      const [motif,setMotif]=useState('');
      const [datedeb,setDatedeb]=useState(Date.now());
      const [datefin,setDatefin]=useState(Date.now());

      // Message
      const [message,setMessage]= useState({
        text:'Information enregistree',
        severity:'success',
        open:false,
      });


    
    const handleSubmit = async  () => {
      const result = await insertData({
          "idtechnicien":idtechnicien,
          "motif": motif,
          "dateDebut":new Date(datedeb).getTime(),
          "dateFin":new Date(datefin).getTime(),
          "etat":0
        },
        getUselink()+'inserttypeentretien');

        setMessage({
            text:result.text,
            severity:result.severity,
            open:result.open,
          });
          window.location.reload();
    }

    // Events calendar
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
                 <input
                     fullWidth
                     autoFocus
                     id="idtechnicien"
                     type="hidden"
                     name="idtechnicien"
                     value={idtechnicien}
                   />
                  <TextField
                     fullWidth
                     autoFocus
                     id="motif"
                     type="text"
                     margin="dense"
                     label="Motif"
                     name="salle"
                     value={motif}
                     onChange={(event) => setMotif(event.target.value)}
                   />
                   Date debut
                  <TextField
                     fullWidth
                     autoFocus
                     id="date_debut"
                     type="datetime-local"
                     margin="dense"
                     name="date_debut"
                     value={datedeb}
                     onChange={(event) => setDatedeb(event.target.value)}
                   />
                   Date fin
                    <TextField
                     fullWidth
                     autoFocus
                     id="date_fin"
                     type="datetime-local"
                     margin="dense"
                     name="date_fin"
                     value={datefin}
                     onChange={(event) => setDatefin(event.target.value)}
                   />
                 </DialogContent>

                 <DialogActions>
                   <Button variant="outlined" color="secondary" onClick={handleClose}>
                     Annuler
                   </Button>

                   <Button onClick={handleSubmit} color="primary">
                     Valider
                   </Button>
                 </DialogActions>
               </Dialog>
               <Snackbar open={message.open} autoHideDuration={6000}>
             <Alert  severity={message.severity} sx={{ width: '100%' }} variant="filled">
                {message.text}
             </Alert>
           </Snackbar>
           
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

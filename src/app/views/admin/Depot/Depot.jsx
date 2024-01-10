import { Box,TextField,Snackbar,Alert,DialogContent,DialogActions,DialogTitle,Dialog } from "@mui/material";
import { Breadcrumb } from "app/components";
import { useState,useEffect } from 'react';
import Button from '@mui/material/Button';
import { deleteData, Finddata, insertData, UpdateData } from '../../functions';
import Listedepot from "./Listedepot";
import { Container } from "app/views/style/style";

  
const Depot = () => {

  // Form dialog
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleAlertClose = () => setMessage({open:false});

   // Data
  const [materielfilter, setMaterielfilter] = useState('');

    // Input 
  const [depot, setDepot] = useState('');

    // Message
    const [message,setMessage]= useState({
      text:'Information enregistree',
      severity:'success',
      open:false,
    });
  
  // Validation form
    const handleSubmit = async  () => {
    }

    useEffect(() => {
    },[]);

   const donnees = [
    { id: 5, depot: 'Depot 9', /* other fields... */ },
    { id: 2, depot: 'Depot 70', /* other fields... */ },
    { id: 1, depot: 'Depot 45', /* other fields... */ },
    { id: 6, depot: 'Depot 17', /* other fields... */ },
    { id: 4, depot: 'Depot 4', /* other fields... */ },
    { id: 3, depot: 'Depot 3', /* other fields... */ },
    // More rows...
   ];
   
    return (
        <Container>
        <Box className="breadcrumb">
          <Breadcrumb routeSegments={[{ name: "Depot", path: "admin/depot" }, { name: "Depot" }]} />
        </Box>
        <p>
         <Button variant="contained" onClick={handleClickOpen} color="primary">
           Nouveau Depot
         </Button>&nbsp;&nbsp;
           {/* <Button variant="contained" color="secondary">
            Importer les donnees
          </Button> */}
         </p>
          <Box>
               <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                 <DialogTitle id="form-dialog-title">Nouveau Depot</DialogTitle>
                 <DialogContent>
                  <TextField
                     fullWidth
                     autoFocus
                     id="depot"
                     type="text"
                     margin="dense"
                     label="depot"
                     name="depot"
                     value={depot}
                     onChange={(event) => setDepot(event.target.value)}
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
             </Box>

                <Snackbar open={message.open} autoHideDuration={3000} onClose={handleAlertClose}>
                <Alert  severity={message.severity} sx={{ width: '100%' }} variant="filled">
                   {message.text}
                </Alert>
              </Snackbar>
              <Listedepot data={donnees} />        
      </Container>
    );
  };
  
export default Depot;

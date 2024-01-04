import { Box, styled,TextField,Snackbar,Alert,DialogContent,DialogActions,DialogTitle,Dialog } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import { useState,useEffect } from 'react';
import Button from '@mui/material/Button';
import { deleteData, Finddata, insertData, UpdateData } from '../../functions';
import Listedepot from "./Listedepot";



const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
      marginBottom: "30px",
      [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
    },
  }));

  
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
           <Button variant="contained" color="secondary">
            Importer les donnees
          </Button>
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
             <SimpleCard title="Rechercher un depot" sx={{ marginBottom: '16px' }}>        
              <form /* onSubmit={this.handleSubmit}*/>
              <div style={{ display: 'flex', gap: '16px' }}>
              <TextField
               fullWidth
               size="small"
               type="text"
               name="materielfiltre"
               label="Nom du depot"
               variant="outlined"
               value={materielfilter}
               onChange={(event) => setMaterielfilter(event.target.value)}
               sx={{ mb: 3 }}
             />
            </div>
            </form>
              </SimpleCard>
                <p></p>
                <p></p>
                <Snackbar open={message.open} autoHideDuration={3000} onClose={handleAlertClose}>
                <Alert  severity={message.severity} sx={{ width: '100%' }} variant="filled">
                   {message.text}
                </Alert>
              </Snackbar>

              <SimpleCard title="Liste des depots">
              <Listedepot data={donnees} />        
              </SimpleCard>
      </Container>
    );
  };
  
export default Depot;

// function filtremateriel(listemateriel, materiel) {
//   return listemateriel.filter((Item) => {
//     return Item.materiel.toLowerCase().includes(materiel.toLowerCase());
//   });
// }
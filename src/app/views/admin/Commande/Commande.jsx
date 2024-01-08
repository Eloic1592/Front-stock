import { Box, styled,Icon, IconButton,TextField,Tooltip,Snackbar,Alert,DialogContent,DialogActions,DialogTitle,Dialog } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";


import { useState,useEffect } from 'react';
import Button from '@mui/material/Button';
import { deleteData, Finddata, insertData, UpdateData } from '../../functions';
import Listecommande from "./Listecommande";



const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
      marginBottom: "30px",
      [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
    },
  }));

  
const Commande = () => {

  // Form dialog
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleAlertClose = () => setMessage({open:false});

   // Data

    // Input 
  const [materiel, setMateriel] = useState('');
  const [icon, setIcon] = useState('');

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
      { id: 1, datecommande: 'COM1',marque:"CL1",modele:"DEV1",idcommande:"COMMAND1",description:"Description",quantite:23,prixunitaire:15,total:235,statut:"1" /* other fields... */ },
      { id: 2, datecommande: 'COM1',marque:"CL1",modele:"DEV1",idcommande:"COMMAND1",description:"Description",quantite:1,prixunitaire:234,total:34,statut:"1" /* other fields... */ },
      { id: 3, datecommande: 'COM1',marque:"CL1",modele:"DEV1",idcommande:"COMMAND1",description:"Description",quantite:10,prixunitaire:12,total:346,statut:"1" /* other fields... */ },
      { id: 4, datecommande: 'COM1',marque:"CL1",modele:"DEV1",idcommande:"COMMAND1",description:"Description",quantite:4,prixunitaire:25,total:45,statut:"1" /* other fields... */ },
      { id: 5, datecommande: 'COM1',marque:"CL1",modele:"DEV1",idcommande:"COMMAND1",description:"Description",quantite:6,prixunitaire:6,total:456,statut:"1" /* other fields... */ },
      { id: 6, datecommande: 'COM1',marque:"CL1",modele:"DEV1",idcommande:"COMMAND1",description:"Description",quantite:45,prixunitaire:97,total:78,statut:"1" /* other fields... */ },
      { id: 7, datecommande: 'COM1',marque:"CL1",modele:"DEV1",idcommande:"COMMAND1",description:"Description",quantite:6,prixunitaire:56,total:78,statut:"1" /* other fields... */ },
     ];
 
    return (
        <Container>
        <Box className="breadcrumb">
          <Breadcrumb routeSegments={[{ name: "Commande", path: "admin/commande" }, { name: "Commande" }]} />
        </Box>
        <p>
           <Button variant="contained" onClick={handleClickOpen} color="primary">
             Nouveau bon de commande
           </Button>&nbsp;&nbsp;        
           <Button variant="contained" color="secondary">
            Importer un bon
          </Button>
          </p>
          <Box>
               <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                 <DialogTitle id="form-dialog-title">Nouveau bon de commande</DialogTitle>
                 <DialogContent>
                  <TextField
                     fullWidth
                     autoFocus
                     id="datebon"
                     type="date"
                     margin="dense"
                     name="datebon"
                     value={materiel}
                     onChange={(event) => setMateriel(event.target.value)}
                   />
                    <TextField
                     fullWidth
                     autoFocus
                     id="nom"
                     type="text"
                     margin="dense"
                     label="Nom du client"
                     name="nom"
                     value={icon}
                     onChange={(event) => setIcon(event.target.value)}
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
             <SimpleCard title="Rechercher un bon de commande" sx={{ marginBottom: '16px' }}>        
              <form /* onSubmit={this.handleSubmit}*/>
              <div style={{ display: 'flex', gap: '16px' }}>
              <TextField
                fullWidth
                size="small"
                id="datebon"
                type="date"
                margin="dense"
                name="datebon"
                value={materiel}
                onChange={(event) => setMateriel(event.target.value)}
              />
              <TextField
                fullWidth
                size="small"
                id="nom"
                type="text"
                margin="dense"
                label="Nom du client"
                name="nom"
                value={icon}
                onChange={(event) => setIcon(event.target.value)}
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

              <SimpleCard title="Bon de commande">
        <Listecommande  data={donnees} />
        </SimpleCard>
      </Container>
    );
  };
  
export default Commande;

// function filtremateriel(listemateriel, materiel) {
//   return listemateriel.filter((Item) => {
//     return Item.materiel.toLowerCase().includes(materiel.toLowerCase());
//   });
// }
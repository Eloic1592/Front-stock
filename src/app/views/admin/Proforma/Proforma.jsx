import { Box,TextField,Snackbar,Alert,DialogContent,DialogActions,DialogTitle,Dialog,Grid,Button } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import { useState,useEffect } from 'react';
import { deleteData, Finddata, insertData, UpdateData } from '../../functions';
import Listeproforma from "./Listeproforma";
import { Container,AutoComplete } from "app/views/style/style";

  
const Proforma = () => {

  // Form dialog
  const handleAlertClose = () => setMessage({open:false});
  const [file, setFile] = useState('');
  const handleFileOpen = () => setFileOpen(true);
  const handleFileClose = () => setFileOpen(false);
  const [fileOpen, setFileOpen] = useState(false);

   // Data
   const [datedevis, setDatedevis] = useState('');

    // Input 


    // Message
    const [message,setMessage]= useState({
      text:'Information enregistree',
      severity:'success',
      open:false,
    });
  


    useEffect(() => {

    },[]);

    const donnees = [
      { id: 1, idcommande: 'COM1',idclient:"CL1",iddevis:"DEV1",statut:"1" /* other fields... */ },
      { id: 10, idcommande: 'COM1',idclient:"CL1",iddevis:"DEV1",statut:"1" /* other fields... */ },
      { id: 3, idcommande: 'COM1',idclient:"CL1",iddevis:"DEV1",statut:"1" /* other fields... */ },
      { id: 4, idcommande: 'COM1',idclient:"CL1",iddevis:"DEV1",statut:"1" /* other fields... */ },
      { id: 5, idcommande: 'COM1',idclient:"CL1",iddevis:"DEV1",statut:"1" /* other fields... */ },
      { id: 7, idcommande: 'COM1',idclient:"CL1",iddevis:"DEV1",statut:"1" /* other fields... */ },
      { id: 8, idcommande: 'COM1',idclient:"CL1",iddevis:"DEV1",statut:"1" /* other fields... */ },

     ];
    return (
        <Container>
        <Box className="breadcrumb">
          <Breadcrumb routeSegments={[{ name: "Proforma", path: "admin/proforma" }, { name: "Proforma" }]} />
        </Box>
        <p>
           <Button variant="contained" onClick={handleFileOpen} color="secondary">
            Exporter des données
            </Button>
        </p>
             <SimpleCard title="Rechercher un proforma" sx={{ marginBottom: '16px' }}>        
              <form >
              <div style={{ display: 'flex', gap: '16px' }}>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <TextField
                   fullWidth
                   size="small"
                   type="date"
                   name="datedevis"
                   variant="outlined"
                   value={datedevis}
                   onChange={(event) => setDatedevis(event.target.value)}
                   sx={{ mb: 3 }}
                  />
             </Grid>
             <Grid item xs={6}>
                <AutoComplete
                  fullWidth
                  size="small"
                  // options={suggestions}
                  getOptionLabel={(option) => option.label}
                  renderInput={(params) => (
                    <TextField {...params} label="Nom du client" variant="outlined" fullWidth />
                )}
                  name="idmateriel"
                  id="idmateriel"
                />
              </Grid>
            </Grid>
            </div>
            </form>
              </SimpleCard>
              <Box>
               <Dialog open={fileOpen} onClose={handleFileClose} aria-labelledby="form-dialog-title">
                 <DialogTitle id="form-dialog-title">Exporter des donnees</DialogTitle>
                 <DialogContent>
                  <TextField
                   fullWidth
                    size="small"
                    type="number"
                    name="annee"
                    label="De quel annee ?"
                     value={file}
                     onChange={(event) => setFile(event.target.value)}
                   />
                 </DialogContent>

                 <DialogActions>
                   <Button variant="outlined" color="secondary" onClick={handleFileClose}>
                     Annuler
                   </Button>
                   <Button /*onClick={handleSubmit}*/ color="primary">
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
              
          <Listeproforma  data={donnees} />

      </Container>
    );
  };
  
export default Proforma;

// function filtremateriel(listemateriel, materiel) {
//   return listemateriel.filter((Item) => {
//     return Item.materiel.toLowerCase().includes(materiel.toLowerCase());
//   });
// }
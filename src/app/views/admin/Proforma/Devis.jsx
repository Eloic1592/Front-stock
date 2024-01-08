import { Box, styled,Icon, IconButton,TextField,Tooltip,Snackbar,Alert,DialogContent,DialogActions,DialogTitle,Dialog,Autocomplete,Grid } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import { useData } from 'app/useData';
import { useState,useEffect } from 'react';
import PaginationTable from "app/views/material-kit/tables/PaginationTable";
import Button from '@mui/material/Button';
import getUselink from 'app/views/getuseLink';
import { deleteData, Finddata, insertData, UpdateData } from '../../functions';
import Listedevis from "./Listedevis";



const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
      marginBottom: "30px",
      [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
    },
  }));

  const AutoComplete = styled(Autocomplete)(() => ({
    marginBottom: '16px',
  }));


  
const Devis = () => {

  // Form dialog
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleAlertClose = () => setMessage({open:false});

   // Data

  const [materielfilter, setMaterielfilter] = useState('');
  // const listematfilter = filtremateriel(listemateriel,materielfilter);

    // Input 
  const [datedevis, setDatedevis] = useState('');
  const [idcommande, setIdcommande] = useState('');
  const [idclient, setIdclient] = useState('');

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
      { id: 1, idcommande: 'COM1',idclient:"CL1",iddevis:"DEV1",statut:"1" /* other fields... */ },
      { id: 1, idcommande: 'COM1',idclient:"CL1",iddevis:"DEV1",statut:"1" /* other fields... */ },
      { id: 1, idcommande: 'COM1',idclient:"CL1",iddevis:"DEV1",statut:"1" /* other fields... */ },
      { id: 1, idcommande: 'COM1',idclient:"CL1",iddevis:"DEV1",statut:"1" /* other fields... */ },
      { id: 1, idcommande: 'COM1',idclient:"CL1",iddevis:"DEV1",statut:"1" /* other fields... */ },
      { id: 1, idcommande: 'COM1',idclient:"CL1",iddevis:"DEV1",statut:"1" /* other fields... */ },
      { id: 1, idcommande: 'COM1',idclient:"CL1",iddevis:"DEV1",statut:"1" /* other fields... */ },

     ];

    return (
        <Container>
        <Box className="breadcrumb">
          <Breadcrumb routeSegments={[{ name: "Devis", path: "admin/devis" }, { name: "Devis" }]} />
        </Box>
        <p>
           <Button variant="contained" onClick={handleClickOpen} color="primary">
             Nouveau devis
           </Button>
          </p>
          <Box>
               <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                 <DialogTitle id="form-dialog-title">Nouveau devis</DialogTitle>
                 <DialogContent>
                  <TextField
                     fullWidth
                     autoFocus
                     id="datedevis"
                     type="date"
                     margin="dense"
                     name="datedevis"
                     value={datedevis}
                     onChange={(event) => setDatedevis(event.target.value)}
                   />
                  <AutoComplete
                    fullWidth
                    // options={suggestions}
                    getOptionLabel={(option) => option.label}
                    // onChange={(event) => setIdcommande(event.target.value)}
                    // value={idcommande}
                    renderInput={(params) => (
                      <TextField {...params} label="Commande" variant="outlined" fullWidth />
                  )}/>
                  <AutoComplete
                    fullWidth
                    // options={suggestions}
                    getOptionLabel={(option) => option.label}
                    // onChange={(event) => setIdclient(event.target.value)}
                    // value={idclient}
                    renderInput={(params) => (
                      <TextField {...params} label="Nom du client" variant="outlined" fullWidth />
                  )}
                    name="idmateriel"
                    id="idmateriel"
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
             <SimpleCard title="Rechercher un devis" sx={{ marginBottom: '16px' }}>        
              <form /* onSubmit={this.handleSubmit}*/>
              <div style={{ display: 'flex', gap: '16px' }}>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <TextField
                   fullWidth
                   size="small"
                   type="date"
                   name="datedevis"
                   variant="outlined"
                   value={materielfilter}
                   onChange={(event) => setMaterielfilter(event.target.value)}
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
                <p></p>
                <p></p>
                <Snackbar open={message.open} autoHideDuration={3000} onClose={handleAlertClose}>
                <Alert  severity={message.severity} sx={{ width: '100%' }} variant="filled">
                   {message.text}
                </Alert>
              </Snackbar>

              <SimpleCard title="Liste des devis">
        <Listedevis  data={donnees} />
        </SimpleCard>
      </Container>
    );
  };
  
export default Devis;

function filtremateriel(listemateriel, materiel) {
  return listemateriel.filter((Item) => {
    return Item.materiel.toLowerCase().includes(materiel.toLowerCase());
  });
}
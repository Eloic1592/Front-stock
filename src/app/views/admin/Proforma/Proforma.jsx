import { Box, styled,TextField,Snackbar,Alert,Autocomplete,Grid } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import { useState,useEffect } from 'react';
import { deleteData, Finddata, insertData, UpdateData } from '../../functions';
import Listeproforma from "./Listeproforma";



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

  
const Proforma = () => {

  // Form dialog
  const handleAlertClose = () => setMessage({open:false});

   // Data
   const [datedevis, setDatedevis] = useState('');
   const [idclient, setIdclient] = useState('');

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
             <SimpleCard title="Rechercher un proforma" sx={{ marginBottom: '16px' }}>        
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
                <p></p>
                <p></p>
                <Snackbar open={message.open} autoHideDuration={3000} onClose={handleAlertClose}>
                <Alert  severity={message.severity} sx={{ width: '100%' }} variant="filled">
                   {message.text}
                </Alert>
              </Snackbar>
              
              <SimpleCard title="Liste des proformas">
        <Listeproforma  data={donnees} />
        </SimpleCard>
      </Container>
    );
  };
  
export default Proforma;

// function filtremateriel(listemateriel, materiel) {
//   return listemateriel.filter((Item) => {
//     return Item.materiel.toLowerCase().includes(materiel.toLowerCase());
//   });
// }
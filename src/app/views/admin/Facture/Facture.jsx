import { Box, styled,TextField,Snackbar,Alert,DialogContent,DialogActions,DialogTitle,Dialog,MenuItem,Select,Autocomplete } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import { useState,useEffect } from 'react';
import CustomizedTable from "app/views/material-kit/tables/CustomizedTable";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Listefacture from "./Listefacture";


const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
      marginBottom: "30px",
      [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
    },
  }));

  const AutoComplete = styled(Autocomplete)(() => ({
    width: 300,
    marginBottom: '16px',
}));
  
const Facture = () => {
  // Input 
  const [idmouvement, setIdmouvement] = useState('');
  const [datefacture, setDatefacture] = useState('');
  const [quantite, setQuantite] = useState(0);
  const [prixunitaire, setPrixunitaire] = useState(0);
  const [formData, setFormData] = useState([]);


  // Data
  const[listefacture,setListeFacture]= useState([]);
  const[client,setClient]= useState([]);
  // Message
  const [message,setMessage]= useState({
    text:'Information enregistree',
    severity:'success',
    open:false,
  });
  const handleAlertClose = () => setMessage({open:false});

  // Form dialog
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);

  // Close form
  const handleClose = () => setOpen(false);

  // Validation form
  const handleSubmit = (event) => {
    event.preventDefault();
   
    const newData = {
    article: '1',
    quantite: '2',
    prixunitaire: '4', 
    total: '8', // Remplacez par la valeur réelle du nom du client
    };
   
    setFormData([...formData, newData]);
   };

  // Reset data to null
  const resetData = () => {
    setQuantite(0);
    setIdmouvement('');
    setDatefacture('');
    setPrixunitaire(0);
    setFormData([]);
  };

  // Page onLoad
   useEffect(() => {
    setListeFacture([]);
   },[]);


     const columnsdetails = [
      { label: 'article', field: 'article', align: 'center' },
      { label: 'quantite', field: 'quantite', align: 'center' },
      { label: 'prix unitaire', field: 'prixunitaire', align: 'center' },
      { label: 'total', field: 'total', align: 'center' },
      // Other columns...
     ];

     const donnees=[];

    return (
        <Container>
        <Box className="breadcrumb">
          <Breadcrumb routeSegments={[{ name: "Facture", path: "admin/facture" }, { name: "Facture" }]} />
        </Box>
        <p>
           <Button variant="contained" onClick={handleClickOpen} color="primary">
             Nouvelle facture
           </Button>&nbsp;&nbsp;
           <Button variant="contained" color="inherit">
            Exporter la facture
          </Button>&nbsp;&nbsp;
          <Button variant="contained" color="secondary">
            Importer la facture
          </Button>
          </p>
          <Box>
          <Dialog
               open={open}
               onClose={handleClose}
               aria-labelledby="form-dialog-title"
               fullWidth
               maxWidth="xl"
          >
                 <DialogTitle id="form-dialog-title">Nouvelle facture</DialogTitle>
                 <DialogContent>
                 <Grid container spacing={2}>
                     <Grid item xs={4}>
                       <TextField
                         fullWidth
                         autoFocus
                         id="idmouvement"
                         type="text"
                         margin="dense"
                         label="Id du mouvement"
                         name="idmouvement"
                         value={idmouvement}
                         onChange={(event) => setIdmouvement(event.target.value)}
                       />
                     </Grid>
                     <Grid item xs={4}>
                     <Select
                      fullWidth
                      autoFocus
                       labelId="select-label"
                       value={"1"}
                       margin="dense"
                     >
                       <MenuItem value="1">Client 1</MenuItem>
                       <MenuItem value="2">Client 2</MenuItem>
                     </Select>
                    </Grid>
                     <Grid item xs={4}>
                       <TextField
                         fullWidth
                         autoFocus
                         id="datefacture"
                         type="date"
                         margin="dense"
                         name="datefacture"
                         value={datefacture}
                         onChange={(event) => setDatefacture(event.target.value)}
                       />
                     </Grid>
                   </Grid>    
                   <h3>Details de la facture</h3>      
                   <Grid container spacing={2}>
                     <Grid item xs={3}>
                       <TextField
                          fullWidth
                          size="small"
                          type="number"
                          name="quantite"
                          label="Quantite"
                          variant="outlined"
                          value={quantite}
                          onChange={(event) => setQuantite(event.target.value)}
                          sx={{ mb: 3 }}
                       />
                     </Grid>
                     <Grid item xs={3}>
                       <TextField
                          fullWidth
                          size="small"
                          type="number"
                          name="prixunitaire"
                          label="Prix unitaire"
                          variant="outlined"
                          value={prixunitaire}
                          onChange={(event) => setPrixunitaire(event.target.value)}
                          sx={{ mb: 3 }}
                       />
                     </Grid>
                     <Grid item xs={3}>
                     <Select
                      fullWidth
                      autoFocus
                       labelId="select-label"
                       value={"1"}
                       margin="dense"
                       size="small"
                     >
                       <MenuItem value="1">Article 1</MenuItem>
                       <MenuItem value="2">Article 2</MenuItem>
                     </Select>
                    </Grid>

                    <Grid item xs={3}>
                    <Button variant="outlined" color="secondary" onClick={handleSubmit}>
                     Inserer
                   </Button>
                    </Grid>
                   </Grid>
                  <CustomizedTable columns={columnsdetails} data={formData} />
                 </DialogContent>

                 <DialogActions>
                 <Button onClick={resetData} color="inherit" variant="contained">
                     Reinitialiser
                   </Button>
                   <Button variant="contained" color="secondary" onClick={handleClose}>
                     Annuler
                   </Button>
                   <Button onClick={handleSubmit} color="primary" variant="contained">
                     Enregistrer
                   </Button>
                 </DialogActions>
               </Dialog>
             </Box>


             <SimpleCard title="Rechercher une facture" sx={{ marginBottom: '16px' }}>        
              <form /* onSubmit={this.handleSubmit}*/>
              <div style={{ display: 'flex', gap: '16px' }}>
              <TextField
               fullWidth
               size="small"
               type="text"
               name="client"
               label="Nom du client"
               variant="outlined"
               value={client}
               onChange={(event) => setClient(event.target.value)}
               sx={{ mb: 3 }}
             />            
             <TextField
               fullWidth
               size="small"
               type="date"
               name="date"
               variant="outlined"
               sx={{ mb: 3 }}
             />
             <TextField
               fullWidth
               size="small"
               type="text"
               name="stat"
               variant="outlined"
               label="Numstat"
               sx={{ mb: 3 }}
             />
            <TextField
               fullWidth
               size="small"
               type="text"
               name="telephone"
               variant="outlined"
               label="Telephone"
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

              <SimpleCard title="Liste des factures">
        <Listefacture  data={donnees} />
        </SimpleCard>
      </Container>
    );
  };
  
export default Facture;

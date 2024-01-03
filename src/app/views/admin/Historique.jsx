import { Box, styled,TextField,Snackbar,Alert,Select,MenuItem,DialogContent,DialogActions,DialogTitle,Dialog } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import { useData } from 'app/useData';
import { useState,useEffect } from 'react';
import Grid from '@mui/material/Grid';
import PaginationTable from "app/views/material-kit/tables/PaginationTable";
import Button from '@mui/material/Button';
import getUselink from 'app/views/getuseLink';
import { deleteData, Finddata, insertData, UpdateData } from '../functions';



const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
      marginBottom: "30px",
      [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
    },
  }));
  
const Historique = () => {

  // Form dialog
  const [open, setOpen] = useState(false);
  const [mouvement, setMouvement] = useState('1');
  const [mois, setMois] = useState('1');
  const [filename, setFilename] = useState('');
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleAlertClose = () => setMessage({open:false});

   // Data
  const data =useData('getallmateriel');
  const [listemateriel, setListemateriel] = useState([]);
  const [materielfilter, setMaterielfilter] = useState('');
  const listematfilter = filtremateriel(listemateriel,materielfilter);

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

// Colonne
    const columns = [
      { label: 'ID', field: 'idmouvementdestock', align: 'center' },
      { label: 'Date', field: 'datefacture', align: 'center' },
      { label: 'Materiel', field: 'materiel', align: 'center' },
      { label: 'Mouvement', field: 'mouvement', align: 'center' },
      { label: 'statut', field: 'statut', align: 'center' },
      // Other columns...
     ];


 
    return (
        <Container>
        <Box className="breadcrumb">
          <Breadcrumb routeSegments={[{ name: "Historique", path: "admin/historique" }, { name: "Historique" }]} />
        </Box>
        <p>
        <Button variant="contained" onClick={handleClickOpen} color="inherit">
          Exporter des donnees
        </Button>&nbsp;&nbsp;
        </p>

        {/* Formulaire */}
        <Box>
               <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                 <DialogTitle id="form-dialog-title">Importation de donnees</DialogTitle>
                 <DialogContent>
                 <Grid container spacing={3}>
                  <Grid item xs={6}>
                     <Select
                     fullWidth
                       labelId="select-label"
                       value={mouvement}
                       onChange={(event) => setMouvement(event.target.value)}
                     >
                       <MenuItem value="1">Entree</MenuItem>
                       <MenuItem value="-1"> Sortie</MenuItem>
                     </Select>
                   </Grid>
                   <Grid item xs={6}>
                     <Select
                     fullWidth
                       labelId="select-label"
                       value={mois}
                       onChange={(event) => setMois(event.target.value)}
                     >
                       <MenuItem value="1">Janvier</MenuItem>
                       <MenuItem value="2">Fevrier</MenuItem>
                       <MenuItem value="3">Mars</MenuItem>
                       <MenuItem value="4">Avril</MenuItem>
                       <MenuItem value="5">Mai</MenuItem>
                       <MenuItem value="6">Juin</MenuItem>
                       <MenuItem value="7">Juillet</MenuItem>
                       <MenuItem value="8">Aout</MenuItem>
                       <MenuItem value="9">Septembre</MenuItem>
                       <MenuItem value="10">Octobre</MenuItem>
                       <MenuItem value="11">Novembre</MenuItem>
                       <MenuItem value="12">Decembre</MenuItem>
                     </Select>
                   </Grid>
                   </Grid>
                     <TextField
                       fullWidth
                       autoFocus
                       id="filename"
                       type="text"
                       margin="dense"
                       label="Nom du fichier"
                       name="filename"
                       value={filename}
                       onChange={(event) => setFilename(event.target.value)}
                     />                 


                 </DialogContent>
                 <DialogActions>
                   <Button variant="outlined" color="secondary" onClick={handleClose}>
                     Annuler
                   </Button>
                   <Button onClick={handleSubmit} color="primary">
                     Imprimer
                   </Button>
                 </DialogActions>
               </Dialog>
             </Box>

             <SimpleCard title="Rechercher dans l'historique" sx={{ marginBottom: '16px' }}>        
              <form /* onSubmit={this.handleSubmit}*/>
              <div style={{ display: 'flex', gap: '16px' }}>
              <Grid container spacing={3}>
              <Grid item xs={4}>
              <TextField
               fullWidth
               size="small"
               type="text"
               name="materiel"
               label="Nom du materiel"
               variant="outlined"
               value={materielfilter}
               onChange={(event) => setMaterielfilter(event.target.value)}
               sx={{ mb: 3 }}
             />
             </Grid>
             <Grid item xs={4}>
            <Select
                fullWidth
                size="small"
               labelId="select-label"
               value={"1"}
              //  onChange={handleChange}
                >
               <MenuItem value="1">Janvier</MenuItem>
               <MenuItem value="2">Fevrier</MenuItem>
               <MenuItem value="3">Mars</MenuItem>
               <MenuItem value="4">Avril</MenuItem>
               <MenuItem value="5">Mai</MenuItem>
               <MenuItem value="6">Juin</MenuItem>
               <MenuItem value="7">Juillet</MenuItem>
               <MenuItem value="8">Aout</MenuItem>
               <MenuItem value="9">Septembre</MenuItem>
               <MenuItem value="10">Octobre</MenuItem>
               <MenuItem value="11">Novembre</MenuItem>
               <MenuItem value="12">Decembre</MenuItem>
            </Select>
            </Grid>
            <Grid item xs={4}>
            <Select
              fullWidth
              size="small"
               labelId="select-label"
               value={"1"}
              //  onChange={handleChange}
                >
               <MenuItem value="1">Entree</MenuItem>
               <MenuItem value="-1"> Sortie</MenuItem>
            </Select>
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

              <SimpleCard title="Liste des entretiens">
        <PaginationTable columns={columns} data={listematfilter} />
        </SimpleCard>
      </Container>
    );
  };
  
export default Historique;

function filtremateriel(listemateriel, materiel) {
  return listemateriel.filter((Item) => {
    return Item.materiel.toLowerCase().includes(materiel.toLowerCase());
  });
}
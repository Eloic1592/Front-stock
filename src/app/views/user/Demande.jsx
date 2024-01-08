import { Box, styled,Icon, IconButton,TextField,Tooltip,Snackbar,Autocomplete,Alert,DialogContent,DialogActions,DialogTitle,Dialog } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";


import { useState } from 'react';
import PaginationTable from "app/views/material-kit/tables/PaginationTable";
import Button from '@mui/material/Button';


import { deleteData, Finddata, insertData, UpdateData } from '../functions';



const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
      marginBottom: "30px",
      [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
    },
  }));

  const AutoComplete = styled(Autocomplete)(() => ({
    width: 500,
    marginBottom: '16px',
  }));

  const handleEdit = (id) => {
    // Mettez ici votre logique pour l'édition
    alert(`Mety`+id);
  };
  
  const handleDelete = (id) => {
    // Mettez ici votre logique pour la suppression
    alert(`Mety`+id);  
  };

  const handleChange = (event) => {

  };

  
const Demande = () => {

  // Form dialog
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
   // Data
  const listemateriel =useData('getallmateriel');
  const listeplainte =useData('getplainteuser');
  const [materielfilter, setMaterielfilter] = useState('');
  const listematfilter = filtremateriel(listemateriel,materielfilter);

    // Input 
  const [idmateriel, setIdmateriel] = useState('');
  const [description, setDescription] = useState('');
  const [dateDepot, setDateDepot] = useState('');
 

    // Message
    const [message,setMessage]= useState({
      text:'Information enregistree',
      severity:'success',
      open:false,
    });
  

    const handleSubmit = async  () => {
      // const result = await insertData({"materiel":materiel,"icon":icon,"etat":0},getUselink()+'insertmateriel');
      // setMessage({
      //   text:result.text,
      //   severity:result.severity,
      //   open:result.open,
      //   });
      //   window.location.reload();
    }


  // Colonne
  const colonne = [
    { label: "ID", field: "id", render: (listemateriel) => `${listemateriel.id}` },
    { label: "Materiel", field: "materiel", render: (listemateriel) => `${listemateriel.materiel}` },    
    { label: "Actions", render: () => (
      <div>
      <Tooltip title="Modifier">
      <IconButton className="button" aria-label="Edit"    color="primary" onClick={() =>handleEdit(listemateriel.id)}>
          <Icon>edit_icon</Icon>
      </IconButton>
      </Tooltip>
      <Tooltip title="Supprimer">
      <IconButton className="button" aria-label="Delete" color="default" onClick={() =>handleDelete(listemateriel.id)}>
          <Icon>delete</Icon>
      </IconButton>
      </Tooltip>
      </div>
    )},     // ... Ajoutez d'autres colonnes si nécessaire
  ];
 
    return (
        <Container>
        <Box className="breadcrumb">
          <Breadcrumb routeSegments={[{ name: "Materiel", path: "/material" }, { name: "Table" }]} />
        </Box>
        <p>
           <Button variant="contained" onClick={handleClickOpen} color="primary">
           Nouvelle demande
           </Button>
          </p>
          <Box>
               <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                 <DialogTitle id="form-dialog-title">Nouvelle demande</DialogTitle>
                 <DialogContent>
                 <AutoComplete
                    options={listemateriel}
                    getOptionLabel={(option) => option.materiel}
                    renderInput={(params) => (
                      <TextField {...params} label="Materiel" variant="outlined" fullWidth
                      onChange={(event, value) => {
                        if (value) {
                          setIdmateriel(value.id); 
                        }
                      }}
                      />
                  )}
                    name="idmateriel"
                    id="idmateriel"
                  />

                  <TextField
                     fullWidth
                     autoFocus
                     id="description"
                     type="text"
                     margin="dense"
                     label="Description"
                     name="description"
                     value={description}
                     onChange={(event) => setDescription(event.target.value)}
                   />
                    <TextField
                     fullWidth
                     autoFocus
                     id="date_depot"
                     type="text"
                     margin="dense"
                     label="Date de depot"
                     name="date_depot"
                     value={dateDepot}
                     onChange={(event) => setDateDepot(event.target.value)}
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
             <SimpleCard title="Rechercher une demande" sx={{ marginBottom: '16px' }}>        
              <form /* onSubmit={this.handleSubmit}*/>
              <div style={{ display: 'flex', gap: '16px' }}>
              <TextField
               fullWidth
               size="small"
               type="text"
               name="materielfiltre"
               label="Nom du materiel"
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
                <Snackbar open={message.open} autoHideDuration={6000}>
                <Alert  severity={message.severity} sx={{ width: '100%' }} variant="filled">
                   {message.text}
                </Alert>
              </Snackbar>

              <SimpleCard title="Liste des plaintes">
        <PaginationTable columns={colonne} data={listematfilter} />
        </SimpleCard>
      </Container>
    );
  };
  
export default Demande;

function filtremateriel(listemateriel, materiel) {
  return listemateriel.filter((Item) => {
    return Item.materiel.toLowerCase().includes(materiel.toLowerCase());
  });
}
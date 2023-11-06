import { Box, styled,Icon, IconButton,Button,Dialog,TextField,DialogTitle,DialogActions,DialogContent,Tooltip,Snackbar,Alert} from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import { useData } from 'app/useData';
import { useState } from 'react';
import PaginationTable from "app/views/material-kit/tables/PaginationTable";
import getUselink from 'app/views/getuseLink';
import {insertData} from 'app/views/insertData';

const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
      marginBottom: "30px",
      [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
    },
  }));

  const handleEdit = (id) => {
    // Mettez ici votre logique pour l'édition
    alert(`Mety`+id);
  };
  
  const handleDelete = (id) => {
    // Mettez ici votre logique pour la suppression
    alert(`Mety`+id);  
  };
  const Salle =  () => {

// Data 
 const listesalle = useData('getallsalle');

  // Form dialog
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Input 
  const [salle, setSalle] = useState('');
  const [sallefiltrer, setSallefiltrer] = useState('');
  const listesallefiltre = filterSalle(listesalle,sallefiltrer);

    // Message
      const [message,setMessage]= useState({
        text:'Information enregistree',
        severity:'success',
        open:false,
      });
    
    const handleSubmit = async  () => {
      const result = await insertData({"salle":salle,"etat":0},getUselink()+'insertsalle');
      setMessage({
        text:result.text,
        severity:result.severity,
        open:result.open,
        });
        window.location.reload();
    }



  const colonne = [
    { label: "ID", field: "id", render: (listesalle) => `${listesalle.id}` },
    { label: "Salle", field: "salle", render: (listesalle) => `${listesalle.salle}` },    
    { label: "Actions", render: () => (
      <div>
      <Tooltip title="Modifier">
      <IconButton className="button" aria-label="Edit"    color="primary" onClick={() =>handleEdit(listesalle.id)}>
          <Icon>edit_icon</Icon>
      </IconButton>
      </Tooltip>
      <Tooltip title="Supprimer">
      <IconButton className="button" aria-label="Delete" color="default" onClick={() =>handleDelete(listesalle.id)}>
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
             Nouvelle salle
           </Button>
          </p>
          <Box>
               <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                 <DialogTitle id="form-dialog-title">Nouvelle salle</DialogTitle>
                 <DialogContent>
                  <TextField
                     fullWidth
                     autoFocus
                     id="salle"
                     type="text"
                     margin="dense"
                     label="salle"
                     name="salle"
                     value={salle}
                     onChange={(event) => setSalle(event.target.value)}
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
             <SimpleCard title="Rechercher une salle" sx={{ marginBottom: '16px' }}>        
              <form /* onSubmit={this.handleSubmit}*/>
              <div style={{ display: 'flex', gap: '16px' }}>
              <TextField
               fullWidth
               size="small"
               type="text"
               name="sallefiltre"
               label="Nom de la salle"
               variant="outlined"
               value={sallefiltrer}
               onChange={(event) => setSallefiltrer(event.target.value)}
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
  
              <SimpleCard title="Liste des entretiens">
        <PaginationTable columns={colonne} data={listesallefiltre} />
        </SimpleCard>
      </Container>    
      );
    };
  export default Salle;

  function filterSalle(listesalle, salle) {
    return listesalle.filter((salleItem) => {
      return salleItem.salle.toLowerCase().includes(salle.toLowerCase());
    });
  }
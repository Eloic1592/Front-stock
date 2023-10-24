import { Box, styled,Icon, IconButton,Button,Dialog,TextField,DialogTitle,DialogActions,DialogContent} from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import { useData } from 'app/useData';
import { useState } from 'react';
import PaginationTable from "app/views/material-kit/tables/PaginationTable";

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

  const handleChange = (event) => {

  };

  
const Salle = () => {

   // Data
  const listesalle = useData('getallsalle');
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Colonne
  const colonne = [
    { label: "ID", field: "id", render: (listesalle) => `${listesalle.id}` },
    { label: "Salle", field: "salle", render: (listesalle) => `${listesalle.salle}` },    
    { label: "etat", field: "etat", render: (listesalle) => `${listesalle.etat}` }, 
    { label: "Actions", render: () => (
      <div>
      <IconButton className="button" aria-label="Edit"  color="primary" onClick={() =>handleEdit(listesalle.id)}>
          <Icon>edit_icon</Icon>
      </IconButton>
      <IconButton className="button" aria-label="Delete"  color="default" onClick={() =>handleDelete(listesalle.id)}>
          <Icon>delete</Icon>
      </IconButton>
      </div>
    )},     // ... Ajoutez d'autres colonnes si nécessaire
  ];
 
    return (
        <Container>
        <Box className="breadcrumb">
          <Breadcrumb routeSegments={[{ name: "Salle", path: "/salle" }, { name: "Table" }]} />
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
                     label="Nom de la salle"
                     name="salle"
                   />
                 </DialogContent>

                 <DialogActions>
                   <Button variant="outlined" color="secondary" onClick={handleClose}>
                     Annuler
                   </Button>

                   <Button onClick={handleClose} color="primary">
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
               name="salle"
               label="Nom de la salle"
               variant="outlined"
               // value={values.code}
               onChange={handleChange}
               sx={{ mb: 3 }}
             />
            </div>
            </form>
              </SimpleCard>
                <p></p>
                <p></p>

              <SimpleCard title="Liste des salle">
        <PaginationTable columns={colonne} data={listesalle} />
        </SimpleCard>
      </Container>
    );
  };
  
export default Salle;
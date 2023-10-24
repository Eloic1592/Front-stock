import { Box, styled,Icon, IconButton,TextField } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import Button from '@mui/material/Button';
import { useData } from 'app/useData';
import PaginationTable from "app/views/material-kit/tables/PaginationTable";
import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';





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
  
  
  
  const ListeTypeEntretien = () => {
    
    // Data
    const listetentretien = useData('gettypeentretien');
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

  // Colonne
  const colonne = [
    { label: "ID", field: "id", render: (listetentretien) => `${listetentretien.id}` },
    { label: "Type entretien", field: "type entretien", render: (listetentretien) => `${listetentretien.typeEntretien}` },    
    { label: "etat", field: "etat", render: (listetentretien) => `${listetentretien.etat}` },   
    { label: "Actions", render: () => (
      <div>
      <IconButton className="button" aria-label="Edit"  color="primary" onClick={() =>handleEdit(listetentretien.id)}>
          <Icon>edit_icon</Icon>
      </IconButton>
      <IconButton className="button" aria-label="Delete"  color="default" onClick={() =>handleDelete(listetentretien.id)}>
          <Icon>delete</Icon>
      </IconButton>
      </div>
    )},    // ... Ajoutez d'autres colonnes si nécessaire
  ];
 
    return (
        <Container>
        <Box className="breadcrumb">
          <Breadcrumb routeSegments={[{ name: "Type_entretien", path: "/material" }, { name: "Table" }]} />
        </Box>
          <p>
           <Button variant="contained" onClick={handleClickOpen} color="primary">
             Nouveau type d'entretien
           </Button>
           </p>
              <Box>
               <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                 <DialogTitle id="form-dialog-title">Nouveau type d'entretien</DialogTitle>
                 <DialogContent>
                   <TextField
                     fullWidth
                     autoFocus
                     id="name"
                     type="text"
                     margin="dense"
                     label="Type entretien"
                     name="type_entretien"
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
             <SimpleCard title="Rechercher un type d'entretien" sx={{ marginBottom: '16px' }}>        
              <form /* onSubmit={this.handleSubmit}*/>
              <div style={{ display: 'flex', gap: '16px' }}>
              <TextField
               fullWidth
               size="small"
               type="text"
               name="type_entretien"
               label="Type d'entretien"
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

        <SimpleCard title="Liste des types d' entretiens">
        <PaginationTable columns={colonne} data={listetentretien} />
        </SimpleCard>
      </Container>
    );
  };
  
export default ListeTypeEntretien;
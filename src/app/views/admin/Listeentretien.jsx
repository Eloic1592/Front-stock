import { Box, styled,Icon, IconButton,Autocomplete } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import { useData } from 'app/useData';
import PaginationTable from "app/views/material-kit/tables/PaginationTable";
import Button from '@mui/material/Button';
import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { createFilterOptions } from '@mui/material/Autocomplete';

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


  const handleEdit = (id) => {
    // Mettez ici votre logique pour l'édition
    alert(`Mety`+id);
  };
  
  const handleDelete = (id) => {
    // Mettez ici votre logique pour la suppression
    alert(`Mety`+id);  
  };
  
const Listeentretien = () => {

   // Data
  const listeentretien = useData('getallventretien');
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const filter = createFilterOptions();

  // Colonne
  const colonne = [
    { label: "ID", field: "id", render: (listeentretien) => `${listeentretien.id}` },
    { label: "Type entretien", field: "type entretien", render: (listeentretien) => `${listeentretien.typeEntretien}` },    
    { label: "Entretien", field: "entretien", render: (listeentretien) => `${listeentretien.entretien}` },
    { label: "materiel", field: "materiel", render: (listeentretien) => `${listeentretien.materiel}` },
    { label: "etat", field: "etat", render: (listeentretien) => `${listeentretien.etat}` },  
    { label: "Actions", render: () => (
      <div>
      <IconButton className="button" aria-label="Edit"  color="primary" onClick={() =>handleEdit(listeentretien.id)}>
          <Icon>edit_icon</Icon>
      </IconButton>
      <IconButton className="button" aria-label="Delete"  color="default" onClick={() =>handleDelete(listeentretien.id)}>
          <Icon>delete</Icon>
      </IconButton>
      </div>
    )},    // ... Ajoutez d'autres colonnes si nécessaire
  ];
 
    return (
        <Container>
        <Box className="breadcrumb">
          <Breadcrumb routeSegments={[{ name: "Entretien", path: "/material" }, { name: "Table" }]} />
        </Box>
          <p>
           <Button variant="contained" onClick={handleClickOpen} color="primary">
             Nouvel entretien
           </Button>
          </p>
          <Box>
               <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                 <DialogTitle id="form-dialog-title">Nouvel entretien</DialogTitle>
                 <DialogContent>
                   <TextField
                     fullWidth
                     autoFocus
                     id="entretien"
                     type="text"
                     margin="dense"
                     label="Entretien"
                     name="entretien"
                   />
                   <AutoComplete
                      // options={}
                      getOptionLabel={(option) => option.label}
                      renderInput={(params) => (
                        <TextField {...params} label="Combo box" variant="outlined" fullWidth />
                    )}
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
        <SimpleCard title="Liste des entretiens">
        <PaginationTable columns={colonne} data={listeentretien} />
        </SimpleCard>
      </Container>
    );
  };
  
export default Listeentretien;
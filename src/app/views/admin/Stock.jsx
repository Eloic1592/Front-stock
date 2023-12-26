import { Box, styled,Icon, IconButton,TextField,DialogContent,DialogActions,DialogTitle,Dialog,Autocomplete,Select,MenuItem } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import { useData } from 'app/useData';
import { useState,useEffect } from 'react';
import PaginationTable from "app/views/material-kit/tables/PaginationTable";
import Button from '@mui/material/Button';


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

  
const Stock = () => {


   // Data
  const listedispo = useData('getallvdisponibilite');
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleEdit = (id) => {
    // Mettez ici votre logique pour l'édition
    alert(`Mety`+id);
  };
  
  const handleDelete = (id) => {
    // Mettez ici votre logique pour la suppression
    alert(`Mety`+id);  
  };

  // Colonne
  const colonne = [
    { label: "ID", field: "id", render: (listedispo) => `${listedispo.id}` },
    { label: "Responsable", field: "Responsable", render: (listedispo) => `${listedispo.nom+' '+listedispo.prenom}` },    
    { label: "date debut", field: "date debut", render: (listedispo) => `${listedispo.date_debut}` },
    { label: "date fin", field: "date fin", render: (listedispo) => `${listedispo.date_fin}` },
    { label: "etat", field: "etat", render: (listedispo) => `${listedispo.etat}` },  
    { label: "Actions", render: () => (
      <div>
      <IconButton className="button" aria-label="Edit"  color="primary" onClick={() =>handleEdit(listedispo.id)}>
          <Icon>edit_icon</Icon>
      </IconButton>
      <IconButton className="button" aria-label="Delete"  color="default" onClick={() =>handleDelete(listedispo.id)}>
          <Icon>delete</Icon>
      </IconButton>
      </div>
    )},    // ... Ajoutez d'autres colonnes si nécessaire
  ];
 
    return (
        <Container>
        <Box className="breadcrumb">
          <Breadcrumb routeSegments={[{ name: "Entretien", path: "/material" }, { name: "Table" }]} />
          <p>
          {/* <Button variant="contained" onClick={handleClickOpen} color="primary">
          Nouveau
          </Button>&nbsp;&nbsp; */}
          <Button variant="contained" color="secondary">
          Exporter en pdf
          </Button>&nbsp;&nbsp;
          <Button variant="contained" color="secondary">
          Importer des données
          </Button>
          </p>
          <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
             <DialogTitle id="form-dialog-title">Nouveau mouvement</DialogTitle>
             <DialogContent>
              <TextField
                 fullWidth
                 autoFocus
                 id="salle"
                 type="text"
                 margin="dense"
                 label="Salle"
                 name="salle"
                //  value={salle}
                //  onChange={(event) => setSalle(event.target.value)}
                
               />
             </DialogContent>
      
             <DialogActions>
               <Button variant="outlined" color="secondary" /*onClick={handleClose}*/>
                 Annuler
               </Button>
               <Button /*onClick={handleSubmit}*/ color="primary">
                 Valider
               </Button>
             </DialogActions>

          </Dialog>
        </Box>
        <SimpleCard title="Rechercher" sx={{ marginBottom: '16px' }}>        
              <form /* onSubmit={this.handleSubmit}*/>
              <div style={{ display: 'flex', gap: '16px' }}>
              <TextField
               fullWidth
               size="small"
               type="text"
               name="materielfiltre"
               label="Nom du materiel"
               variant="outlined"
              //  value={materielfilter}
              //  onChange={(event) => setMaterielfilter(event.target.value)}
               sx={{ mb: 3 }}
             />
            <TextField
               fullWidth
               size="small"
               type="date"
               name="date"
               label="Date du mouvement"
               variant="outlined"
              //  value={materielfilter}
              //  onChange={(event) => setMaterielfilter(event.target.value)}
               sx={{ mb: 3 }}
             />
            {/* <AutoComplete
              fullWidth
              // options={suggestions}
              getOptionLabel={(option) => option.label}
              renderInput={(params) => (
                <TextField {...params} label="Materiel" variant="outlined" fullWidth />
            )}
              name="idmateriel"
              id="idmateriel"
            />
            <AutoComplete
              fullWidth
              // options={suggestions}
              getOptionLabel={(option) => option.label}
              renderInput={(params) => (
                <TextField {...params} label="Materiel" variant="outlined" fullWidth />
            )}
              name="idmateriel"
              id="idmateriel"
            /> */}
            <Select
               labelId="select-label"
               value={"1"}
              //  onChange={handleChange}
                >
               <MenuItem value="1">Entree</MenuItem>
               <MenuItem value="-1"> Sortie</MenuItem>
            </Select>
            </div>
            </form>
        </SimpleCard>

        <br />
      {/* Liste des donnees */}
        <SimpleCard title="Liste des entretiens">
        <PaginationTable columns={colonne} data={listedispo} />
        </SimpleCard>
      </Container>
    );
  };
  
export default Stock;
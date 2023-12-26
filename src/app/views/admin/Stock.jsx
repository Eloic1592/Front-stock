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

  const columns = [
    { label: 'ID', field: 'idmouvementdestock', align: 'center' },
    { label: 'Date de depot', field: 'datedepot', align: 'center' },
    { label: 'Mouvement', field: 'mouvement', align: 'center' },
    { label: 'Nature', field: 'naturemouvement', align: 'center' },
    { label: 'Description', field: 'description', align: 'center' },
    { label: 'Modele', field: 'modele', align: 'center' },
    { label: 'Quantite', field: 'quantite', align: 'center' },
    { label: 'Prix', field: 'P.U', align: 'center' },
    { label: 'Total', field: 'total', align: 'center' },
    { label: 'Depot', field: 'depot', align: 'center' },
    // Other columns...
   ];
 
    return (
        <Container>
        <Box className="breadcrumb">
          <Breadcrumb routeSegments={[{ name: "Entretien", path: "/material" }, { name: "Table" }]} />
          <p>
          {/* <Button variant="contained" onClick={handleClickOpen} color="primary">
          Nouveau
          </Button>&nbsp;&nbsp; */}
          <Button variant="contained" color="primary">
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
        <SimpleCard title="Liste des mouvements actuels">
        <PaginationTable columns={columns} data={listedispo} />
        </SimpleCard>
      </Container>
    );
  };
  
export default Stock;
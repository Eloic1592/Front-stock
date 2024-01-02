import { Box, styled,TextField,DialogContent,DialogActions,DialogTitle,Dialog,Autocomplete,Select,MenuItem } from "@mui/material";
import Grid from '@mui/material/Grid';
import { Breadcrumb, SimpleCard } from "app/components";
import { useData } from 'app/useData';
import { useState,useEffect } from 'react';
import PaginationTable from "app/views/material-kit/tables/PaginationTable";
import CustomizedTable from "app/views/material-kit/tables/CustomizedTable";
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

  
const Stockphysique = () => {

// Input
const [datedepot, setDatedepot] = useState('');
const [typemouvement, setTypemouvement] = useState('');
const [idnaturemouvement,setIdnaturemouvement] = useState('');
const [quantite, setQuantite] = useState(0);
const [prixunitaire, setPrixunitaire] = useState(0);
const [depot, setDepot] = useState('');
const [prixstock, setPrixstock] = useState(0);
const [description, setDescription] = useState(0);
const [commentaire, setCommentaire] = useState(0);
  // Data
  const[listemouvementstock,setListemouvementstock]= useState([]);
  const[naturemouvement,setNaturemouvement]= useState([]);
  const [formData, setFormData] = useState([]);

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
    setDatedepot('');
    setQuantite(0);
    setPrixstock(0);
    setPrixunitaire(0);
    setTypemouvement('1');
    setNaturemouvement('1');
    setDescription('');
    setCommentaire('');
    setFormData([]);
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
   const columnsdetails = [
    { label: 'article', field: 'article', align: 'center' },
    { label: 'quantite', field: 'quantite', align: 'center' },
    { label: 'prix unitaire', field: 'prixunitaire', align: 'center' },
    { label: 'prix stock', field: 'prixunitaire', align: 'center' },
    { label: 'depot', field: 'prixunitaire', align: 'center' },
    { label: 'total', field: 'total', align: 'center' },
    { label: 'statut', field: 'prixunitaire', align: 'center' },
    
    // Other columns...
   ];
 
    return (
        <Container>
        <Box className="breadcrumb">
          <Breadcrumb routeSegments={[{ name: "Mouvement de stock", path: "admin/stock/mouvementphysique" }, { name: "mouvement de stock physique" }]} />
          <p>
          <Button variant="contained" onClick={handleClickOpen} color="primary">
          Nouveau mouvement
          </Button>&nbsp;&nbsp;
          <Button variant="contained" color="inherit">
            Exporter les  mouvements
          </Button>&nbsp;&nbsp;
          <Button variant="contained" color="secondary">
          Importer des données
          </Button>
          </p>        
        </Box>

          <Box>
          <Dialog
               open={open}
               onClose={handleClose}
               aria-labelledby="form-dialog-title"
               fullWidth
               maxWidth="xl"
          >
                 <DialogTitle id="form-dialog-title">Nouveau mouvement de stock</DialogTitle>
                 <DialogContent>
                 <Grid container spacing={2}>
                     <Grid item xs={4}>
                     <Select
                      fullWidth
                      autoFocus
                       labelId="select-label"
                       value={"1"}
                       margin="dense"
                     >
                       <MenuItem value="1">Perte</MenuItem>
                       <MenuItem value="2">Transfert</MenuItem>
                     </Select>
                    </Grid>
                     <Grid item xs={4}>
                       <TextField
                         fullWidth
                         autoFocus
                         id="datedepot"
                         type="date"
                         margin="dense"
                         name="datedepot"
                         value={datedepot}
                         onChange={(event) => setDatedepot(event.target.value)}
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
                       <MenuItem value="1">Entree</MenuItem>
                       <MenuItem value="2">Sortie</MenuItem>
                     </Select>
                    </Grid>
                   </Grid>    
                   <h3>Details du mouvement physique</h3>      
                   <Grid container spacing={1}>
                   <Grid item xs={2}>
                     <Select
                      fullWidth
                      size="small"
                       labelId="select-label"
                       value={"1"}
                       margin="dense"
                       label="Article"
                     >
                       <MenuItem value="1">Article 1</MenuItem>
                       <MenuItem value="2">Article 1</MenuItem>
                     </Select>
                    </Grid>
                     <Grid item xs={2}>
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
                     <Grid item xs={2}>
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
                     <Grid item xs={2}>
                     <TextField
                          fullWidth
                          size="small"
                          type="number"
                          name="prixstock"
                          label="Prix en stock"
                          variant="outlined"
                          value={prixstock}
                          onChange={(event) => setPrixstock(event.target.value)}
                          sx={{ mb: 3 }}
                       />
                    </Grid>
                    <Grid item xs={2}>
                     <Select
                      fullWidth
                      autoFocus
                       labelId="select-label"
                       value={"1"}
                       margin="dense"
                       size="small"
                     >
                       <MenuItem value="1">Depot 1</MenuItem>
                       <MenuItem value="2">Depot 2</MenuItem>
                     </Select>
                    </Grid>
                    <Grid item xs={2}>
                    <Button variant="outlined" color="secondary" sx={{ mb: 3 }} onClick={handleSubmit}>
                     Inserer
                   </Button>
                    </Grid>
                   </Grid>
                   <Grid container spacing={3}>
                   <Grid item xs={6}>
                      <TextField
                        fullWidth
                        multiline
                        rows={4}
                        variant="outlined"
                        placeholder="Description"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        sx={{ mb: 3 }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        multiline
                        rows={4}
                        variant="outlined"
                        placeholder="Remarques"
                        value={commentaire}
                        onChange={(event) => setCommentaire(event.target.value)}
                        sx={{ mb: 3 }}
                      />
                    </Grid>
                  </Grid>
                  <p></p>
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
            <Select
               labelId="select-label"
               value={"1"}
              //  onChange={handleChange}
                >
               <MenuItem value="1">Entree</MenuItem>
               <MenuItem value="-1"> Sortie</MenuItem>
            </Select>
            <Select
               labelId="select-label"
               value={"1"}
               onChange={(event) => setDepot(event.target.value)}

                >
               <MenuItem value="1">Depot</MenuItem>
               <MenuItem value="-1"> Salle 6</MenuItem>
            </Select>

            <Select
               labelId="select-label"
               value={"1"}
              //  onChange={handleChange}
              >
               <MenuItem value="1">Don</MenuItem>
               <MenuItem value="-1"> Transfert</MenuItem>
               <MenuItem value="-1"> Perte</MenuItem>
            </Select>
            
            </div>
            </form>
        </SimpleCard>

        <br />
      {/* Liste des donnees */}
        <SimpleCard title="Liste des mouvements actuels">
        <PaginationTable columns={columns} data={listemouvementstock} />
        </SimpleCard>
      </Container>
    );
  };
  
export default Stockphysique;
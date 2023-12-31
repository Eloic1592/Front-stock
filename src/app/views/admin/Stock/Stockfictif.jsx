import { Box, styled,TextField,DialogContent,DialogActions,DialogTitle,Dialog,Autocomplete,Select,MenuItem } from "@mui/material";
import Grid from '@mui/material/Grid';
import { Breadcrumb, SimpleCard } from "app/components";
import { useState,useEffect } from 'react';
import CustomizedTable from "app/views/material-kit/tables/CustomizedTable";
import Button from '@mui/material/Button';
import Listestockfictif from "./Listestockfictif";


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

  
const Stockfictif = () => {

// Input
const [datedepot, setDatedepot] = useState('');
const [typemouvement, setTypemouvement] = useState('');
const [idnaturemouvement,setIdnaturemouvement] = useState('');
const [caution, setCaution] = useState(0);
const [datedeb, setDatedeb] = useState('');
const [datefin, setDatefin] = useState('');
const [depot, setDepot] = useState('');
const [idetudiant, setIdetudiant] = useState('');
const [idmateriel, setIdmateriel] = useState('');
const [description, setDescription] = useState('');
const [commentaire, setCommentaire] = useState('');


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
    setDatedepot(0);
    setDatedeb('');
    setDatefin('');
    setCaution(0);
    setTypemouvement('1');
    setNaturemouvement('1');
    setDescription('');
    setCommentaire('');
    setFormData([]);
  };

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

   const donnees=[

   ];
 
    return (
        <Container>
        <Box className="breadcrumb">
          <Breadcrumb routeSegments={[{ name: "Mouvement de stock", path: "admin/stock/mouvementfictif" }, { name: "mouvement de stock fictif" }]} />
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
                 <Grid container spacing={3}>
                     <Grid item xs={4}>
                     <Select
                      fullWidth
                       labelId="select-label"
                       value={"1"}
                      
                     >
                       <MenuItem value="1">Perte</MenuItem>
                       <MenuItem value="2">Transfert</MenuItem>
                     </Select>
                    </Grid>
                    <Grid item xs={4}>
                       <TextField
                         fullWidth
                         id="datedepot"
                         type="date"
                        
                         name="datedepot"
                         value={datedepot}
                         onChange={(event) => setDatedepot(event.target.value)}
                       />
                     </Grid>
                     <Grid item xs={4}>
                     <Select
                      fullWidth
                       labelId="select-label"
                       value={"1"}
                      
                     >
                       <MenuItem value="1">Entree</MenuItem>
                       <MenuItem value="2">Sortie</MenuItem>
                     </Select>
                    </Grid>
                   </Grid>    
                   <h3>Details du mouvement fictif</h3>      
                   <Grid container spacing={3}>
                   <Grid item xs={3}>
                     <Select
                      fullWidth
                      size="small"
                       labelId="select-label"
                       value={"1"}
                       margin="dense"
                       label="Materiel"
                       onChange={(event) => setIdmateriel(event.target.value)}
                     >
                       <MenuItem value="1">Materiel 1</MenuItem>
                       <MenuItem value="2">Materiel 1</MenuItem>
                     </Select>
                    </Grid>
                     <Grid item xs={3}>
                       <TextField
                          fullWidth
                          size="small"
                          type="date"
                          name="datedebut"
                          label="Date debut"
                          focused
                          variant="outlined"
                          value={datedeb}
                          onChange={(event) => setDatedeb(event.target.value)}
                          sx={{ mb: 3 }}
                       />
                     </Grid>
                     <Grid item xs={3}>
                       <TextField
                          fullWidth
                          size="small"
                          type="date"
                          name="datefin"
                          label="Date fin"
                          focused
                          variant="outlined"
                          value={datefin}
                          onChange={(event) => setDatefin(event.target.value)}
                          sx={{ mb: 3 }}
                       />
                     </Grid>
                     <Grid item xs={3}>
                     <TextField
                          fullWidth
                          size="small"
                          type="number"
                          name="caution"
                          label="Caution"
                          variant="outlined"
                          value={caution}
                          onChange={(event) => setCaution(event.target.value)}
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
                       onChange={(event) => setDepot(event.target.value)}
                     >
                       <MenuItem value="1">Depot 1</MenuItem>
                       <MenuItem value="2">Depot 2</MenuItem>
                     </Select>
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
                       <MenuItem value="1">Etudiant 1</MenuItem>
                       <MenuItem value="2">Etudiant 2</MenuItem>
                     </Select>
                    </Grid>

                    <Grid item xs={3}>
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
              <Grid container spacing={2}>
                  <Grid item xs={3}>
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
                   </Grid>
                  <Grid item  xs={3}>
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
                   </Grid>
                  <Grid item  xs={3}>
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
                  <Grid item xs={1}>
                  <Select
                    size="small"
                     labelId="select-label"
                     value={"1"}
                     onChange={(event) => setDepot(event.target.value)}
                      >
                     <MenuItem value="1">Depot</MenuItem>
                     <MenuItem value="-1"> Salle 6</MenuItem>
                  </Select>
                  </Grid>
                  <Grid item xs={2}>
                  <Select
                  fullWidth
                    size="small"
                     labelId="select-label"
                     value={"1"}
                    //  onChange={handleChange}
                    >
                     <MenuItem value="1">Don</MenuItem>
                     <MenuItem value="-1"> Transfert</MenuItem>
                     <MenuItem value="-1"> Perte</MenuItem>
                  </Select>
                  </Grid>
            </Grid>

            </div>
            </form>
        </SimpleCard>

        <br />
      {/* Liste des donnees */}
        <SimpleCard title="Liste des mouvements fictifs actuels">
        <Listestockfictif  data={donnees} />
        </SimpleCard>
      </Container>
    );
  };
  
export default Stockfictif;
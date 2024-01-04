import { Box, styled,TextField,Snackbar,Alert,DialogContent,DialogActions,DialogTitle,Dialog,Autocomplete,MenuItem,Select,InputLabel,Grid } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import { useData } from 'app/useData';
import { useState,useEffect } from 'react';
import PaginationTable from "app/views/material-kit/tables/PaginationTable";
import Button from '@mui/material/Button';
import getUselink from 'app/views/getuseLink';
import { deleteData, Finddata, insertData, UpdateData } from '../../functions';



const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
      marginBottom: "30px",
      [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
    },
  }));

const AutoComplete = styled(Autocomplete)(() => ({
    marginBottom: '16px',
}));


  
const Listemateriel = () => {

  // Form dialog
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleAlertClose = () => setMessage({open:false});

   // Data
  const data =useData('getallmateriel');
  const [listemateriel, setListemateriel] = useState([]);
  const [materielfilter, setMaterielfilter] = useState('');
  const listematfilter = filtremateriel(listemateriel,materielfilter);

    // Input 
  const [materiel, setMateriel] = useState('');
  const [catmateriel, setCatmateriel] = useState(' ');
  const [couleur, setCouleur] = useState(' ');
  const [numserie, setNumserie] = useState('');
  const [description, setDescription] = useState('');
  const [prixvente, setPrixvente] = useState(0);
  const [caution, setCaution] = useState(0);

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

    const columns = [
      { label: 'ID', field: 'id', align: 'center' },
      { label: 'Type', field: 'type', align: 'center' },
      { label: 'Categorie', field: 'categorie', align: 'center' },
      { label: 'Marque', field: 'marque', align: 'center' },
      { label: 'Modele', field: 'telephone', align: 'center' },
      { label: 'N serie', field: 'numserie', align: 'center' },
      { label: 'Couleur', field: 'numstat', align: 'center' },
      { label: 'Caution', field: 'caution', align: 'center' },
      { label: 'P.V', field: 'quittance', align: 'center' },
      // Other columns...
     ];
 
    return (
        <Container>
        <Box className="breadcrumb">
          <Breadcrumb routeSegments={[{ name: "Materiel", path: "admin/listemateriel" }, { name: "Materiel" }]} />
        </Box>
        <p>
           <Button variant="contained" onClick={handleClickOpen} color="primary">
             Nouveau materiel
           </Button>&nbsp;&nbsp;
           <Button variant="contained" color="secondary">
            Importer des données
            </Button>
          </p>
          <Box>
               <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth
               maxWidth="xl">
                 <DialogTitle id="form-dialog-title">Nouveau Materiel</DialogTitle>
                 <DialogContent>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                    <AutoComplete
                      fullWidth
                      // options={suggestions}
                      getOptionLabel={(option) => option.label}
                      renderInput={(params) => (
                        <TextField {...params} label="Type de materiel" variant="outlined" fullWidth />
                    )}
                      name="typemateriel"
                      id="typemateriel"
                      sx={{ mb: 3 }}
                    />
                    </Grid>
                    <Grid item xs={6}>
                    <Select
                      fullWidth
                      labelId="select-label"
                      value={catmateriel}
                      onChange={(event) => setCatmateriel(event.target.value)}

                     sx={{ mb: 3 }}
                       >
                      <MenuItem value=" ">Choisir la categorie de materiel</MenuItem>
                      <MenuItem value="1">Materiel bureautique</MenuItem>
                      <MenuItem value="-1"> Materiel informatique</MenuItem>
                      <MenuItem value="-1"> Materiel sonore</MenuItem>
                      <MenuItem value="-1"> Alimentation</MenuItem>

                   </Select>
                   </Grid>
                 </Grid>
                 <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <AutoComplete
                       fullWidth
                       // options={suggestions}
                       getOptionLabel={(option) => option.label}
                       renderInput={(params) => (
                         <TextField {...params} label="Modele du materiel" variant="outlined" fullWidth />
                     )}
                       name="typemateriel"
                       id="typemateriel"
                     />
                  </Grid>
                    <Grid item xs={6}>
                        <Select
                          fullWidth
                          labelId="select-label"
                          value={couleur}
                          onChange={(event) => setCouleur(event.target.value)}
                          >
                          <MenuItem value=" ">Choisir une couleur</MenuItem>
                          <MenuItem value="1">Noir</MenuItem>
                          <MenuItem value="1">Gris</MenuItem>
                       </Select>
                    </Grid>
                  </Grid>
                                    
                  <TextField
                     fullWidth
                     autoFocus
                     id="numeroserie"
                     type="text"
                     margin="dense"
                     label="Numero de serie"
                     name="numserie"
                     value={numserie}
                     onChange={(event) => setNumserie(event.target.value)}
                   />

                 <TextField
                     fullWidth
                     autoFocus
                     id="description"
                     type="text"
                     margin="dense"
                     label="Description du materiel"
                     rows={4}
                     multiline
                     name="description"
                     value={description}
                     onChange={(event) => setDescription(event.target.value)}
                   />

                 <TextField
                     fullWidth
                     autoFocus
                     id="prixvente"
                     type="number"
                     margin="dense"
                     label="Prix de vente"
                     name="prixvente"
                     value={prixvente}
                     onChange={(event) => setPrixvente(event.target.value)}
                   />
                  <TextField
                     fullWidth
                     autoFocus
                     id="caution"
                     type="number"
                     margin="dense"
                     label="Caution"
                     name="caution"
                     value={caution}
                     onChange={(event) => setCaution(event.target.value)}
                   />
                   
                 </DialogContent>

                 <DialogActions>
                   <Button variant="outlined" color="secondary" onClick={handleClose}>
                     Annuler
                   </Button>
                   <Button onClick={handleSubmit} color="primary" variant="contained">
                     Valider
                   </Button>
                 </DialogActions>
               </Dialog>
             </Box>
             <SimpleCard title="Rechercher un materiel" sx={{ marginBottom: '16px' }}>        
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
              <TextField
                fullWidth
                size="small"
                id="numeroserie"
                type="text"
                label="Numero de serie"
                name="numserie"
                variant="outlined"
                value={materiel}
                onChange={(event) => setMateriel(event.target.value)}
                sx={{ mb: 3 }}
              />
              <AutoComplete
                    fullWidth
                    size="small"
                    // options={suggestions}
                    getOptionLabel={(option) => option.label}
                    renderInput={(params) => (
                      <TextField {...params} label="Modele" variant="outlined" fullWidth />
                  )}
                    name="typemateriel"
                    id="typemateriel"
              />
              <Select
                labelId="select-label"
                value={"1"}
                size="small"
                sx={{ mb: 3 }}
               //  onChange={handleChange}
                 >
                <MenuItem value="1">Noir</MenuItem>
                <MenuItem value="1">Gris</MenuItem>
             </Select>
             <Select
                  size="small"
                  labelId="select-label"
                  value={"1"}
                  sx={{ mb: 3 }}
                   //  onChange={handleChange}
                  >
                  <MenuItem value="1">Materiel bureautique</MenuItem>
                  <MenuItem value="-1"> Materiel informatique</MenuItem>
                  <MenuItem value="-1"> Materiel sonore</MenuItem>
                  <MenuItem value="-1"> Alimentation</MenuItem>

                 </Select>
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
  
export default Listemateriel;

function filtremateriel(listemateriel, materiel) {
  return listemateriel.filter((Item) => {
    return Item.materiel.toLowerCase().includes(materiel.toLowerCase());
  });
}
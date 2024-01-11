import { Box,TextField,Snackbar,Alert,DialogContent,DialogActions,DialogTitle,Dialog,Autocomplete,MenuItem,Select,Grid } from "@mui/material";
import { Breadcrumb } from "app/components";
import { useState,useEffect } from 'react';
import Button from '@mui/material/Button';
import { deleteData, Finddata, insertData, UpdateData } from '../../functions';
import Listemateriel from "./Listemateriel";
import { Container,AutoComplete } from "app/views/style/style";


  
const Materiel = () => {

  // Form dialog
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleAlertClose = () => setMessage({open:false});

   // Data

    // Input 
  const [catmateriel, setCatmateriel] = useState(' ');
  const [couleur, setCouleur] = useState(' ');
  const [numserie, setNumserie] = useState('');
  const [description, setDescription] = useState('');
  const [prixvente, setPrixvente] = useState(0);
  const [caution, setCaution] = useState(0);
  const [file, setFile] = useState('');
  const handleFileOpen = () => setFileOpen(true);
  const handleFileClose = () => setFileOpen(false);
  const [fileOpen, setFileOpen] = useState(false);

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
    
 
    return (
        <Container>
        <Box className="breadcrumb">
          <Breadcrumb routeSegments={[{ name: "Materiel", path: "admin/listemateriel" }, { name: "Materiel" }]} />
        </Box>
        <p>
           <Button variant="contained" onClick={handleClickOpen} color="primary">
             Nouveau materiel
           </Button>&nbsp;&nbsp;
           <Button variant="contained" onClick={handleFileOpen} color="secondary">
            Exporter des données
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
             <Box>
               <Dialog open={fileOpen} onClose={handleFileClose} aria-labelledby="form-dialog-title">
                 <DialogTitle id="form-dialog-title">Exporter des donnees</DialogTitle>
                 <DialogContent>
                  <TextField
                   fullWidth
                    size="small"
                    type="text"
                    name="filename"
                    label="Nom du fichier"
                     value={file}
                     onChange={(event) => setFile(event.target.value)}
                   />
                 </DialogContent>

                 <DialogActions>
                   <Button variant="outlined" color="secondary" onClick={handleFileClose}>
                     Annuler
                   </Button>
                   <Button onClick={handleSubmit} color="primary">
                     Valider
                   </Button>
                 </DialogActions>
               </Dialog>
             </Box>

                <Snackbar open={message.open} autoHideDuration={3000} onClose={handleAlertClose}>
                <Alert  severity={message.severity} sx={{ width: '100%' }} variant="filled">
                   {message.text}
                </Alert>
              </Snackbar>

        <Listemateriel  />
      </Container>
    );
  };
  
export default Materiel;


import { Box, styled,TextField,Snackbar,Alert,DialogContent,DialogActions,DialogTitle,Dialog,Autocomplete,MenuItem,Select,InputLabel } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import { useData } from 'app/useData';
import { useState,useEffect } from 'react';
import PaginationTable from "app/views/material-kit/tables/PaginationTable";
import Button from '@mui/material/Button';
import getUselink from 'app/views/getuseLink';
import { deleteData, Finddata, insertData, UpdateData } from '../functions';



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

  const handleChange = (event) => {

  };

  
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
  const [icon, setIcon] = useState('');

    // Message
    const [message,setMessage]= useState({
      text:'Information enregistree',
      severity:'success',
      open:false,
    });
  
  // Validation form
    const handleSubmit = async  () => {
      const result = await insertData({"materiel":materiel,"icon":icon,"etat":0},getUselink()+'insertmateriel');
      setMessage({
        text:result.text,
        severity:result.severity,
        open:result.open,
        });
       handleClose();
    }

    useEffect(() => {
      setListemateriel(data);
    },[data]);

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
               <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                 <DialogTitle id="form-dialog-title">Nouveau Materiel</DialogTitle>
                 <DialogContent>
                  <AutoComplete
                    fullWidth
                    // options={suggestions}
                    getOptionLabel={(option) => option.label}
                    renderInput={(params) => (
                      <TextField {...params} label="Type de materiel" variant="outlined" fullWidth />
                  )}
                    name="typemateriel"
                    id="typemateriel"
                  />
                  
                  <InputLabel id="color-select-label">Categorie de materiel</InputLabel>
                  <Select
                    labelId="select-label"
                    value={"1"}
                   //  onChange={handleChange}
                     >
                    <MenuItem value="1">Materiel bureautique</MenuItem>
                    <MenuItem value="-1"> Materiel informatique</MenuItem>
                    <MenuItem value="-1"> Materiel sonore</MenuItem>
                    <MenuItem value="-1"> Alimentation</MenuItem>

                 </Select>
                <p></p>
                <p></p>
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
                   <TextField
                     fullWidth
                     autoFocus
                     id="numeroserie"
                     type="text"
                     margin="dense"
                     label="Numero de serie"
                     name="numserie"
                     value={materiel}
                     onChange={(event) => setMateriel(event.target.value)}
                   />
                 <InputLabel id="color-select-label">Couleur de materiel</InputLabel>
                <Select
                    labelId="select-label"
                    value={"1"}
                   //  onChange={handleChange}
                     >
                    <MenuItem value="1">Noir</MenuItem>
                    <MenuItem value="1">Gris</MenuItem>
                 </Select>
                 <TextField
                     fullWidth
                     autoFocus
                     id="description"
                     type="text"
                     margin="dense"
                     label="Description du materiel"
                     name="description"
                     value={materiel}
                     onChange={(event) => setMateriel(event.target.value)}
                   />

                 <TextField
                     fullWidth
                     autoFocus
                     id="prixvente"
                     type="number"
                     margin="dense"
                     label="Prix de vente"
                     name="prixvente"
                     value={materiel}
                     onChange={(event) => setMateriel(event.target.value)}
                   />
                  <TextField
                     fullWidth
                     autoFocus
                     id="caution"
                     type="number"
                     margin="dense"
                     label="Caution"
                     name="caution"
                     value={materiel}
                     onChange={(event) => setMateriel(event.target.value)}
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
               //  onChange={handleChange}
                 >
                <MenuItem value="1">Noir</MenuItem>
                <MenuItem value="1">Gris</MenuItem>
             </Select>
             <Select
                    labelId="select-label"
                    value={"1"}
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
import { Box, styled,TextField,Snackbar,Alert,DialogContent,DialogActions,DialogTitle,Dialog,Select,MenuItem } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import { useData } from 'app/useData';
import { useState,useEffect } from 'react';
import PaginationTable from "app/views/material-kit/tables/PaginationTable";
import Button from '@mui/material/Button';
import getUselink from 'app/views/getuseLink';
import {insertData} from 'app/views/insertData';


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

  
const Facture = () => {

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
          <Breadcrumb routeSegments={[{ name: "Facture", path: "admin/facture" }, { name: "Facture" }]} />
        </Box>
        <p>
           <Button variant="contained" onClick={handleClickOpen} color="primary">
             Nouvelle facture
           </Button>&nbsp;&nbsp;
           <Button variant="contained" color="inherit">
            Exporter la facture
          </Button>&nbsp;&nbsp;
          <Button variant="contained" color="secondary">
            Importer la facture
          </Button>
          </p>
          <Box>
               <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                 <DialogTitle id="form-dialog-title">Nouvelle facture</DialogTitle>
                 <DialogContent>
                  <TextField
                     fullWidth
                     autoFocus
                     id="materiel"
                     type="text"
                     margin="dense"
                     label="materiel"
                     name="materiel"
                     value={materiel}
                     onChange={(event) => setMateriel(event.target.value)}
                   />
                    <TextField
                     fullWidth
                     autoFocus
                     id="materiel"
                     type="text"
                     margin="dense"
                     label="Icon"
                     name="icon"
                     value={icon}
                     onChange={(event) => setIcon(event.target.value)}
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
             <SimpleCard title="Rechercher une facture" sx={{ marginBottom: '16px' }}>        
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
              //  onChange={handleChange}
                >
               <MenuItem value="1">Depot</MenuItem>
               <MenuItem value="-1"> Salle 6</MenuItem>
            </Select>
            <Select
               labelId="select-label"
               value={"-2"}
              //  onChange={handleChange}
                >
               <MenuItem value="1">Don</MenuItem>
               <MenuItem value="-1">Perte</MenuItem>
               <MenuItem value="-2">Transfert</MenuItem>
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

              <SimpleCard title="Liste des factures">
        <PaginationTable columns={columns} data={listematfilter} />
        </SimpleCard>
      </Container>
    );
  };
  
export default Facture;

function filtremateriel(listemateriel, materiel) {
  return listemateriel.filter((Item) => {
    return Item.materiel.toLowerCase().includes(materiel.toLowerCase());
  });
}
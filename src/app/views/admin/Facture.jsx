import { Box, styled,TextField,Snackbar,Alert,DialogContent,DialogActions,DialogTitle,Dialog,Autocomplete } from "@mui/material";
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
      { label: 'Date', field: 'datefacture', align: 'center' },
      { label: 'ID MV', field: 'mouvement', align: 'center' },
      { label: 'Nom du client', field: 'nom', align: 'center' },
      { label: 'Telephone', field: 'telephone', align: 'center' },
      { label: 'NIF', field: 'nif', align: 'center' },
      { label: 'NUMSTAT', field: 'numstat', align: 'center' },
      { label: 'Adresse', field: 'Adresse', align: 'center' },
      { label: 'QUITTANCE', field: 'quittance', align: 'center' },
      { label: 'statut', field: 'statut', align: 'center' },
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
                     id="idmouvement"
                     type="text"
                     margin="dense"
                     label="Id du mouvement"
                     name="idmouvement"
                     value={materiel}
                     onChange={(event) => setMateriel(event.target.value)}
                   />
                    <TextField
                     fullWidth
                     autoFocus
                     id="datefacture"
                     type="date"
                     margin="dense"
                     name="datefacture"
                     value={icon}
                     onChange={(event) => setIcon(event.target.value)}
                   />

                    <AutoComplete
                      fullWidth
                      // options={suggestions}
                      getOptionLabel={(option) => option.label}
                      renderInput={(params) => (
                        <TextField {...params} label="Nom du client" variant="outlined" fullWidth />
                    )}
                      name="nom"
                      id="nom"
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
               name="client"
               label="Nom du client"
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
             <TextField
               fullWidth
               size="small"
               type="text"
               name="stat"
               variant="outlined"
               label="Numstat"
              //  value={materielfilter}
              //  onChange={(event) => setMaterielfilter(event.target.value)}
               sx={{ mb: 3 }}
             />
            <TextField
               fullWidth
               size="small"
               type="text"
               name="telephone"
               variant="outlined"
               label="Telephone"
              //  value={materielfilter}
              //  onChange={(event) => setMaterielfilter(event.target.value)}
               sx={{ mb: 3 }}
             />
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
import { Box, styled,Icon, IconButton,TextField,Tooltip,Snackbar,Alert,DialogContent,DialogActions,DialogTitle,Dialog } from "@mui/material";
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

  
const Typemateriel = () => {

  // Form dialog
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleAlertClose = () => setMessage({open:false});

   // Data
  const data =useData('getallmateriel');
  const [listemateriel, setListemateriel] = useState([]);
  const [materielfilter, setMaterielfilter] = useState('');

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
      { label: 'Type de materiel', field: 'typemateriel', align: 'center' },
      // Other columns...
     ];

     const donnees = [
      { id: 1, typemateriel: 'Depot 1', /* other fields... */ },
      { id: 2, typemateriel: 'Depot 2', /* other fields... */ },
      { id: 3, typemateriel: 'Depot 3', /* other fields... */ },
      { id: 4, typemateriel: 'Depot 4', /* other fields... */ },
      { id: 5, typemateriel: 'Depot 5', /* other fields... */ },
      { id: 6, typemateriel: 'Depot 6', /* other fields... */ },
      // More rows...
     ];

    return (
        <Container>
        <Box className="breadcrumb">
          <Breadcrumb routeSegments={[{ name: "Type de materiel", path: "admin/typemateriel" }, { name: "Type de materiel" }]} />
        </Box>
        <p>
           <Button variant="contained" onClick={handleClickOpen} color="primary">
           Nouveau type de materiel           
           </Button>&nbsp;&nbsp;
           <Button variant="contained" color="secondary">
          Importer des données
          </Button>
          </p>
          <Box>
               <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                 <DialogTitle id="form-dialog-title">Nouveau type de materiel</DialogTitle>
                 <DialogContent>
                  <TextField
                   fullWidth
                    size="small"
                    type="text"
                    name="typemateriel"
                    label="type de materiel"

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
             <SimpleCard title="Rechercher un type de materiel" sx={{ marginBottom: '16px' }}>        
              <form /* onSubmit={this.handleSubmit}*/>
              <div style={{ display: 'flex', gap: '16px' }}>
              <TextField
               fullWidth
               size="small"
               type="text"
               name="typemateriel"
               label="type de materiel"
               variant="outlined"
               value={materielfilter}
               onChange={(event) => setMaterielfilter(event.target.value)}
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

              <SimpleCard title="Liste des types de materiel">
        <PaginationTable columns={columns} data={donnees} />
        </SimpleCard>
      </Container>
    );
  };
  
export default Typemateriel;

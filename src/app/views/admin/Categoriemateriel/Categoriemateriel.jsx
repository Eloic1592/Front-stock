import { Box, styled,Icon, IconButton,TextField,Tooltip,Snackbar,Alert,DialogContent,DialogActions,DialogTitle,Dialog } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import { useData } from 'app/useData';
import { useState,useEffect } from 'react';
import Button from '@mui/material/Button';
import getUselink from 'app/views/getuseLink';
import { deleteData, Finddata, insertData, UpdateData } from '../../functions';
import Listecategoriemateriel from "./Listecategoriemateriel";



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

  
const Categoriemateriel = () => {

  // Form dialog
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleAlertClose = () => setMessage({open:false});

   // Data
  const [materielfilter, setMaterielfilter] = useState('');

    // Input 
  const [categoriemateriel, setCategoriemateriel] = useState('');


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

     const donnees = [
      { id: 1, categoriemateriel: 'Depot 1', /* other fields... */ },
      { id: 2, categoriemateriel: 'Depot 2', /* other fields... */ },
      { id: 3, categoriemateriel: 'Depot 3', /* other fields... */ },
      { id: 4, categoriemateriel: 'Depot 4', /* other fields... */ },
      { id: 5, categoriemateriel: 'Depot 5', /* other fields... */ },
      { id: 6, categoriemateriel: 'Depot 6', /* other fields... */ },
      // More rows...
     ];

    return (
        <Container>
        <Box className="breadcrumb">
          <Breadcrumb routeSegments={[{ name: "Categorie de materiel", path: "admin/categoriemateriel" }, { name: "Categorie de materiel" }]} />
        </Box>
        <p>
           <Button variant="contained" onClick={handleClickOpen} color="primary">
             Nouvelle categorie de materiel           
           </Button>&nbsp;&nbsp;
           <Button variant="contained" color="secondary">
            Importer des données
          </Button>
          </p>
          <Box>
               <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                 <DialogTitle id="form-dialog-title">Nouvelle categorie de materiel</DialogTitle>
                 <DialogContent>
                  <TextField
                   fullWidth
                    size="small"
                    type="text"
                    name="categoriemateriel"
                    label="categorie de materiel"
                    variant="outlined"
                     value={categoriemateriel}
                     onChange={(event) => setCategoriemateriel(event.target.value)}
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
             <SimpleCard title="Rechercher une categorie de materiel" sx={{ marginBottom: '16px' }}>        
              <form /* onSubmit={this.handleSubmit}*/>
              <div style={{ display: 'flex', gap: '16px' }}>
              <TextField
               fullWidth
               size="small"
               type="text"
               name="categoriemateriel"
               label="categorie de materiel"
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

              <SimpleCard title="Liste des categories de materiel">
        <Listecategoriemateriel data={donnees} />
        </SimpleCard>
      </Container>
    );
  };
  
export default Categoriemateriel;

import { Box,TextField,Snackbar,Alert,DialogContent,DialogActions,DialogTitle,Dialog } from "@mui/material";
import { Breadcrumb } from "app/components";
import { useState,useEffect } from 'react';
import Button from '@mui/material/Button';
import { deleteData, Finddata, insertData, UpdateData } from '../../functions';
import Listecategoriemateriel from "./Listecategoriemateriel";
import { Container } from "app/views/style/style";



const Categoriemateriel = () => {

  // Form dialog
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleAlertClose = () => setMessage({open:false});


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
        { id: 1, categoriemateriel: 'Test Data 1', /* other fields... */ },
        { id: 2, categoriemateriel: 'Test Data 2', /* other fields... */ },
        { id: 3, categoriemateriel: 'Test Data 3', /* other fields... */ },
        { id: 4, categoriemateriel: 'Test Data 4', /* other fields... */ },
        { id: 5, categoriemateriel: 'Test Data 5', /* other fields... */ },
        { id: 6, categoriemateriel: 'Test Data 6', /* other fields... */ },
        { id: 7, categoriemateriel: 'Test Data 7', /* other fields... */ },
        { id: 8, categoriemateriel: 'Test Data 8', /* other fields... */ },
        { id: 9, categoriemateriel: 'Test Data 9', /* other fields... */ },
        { id: 10, categoriemateriel: 'Test Data 10', /* other fields... */ },
        // Add more rows if needed
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
           {/* <Button variant="contained" color="secondary">
            Importer des données
          </Button> */}
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


                <Snackbar open={message.open} autoHideDuration={3000} onClose={handleAlertClose}>
                <Alert  severity={message.severity} sx={{ width: '100%' }} variant="filled">
                   {message.text}
                </Alert>
              </Snackbar>

        <Listecategoriemateriel data={donnees} />
      </Container>
    );
  };
  
export default Categoriemateriel;

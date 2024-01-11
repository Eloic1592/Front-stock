import { Box,TextField,Snackbar,Alert,DialogContent,DialogActions,DialogTitle,Dialog } from "@mui/material";
import { Breadcrumb } from "app/components";
import { useState,useEffect } from 'react';
import Button from '@mui/material/Button';
import { deleteData, Finddata, insertData, UpdateData } from '../../functions';
import Listetypemateriel from "./Listetypemateriel";
import { Container } from "app/views/style/style";
  
const Typemateriel = () => {

  // Form dialog
  const [open, setOpen] = useState(false);
  const [fileOpen, setFileOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleFileOpen = () => setFileOpen(true);
  const handleClose = () => setOpen(false);
  const handleFileClose = () => setFileOpen(false);
  const handleAlertClose = () => setMessage({open:false});

   // Data
  const [file, setFile] = useState('');

    // Input 
  const [typemateriel, setTypemateriel] = useState('');

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
          <Breadcrumb routeSegments={[{ name: "Type de materiel", path: "admin/typemateriel" }, { name: "Type de materiel" }]} />
        </Box>
        <p>
           <Button variant="contained" onClick={handleClickOpen} color="primary">
           Nouveau type de materiel           
           </Button>&nbsp;&nbsp;
           {/* <Button variant="contained" onClick={handleFileOpen} color="secondary">
          Importer des données
          </Button> */}
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
                     value={typemateriel}
                     onChange={(event) => setTypemateriel(event.target.value)}
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
             {/* <Box>
               <Dialog open={fileOpen} onClose={handleFileClose} aria-labelledby="form-dialog-title">
                 <DialogTitle id="form-dialog-title">Importer des donnees</DialogTitle>
                 <DialogContent>
                  <TextField
                   fullWidth
                    size="small"
                    type="file"
                    name="filename"
                    label="Fichier"
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
             </Box> */}
                <Snackbar open={message.open} autoHideDuration={3000} onClose={handleAlertClose}>
                <Alert  severity={message.severity} sx={{ width: '100%' }} variant="filled">
                   {message.text}
                </Alert>
              </Snackbar>

        
        <Listetypemateriel/>        

      </Container>
    );
  };
  
export default Typemateriel;

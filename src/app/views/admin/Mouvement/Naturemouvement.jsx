import { Box,TextField,Snackbar,Alert,DialogContent,DialogActions,DialogTitle,Dialog,Select,MenuItem,Button } from "@mui/material";
import { Breadcrumb } from "app/components";

import { useState,useEffect } from 'react';
import { deleteData, Finddata, insertData, UpdateData } from '../../functions';
import Listenaturemouvement from "./Listenaturemouvement";
import { Container } from "app/views/style/style";


  
const Naturemouvement = () => {

  // Form dialog
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleAlertClose = () => setMessage({open:false});

   // Data
  const [materielfilter, setMaterielfilter] = useState('');

    // Input 
  const [typemouvement, setTypemouvement] = useState('');
  const [categoriemouvement, setCategoriemouvement] = useState('1');

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
          <Breadcrumb routeSegments={[{ name: "Type de mouvement", path: "admin/TypeMouvement" }, { name: "Type de mouvement" }]} />
        </Box>
        <p>
           <Button variant="contained" onClick={handleClickOpen} color="primary">
           Nouveau type de mouvement           
           </Button>&nbsp;&nbsp;
           {/* <Button variant="contained" color="secondary">
            Importer des données
            </Button> */}
          </p>
          <Box>
               <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                 <DialogTitle id="form-dialog-title">Nouveau type de mouvement</DialogTitle>
                 <DialogContent>
                  <TextField
                     fullWidth
                     autoFocus
                     id="typemouvement"
                     type="text"
                     margin="dense"
                     label="type de mouvement"
                     name="typemouvement"
                     value={typemouvement}
                     onChange={(event) => setTypemouvement(event.target.value)}
                       />
                    <Select
                    fullWidth
                     labelId="select-label"
                     value={categoriemouvement}
                     onChange={(event) => setCategoriemouvement(event.target.value)}
                      >
                     <MenuItem value="1">Physique</MenuItem>
                     <MenuItem value="2">Fictif</MenuItem>
                    </Select>
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

        <Listenaturemouvement  />
      </Container>
    );
  };
  
export default Naturemouvement;

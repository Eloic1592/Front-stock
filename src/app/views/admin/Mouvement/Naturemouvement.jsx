import { Box, styled,TextField,Tooltip,Snackbar,Alert,DialogContent,DialogActions,DialogTitle,Dialog,Select,MenuItem,Button } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";

import { useState,useEffect } from 'react';
import PaginationTable from "app/views/material-kit/tables/PaginationTable";
import Grid from '@mui/material/Grid';
import { deleteData, Finddata, insertData, UpdateData } from '../../functions';
import Listenaturemouvement from "./Listenaturemouvement";



const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
      marginBottom: "30px",
      [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
    },
  }));

  
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

     const donnees = [
      { id: 1, naturemouvement: 'Achat', /* other fields... */ },
      { id: 2, naturemouvement: 'Vente', /* other fields... */ },
      { id: 3, naturemouvement: 'Transfert', /* other fields... */ },
      { id: 4, naturemouvement: 'Don', /* other fields... */ },
      { id: 5, naturemouvement: 'Perte', /* other fields... */ },
      { id: 6, naturemouvement: 'Emprunt', /* other fields... */ },
      // More rows...
     ];

    return (
        <Container>
        <Box className="breadcrumb">
          <Breadcrumb routeSegments={[{ name: "Type de mouvement", path: "admin/TypeMouvement" }, { name: "Type de mouvement" }]} />
        </Box>
        <p>
           <Button variant="contained" onClick={handleClickOpen} color="primary">
           Nouveau type de mouvement           
           </Button>&nbsp;&nbsp;
           <Button variant="contained" color="secondary">
            Importer des données
            </Button>
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
             <SimpleCard title="Rechercher un type de mouvement" sx={{ marginBottom: '16px' }}>        
              <form /* onSubmit={this.handleSubmit}*/>
              <div style={{ display: 'flex', gap: '16px' }}>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                <TextField
                 fullWidth
                 size="small"
                 type="text"
                 name="typemouvement"
                 label="type de mouvement"
                 variant="outlined"
                 value={materielfilter}
                 onChange={(event) => setMaterielfilter(event.target.value)}
                 sx={{ mb: 3 }}
               />
             </Grid>
             <Grid item xs={6}>
                <Select
                    fullWidth
                    size="small"
                     labelId="select-label"
                     value={categoriemouvement}
                     onChange={(event) => setCategoriemouvement(event.target.value)}
                      >
                     <MenuItem value="1">Physique</MenuItem>
                     <MenuItem value="2">Fictif</MenuItem>
                </Select>
                </Grid>
              </Grid>
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

              <SimpleCard title="Liste des types de mouvements">
        <Listenaturemouvement data={donnees} />
        </SimpleCard>
      </Container>
    );
  };
  
export default Naturemouvement;

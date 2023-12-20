import { Box, styled,Icon, IconButton,Button,Dialog,TextField,DialogTitle,DialogActions,DialogContent,Tooltip,Snackbar,Alert} from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import { useData } from 'app/useData';
import { useEffect, useState } from 'react';
import PaginationTable from "app/views/material-kit/tables/PaginationTable";
import {insertData} from 'app/views/insertData';
// import {Finddata} from 'app/findData';
import {deleteData} from 'app/views/deleteData';
import {Editsalle} from 'app/views/admin/Editsalle';

const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
      marginBottom: "30px",
      [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
    },
  }));

const Dashboard =  () => {

    // Data
        const data = useData('gettypeentretien');
      const [listesalle,setListesalle] = useState([]);
    
      // Form dialog
      const [open, setOpen] = useState(false);
      const handleClickOpen = () => setOpen(true);
      const handleClose = () => setOpen(false);
      const handleAlertClose = () => setMessage({open:false});
    
      // Edit 
      const [openEdit, setOpenEdit] = useState(false);
      const handleEditopen = () => setOpenEdit(true);
      const handleEditclose = () => setOpenEdit(false);
      const [object, setObject] = useState(null);
    
    
    
      // Input 
      const [salle, setSalle] = useState('');
      const [sallefiltrer, setSallefiltrer] = useState('');
    
      // Message
        const [message,setMessage]= useState({
          text:'Information enregistree',
          severity:'success',
          open:false,
        });
        
            // Validation form
        const handleSubmit = async  () => {
          const result = await insertData({"salle":salle,"etat":0},'insertsalle');
          setMessage({
            text:result.text,
            severity:result.severity,
            open:result.open,
            });
            handleClose();
        }
        
        const handleEdit = async (listesalleid) => {
          // handleEditopen();
        };
    
        const handleDelete = async  (listesalle) => {
         await deleteData({"salle":listesalle.salle,"etat":1},'updatesalle');
         alert('mety');
        };
        
        useEffect(() => {
          setListesalle(data);
        },[data]);
    
    
      const colonne = [
        { label: "ID", field: "id", render: (listesalle) => `${listesalle.id}` },
        { label: "Salle", field: "Salle", render: (listesalle) => `${listesalle.salle}` },
        { label: "ID", field: "id", render: (listesalle) => `${listesalle.etat}` },    
        { label: "Actions", render: (listesalle) => (
          <div>
          <Tooltip title="Modifier">
          <IconButton className="button" aria-label="Edit"  color="primary" onClick={() => handleEdit(listesalle.id)}>
              <Icon>edit_icon</Icon>
          </IconButton>
          </Tooltip>
          <Tooltip title="Supprimer">
          <IconButton className="button" aria-label="Delete" color="default" onClick={() =>handleDelete(listesalle)}>
              <Icon>delete</Icon>
          </IconButton>
          </Tooltip>
          </div>
        )},     // ... Ajoutez d'autres colonnes si nécessaire
      ];
     
    
        return (
            <Container>
            <Box className="breadcrumb">
              <Breadcrumb routeSegments={[{ name: "Salle", path: "admin/salle" }, { name: "Salle" }]} />
            </Box>
            <p>
               <Button variant="contained" onClick={handleClickOpen} color="primary">
                 Nouvelle salle
               </Button>
              </p>
              <Box>
                   <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                     <DialogTitle id="form-dialog-title">Nouvelle salle</DialogTitle>
                     <DialogContent>
                      <TextField
                         fullWidth
                         autoFocus
                         id="salle"
                         type="text"
                         margin="dense"
                         label="Salle"
                         name="salle"
                         value={salle}
                         onChange={(event) => setSalle(event.target.value)}
                        
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
                 <SimpleCard title="Rechercher une salle" sx={{ marginBottom: '16px' }}>        
                  <form /* onSubmit={this.handleSubmit}*/>
                  <div style={{ display: 'flex', gap: '16px' }}>
                  <TextField
                   fullWidth
                   size="small"
                   type="text"
                   name="sallefiltre"
                   label="Nom de la salle"
                   variant="outlined"
                   value={sallefiltrer}
                   onChange={(event) => setSallefiltrer(event.target.value)}
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
    
                <Editsalle open={openEdit} close={handleEditclose} object={object}/>
{/*     
                  <SimpleCard title="Liste des salles">
            <PaginationTable columns={colonne} data={listesallefiltre} />
            </SimpleCard> */}
          </Container>    
          );
        };

export default Dashboard;
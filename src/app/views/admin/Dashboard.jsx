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
    
     
        return (
            <Container>
            <Box className="breadcrumb">
              <Breadcrumb routeSegments={[{ name: "Tableau de bord", path: "admin/dashboard" }, { name: "Tableau de bord" }]} />
            </Box>
                 <SimpleCard title="" sx={{ marginBottom: '16px' }}>        
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
                  
              </Container>    
          );
        };

export default Dashboard;
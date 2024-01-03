import { Box, styled,TextField,Snackbar,Alert,Autocomplete,Grid } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import { useData } from 'app/useData';
import { useState,useEffect } from 'react';
import PaginationTable from "app/views/material-kit/tables/PaginationTable";
import { deleteData, Finddata, insertData, UpdateData } from '../functions';



const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
      marginBottom: "30px",
      [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
    },
  }));
  const AutoComplete = styled(Autocomplete)(() => ({
    marginBottom: '16px',
}));

  
const Proforma = () => {

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
    }

    useEffect(() => {
      setListemateriel(data);
    },[data]);


    const columns = [
      { label: 'ID', field: 'id', align: 'center' },
      { label: 'Commande', field: 'commande', align: 'center' },
      { label: 'date', field: 'datedevis', align: 'center' },
      { label: 'Nom du client', field: 'nom', align: 'center' },
      { label: 'Etat', field: 'statut', align: 'center' },
      // Other columns...
     ];


    return (
        <Container>
        <Box className="breadcrumb">
          <Breadcrumb routeSegments={[{ name: "Proforma", path: "admin/proforma" }, { name: "Proforma" }]} />
        </Box>
             <SimpleCard title="Rechercher un proforma" sx={{ marginBottom: '16px' }}>        
              <form /* onSubmit={this.handleSubmit}*/>
              <div style={{ display: 'flex', gap: '16px' }}>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <TextField
                   fullWidth
                   size="small"
                   type="date"
                   name="datedevis"
                   variant="outlined"
                   value={materielfilter}
                   onChange={(event) => setMaterielfilter(event.target.value)}
                   sx={{ mb: 3 }}
                  />
             </Grid>
             <Grid item xs={6}>
                <AutoComplete
                  fullWidth
                  size="small"
                  // options={suggestions}
                  getOptionLabel={(option) => option.label}
                  renderInput={(params) => (
                    <TextField {...params} label="Nom du client" variant="outlined" fullWidth />
                )}
                  name="idmateriel"
                  id="idmateriel"
                />
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
              
              <SimpleCard title="Liste des proformas">
        <PaginationTable columns={columns} data={listematfilter} />
        </SimpleCard>
      </Container>
    );
  };
  
export default Proforma;

function filtremateriel(listemateriel, materiel) {
  return listemateriel.filter((Item) => {
    return Item.materiel.toLowerCase().includes(materiel.toLowerCase());
  });
}
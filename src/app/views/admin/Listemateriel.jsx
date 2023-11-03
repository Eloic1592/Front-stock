import { Box, styled,Icon, IconButton,TextField,Tooltip,Snackbar,Alert,DialogContent,DialogActions,DialogTitle,Dialog } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import { useData } from 'app/useData';
import { useState } from 'react';
import PaginationTable from "app/views/material-kit/tables/PaginationTable";
import Button from '@mui/material/Button';
import getUselink from 'app/views/getuseLink';


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

  
const Listemateriel = () => {

  // Form dialog
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
   // Data
  const listemateriel =useData('getallmateriel');
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
  

  const handleInsertion = async () => {
    try {
      // Créer l'objet à insérer
      const NewMateriel = {
        "materiel": materiel,
	      "etat":0,
        "icon":icon
      };
  
      // Envoyer la requête POST au serveur
      const response = await fetch(getUselink()+'insertmateriel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(NewMateriel),
      });
  
      // Vérifier si la requête a réussi (statut HTTP 2xx)
      if (response.ok) {
        setMessage({
          text:'Information enregistree',
          severity:'success',
          open:true,
        });
        handleClose();
        window.location.reload();

      } else {
          setMessage({
            text:'Une erreur s\'est produite '+response.statusText,
            severity:'error',
            open:true,

        });
        handleClose();
      }
    } catch (error) {
       setMessage({
         text:'Une erreur s\'est produite',error,
         severity:'error',
         open:true,
         
       });
       handleClose();
    }
  };

  // Colonne
  const colonne = [
    { label: "ID", field: "id", render: (listemateriel) => `${listemateriel.id}` },
    { label: "Materiel", field: "materiel", render: (listemateriel) => `${listemateriel.materiel}` },    
    { label: "Actions", render: () => (
      <div>
      <Tooltip title="Modifier">
      <IconButton className="button" aria-label="Edit"    color="primary" onClick={() =>handleEdit(listemateriel.id)}>
          <Icon>edit_icon</Icon>
      </IconButton>
      </Tooltip>
      <Tooltip title="Supprimer">
      <IconButton className="button" aria-label="Delete" color="default" onClick={() =>handleDelete(listemateriel.id)}>
          <Icon>delete</Icon>
      </IconButton>
      </Tooltip>
      </div>
    )},     // ... Ajoutez d'autres colonnes si nécessaire
  ];
 
    return (
        <Container>
        <Box className="breadcrumb">
          <Breadcrumb routeSegments={[{ name: "Materiel", path: "/material" }, { name: "Table" }]} />
        </Box>
        <p>
           <Button variant="contained" onClick={handleClickOpen} color="primary">
             Nouveau materiel
           </Button>
          </p>
          <Box>
               <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                 <DialogTitle id="form-dialog-title">Nouveau Materiel</DialogTitle>
                 <DialogContent>
                  <TextField
                     fullWidth
                     autoFocus
                     id="materiel"
                     type="text"
                     margin="dense"
                     label="materiel"
                     name="materiel"
                     value={materiel}
                     onChange={(event) => setMateriel(event.target.value)}
                   />
                    <TextField
                     fullWidth
                     autoFocus
                     id="materiel"
                     type="text"
                     margin="dense"
                     label="Icon"
                     name="icon"
                     value={icon}
                     onChange={(event) => setIcon(event.target.value)}
                   />
                 </DialogContent>

                 <DialogActions>
                   <Button variant="outlined" color="secondary" onClick={handleClose}>
                     Annuler
                   </Button>
                   <Button onClick={handleInsertion} color="primary">
                     Valider
                   </Button>
                 </DialogActions>
               </Dialog>
             </Box>
             <SimpleCard title="Technicien" sx={{ marginBottom: '16px' }}>        
              <form /* onSubmit={this.handleSubmit}*/>
              <div style={{ display: 'flex', gap: '16px' }}>
              <TextField
               fullWidth
               size="small"
               type="text"
               name="materielfiltre"
               label="Nom du materiel"
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
                <Snackbar open={message.open} autoHideDuration={6000}>
                <Alert  severity={message.severity} sx={{ width: '100%' }} variant="filled">
                   {message.text}
                </Alert>
              </Snackbar>

              <SimpleCard title="Liste des entretiens">
        <PaginationTable columns={colonne} data={listematfilter} />
        </SimpleCard>
      </Container>
    );
  };
  
export default Listemateriel;

function filtremateriel(listemateriel, materiel) {
  return listemateriel.filter((Item) => {
    return Item.materiel.toLowerCase().includes(materiel.toLowerCase());
  });
}
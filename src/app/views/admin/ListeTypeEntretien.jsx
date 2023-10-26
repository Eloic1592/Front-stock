import { Box, styled,Icon, IconButton,TextField,Tooltip,Snackbar,Alert,DialogContent,DialogActions,DialogTitle,Dialog } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import Button from '@mui/material/Button';
import { useData } from 'app/useData';
import PaginationTable from "app/views/material-kit/tables/PaginationTable";
import { useState } from 'react';
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
  
  
  
  const ListeTypeEntretien = () => {
    
    // Data
    const listetentretien = useData('gettypeentretien');
    // Form dialog
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

      // Input 
  const [type_entretien, setTypeEntretien] = useState('');

  // Message
  const [message,setMessage]= useState({
    text:'Information enregistree',
    severity:'success',
    open:false,
  });



  const handleInsertion = async () => {
    try {
      // Créer l'objet à insérer
      const Newentretien = {
        "typeEntretien": type_entretien,
	      "etat":0
      };
  
      // Envoyer la requête POST au serveur
      const response = await fetch(getUselink()+'inserttypeentretien', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(Newentretien),
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
    { label: "ID", field: "id", render: (listetentretien) => `${listetentretien.id}` },
    { label: "Type entretien", field: "type entretien", render: (listetentretien) => `${listetentretien.typeEntretien}` },    
    { label: "etat", field: "etat", render: (listetentretien) => `${listetentretien.etat}` },   
    { label: "Actions", render: () => (
      <div>
      <Tooltip title="Modifier">
      <IconButton className="button" aria-label="Edit"    color="primary" onClick={() =>handleEdit(listetentretien.id)}>
          <Icon>edit_icon</Icon>
      </IconButton>
      </Tooltip>
      <Tooltip title="Supprimer">
      <IconButton className="button" aria-label="Delete" color="default" onClick={() =>handleDelete(listetentretien.id)}>
          <Icon>delete</Icon>
      </IconButton>
      </Tooltip>
      </div>
    )},    // ... Ajoutez d'autres colonnes si nécessaire
  ];
 
    return (
        <Container>
        <Box className="breadcrumb">
          <Breadcrumb routeSegments={[{ name: "Type_entretien", path: "/material" }, { name: "Table" }]} />
        </Box>
          <p>
           <Button variant="contained" onClick={handleClickOpen} color="primary">
             Nouveau type d'entretien
           </Button>
           </p>
              <Box>
               <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                 <DialogTitle id="form-dialog-title">Nouveau type d'entretien</DialogTitle>
                 <DialogContent>
                   <TextField
                     fullWidth
                     autoFocus
                     id="type_entretien"
                     type="text"
                     margin="dense"
                     label="Type entretien"
                     value={type_entretien}
                     name="type_entretien"
                     onChange={(event) => setTypeEntretien(event.target.value)}
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
             <SimpleCard title="Rechercher un type d'entretien" sx={{ marginBottom: '16px' }}>        
              <form /* onSubmit={this.handleSubmit}*/>
              <div style={{ display: 'flex', gap: '16px' }}>
              <TextField
               fullWidth
               size="small"
               type="text"
               name="type_entretien"
               label="Type d'entretien"
               variant="outlined"
               // value={values.code}
               onChange={handleChange}
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

        <SimpleCard title="Liste des types d' entretiens">
        <PaginationTable columns={colonne} data={listetentretien} />
        </SimpleCard>
      </Container>
    );
  };
  
export default ListeTypeEntretien;
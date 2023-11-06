import { Box, styled,Icon, IconButton,TextField,Tooltip,Snackbar,Alert,DialogContent,DialogActions,DialogTitle,Dialog,Autocomplete } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import { useData } from 'app/useData';
import PaginationTable from "app/views/material-kit/tables/PaginationTable";
import Button from '@mui/material/Button';
import { useState } from 'react';
import getUselink from 'app/views/getuseLink';
import {insertData} from 'app/views/insertData';

const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
      marginBottom: "30px",
      [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
    },
  }));

const AutoComplete = styled(Autocomplete)(() => ({
  width: 300,
  marginBottom: '16px',
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
  
const Listeentretien = () => {

   // Data
  const listetype_entretien=useData('gettypeentretien');
  const listemateriel=useData('getallmateriel');
  const listeentretien = useData('getallventretien');

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
 

   // Message
   const [message,setMessage]= useState({
     text:'Information enregistree',
     severity:'success',
     open:false,
   });

   const [idtype_entretien,setIdtype_entretien]=useState();
   const [idmateriel,setIdmateriel]=useState();
   const [entretien,setEntretien]=useState();

   const [entretienf, setEntretienf] = useState('');
   const [typeEntretienf, setTypeEntretienf] = useState('');
   const [materielf, setMaterielf] = useState('');
  const listeentrfiltre = filterentretien(listeentretien,entretienf,typeEntretienf,materielf);


  const handleSubmit = async  () => {
    const result = await insertData({"idtypeEntretien":idtype_entretien,"idmateriel": idmateriel,"entretien":entretien,"etat":0},getUselink()+'insertentretien');
    setMessage({
        text:result.text,
        severity:result.severity,
        open:result.open,
      });
      window.location.reload();
  }

  // Colonne
  const colonne = [
    { label: "ID", field: "id", render: (listeentretien) => `${listeentretien.id}` },
    { label: "Type entretien", field: "type entretien", render: (listeentretien) => `${listeentretien.typeEntretien}` },    
    { label: "Entretien", field: "entretien", render: (listeentretien) => `${listeentretien.entretien}` },
    { label: "materiel", field: "materiel", render: (listeentretien) => `${listeentretien.materiel}` },
    { label: "etat", field: "etat", render: (listeentretien) => `${listeentretien.etat}` },  
    { label: "Actions", render: () => (
      <div>
      <Tooltip title="Modifier">
      <IconButton className="button" aria-label="Edit"    color="primary" onClick={() =>handleEdit(listeentretien.id)}>
          <Icon>edit_icon</Icon>
      </IconButton>
      </Tooltip>
      <Tooltip title="Supprimer">
      <IconButton className="button" aria-label="Delete" color="default" onClick={() =>handleDelete(listeentretien.id)}>
          <Icon>delete</Icon>
      </IconButton>
      </Tooltip>
      </div>
    )},    // ... Ajoutez d'autres colonnes si nécessaire
  ];
 
    return (
        <Container>
        <Box className="breadcrumb">
          <Breadcrumb routeSegments={[{ name: "Entretien", path: "/material" }, { name: "Table" }]} />
        </Box>
          <p>
           <Button variant="contained" onClick={handleClickOpen} color="primary">
             Nouvel entretien
           </Button>
          </p>
          <Box>
               <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                 <DialogTitle id="form-dialog-title">Nouvel entretien</DialogTitle>
                 <DialogContent>
                 <AutoComplete
                    options={listetype_entretien}
                    getOptionLabel={(option) => option.typeEntretien}
                    renderInput={(params) => (
                      <TextField {...params} label="Type d'entretien" variant="outlined" fullWidth />
                    )}
                    onChange={(event, value) => {
                      if (value) {
                        setIdtype_entretien(value.id); 
                      }
                    }}
                    name="idtype_entretien"
                    id="idtype_entretien"
                  />
                    <AutoComplete
                     options={listemateriel}
                     getOptionLabel={(option) => option.materiel}
                     renderInput={(params) => (
                       <TextField {...params} label="Materiel" variant="outlined" fullWidth />
                     )}
                     onChange={(event, value) => {
                      if (value) {
                        setIdmateriel(value.id);
                      }
                    }}
                     name="idmateriel"
                     id="idmateriel"
                   />
                  <TextField
                     fullWidth
                     autoFocus
                     id="entretien"
                     type="text"
                     margin="dense"
                     label="Entretien"
                     name="entretien"
                     value={entretien}
                     onChange={(event) => setEntretien(event.target.value)}
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
             <SimpleCard title="Recherche un genre d'entretien" sx={{ marginBottom: '16px' }}>        
              <form /* onSubmit={this.handleSubmit}*/>
            <div style={{ display: 'flex', gap: '16px' }}>
              <TextField
               fullWidth
               size="small"
               type="text"
               name="entretienf"
               label=" Genre d'entretien"
               variant="outlined"
               value={entretienf}
               onChange={(event) => setEntretienf(event.target.value)}
               sx={{ mb: 3 }}
             />
             <AutoComplete
              options={listetype_entretien}
              getOptionLabel={(option) => option.typeEntretien}
              renderInput={(params) => (
                <TextField {...params} label="Type d'entretien" variant="outlined" fullWidth
                onSelect={(event) => setTypeEntretienf(event.target.value)} />
              )}
              name="idtype_entretienf"
              id="idtype_entretien"
            />
             <AutoComplete
              options={listemateriel}
              getOptionLabel={(option) => option.materiel}
              renderInput={(params) => (
                <TextField {...params} label="Materiel" variant="outlined" fullWidth                
                value={materielf}
                onSelect={(event) => setMaterielf(event.target.value)}/>
              )}
              name="idmaterielf"
              id="idmateriel"
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
        <PaginationTable columns={colonne} data={listeentrfiltre} />
        </SimpleCard>
      </Container>
    );
  };
  
export default Listeentretien;

function filterentretien(listeentretien,entretien,Tentretien,materiel) {
  return listeentretien.filter((Item) => {
    return  Item.entretien.toLowerCase().includes(entretien.toLowerCase())&&
    Item.typeEntretien.toLowerCase().includes(Tentretien.toLowerCase())&&
    Item.materiel.toLowerCase().includes(materiel.toLowerCase());
  });
}
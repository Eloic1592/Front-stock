import { Box, styled,Icon, IconButton,TextField,Tooltip,Snackbar,Alert,DialogContent,DialogActions,DialogTitle,Dialog,Button } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import { useData } from 'app/useData';
import { useState,useEffect } from 'react';
import PaginationTable from "app/views/material-kit/tables/PaginationTable";
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

  const handleEdit = (id) => {
    // Mettez ici votre logique pour l'édition
    alert(`Mety`+id);
  };
  
  const handleDelete = (id) => {
    // Mettez ici votre logique pour la suppression
    alert(`Mety`+id);  
  };

  const handleSubmit = (event) => {

  };
  const handleChange = (event) => {

  };



const ListeTechnicien = () => {

   // Data  
   const data = useData('gettechnicien');
   const [listetechnicien, setListetechnicien] = useState([]);

  //  Input
   const [nom, setNom] = useState('');
   const [prenom, setPrenom] = useState('');
   const [code, setCode] = useState('');
   const [dtn, setDtn] = useState('');
   const [mdp, setMdp] = useState('');
   const [filtrenom, setFiltrenom] = useState('');
   const [filtreprenom, setFiltreprenom] = useState('');
   const listetechfiltre = filtretech(listetechnicien,filtrenom,filtreprenom);

// Dialog
   const [open, setOpen] = useState(false);
   const handleClickOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);
    const handleAlertClose = () => setMessage({open:false});

 
   // Message
   const [message,setMessage]= useState({
    text:'Information enregistree',
    severity:'success',
    open:false,
  });

  // Validation form
  const handleSubmit = async  () => {
    const result = await insertData(
      {"nom":nom,
      "prenom": prenom,
      'dtn':dtn,
      "code":code,
      "mdp":mdp,
      "etat":0},
      getUselink()+'inserttechnicien');

    setMessage({
        text:result.text,
        severity:result.severity,
        open:result.open,
      });
      handleClose();
  }
  useEffect(() => {
    setListetechnicien(data);
  },[data]);

  // Colonne
  const colonne = [
    { label: "Code", field: "Code", render: (listetechnicien) => `${listetechnicien.code}` },
    { label: "Nom", field: "Nom", render: (listetechnicien) => `${listetechnicien.nom}` },   
    { label: "Prenom", field: "Prenom", render: (listetechnicien) => `${listetechnicien.prenom}` },   

    // { label: "code", field: "code", render: (listetechnicien) => `${listetechnicien.code}` },    
    { label: "Actions", render: () => (
      <div>
      <Tooltip title="Modifier">
      <IconButton className="button" aria-label="Edit"    color="primary" onClick={() =>handleEdit(listetechnicien.id)}>
          <Icon>edit_icon</Icon>
      </IconButton>
      </Tooltip>
      <Tooltip title="Supprimer">
      <IconButton className="button" aria-label="Delete" color="default" onClick={() =>handleDelete(listetechnicien.id)}>
          <Icon>delete</Icon>
      </IconButton>
      </Tooltip>
      </div>
    )},        // ... Ajoutez d'autres colonnes si nécessaire
  ];
 
    return (



        <Container>
        <Box className="breadcrumb">
          <Breadcrumb routeSegments={[{ name: "Technicien", path: "/material" }, { name: "Table" }]} />
        </Box>
        <p>
           <Button variant="contained" onClick={handleClickOpen} color="primary">
           Nouveau technicien
           </Button>
          </p>
          <Box>
               <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                 <DialogTitle id="form-dialog-title">Nouveau technicien</DialogTitle>
                 <DialogContent>
                    <TextField
                     fullWidth
                     autoFocus
                     id="nom"
                     type="text"
                     margin="dense"
                     label="Nom"
                     name="nom"
                     value={nom}
                     onChange={(event) => setNom(event.target.value)}
                    />
                                        
                    <TextField
                     fullWidth
                     autoFocus
                     id="prenom"
                     type="text"
                     margin="dense"
                     label="Prenom"
                     name="prenom"
                     value={prenom}
                     onChange={(event) => setPrenom(event.target.value)}
                    />
                    <TextField                     
                      fullWidth
                      autoFocus
                      id="mdp"
                      type="date"
                      margin="dense"
                      name="dtn"
                      value={dtn}
                      onChange={(event) => setDtn(event.target.value)}
                      sx={{ mb: 2 }}
                    />
                 

                    <TextField
                     fullWidth
                     autoFocus
                     id="code"
                     type="text"
                     margin="dense"
                     label="Code"
                     name="code"
                     value={code}
                     onChange={(event) => setCode(event.target.value)}
                    />

                    <TextField                     
                      fullWidth
                      autoFocus
                      id="mdp"
                      type="password"
                      margin="dense"
                      label="Mot de passe"
                      name="mdp"
                      value={mdp}
                      onChange={(event) => setMdp(event.target.value)}
                      sx={{ mb: 2 }}
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

        <SimpleCard title="Rechercher un technicien" sx={{ marginBottom: '16px' }}>        
        <form /* onSubmit={this.handleSubmit}*/>
        <div style={{ display: 'flex', gap: '16px' }}>
        <TextField
         fullWidth
         size="small"
         type="text"
         name="nom"
         label="Nom"
         variant="outlined"
         value={filtrenom}
         onChange={(event) => setFiltrenom(event.target.value)}
         sx={{ mb: 3 }}
       />
      <TextField
        fullWidth
        size="small"
        type="text"
        name="prenom"
        label="Prenom"
        variant="outlined"
        value={filtreprenom}
        onChange={(event) => setFiltreprenom(event.target.value)}
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

        <SimpleCard title="Liste des techniciens">
        <PaginationTable columns={colonne} data={listetechfiltre} />
        </SimpleCard>
      </Container>
    );
  };
  
export default ListeTechnicien;


function filtretech(listeentretien,nom,prenom) {
  return listeentretien.filter((Item) => {
    return Item.nom.toLowerCase().includes(nom.toLowerCase())&&Item.prenom.toLowerCase().includes(prenom.toLowerCase());
  });
}
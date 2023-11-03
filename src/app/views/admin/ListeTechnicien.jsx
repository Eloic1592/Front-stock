import { Box, styled,Icon, IconButton,TextField,Tooltip} from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import { useData } from 'app/useData';
import { useState } from 'react';
import PaginationTable from "app/views/material-kit/tables/PaginationTable";


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
   const listetechnicien = useData('gettechnicien');
   const [filtrenom, setFiltrenom] = useState('');
   const [filtreprenom, setFiltreprenom] = useState('');
   const listetechfiltre = filtretech(listetechnicien,filtrenom,filtreprenom);
 

   const initialValues = {
    username: 'JohnDoe',
    firstName: 'John',
    // ...ajoutez d'autres valeurs initiales
  };

  // Colonne
  const colonne = [
    { label: "ID", field: "id", render: (listetechnicien) => `${listetechnicien.id}` },
    { label: "Nom", field: "Nom", render: (listetechnicien) => `${listetechnicien.nom}` },   
    { label: "Prenom", field: "Preno", render: (listetechnicien) => `${listetechnicien.prenom}` },   

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
        <SimpleCard title="Liste des types d' entretiens">
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
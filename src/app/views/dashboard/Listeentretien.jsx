import { Box, styled,Icon, IconButton } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import { useData } from 'app/useData';
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

  
const Listeentretien = () => {

   // Data
  const listeentretien = useData('getallventretien');

  // Colonne
  const colonne = [
    { label: "ID", field: "id", render: (listeentretien) => `${listeentretien.id}` },
    { label: "Type entretien", field: "type entretien", render: (listeentretien) => `${listeentretien.typeEntretien}` },    
    { label: "Entretien", field: "entretien", render: (listeentretien) => `${listeentretien.entretien}` },
    { label: "materiel", field: "materiel", render: (listeentretien) => `${listeentretien.materiel}` },
    { label: "etat", field: "etat", render: (listeentretien) => `${listeentretien.etat}` },  
    { label: "Actions", render: () => (
      <div>
      <IconButton className="button" aria-label="Edit"  color="primary" onClick={() =>handleEdit(listeentretien.id)}>
          <Icon>edit_icon</Icon>
      </IconButton>
      <IconButton className="button" aria-label="Delete"  color="default" onClick={() =>handleDelete(listeentretien.id)}>
          <Icon>delete</Icon>
      </IconButton>
      </div>
    )},    // ... Ajoutez d'autres colonnes si nécessaire
  ];
 
    return (
        <Container>
        <Box className="breadcrumb">
          <Breadcrumb routeSegments={[{ name: "Entretien", path: "/material" }, { name: "Table" }]} />
        </Box>
        <SimpleCard title="Liste des entretiens">
        <PaginationTable columns={colonne} data={listeentretien} />
        </SimpleCard>
      </Container>
    );
  };
  
export default Listeentretien;
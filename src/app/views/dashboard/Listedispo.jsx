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

  
const Listedispo = () => {

   // Data
  const listedispo = useData('getallvdisponibilite');

  // Colonne
  const colonne = [
    { label: "ID", field: "id", render: (listedispo) => `${listedispo.id}` },
    { label: "Responsable", field: "Responsable", render: (listedispo) => `${listedispo.nom+' '+listedispo.prenom}` },    
    { label: "date debut", field: "date debut", render: (listedispo) => `${listedispo.date_debut}` },
    { label: "date fin", field: "date fin", render: (listedispo) => `${listedispo.date_fin}` },
    { label: "etat", field: "etat", render: (listedispo) => `${listedispo.etat}` },  
    { label: "Actions", render: () => (
      <div>
      <IconButton className="button" aria-label="Edit"  color="primary" onClick={() =>handleEdit(listedispo.id)}>
          <Icon>edit_icon</Icon>
      </IconButton>
      <IconButton className="button" aria-label="Delete"  color="default" onClick={() =>handleDelete(listedispo.id)}>
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
        <PaginationTable columns={colonne} data={listedispo} />
        </SimpleCard>
      </Container>
    );
  };
  
export default Listedispo;
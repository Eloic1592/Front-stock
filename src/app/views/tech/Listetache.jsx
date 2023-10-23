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


  const handleEdit = (idtache) => {
    // Mettez ici votre logique pour l'édition
    alert(`Mety`+idtache);
  };
  
  const handleDelete = (idtache) => {
    // Mettez ici votre logique pour la suppression
    alert(`Mety`+idtache);  
  };

  
const Listetache = () => {

   // Data
  const listetache = useData('getallvtache');

  // Colonne
  const colonne = [
    { label: "ID", field: "id", render: (listetache) => `${listetache.idtache}` },
    { label: "entretien", field: "entretien", render: (listetache) => `${listetache.entretien}` },    
    { label: "prenom", field: "prenom", render: (listetache) => `${listetache.prenom}` },
    { label: "description", field: "description", render: (listetache) => `${listetache.description}` },
    { label: "etat", field: "etat", render: (listetache) => `${listetache.etat}` },  
    // ... Ajoutez d'autres colonnes si nécessaire
  ];
 
    return (
        <Container>
        <Box className="breadcrumb">
          <Breadcrumb routeSegments={[{ name: "Entretien", path: "/material" }, { name: "Table" }]} />
        </Box>
        <SimpleCard title="Liste des taches">
        <PaginationTable columns={colonne} data={listetache} />
        </SimpleCard>
      </Container>
    );
  };
  
export default Listetache;
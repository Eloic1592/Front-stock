import { Box, styled } from "@mui/material";
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


  
const Listeentretien = () => {
  const colonne = [
    { label: "Name", field: "name" },
    { label: "Company", field: "company" },
    { label: "Start Date", field: "date" },
    // ... Ajoutez d'autres colonnes si nécessaire
  ];
    const listeentretien = useData('getallentretien');
  
    return (
        <Container>
        <Box className="breadcrumb">
          <Breadcrumb routeSegments={[{ name: "Material", path: "/material" }, { name: "Table" }]} />
        </Box>
        <SimpleCard title="Liste des entretiens">
        <PaginationTable columns={colonne} data={listeentretien} />
        </SimpleCard>
      </Container>
    );
  };
  
export default Listeentretien;
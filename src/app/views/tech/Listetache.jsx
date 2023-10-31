import { Box, styled,Select, MenuItem,TextField,Button } from "@mui/material";
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


  const handleEdit = (idtache) => {
    // Mettez ici votre logique pour l'édition
    alert(`Mety`+idtache);
  };
  
  const handleDelete = (idtache) => {
    // Mettez ici votre logique pour la suppression
    alert(`Mety`+idtache);  
  };

  const handleChange = (event) => {

  };

  
const Listetache = () => {


   // Data
  const listetache = useData('getallvtache');
  const [selectOption, setSelectedOption] = useState('1');

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
          <Breadcrumb routeSegments={[{ name: "Tache", path: "/tache" }, { name: "Table" }]} />
        </Box>
        <p>
        </p>
        <SimpleCard title="Rechercher une tache" sx={{ marginBottom: '16px' }}>        
        <form /* onSubmit={this.handleSubmit}*/>
        <div style={{ display: 'flex', gap: '16px' }}>
        <TextField
         fullWidth
         size="small"
         type="text"
         name="designation"
         label="Designation"
         variant="outlined"
         // value={values.code}
         onChange={handleChange}
         sx={{ mb: 3 }}
       />

      <TextField
        fullWidth
        size="small"
        type="date"
        name="date_tache"
        variant="outlined"
        // value={values.code}
        onChange={handleChange}
        sx={{ mb: 3 }}
      />
      <Select
         labelId="select-label"
         value={selectOption}
        >
         <MenuItem value="1">Basiques</MenuItem>
         <MenuItem value="2">Prioritaires</MenuItem>
      </Select>
      </div>
      </form>
        </SimpleCard>
          <p></p>
          <p></p>
        <SimpleCard title="Liste des taches">
        <PaginationTable columns={colonne} data={listetache} />
        </SimpleCard>
      </Container>
    );
  };
  
export default Listetache;
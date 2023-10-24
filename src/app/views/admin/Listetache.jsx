import { Box, styled,Icon, IconButton,TextField,Autocomplete } from "@mui/material";
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

  const AutoComplete = styled(Autocomplete)(() => ({
    width: 300,
    marginBottom: '16px',
  }));

  const handleEdit = (idtache) => {
    // Mettez ici votre logique pour l'édition
    alert(`Mety`+idtache);
  };
  
  const handleDelete = (idtache) => {
    // Mettez ici votre logique pour la suppression
    alert(`Mety`+idtache);  
  };

  const handleSubmit = (event) => {

  };
  const handleChange = (event) => {

  };
  
const Listetache = () => {
  const suggestions = [
    { label: 'Tech1' },
    { label: 'Tech2' },
    { label: 'Tech3' },

  ];

   // Data
  const listetache = useData('getallvtache');

  // Colonne
  const colonne = [
    { label: "ID", field: "id", render: (listetache) => `${listetache.idtache}` },
    { label: "entretien", field: "entretien", render: (listetache) => `${listetache.entretien}` },    
    { label: "prenom", field: "prenom", render: (listetache) => `${listetache.prenom}` },
    { label: "description", field: "description", render: (listetache) => `${listetache.description}` },
    { label: "etat", field: "etat", render: (listetache) => `${listetache.etat}` },  
    { label: "Actions", render: () => (
      <div>
      <IconButton className="button" aria-label="Edit"  color="primary" onClick={() =>handleEdit(listetache.idtache)}>
          <Icon>edit_icon</Icon>
      </IconButton>
      <IconButton className="button" aria-label="Delete"  color="default" onClick={() =>handleDelete(listetache.idtache)}>
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

        <AutoComplete
          options={suggestions}
          getOptionLabel={(option) => option.label}
          renderInput={(params) => (
            <TextField {...params} label="Responsable" variant="outlined" fullWidth />
          )}
          name="idtechnicien"
          id="idtechnicien"
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
      </div>
      </form>
        </SimpleCard>
          <p></p>
          <p></p>
        <SimpleCard title="Liste des taches des techniciens">
        <PaginationTable columns={colonne} data={listetache} />
        </SimpleCard>
      </Container>
    );
  };
  
export default Listetache;
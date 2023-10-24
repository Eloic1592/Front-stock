import { Box, styled,Icon, IconButton,TextField } from "@mui/material";
import { LoadingButton } from '@mui/lab';
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

  const handleSubmit = (event) => {
    // console.log("submitted");
    // console.log(event);
  };
  const handleChange = (event) => {
    // console.log("submitted");
    // console.log(event);
  };



const ListeTechnicien = () => {

   // Data  
   const listetechnicien = useData('gettechnicien');

   const initialValues = {
    username: 'JohnDoe',
    firstName: 'John',
    // ...ajoutez d'autres valeurs initiales
  };

  // Colonne
  const colonne = [
    { label: "ID", field: "id", render: (listetechnicien) => `${listetechnicien.id}` },
    { label: "Nom", field: "type entretien", render: (listetechnicien) => `${listetechnicien.nom}` },    
    { label: "prenom", field: "type entretien", render: (listetechnicien) => `${listetechnicien.prenom}` },    
    { label: "etat", field: "etat", render: (listetechnicien) => `${listetechnicien.etat}` },
    { label: "Actions", render: () => (
      <div>
      <IconButton className="button" aria-label="Edit"  color="primary" onClick={() =>handleEdit(listetechnicien.id)}>
          <Icon>edit_icon</Icon>
      </IconButton>
      <IconButton className="button" aria-label="Delete"  color="default" onClick={() =>handleDelete(listetechnicien.id)}>
          <Icon>delete</Icon>
      </IconButton>
      </div>
    )},        // ... Ajoutez d'autres colonnes si nécessaire
  ];
 
    return (
        <Container>
        <Box className="breadcrumb">
          <Breadcrumb routeSegments={[{ name: "Technicien", path: "/material" }, { name: "Table" }]} />
        </Box>
        <SimpleCard title="Rechercher un technicien">
        <form /* onSubmit={this.handleSubmit}*/>
        <TextField
           fullWidth
           size="small"
           type="tex"
           name="code"
           label="ETU"
           variant="outlined"
          //  value={values.code}
           onChange={handleChange}
           sx={{ mb: 3 }}
         />
        <TextField
           fullWidth
           size="small"
           type="tex"
           name="code"
           label="ETU"
           variant="outlined"
          //  value={values.code}
           onChange={handleChange}
           sx={{ lg: 6 }}
         />
        <LoadingButton
          type="submit"
          color="primary"
          // loading={loading}
          variant="contained"
          sx={{ lg: 6 }} // Tu peux ajuster ce paramètre pour l'espacement vertical
        >
          Rechercher
        </LoadingButton>
      </form>
        </SimpleCard>
        <SimpleCard title="Liste des types d' entretiens">
        <PaginationTable columns={colonne} data={listetechnicien} />
        </SimpleCard>
      </Container>
    );
  };
  
export default ListeTechnicien;
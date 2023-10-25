import { Box, styled,Icon, IconButton,TextField,Autocomplete,Select, MenuItem,Tooltip} from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import { useData } from 'app/useData';
import { useState,useEffect } from 'react';
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


  
const Listeplainte = () => {

  useEffect(() => {
    handleChoixChange({ target: { value: selectedOption } });
  }, []); // Le tableau de dépendances est vide, ce qui signifie 

   // Data
  const listesalle = useData('getallsalle');


  const [selectedOption, setSelectedOption] = useState('1');
  const [suggestions, setSuggestions] = useState([]);
  const [autoCompleteProps, setAutoCompleteProps] = useState({
    name: 'idutilisateur',
    id: 'idutilisateur',
    label: 'utilisateur',
  });
  
  const handleChoixChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
  
    if (selectedValue === '1') {
      setAutoCompleteProps({
        name: 'idutilisateur',
        id: 'idutilisateur',
        label: 'utilisateur',
      });
    } else {
      setAutoCompleteProps({
        name: 'idsalle',
        id: 'idsalle',
        label: 'salle',
      });



    }

  };

  // Colonne
  const colonne = [
    { label: "ID", field: "id", render: (listesalle) => `${listesalle.id}` },
    { label: "Salle", field: "salle", render: (listesalle) => `${listesalle.salle}` },    
    { label: "etat", field: "etat", render: (listesalle) => `${listesalle.etat}` }, 
    { label: "Actions", render: () => (
      <div>
      <Tooltip title="Modifier">
      <IconButton className="button" aria-label="Edit"    color="primary" onClick={() =>handleEdit(listesalle.id)}>
          <Icon>edit_icon</Icon>
      </IconButton>
      </Tooltip>
      <Tooltip title="Supprimer">
      <IconButton className="button" aria-label="Delete" color="default" onClick={() =>handleDelete(listesalle.id)}>
          <Icon>delete</Icon>
      </IconButton>
      </Tooltip>
      </div>
    )},     // ... Ajoutez d'autres colonnes si nécessaire
  ];
 
    return (
        <Container>
        <Box className="breadcrumb">
          <Breadcrumb routeSegments={[{ name: "Plainte", path: "/Plainte" }, { name: "Table" }]} />
        </Box>
             <SimpleCard title="Rechercher une plainte" sx={{ marginBottom: '16px' }}>        
              <form /* onSubmit={this.handleSubmit}*/>
              <div style={{ display: 'flex', gap: '16px' }}>
            <Select
               labelId="select-label"
               value={selectedOption}
               onChange={handleChoixChange}
                >
               <MenuItem value="1">Individuel</MenuItem>
               <MenuItem value="2">Salle</MenuItem>
            </Select>


            <AutoComplete
              options={suggestions}
              getOptionLabel={(option) => option.label}
              renderInput={(params) => (
                <TextField {...params} label={autoCompleteProps.label} variant="outlined" fullWidth />
              )}
              name={autoCompleteProps.name}
              id={autoCompleteProps.id}
            />
            
            <AutoComplete
              options={suggestions}
              getOptionLabel={(option) => option.label}
              renderInput={(params) => (
                <TextField {...params} label="Materiel" variant="outlined" fullWidth />
            )}
              name="idmateriel"
              id="idmateriel"
            />
            <TextField
               fullWidth
               size="small"
               type="date"
               name="date_envoi"
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

              <SimpleCard title="Liste des salle">
        <PaginationTable columns={colonne} data={listesalle} />
        </SimpleCard>
      </Container>
    );
  };
  
export default Listeplainte;
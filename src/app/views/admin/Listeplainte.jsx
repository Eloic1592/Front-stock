import { Box, styled,Icon, IconButton,TextField,Autocomplete,Select, MenuItem, FormControl, InputLabel} from "@mui/material";
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

   // Data
  const listesalle = useData('getallsalle');


  const [selectedOption, setSelectedOption] = useState('1');
  const [suggestions, setSuggestions] = useState([]);

  
    const handleChoixChange  = (event,newValue) => {
    setSelectedOption(event.target.value);
    if(newValue.value =='1'){
        setSuggestions([
            { label: 'Suggestion A', value: 'suggestionA' },
            { label: 'Suggestion B', value: 'suggestionB' },
          ]);
    }else{
        setSuggestions([
            { label: 'Suggestion X', value: 'SuggestionX' },
            { label: 'Suggestion Y', value: 'suggestionY' },
          ]);
    }
  };


  // Colonne
  const colonne = [
    { label: "ID", field: "id", render: (listesalle) => `${listesalle.id}` },
    { label: "Salle", field: "salle", render: (listesalle) => `${listesalle.salle}` },    
    { label: "etat", field: "etat", render: (listesalle) => `${listesalle.etat}` }, 
    { label: "Actions", render: () => (
      <div>
      <IconButton className="button" aria-label="Edit"  color="primary" onClick={() =>handleEdit(listesalle.id)}>
          <Icon>edit_icon</Icon>
      </IconButton>
      <IconButton className="button" aria-label="Delete"  color="default" onClick={() =>handleDelete(listesalle.id)}>
          <Icon>delete</Icon>
      </IconButton>
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
                <TextField {...params} label="Envoyeur" variant="outlined" fullWidth />
              )}
              name="idutilisateur"
              id="idutilisateur"
            
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
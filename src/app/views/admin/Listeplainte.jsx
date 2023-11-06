import { Box, styled,TextField,Autocomplete,Select, MenuItem} from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import { useData } from 'app/useData';
import { useState,useEffect } from 'react';
import PaginationTable from "app/views/material-kit/tables/PaginationTable";
import  convertdate from "app/views/convertdate";

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
const [listeplainte,setListeplainte] = useState([]);
const [colonne,setColonne]=useState([]);
const [selectedOption, setSelectedOption] = useState('1');
const materiel=useData('getallmateriel');
const [autoCompleteProps, setAutoCompleteProps] = useState({
  name: 'idutilisateur',
  id: 'idutilisateur',
  label: 'utilisateur',
});
const [date, setDate] = useState('');

// Filtre

const [materielf, setMaterielf] = useState('');
const [suggestionf, setSuggestionf] = useState('');
const [listeplaintefiltre,setListeplaintefiltre] = useState([]);

const plaintid=useData('getplainteind');
const plainteSalle = useData('getplaintesalle');

const fetchData = (selectedValue) => {
  if (selectedValue === '1') {
    setAutoCompleteProps({
      name: 'idutilisateur',
      id: 'idutilisateur',
      label: 'utilisateur',
    });
    setListeplainte(() => plaintid);
    setColonne([
        { label: "Id", field: "id", render: (listeplainte) => `${listeplainte.idplainte}` },
        { label: "nom", field: "nom", render: (listeplainte) => `${listeplainte.nom}` },    
        { label: "materiel", field: "materiel", render: (listeplainte) => `${listeplainte.materiel}` }, 
        { label: "description", field: "description", render: (listeplainte) => `${listeplainte.description}` }, 
        { label: "date dedepot", field: "datedepot", render: (listeplainte) => `${convertdate(listeplainte.dateDepot)}` }, 
      ]);

      setListeplaintefiltre(filtreplainte(listeplainte,suggestionf,materielf,date,selectedOption));
  } else {
    setAutoCompleteProps({
      name: 'idsalle',
      id: 'idsalle',
      label: 'salle',
    });
    setListeplainte(() => plainteSalle);
    setColonne([
        { label: "Id", field: "id", render: (listeplainte) => `${listeplainte.idplainte}` },
        { label: "salle", field: "salle", render: (listeplainte) => `${listeplainte.salle}` },    
        { label: "materiel", field: "materiel", render: (listeplainte) => `${listeplainte.materiel}` }, 
        { label: "description", field: "description", render: (listeplainte) => `${listeplainte.description}` }, 
        { label: "date dedepot", field: "datedepot", render: (listeplainte) => `${convertdate(listeplainte.dateDepot)}` }, 
  ]);
  setListeplaintefiltre(filtreplainte(listeplainte,suggestionf,materielf,date,selectedOption));
    }
  };


  const handleChoixChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    fetchData(selectedValue);
  };

  useEffect(() => {
    handleChoixChange({ target: { value: selectedOption } });
  }, [colonne,listeplaintefiltre]);
 

 
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
              options={materiel}
              getOptionLabel={(option) => option.materiel}
              renderInput={(params) => (
                <TextField {...params} label="Materiel" variant="outlined" fullWidth
                value={materielf}
                onSelect={(event) => setMaterielf(event.target.value)}
                />
            )}
              name="idmateriel"
              id="idmateriel"
            />

            <TextField
                fullWidth
                size="small"
                type="text"
                label={autoCompleteProps.label}
                name={autoCompleteProps.name}
                id={autoCompleteProps.id}
                variant="outlined"
                value={suggestionf}
                onChange={(event) => setSuggestionf(event.target.value)}
               sx={{ mb: 3 }}
            />
            

            <TextField
               fullWidth
               size="small"
               type="date"
               name="date_envoi"
              variant="outlined"
               value={date}
               onChange={(event) => setDate(event.target.value)}
               sx={{ mb: 3 }}
            />
            </div>
            </form>
              </SimpleCard>
                <p></p>
                <p></p>

              <SimpleCard title="Liste des plaintes">
        <PaginationTable columns={colonne} data={listeplaintefiltre} />
        </SimpleCard>
      </Container>
    );
  };
  
export default Listeplainte;

function filtreplainte(listeplainte, suggestions, materiel, date, selectedOption) {
  return listeplainte.filter((Item) => {
    if (selectedOption === '1') {
      return (
        Item.materiel.toLowerCase().includes(materiel.toLowerCase()) &&
        Item.nom.toLowerCase().includes(suggestions.toLowerCase())  &&
        Item.dateDepot &&
        Item.dateDepot.includes(date)
      );
    } else {
      return (
        Item.materiel.toLowerCase().includes(materiel.toLowerCase()) &&
        Item.salle.toLowerCase().includes(suggestions.toLowerCase())  && 
        Item.dateDepot &&
        Item.dateDepot.includes(date)      
        );
    }
  });
}


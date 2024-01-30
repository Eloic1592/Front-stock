import {
  Box,
  Button,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Icon,
  IconButton,
  TextField,
  Checkbox,
  Select,
  MenuItem,
  Alert,
  Snackbar,
  Grid
} from '@mui/material';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { SimpleCard } from 'app/components';
import { StyledTable } from 'app/views/style/style';
import { useListematerielFunctions } from 'app/views/admin/Materiel/function';
import { baseUrl } from 'app/utils/constant';

const Listemateriel = ({ rowsPerPageOptions = [5, 10, 25] }) => {
  const columns = [
    { label: 'ID', field: 'idmateriel', align: 'center' },
    { label: 'Type materiel', field: 'typemateriel', align: 'center' },
    { label: 'article', field: 'article', align: 'center' },
    { label: 'Numserie', field: 'numserie', align: 'center' },
    { label: 'Description', field: 'description', align: 'center' },
    { label: 'Prix de vente', field: 'prixvente', align: 'center' },
    { label: 'Caution', field: 'caution', align: 'center' },
    { label: 'Couleur', field: 'couleur', align: 'center' },
    { label: 'statut', field: 'statut', align: 'center' }

    // Other columns...
  ];
  const [message, setMessage] = useState({
    text: 'Information enregistree',
    severity: 'success',
    open: false
  });

  const [data, setData] = useState({
    materiels: [],
    articles: [],
    typemateriels: [],
    categoriemateriels: [],
    listemateriels: []
  });
  const [initialDataFetched, setInitialDataFetched] = useState(false);
  const [isEditClicked, setIsEditClicked] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const handleAlertClose = () => setMessage({ open: false });

  // Update
  const [isEditedmateriel, setIsEditedmateriel] = useState(null);
  const [isEditedtypemat, setIsEditedtypemat] = useState(null);
  const [isEditedcatemat, setIsEditedcatemat] = useState(null);
  const [isEditednumserie, setIsEditednumserie] = useState('');
  const [isEditedprixvente, setIsEditedprixvente] = useState(0);
  const [isEditedcolor, setIsEditedcolor] = useState(['1']);
  const [isEditedcaution, setisEditedcaution] = useState(0);

  // Modification(Update)
  const handleEdit = (row) => {
    setIsEditClicked(true);
    setSelectedRowId(row.idmateriel);
  };

  const cancelEdit = () => {
    setIsEditClicked(false);
  };

  const {
    sortDirection,
    page,
    rowsPerPage,
    setSortDirection,
    handleChangePage,
    sortColumn,
    setCouleur,
    setArticle,
    setTypemateriel,
    setCategoriemateriel,
    categoriemateriel,
    couleur,
    // article,
    typemateriel,
    selectedIds,
    setNumserie,
    numserie,
    handleChangeRowsPerPage,
    handleSelectAll,
    handleSelection,
    handleSelectColumn,
    sortedData
  } = useListematerielFunctions(data);

  const handleSubmit = () => {
    let article = {
      idmateriel: isEditedmateriel,
      numserie: isEditednumserie,
      prixvente: isEditedprixvente,
      caution: isEditedcaution,
      couleur: isEditedcolor
    };

    let url = baseUrl + '/materiel/createmateriel';
    fetch(url, {
      crossDomain: true,
      method: 'POST',
      body: JSON.stringify(article),
      headers: { 'Content-Type': 'application/json' }
    })
      .then((response) => response.json())
      .then((response) => {
        setMessage({
          text: 'Information modifiee',
          severity: 'success',
          open: true
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((err) => {
        setMessage({
          text: err,
          severity: 'error',
          open: true
        });
      });
  };
  //  Use effect
  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = baseUrl + '/materiel/contentmateriel';
        const response = await fetch(url, {
          crossDomain: true,
          method: 'POST',
          body: JSON.stringify({}),
          headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`);
        }

        const responseData = await response.json();

        // Assuming data is an object with properties materiels, articles, typemateriels, categoriemateriels, and listemateriels
        const newData = {
          materiels: responseData.materiels || [],
          articles: responseData.articles || [],
          typemateriels: responseData.typemateriels || [],
          categoriemateriels: responseData.categoriemateriels || [],
          listemateriels: responseData.listemateriels || []
        };

        setData(newData);
      } catch (error) {
        console.log("Aucune donnee n'ete recuperee,veuillez verifier si le serveur est actif");
        // Gérer les erreurs de requête Fetch ici
      }
    };

    // Charger les données initiales uniquement si elles n'ont pas encore été chargées
    if (!initialDataFetched) {
      fetchData(); // Appel initial
      setInitialDataFetched(true);
    }

    // La logique conditionnelle
    if (isEditClicked && selectedRowId !== null) {
      const selectedRow = sortedData.find((row) => row.idmateriel === selectedRowId);

      if (selectedRow) {
        setIsEditedmateriel(selectedRow.idmateriel);
        // setEditedNaturemouvement((prev) => (prev != null ? prev : selectedRow.naturemouvement));
      }
    }
  }, [isEditClicked, selectedRowId, sortedData, initialDataFetched]); // Ajoutez initialDataFetched comme dépendance
  return (
    <Box width="100%" overflow="auto">
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <SimpleCard title="Rechercher un materiel" sx={{ marginBottom: '16px' }}>
            <form>
              <div style={{ display: 'flex', gap: '16px' }}>
                <TextField
                  fullWidth
                  size="small"
                  id="numeroserie"
                  type="text"
                  label="Numero de serie"
                  name="numserie"
                  variant="outlined"
                  value={numserie}
                  onChange={(event) => setNumserie(event.target.value)}
                  sx={{ mb: 3 }}
                />
                <Select
                  labelId="select-label"
                  size="small"
                  sx={{ mb: 3 }}
                  value={categoriemateriel}
                  onChange={(event) => setCategoriemateriel(event.target.value)}
                >
                  <MenuItem value="1">Toutes categories</MenuItem>
                  {data.categoriemateriels.map((row) => (
                    <MenuItem value={row.idcategoriemateriel}>{row.categoriemateriel}</MenuItem>
                  ))}
                </Select>

                <Select
                  labelId="select-label"
                  size="small"
                  sx={{ mb: 3 }}
                  value={typemateriel}
                  onChange={(event) => setTypemateriel(event.target.value)}
                >
                  <MenuItem value="1">Tous types</MenuItem>
                  {data.typemateriels.map((row) => (
                    <MenuItem value={row.idtypemateriel}>{row.typemateriel}</MenuItem>
                  ))}
                </Select>
                <Select
                  labelId="select-label"
                  size="small"
                  sx={{ mb: 3 }}
                  value={couleur}
                  onChange={(event) => setCouleur(event.target.value)}
                >
                  <MenuItem value="1">Toutes couleurs</MenuItem>
                  <MenuItem value="Noir">Noir</MenuItem>
                  <MenuItem value="Blanc">Blanc</MenuItem>
                  <MenuItem value="Gris">Gris</MenuItem>
                  <MenuItem value="Rouge">Rouge</MenuItem>
                  <MenuItem value="Bleu">Bleu</MenuItem>
                  <MenuItem value="Vert">Vert</MenuItem>
                  <MenuItem value="Jaune">Jaune</MenuItem>
                  <MenuItem value="Marron">Marron</MenuItem>
                  <MenuItem value="Violet">Violet</MenuItem>
                  <MenuItem value="Rose">Rose</MenuItem>
                  <MenuItem value="Orange">Orange</MenuItem>
                  <MenuItem value="Beige">Beige</MenuItem>
                  <MenuItem value="Turquoise">Turquoise</MenuItem>
                  <MenuItem value="Argenté">Argenté</MenuItem>
                  <MenuItem value="Doré">Doré</MenuItem>
                </Select>
              </div>
            </form>
          </SimpleCard>
        </Grid>
        <Grid item>
          <SimpleCard title="Liste des materiels">
            {/* Tri de tables */}
            <Grid container spacing={2}>
              <Grid item xs={2}>
                <Select
                  fullWidth
                  labelId="select-label"
                  value={sortColumn}
                  size="small"
                  onChange={handleSelectColumn}
                >
                  <MenuItem value="1">Colonne</MenuItem>
                  {columns.map((column) => (
                    <MenuItem value={column.field}>{column.label}</MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={2}>
                <Select
                  fullWidth
                  labelId="select-direction-label"
                  value={sortDirection}
                  size="small"
                  onChange={(event) => setSortDirection(event.target.value)}
                >
                  <MenuItem value="asc">ASC</MenuItem>
                  <MenuItem value="desc">DESC</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={2}>
                <Button
                  className="button"
                  variant="contained"
                  aria-label="Edit"
                  color="error"
                  disabled={selectedIds.length == 0}
                >
                  <Icon>delete</Icon>
                </Button>
              </Grid>
            </Grid>
            <StyledTable>
              <TableHead>
                {/* Listage de Donnees */}
                <TableRow>
                  <TableCell align="left">
                    <Checkbox
                      checked={data.listemateriels.every((row) =>
                        selectedIds.includes(row.idmateriel)
                      )}
                      indeterminate={
                        data.listemateriels.some((row) => selectedIds.includes(row.idmateriel)) &&
                        !data.listemateriels.every((row) => selectedIds.includes(row.idmateriel))
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  {/* Listage de Donnees */}
                  <TableCell key="idmateriel" align="left">
                    idmateriel
                  </TableCell>
                  <TableCell key="typemateriel" align="left">
                    categorie
                  </TableCell>
                  <TableCell key="typemateriel" align="left">
                    typemateriel
                  </TableCell>
                  <TableCell key="modele" align="left">
                    modele
                  </TableCell>
                  <TableCell key="numserie" align="left">
                    numserie
                  </TableCell>
                  <TableCell key="prixvente" align="left">
                    prixvente
                  </TableCell>
                  <TableCell key="caution" align="left">
                    caution
                  </TableCell>
                  <TableCell key="couleur" align="left">
                    couleur
                  </TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* Donnees du tableau */}
                {sortedData && sortedData.length > 0 ? (
                  sortedData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <TableRow key={row.idmateriel}>
                        <TableCell>
                          <Checkbox
                            checked={selectedIds.includes(row.idmateriel)}
                            onChange={(event) => handleSelection(event, row.idmateriel)}
                          />
                        </TableCell>
                        {isEditClicked && row.idmateriel === selectedRowId ? (
                          <>
                            {/* <TableCell key={row.idmateriel}>
                              <TextField
                                value={isEditedmateriel}
                                onChange={(event) => setIsEditedmateriel(event.target.value)}
                              />
                            </TableCell>
                            <TableCell>{row.categoriemateriel}</TableCell>
                            <TableCell>{row.typemateriel}</TableCell>
                            <TableCell>{row.modele}</TableCell>
                            <TableCell>
                              <TextField
                                value={isEditednumserie}
                                onChange={(event) => setIsEditednumserie(event.target.value)}
                                onBlur={() =>
                                  setIsEditednumserie(
                                    isEditednumserie !== ' ' ? isEditednumserie : row.numserie
                                  )
                                }
                              />
                            </TableCell>
                            <TableCell>
                              <TextField
                                value={isEditedprixvente}
                                onChange={(event) => setIsEditedprixvente(event.target.value)}
                                onBlur={() =>
                                  setIsEditedprixvente(
                                    isEditedprixvente !== ' ' ? isEditedprixvente : row.prixvente
                                  )
                                }
                              />
                            </TableCell>
                            <TableCell>
                              <TextField
                                value={isEditedcaution}
                                onChange={(event) => setisEditedcaution(event.target.value)}
                                onBlur={() =>
                                  setisEditedcaution(
                                    isEditedcaution !== ' ' ? isEditedcaution : row.caution
                                  )
                                }
                              />
                            </TableCell>
                            <TableCell>
                              <Select
                                labelId="select-label"
                                sx={{ mb: 3 }}
                                value={isEditedcolor}
                                onChange={(event) => setIsEditedcolor(event.target.value)}
                                onBlur={() =>
                                  setIsEditedcolor(
                                    isEditedcolor !== ' ' ? isEditedcolor : row.couleur
                                  )
                                }
                              >
                                <MenuItem value="1">Toutes couleurs</MenuItem>
                                <MenuItem value="Noir">Noir</MenuItem>
                                <MenuItem value="Blanc">Blanc</MenuItem>
                                <MenuItem value="Gris">Gris</MenuItem>
                                <MenuItem value="Rouge">Rouge</MenuItem>
                                <MenuItem value="Bleu">Bleu</MenuItem>
                                <MenuItem value="Vert">Vert</MenuItem>
                                <MenuItem value="Jaune">Jaune</MenuItem>
                                <MenuItem value="Marron">Marron</MenuItem>
                                <MenuItem value="Violet">Violet</MenuItem>
                                <MenuItem value="Rose">Rose</MenuItem>
                                <MenuItem value="Orange">Orange</MenuItem>
                                <MenuItem value="Beige">Beige</MenuItem>
                                <MenuItem value="Turquoise">Turquoise</MenuItem>
                                <MenuItem value="Argenté">Argenté</MenuItem>
                                <MenuItem value="Doré">Doré</MenuItem>
                              </Select>
                            </TableCell> */}
                            <TableCell key={row.idmateriel}>{row.idmateriel}</TableCell>
                            <TableCell>{row.categoriemateriel}</TableCell>
                            <TableCell>{row.typemateriel}</TableCell>
                            <TableCell>{row.modele}</TableCell>
                            <TableCell>{row.numserie}</TableCell>
                            <TableCell>{row.prixvente}</TableCell>
                            <TableCell>{row.caution}</TableCell>
                            <TableCell>{row.couleur}</TableCell>
                          </>
                        ) : (
                          <>
                            <TableCell key={row.idmateriel}>{row.idmateriel}</TableCell>
                            <TableCell>{row.categoriemateriel}</TableCell>
                            <TableCell>{row.typemateriel}</TableCell>
                            <TableCell>{row.modele}</TableCell>
                            <TableCell>{row.numserie}</TableCell>
                            <TableCell>{row.prixvente}</TableCell>
                            <TableCell>{row.caution}</TableCell>
                            <TableCell>{row.couleur}</TableCell>
                          </>
                        )}{' '}
                        <TableCell>
                          <IconButton
                            className="button"
                            variant="contained"
                            aria-label="Edit"
                            color="primary"
                            onClick={() => handleEdit(row)}
                          >
                            <Icon>edit_icon</Icon>
                          </IconButton>

                          {isEditClicked && row.idmateriel === selectedRowId && (
                            <>
                              <IconButton
                                className="button"
                                variant="contained"
                                aria-label="Edit"
                                color="secondary"
                                onClick={() => handleSubmit()}
                              >
                                <Icon>arrow_forward</Icon>
                              </IconButton>
                              <IconButton
                                className="button"
                                variant="contained"
                                aria-label="Edit"
                                color="error"
                                onClick={() => cancelEdit(row)}
                              >
                                <Icon>close</Icon>
                              </IconButton>
                            </>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                ) : (
                  <p>
                    <Typography variant="subtitle1" color="textSecondary">
                      Aucune donnee disponible
                    </Typography>
                  </p>
                )}
              </TableBody>
            </StyledTable>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TablePagination
                  sx={{ px: 2 }}
                  page={page}
                  component="div"
                  rowsPerPage={rowsPerPage}
                  count={data.listemateriels.length}
                  onPageChange={handleChangePage}
                  rowsPerPageOptions={rowsPerPageOptions}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  nextIconButtonProps={{ 'aria-label': 'Next Page' }}
                  backIconButtonProps={{ 'aria-label': 'Previous Page' }}
                />
              </Grid>
            </Grid>
          </SimpleCard>
        </Grid>
      </Grid>
      <Snackbar open={message.open} autoHideDuration={3000} onClose={handleAlertClose}>
        <Alert severity={message.severity} sx={{ width: '100%' }} variant="filled">
          {message.text}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Listemateriel;

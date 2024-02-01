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
  Select,
  MenuItem,
  Snackbar,
  Alert,
  Grid
} from '@mui/material';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { SimpleCard } from 'app/components';
import { StyledTable } from 'app/views/style/style';
import { useListeArticlefunctions } from 'app/views/admin/article/function';
import { baseUrl } from 'app/utils/constant';

const ListeArticle = () => {
  // Colonne
  const columns = [
    { label: 'ID article', field: 'idarticle', align: 'center' },
    { label: 'modele', field: 'modele', align: 'center' },
    { label: 'marque', field: 'marque', align: 'center' },
    { label: 'code article', field: 'codearticle', align: 'center' },
    { label: 'description', field: 'description', align: 'center' }
    // Other columns...
  ];
  const [data, setData] = useState([]);
  const [initialDataFetched, setInitialDataFetched] = useState(false);
  const [editedIdArticle, setEditedIdArticle] = useState(null);
  const [editedModele, setEditedModele] = useState(null);
  const [editedMarque, setEditedMarque] = useState(null);
  const [editedCodearticle, setEditedCodearticle] = useState(null);
  const [editedDescription, setEditedDescription] = useState(null);
  const [message, setMessage] = useState({
    text: 'Information enregistree',
    severity: 'success',
    open: false
  });

  const [isEditClicked, setIsEditClicked] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const handleAlertClose = () => setMessage({ open: false });

  // Modification(Update)
  const handleEdit = (row) => {
    setEditedIdArticle('');
    setEditedCodearticle('');
    setEditedDescription('');
    setEditedMarque('');
    setEditedModele('');
    setIsEditClicked(true);
    setSelectedRowId(row.idarticle);
  };

  const cancelEdit = () => {
    setEditedIdArticle('');
    setEditedCodearticle('');
    setEditedDescription('');
    setEditedMarque('');
    setEditedModele('');
    setIsEditClicked(false);
  };

  const {
    sortDirection,
    page,
    rowsPerPage,
    setSortDirection,
    handleChangePage,
    sortColumn,
    selectedIds,
    handleChangeRowsPerPage,
    handleSelectColumn,
    sortedData,
    modele,
    marque,
    codearticle,
    setIdarticle,
    setModele,
    setCodearticle,
    setMarque
  } = useListeArticlefunctions(data);

  const handleSubmit = () => {
    let article = {
      idarticle: editedIdArticle,
      marque: editedMarque,
      modele: editedModele,
      description: editedDescription,
      codearticle: editedCodearticle
    };

    let url = baseUrl + '/article/createarticle';
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
      .catch(() => {
        setMessage({
          text: 'La modification dans la base de données a échoué',
          severity: 'error',
          open: true
        });
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = baseUrl + '/article/listarticle';
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
        setData(responseData);
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
      const selectedRow = sortedData.find((row) => row.idarticle === selectedRowId);

      if (selectedRow) {
        setEditedIdArticle(selectedRow.idarticle);
        setEditedModele((prev) => (prev != null ? prev : selectedRow.modele));
        setEditedMarque((prev) => (prev != null ? prev : selectedRow.marque));
        setEditedCodearticle((prev) => (prev != null ? prev : selectedRow.codearticle));
        setEditedDescription((prev) => (prev != null ? prev : selectedRow.description));
      }
    }
  }, [isEditClicked, selectedRowId, sortedData, initialDataFetched]); // Ajoutez initialDataFetched comme dépendance

  return (
    <Box width="100%" overflow="auto" key="Box1">
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <SimpleCard title="Rechercher un article" sx={{ marginBottom: '16px' }}>
            <Grid container spacing={1}>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  size="small"
                  type="text"
                  name="marque"
                  label="Marque"
                  variant="outlined"
                  value={marque}
                  onChange={(event) => setMarque(event.target.value)}
                  sx={{ mb: 3 }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  size="small"
                  type="text"
                  name="modele"
                  label="Modele"
                  variant="outlined"
                  value={modele}
                  onChange={(event) => setModele(event.target.value)}
                  sx={{ mb: 3 }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  size="small"
                  type="text"
                  name="codearticle"
                  label="Code article"
                  variant="outlined"
                  value={codearticle}
                  onChange={(event) => setCodearticle(event.target.value)}
                  sx={{ mb: 3 }}
                />
              </Grid>
            </Grid>
          </SimpleCard>
        </Grid>

        <Grid item>
          <SimpleCard title="Liste des depots ">
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
                  {columns.map((column, index) => (
                    <MenuItem key={index} value={column.field}>
                      {column.label}
                    </MenuItem>
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
                  disabled={selectedIds.length === 0}
                >
                  <Icon>delete</Icon>
                </Button>
              </Grid>
            </Grid>
            <StyledTable>
              <TableHead>
                {/* Listage de Donnees */}
                <TableRow>
                  <TableCell key="idarticle" align="left">
                    idarticle
                  </TableCell>
                  <TableCell key="marque" align="left">
                    marque
                  </TableCell>
                  <TableCell key="modele" align="left">
                    modele
                  </TableCell>
                  <TableCell key="codearticle" align="left">
                    codearticle
                  </TableCell>
                  <TableCell key="description" align="left">
                    description
                  </TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* Donnees du tableau */}
                {sortedData && sortedData.length > 0 ? (
                  sortedData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => (
                      <TableRow key={index}>
                        {isEditClicked && row.idarticle === selectedRowId ? (
                          <>
                            <TableCell>
                              <TextField
                                value={editedIdArticle}
                                onChange={(event) => setEditedIdArticle(event.target.value)}
                              />
                            </TableCell>
                            <TableCell>
                              <TextField
                                value={editedModele}
                                onChange={(event) => setEditedModele(event.target.value)}
                                onBlur={() =>
                                  setEditedModele(editedModele !== '' ? editedModele : row.modele)
                                }
                              />
                            </TableCell>
                            <TableCell>
                              <TextField
                                value={editedMarque}
                                onChange={(event) => setEditedMarque(event.target.value)}
                                onBlur={() =>
                                  setEditedMarque(editedMarque !== '' ? editedMarque : row.marque)
                                }
                              />
                            </TableCell>
                            <TableCell>
                              <TextField
                                value={editedCodearticle}
                                onChange={(event) => setEditedCodearticle(event.target.value)}
                                onBlur={() =>
                                  setEditedCodearticle(
                                    editedCodearticle !== '' ? editedCodearticle : row.codearticle
                                  )
                                }
                              />
                            </TableCell>
                            <TableCell>
                              <TextField
                                value={editedDescription}
                                onChange={(event) => setEditedDescription(event.target.value)}
                                onBlur={() =>
                                  setEditedDescription(
                                    editedDescription !== '' ? editedDescription : row.description
                                  )
                                }
                              />
                            </TableCell>
                          </>
                        ) : (
                          <>
                            <TableCell>{row.idarticle}</TableCell>
                            <TableCell>{row.marque}</TableCell>
                            <TableCell>{row.modele}</TableCell>
                            <TableCell>{row.codearticle}</TableCell>
                            <TableCell>{row.description}</TableCell>
                          </>
                        )}
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
                          {isEditClicked && row.idarticle === selectedRowId && (
                            <>
                              <IconButton
                                className="button"
                                variant="contained"
                                aria-label="Edit"
                                color="secondary"
                                onClick={handleSubmit}
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
                  <TableRow>
                    <TableCell colSpan={6}>
                      <Typography variant="subtitle1" color="textSecondary">
                        Aucune donnée disponible
                      </Typography>
                    </TableCell>
                  </TableRow>
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
                  count={data.length}
                  onPageChange={handleChangePage}
                  rowsPerPageOptions={[5, 10, 25]}
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

export default ListeArticle;

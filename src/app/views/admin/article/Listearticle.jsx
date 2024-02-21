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
    { label: 'typemateriel', field: 'typemateriel', align: 'center' },
    { label: 'description', field: 'description', align: 'center' }
  ];
  const [data, setData] = useState({ articles: [], typemateriels: [] });
  const [initialDataFetched, setInitialDataFetched] = useState(false);
  const [editedIdArticle, setEditedIdArticle] = useState(null);
  const [editedModele, setEditedModele] = useState(null);
  const [editedMarque, setEditedMarque] = useState(null);
  const [editedTypemateriel, setEditedTypemateriel] = useState('1');
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
    setEditedDescription('');
    setEditedMarque('');
    setEditedModele('');
    setIsEditClicked(true);
    setSelectedRowId(row.idarticle);
  };

  const cancelEdit = () => {
    setEditedIdArticle('');
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
    setMarque,
    marque,
    setModele,
    typemateriel,
    setTypemateriel
  } = useListeArticlefunctions(data);

  const handleSubmit = () => {
    let article = {
      idarticle: editedIdArticle,
      marque: editedMarque,
      modele: editedModele,
      description: editedDescription,
      idtypemateriel: editedTypemateriel
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
        let url = baseUrl + '/article/contentarticle';
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
        const newData = {
          articles: responseData.articles || [],
          typemateriels: responseData.typemateriels || []
        };

        setData(newData);
      } catch (error) {
        setMessage({
          text: "Aucune donnee n'ete recuperee,veuillez verifier si le serveur est actif",
          severity: 'error',
          open: true
        });
      }
    };

    if (!initialDataFetched) {
      fetchData();
      setInitialDataFetched(true);
    }

    if (isEditClicked && selectedRowId !== null) {
      const selectedRow = sortedData.find((row) => row.idarticle === selectedRowId);

      if (selectedRow) {
        setEditedIdArticle(selectedRow.idarticle);
        setEditedModele((prev) => (prev != null ? prev : selectedRow.modele));
        setEditedMarque((prev) => (prev != null ? prev : selectedRow.marque));
        setEditedDescription((prev) => (prev != null ? prev : selectedRow.description));
      }
    }
  }, [isEditClicked, selectedRowId, sortedData, initialDataFetched]);

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
                <Select
                  fullWidth
                  labelId="select-label"
                  variant="outlined"
                  size="small"
                  value={typemateriel}
                  onChange={(event) => setTypemateriel(event.target.value)}
                  sx={{ mb: 3 }}
                >
                  <MenuItem value="1">Tous types</MenuItem>
                  {data.typemateriels.map((row) => (
                    <MenuItem key={row.idtypemateriel} value={row.idtypemateriel}>
                      {row.typemateriel}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
            </Grid>
          </SimpleCard>
        </Grid>

        <Grid item>
          <SimpleCard title="Liste des articles">
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
                  <TableCell key="idarticle" width="10%">
                    idarticle
                  </TableCell>
                  <TableCell key="marque" width="15%" align="center">
                    marque
                  </TableCell>
                  <TableCell key="modele" width="15%" align="center">
                    modele
                  </TableCell>
                  <TableCell key="typemateriel" width="15%" align="center">
                    typemateriel
                  </TableCell>
                  <TableCell key="description" width="60%" align="center">
                    description
                  </TableCell>
                  <TableCell width="10%">Action</TableCell>
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
                            <TableCell width="10%">
                              <TextField
                                value={editedIdArticle}
                                onChange={(event) => setEditedIdArticle(event.target.value)}
                              />
                            </TableCell>
                            <TableCell width="15%">
                              <TextField
                                value={editedModele}
                                onChange={(event) => setEditedModele(event.target.value)}
                                onBlur={() =>
                                  setEditedModele(editedModele !== '' ? editedModele : row.modele)
                                }
                              />
                            </TableCell>
                            <TableCell width="15%">
                              <TextField
                                value={editedMarque}
                                onChange={(event) => setEditedMarque(event.target.value)}
                                onBlur={() =>
                                  setEditedMarque(editedMarque !== '' ? editedMarque : row.marque)
                                }
                              />
                            </TableCell>
                            <TableCell width="15%">
                              <Select
                                fullWidth
                                labelId="select-label"
                                value={editedTypemateriel}
                                size="small"
                                onChange={(event) => setEditedTypemateriel(event.target.value)}
                              >
                                <MenuItem value="1">Choisir un type</MenuItem>
                                {data.typemateriels.map((row) => (
                                  <MenuItem key={row.idtypemateriel} value={row.idtypemateriel}>
                                    {row.typemateriel}
                                  </MenuItem>
                                ))}
                              </Select>
                            </TableCell>
                            <TableCell width="60%">
                              <TextField
                                fullWidth
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
                            <TableCell> {row.idarticle}</TableCell>
                            <TableCell align="center">{row.marque}</TableCell>
                            <TableCell align="center">{row.modele}</TableCell>
                            <TableCell align="center">{row.typemateriel}</TableCell>
                            <TableCell align="center">{row.description}</TableCell>
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
                            </TableCell>
                          </>
                        )}

                        {isEditClicked && row.idarticle === selectedRowId && (
                          <>
                            <TableCell>
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
                            </TableCell>
                          </>
                        )}
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
                  count={sortedData.length}
                  onPageChange={handleChangePage}
                  rowsPerPageOptions={[5, 10, 25, 50, 100, 200]}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  nextIconButtonProps={{ 'aria-label': 'Page suivante' }}
                  backIconButtonProps={{ 'aria-label': 'Page precedente' }}
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

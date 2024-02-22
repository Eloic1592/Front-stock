import {
  Box,
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
import { useEffect } from 'react';
import { SimpleCard } from 'app/components';
import { StyledTable } from 'app/views/style/style';
import { useListecategoriematerielFunctions } from 'app/views/admin/categoriemateriel/function';
import { useState } from 'react';
import { baseUrl } from 'app/utils/constant';

const Listecategoriemateriel = ({ rowsPerPageOptions = [5, 10, 25, 50, 100, 200] }) => {
  // Colonne
  const columns = [
    { label: 'idcategoriemateriel', field: 'idcategoriemateriel', align: 'center' },
    { label: 'categorie materiel', field: 'categoriemateriel', align: 'center' }
  ];

  const [data, setData] = useState([]);
  const [initialDataFetched, setInitialDataFetched] = useState(false);
  const [editedIdCategorieMateriel, setEditedIdCategorieMateriel] = useState(null);
  const [editedCategorieMateriel, setEditedCategorieMateriel] = useState(null);
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
    setEditedIdCategorieMateriel('');
    setEditedCategorieMateriel('');
    setIsEditClicked(true);
    setSelectedRowId(row.idcategoriemateriel);
  };

  const cancelEdit = () => {
    setEditedIdCategorieMateriel('');
    setEditedCategorieMateriel('');
    setIsEditClicked(false);
  };

  const {
    sortDirection,
    page,
    rowsPerPage,
    setSortDirection,
    setCategoriemateriel,
    categoriemateriel,
    handleChangePage,
    sortColumn,
    handleChangeRowsPerPage,
    handleSelectColumn,
    sortedData
  } = useListecategoriematerielFunctions(data);

  // Update
  const handleSubmit = () => {
    let categoriemateriel = {
      idcategoriemateriel: editedIdCategorieMateriel,
      categoriemateriel: editedCategorieMateriel
    };
    let url = baseUrl + '/categoriemateriel/createcategoriemateriel';
    fetch(url, {
      crossDomain: true,
      method: 'POST',
      body: JSON.stringify(categoriemateriel),
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
  //  Use effect
  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = baseUrl + '/categoriemateriel/listcategoriemateriel';
        const response = await fetch(url, {
          crossDomain: true,
          method: 'POST',
          body: JSON.stringify({}),
          headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
          setMessage({
            text: "Il y a un probleme, aucune donnee n'a ete recuperee",
            severity: 'error',
            open: true
          });
        }

        const responseData = await response.json();
        setData(responseData);
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
      const selectedRow = sortedData.find((row) => row.idcategoriemateriel === selectedRowId);

      if (selectedRow) {
        setEditedIdCategorieMateriel(selectedRow.idcategoriemateriel);
        setEditedCategorieMateriel((prev) => (prev != null ? prev : selectedRow.categoriemateriel));
      }
    }
  }, [isEditClicked, selectedRowId, sortedData, initialDataFetched]);

  return (
    <Box width="100%" overflow="auto">
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <SimpleCard title="Rechercher une categorie de materiel" sx={{ marginBottom: '16px' }}>
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <TextField
                  fullWidth
                  size="small"
                  type="text"
                  name="categoriemateriel"
                  label="categorie de materiel"
                  variant="outlined"
                  value={categoriemateriel}
                  onChange={(event) => setCategoriemateriel(event.target.value)}
                  sx={{ mb: 3 }}
                />
              </Grid>
            </Grid>
          </SimpleCard>
        </Grid>

        <Grid item>
          <SimpleCard title="Liste des categories de materiel">
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
            </Grid>
            <StyledTable>
              <TableHead>
                {/* Listage de Donnees */}
                <TableRow>
                  <TableCell key="idcategoriemateriel" align="center" width="15%">
                    idcategoriemateriel
                  </TableCell>
                  <TableCell key="categoriemateriel" align="center" width="50%">
                    categoriemateriel
                  </TableCell>
                  <TableCell key="action" align="center" width="15%">
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* Donnees du tableau */}
                {sortedData && sortedData.length > 0 ? (
                  sortedData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <TableRow key={row.idcategoriemateriel} align="center" width="15%">
                        {isEditClicked && row.idcategoriemateriel === selectedRowId ? (
                          <>
                            <TableCell key={row.idcategoriemateriel}>
                              <TextField
                                value={editedIdCategorieMateriel}
                                onChange={(event) =>
                                  setEditedIdCategorieMateriel(event.target.value)
                                }
                              />
                            </TableCell>
                            <TableCell align="center" width="50%">
                              <TextField
                                value={editedCategorieMateriel}
                                onChange={(event) => setEditedCategorieMateriel(event.target.value)}
                                onBlur={() =>
                                  setEditedCategorieMateriel(
                                    editedCategorieMateriel.trim() !== ''
                                      ? editedCategorieMateriel
                                      : row.categoriemateriel
                                  )
                                }
                              />
                            </TableCell>
                          </>
                        ) : (
                          <>
                            <TableCell align="center">{row.idcategoriemateriel}</TableCell>
                            <TableCell align="center">{row.categoriemateriel}</TableCell>
                            <TableCell align="center">
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

                        {isEditClicked && row.idcategoriemateriel === selectedRowId && (
                          <>
                            <TableCell align="center" width="15%">
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
                            </TableCell>
                          </>
                        )}
                      </TableRow>
                    ))
                ) : (
                  <TableRow key="no-data">
                    <TableCell colSpan={3}>
                      <Typography variant="subtitle1" color="textSecondary">
                        Aucune donnee disponible
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
                  rowsPerPageOptions={rowsPerPageOptions}
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

export default Listecategoriemateriel;

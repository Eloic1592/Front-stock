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
import { useEffect, useState } from 'react';
import { SimpleCard } from 'app/components';
import { StyledTable } from 'app/views/style/style';
import { useListetypematerielFunctions } from 'app/views/admin/typemateriel/function';
import { baseUrl } from 'app/utils/constant';

const Listetypemateriel = ({ rowsPerPageOptions = [5, 10, 25, 50, 100, 200] }) => {
  // Colonne

  const columns = [
    { label: 'Idtypemateriel', field: 'idtypemateriel', align: 'center' },
    { label: 'type materiel', field: 'typemateriel', align: 'center' }
  ];
  const [data, setData] = useState({
    typemateriels: [],
    categoriemateriels: []
  });
  const [initialDataFetched, setInitialDataFetched] = useState(false);
  const [editedIdtypemateriel, setEditedIdtypemateriel] = useState(null);
  const [editedTypemateriel, setEditedTypemateriel] = useState(null);
  const [editedCategoriemateriel, setEditedCategoriemateriel] = useState('1');
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
    setEditedIdtypemateriel('');
    setEditedTypemateriel('');
    setIsEditClicked(true);
    setSelectedRowId(row.idtypemateriel);
  };

  const cancelEdit = () => {
    setEditedIdtypemateriel('');
    setEditedTypemateriel('');
    setIsEditClicked(false);
  };

  const {
    sortColumn,
    sortDirection,
    page,
    rowsPerPage,
    setSortDirection,
    typemateriel,
    setTypemateriel,
    handleChangePage,
    handleChangeRowsPerPage,
    handleSelectColumn,
    sortedData,
    categoriemateriel,
    setCategoriemateriel
  } = useListetypematerielFunctions(data);

  const handleSubmit = () => {
    let typemateriel = {
      idtypemateriel: editedIdtypemateriel,
      typemateriel: editedTypemateriel,
      idcategoriemateriel: editedCategoriemateriel
    };
    let url = baseUrl + '/typemateriel/createtypemateriel';
    fetch(url, {
      crossDomain: true,
      method: 'POST',
      body: JSON.stringify(typemateriel),
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
        let url = baseUrl + '/typemateriel/contenttypemateriel';
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
        const newData = {
          typemateriels: responseData.typemateriels || [],
          categoriemateriels: responseData.categoriemateriels || []
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
      const selectedRow = sortedData.find((row) => row.idtypemateriel === selectedRowId);

      if (selectedRow) {
        setEditedIdtypemateriel(selectedRow.idtypemateriel);
        setEditedTypemateriel((prev) => (prev != null ? prev : selectedRow.typemateriel));
      }
    }
  }, [isEditClicked, selectedRowId, sortedData, initialDataFetched]);

  return (
    <Box width="100%" overflow="auto">
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <SimpleCard title="Rechercher un type de materiel">
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  size="small"
                  type="text"
                  name="typemateriel"
                  label="type de materiel"
                  variant="outlined"
                  value={typemateriel}
                  onChange={(event) => setTypemateriel(event.target.value)}
                  sx={{ mb: 3 }}
                />
              </Grid>
              <Grid item xs={6}>
                <Select
                  fullWidth
                  labelId="select-label"
                  variant="outlined"
                  size="small"
                  value={categoriemateriel}
                  onChange={(event) => setCategoriemateriel(event.target.value)}
                  sx={{ mb: 3 }}
                >
                  <MenuItem value="1">Toutes colonnes</MenuItem>
                  {data.categoriemateriels.map((row) => (
                    <MenuItem key={row.idcategoriemateriel} value={row.idcategoriemateriel}>
                      {row.categoriemateriel}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
            </Grid>
          </SimpleCard>
        </Grid>

        <Grid item>
          <SimpleCard title="Liste des types de materiel">
            {/* Tri de tables */}
            <Grid container spacing={2}>
              <Grid item xs={2}>
                <Select
                  fullWidth
                  labelId="select-label"
                  value={sortColumn}
                  size="small"
                  onChange={handleSelectColumn}
                  sx={{ mb: 3 }}
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
                  sx={{ mb: 3 }}
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
                  <TableCell key="idtypemateriel" align="center">
                    idtypemateriel
                  </TableCell>
                  <TableCell key="typemateriel" align="center">
                    typemateriel
                  </TableCell>
                  <TableCell key="typemateriel" align="center">
                    categoriemateriel
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
                      <TableRow key={row.idtypemateriel}>
                        {isEditClicked && row.idtypemateriel === selectedRowId ? (
                          <>
                            <TableCell key={row.idtypemateriel}>
                              <TextField
                                value={editedIdtypemateriel}
                                onChange={(event) => setEditedIdtypemateriel(event.target.value)}
                              />
                            </TableCell>
                            <TableCell>
                              <TextField
                                value={editedTypemateriel}
                                onChange={(event) => setEditedTypemateriel(event.target.value)}
                                onBlur={() =>
                                  setEditedTypemateriel(
                                    editedTypemateriel.trim() !== ''
                                      ? editedTypemateriel
                                      : row.typemateriel
                                  )
                                }
                              />
                            </TableCell>
                            <TableCell>
                              <Select
                                labelId="select-label"
                                value={editedCategoriemateriel}
                                onChange={(event) => setEditedCategoriemateriel(event.target.value)}
                                fullWidth
                              >
                                <MenuItem value="1" disabled>
                                  Choisir une categorie
                                </MenuItem>
                                {data.categoriemateriels.map((row) => (
                                  <MenuItem
                                    key={row.idcategoriemateriel}
                                    value={row.idcategoriemateriel}
                                  >
                                    {row.categoriemateriel}
                                  </MenuItem>
                                ))}
                              </Select>
                            </TableCell>
                          </>
                        ) : (
                          <>
                            <TableCell>{row.idtypemateriel}</TableCell>
                            <TableCell>{row.typemateriel}</TableCell>
                            <TableCell>{row.categoriemateriel}</TableCell>
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

                        {isEditClicked && row.idtypemateriel === selectedRowId && (
                          <>
                            <TableCell>
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

export default Listetypemateriel;

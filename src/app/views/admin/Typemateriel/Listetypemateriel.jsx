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

const Listetypemateriel = ({ rowsPerPageOptions = [10, 25, 50, 100, 200] }) => {
  // Colonne
  const columns = [
    { label: 'Idtypemateriel', field: 'idtypemateriel', align: 'center' },
    { label: 'Type materiel', field: 'typemateriel', align: 'center' },
    { label: 'Code', field: 'val', align: 'center' },
    { label: 'Categorie materiel', field: 'categoriemateriel', align: 'center' }
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
  const handleEdit = (idtypemateriel) => {
    window.location.replace('/admin/edittypemateriel/' + idtypemateriel);
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
          text: "Aucune donnee n 'a ete recuperee,veuillez verifier si le serveur est actif",
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
                  label="type de materiel ou code du type"
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
                      {row.categoriemateriel} - {row.val}
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
                  multiple
                  sx={{ mb: 3 }}
                >
                  <MenuItem value="1" disabled>
                    Colonne
                  </MenuItem>
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
                  <TableCell key="idtypemateriel" align="center" width="15%">
                    ID
                  </TableCell>
                  <TableCell key="typemateriel" align="center" width="40%">
                    type materiel
                  </TableCell>
                  <TableCell key="val" align="center" width="40%">
                    code
                  </TableCell>
                  <TableCell key="categoriemateriel" align="center" width="40%">
                    categoriemateriel
                  </TableCell>
                  <TableCell align="center" width="15%">
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
                      <TableRow key={row.idtypemateriel}>
                        {isEditClicked && row.idtypemateriel === selectedRowId ? (
                          <>
                            <TableCell key={row.idtypemateriel} align="center" width="15%">
                              <TextField
                                value={editedIdtypemateriel}
                                onChange={(event) => setEditedIdtypemateriel(event.target.value)}
                              />
                            </TableCell>
                            <TableCell align="center" width="40%">
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
                            <TableCell align="center" width="40%">
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
                            <TableCell align="center" width="15%">
                              {row.idtypemateriel}
                            </TableCell>
                            <TableCell align="center" width="40%">
                              {row.typemateriel}
                            </TableCell>
                            <TableCell align="center" width="40%">
                              {row.val}
                            </TableCell>
                            <TableCell align="center" width="40%">
                              {row.categoriemateriel} - {row.codecat}
                            </TableCell>
                            <TableCell align="center" width="15%">
                              <IconButton
                                className="button"
                                variant="contained"
                                aria-label="Edit"
                                color="primary"
                                onClick={() => handleEdit(row.idtypemateriel)}
                              >
                                <Icon>edit_icon</Icon>
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

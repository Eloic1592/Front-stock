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
  Grid
} from '@mui/material';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import { SimpleCard } from 'app/components';
import { StyledTable } from 'app/views/style/style';
import { useListecategoriematerielFunctions } from 'app/views/admin/Categoriemateriel/function';
import { useState } from 'react';
import { baseUrl } from 'app/utils/constant';

const Listecategoriemateriel = ({ rowsPerPageOptions = [5, 10, 25] }) => {
  // Colonne
  const columns = [
    { label: 'idcategoriemateriel', field: 'idcategoriemateriel', align: 'center' },
    { label: 'categorie materiel', field: 'categoriemateriel', align: 'center' }
    // Other columns...
  ];

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
  const [data, setData] = useState([]);

  // Modification(Update)
  const handleEdit = (row) => {
    setEditedIdCategorieMateriel('');
    setEditedCategorieMateriel('');
    setIsEditClicked(true);
    setSelectedRowId(row.idcategoriemateriel);
  };

  const cancelEdit = (row) => {
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
    selectedIds,
    handleChangeRowsPerPage,
    handleSelectColumn,
    sortedData
  } = useListecategoriematerielFunctions(data);

  const handleSubmit = () => {
    // let depot = {
    //   iddepot: editedIdDepot,
    //   depot: editedNomDepot
    // };
    // console.log(editedIdDepot + editedNomDepot);
    // let url = baseUrl + '/depot/createdepot';
    // fetch(url, {
    //   crossDomain: true,
    //   method: 'POST',
    //   body: JSON.stringify(depot),
    //   headers: { 'Content-Type': 'application/json' }
    // })
    //   .then((response) => response.json())
    //   .then((response) => {
    //     setMessage({
    //       text: 'Information modifiee',
    //       severity: 'success',
    //       open: true
    //     });
    //     setTimeout(() => {
    //       window.location.reload();
    //     }, 2000);
    //   })
    //   .catch((err) => {
    //     setMessage({
    //       text: err,
    //       severity: 'error',
    //       open: true
    //     });
    //   });
  };
  //  Use effect
  useEffect(() => {
    let url = baseUrl + '/categoriemateriel/listcategoriemateriel';
    fetch(url, {
      crossDomain: true,
      method: 'POST',
      body: JSON.stringify({}),
      headers: { 'Content-Type': 'application/json' }
    })
      .then((response) => response.json())
      .then((response) => {
        setData(response);
      });
  }, []);

  return (
    <Box width="100%" overflow="auto">
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <SimpleCard title="Rechercher une categorie de materiel" sx={{ marginBottom: '16px' }}>
            <form>
              <div style={{ display: 'flex', gap: '16px' }}>
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
              </div>
            </form>
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
                  <TableCell key="idcategoriemateriel" align="left">
                    idcategoriemateriel
                  </TableCell>
                  <TableCell key="categoriemateriel" align="left">
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
                    .map((row, index) => (
                      <TableRow key={index}>
                        {isEditClicked && row.idcategoriemateriel === selectedRowId ? (
                          <>
                            <TableCell>
                              <TextField
                                value={
                                  editedIdCategorieMateriel !== ''
                                    ? editedIdCategorieMateriel
                                    : row.idcategoriemateriel
                                }
                                onChange={(event) =>
                                  setEditedIdCategorieMateriel(
                                    editedIdCategorieMateriel !== ''
                                      ? event.target.value
                                      : row.idcategoriemateriel
                                  )
                                }
                                onFocus={() =>
                                  setEditedIdCategorieMateriel(row.idcategoriemateriel)
                                }
                              />
                            </TableCell>
                            <TableCell>
                              <TableCell>
                                <TextField
                                  value={
                                    editedCategorieMateriel !== ''
                                      ? editedCategorieMateriel
                                      : row.categoriemateriel
                                  }
                                  onChange={(event) =>
                                    setEditedCategorieMateriel(
                                      editedCategorieMateriel !== ''
                                        ? event.target.value
                                        : row.categoriemateriel
                                    )
                                  }
                                  onFocus={() => setEditedCategorieMateriel(row.categoriemateriel)}
                                />
                              </TableCell>
                            </TableCell>
                          </>
                        ) : (
                          <>
                            <TableCell>{row.idcategoriemateriel}</TableCell>
                            <TableCell>{row.categoriemateriel}</TableCell>
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
                          {isEditClicked && row.idcategoriemateriel === selectedRowId && (
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
                  <Typography variant="subtitle1" color="textSecondary">
                    Aucune donnee disponible
                  </Typography>
                )}{' '}
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
    </Box>
  );
};

export default Listecategoriemateriel;

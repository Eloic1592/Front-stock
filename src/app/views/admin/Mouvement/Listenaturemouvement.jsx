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
  Grid
} from '@mui/material';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import { SimpleCard } from 'app/components';
import { StyledTable } from 'app/views/style/style';
import { useListemouvementFunctions } from 'app/views/admin/Mouvement/function';
import { baseUrl } from 'app/utils/constant';

const Listenaturemouvement = ({ rowsPerPageOptions = [5, 10, 25] }) => {
  // Colonne

  const columns = [
    { label: 'idnaturemouvement', field: 'idnaturemouvement', align: 'center' },
    { label: 'Nature du mouvement', field: 'naturemouvement', align: 'center' }
    // Other columns...
  ];
  const [data, setData] = useState([]);
  const [editedIdNaturemouvement, setEditedIdNaturemouvement] = useState(null);
  const [editedNaturemouvement, setEditedNaturemouvement] = useState(null);
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
    setEditedIdNaturemouvement('');
    setEditedNaturemouvement('');
    setIsEditClicked(true);
    setSelectedRowId(row.idnaturemouvement);
  };

  const cancelEdit = (row) => {
    setEditedIdNaturemouvement('');
    setEditedNaturemouvement('');
    setIsEditClicked(false);
  };

  const {
    sortDirection,
    page,
    rowsPerPage,
    setSortDirection,
    setCategoriemouvement,
    categoriemouvement,
    naturemouvement,
    setNaturemouvement,
    handleChangePage,
    sortColumn,
    selectedIds,
    handleChangeRowsPerPage,
    handleSelectColumn,
    sortedData
  } = useListemouvementFunctions(data);

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
    let url = baseUrl + '/naturemouvement/listnatmouvement';
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
          <SimpleCard title="Rechercher un type de mouvement" sx={{ marginBottom: '16px' }}>
            <form>
              <div style={{ display: 'flex', gap: '16px' }}>
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      size="small"
                      type="text"
                      name="typemouvement"
                      label="type de mouvement"
                      variant="outlined"
                      value={naturemouvement}
                      onChange={(event) => setNaturemouvement(event.target.value)}
                      sx={{ mb: 3 }}
                    />
                  </Grid>
                  {/* <Grid item xs={6}>
                    <Select
                      fullWidth
                      size="small"
                      labelId="select-label"
                      value={categoriemouvement}
                      onChange={(event) => setCategoriemouvement(event.target.value)}
                    >
                      <MenuItem value="1">Physique</MenuItem>
                      <MenuItem value="2">Fictif</MenuItem>
                    </Select>
                  </Grid> */}
                </Grid>
              </div>
            </form>
          </SimpleCard>
        </Grid>

        <Grid item>
          <SimpleCard title="Liste des mouvements">
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
                  <TableCell key="idnaturemouvement" align="left">
                    idnaturemouvement
                  </TableCell>
                  <TableCell key="naturemouvement" align="left">
                    naturemouvement
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
                        {isEditClicked && row.idnaturemouvement === selectedRowId ? (
                          <>
                            <TableCell>
                              <TextField
                                value={
                                  editedIdNaturemouvement !== ''
                                    ? editedIdNaturemouvement
                                    : row.idnaturemouvement
                                }
                                onChange={(event) =>
                                  setEditedIdNaturemouvement(
                                    editedIdNaturemouvement !== ''
                                      ? event.target.value
                                      : row.idnaturemouvement
                                  )
                                }
                                onFocus={() => setEditedIdNaturemouvement(row.idnaturemouvement)}
                              />
                            </TableCell>
                            <TableCell>
                              <TableCell>
                                <TextField
                                  value={
                                    editedNaturemouvement !== ''
                                      ? editedNaturemouvement
                                      : row.naturemouvement
                                  }
                                  onChange={(event) =>
                                    setEditedNaturemouvement(
                                      editedNaturemouvement !== ''
                                        ? event.target.value
                                        : row.naturemouvement
                                    )
                                  }
                                  onFocus={() => setEditedNaturemouvement(row.naturemouvement)}
                                />
                              </TableCell>
                            </TableCell>
                          </>
                        ) : (
                          <>
                            <TableCell>{row.idnaturemouvement}</TableCell>
                            <TableCell>{row.naturemouvement}</TableCell>
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
                          {isEditClicked && row.idnaturemouvement === selectedRowId && (
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

export default Listenaturemouvement;

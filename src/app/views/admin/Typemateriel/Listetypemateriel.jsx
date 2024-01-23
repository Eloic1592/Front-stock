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
import { useEffect, useState } from 'react';
import { SimpleCard } from 'app/components';
import { StyledTable } from 'app/views/style/style';
import { useListetypematerielFunctions } from 'app/views/admin/Typemateriel/function';
import { baseUrl } from 'app/utils/constant';

const Listetypemateriel = ({ rowsPerPageOptions = [5, 10, 25] }) => {
  // Colonne

  const columns = [
    { label: 'Idtypemateriel', field: 'idtypemateriel', align: 'center' },
    { label: 'type materiel', field: 'typemateriel', align: 'center' }
    // Other columns...
  ];
  const [data, setData] = useState([]);
  const [editedIdtypemateriel, setEditedIdtypemateriel] = useState(null);
  const [editedTypemateriel, setEditedTypemateriel] = useState(null);
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

  const cancelEdit = (row) => {
    setEditedIdtypemateriel('');
    setEditedTypemateriel('');
    setIsEditClicked(false);
  };

  const {
    selectedIds,
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
    sortedData
  } = useListetypematerielFunctions(data);

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
  useEffect(() => {
    let url = baseUrl + '/typemateriel/listtypemateriel';
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
          <SimpleCard title="Rechercher un type de materiel" sx={{ marginBottom: '16px' }}>
            <form>
              <div style={{ display: 'flex', gap: '16px' }}>
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
              </div>
            </form>
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
                  <TableCell key="idtypemateriel" align="left">
                    idtypemateriel
                  </TableCell>
                  <TableCell key="typemateriel" align="left">
                    typemateriel
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
                        {isEditClicked && row.idtypemateriel === selectedRowId ? (
                          <>
                            <TableCell>
                              <TextField
                                value={
                                  editedIdtypemateriel !== ''
                                    ? editedIdtypemateriel
                                    : row.idtypemateriel
                                }
                                onChange={(event) =>
                                  setEditedIdtypemateriel(
                                    editedIdtypemateriel !== ''
                                      ? event.target.value
                                      : row.idtypemateriel
                                  )
                                }
                                onFocus={() => setEditedIdtypemateriel(row.idtypemateriel)}
                              />
                            </TableCell>
                            <TableCell>
                              <TableCell>
                                <TextField
                                  value={
                                    editedTypemateriel !== ''
                                      ? editedTypemateriel
                                      : row.typemateriel
                                  }
                                  onChange={(event) =>
                                    setEditedTypemateriel(
                                      editedTypemateriel !== ''
                                        ? event.target.value
                                        : row.typemateriel
                                    )
                                  }
                                  onFocus={() => setEditedTypemateriel(row.typemateriel)}
                                />
                              </TableCell>
                            </TableCell>
                          </>
                        ) : (
                          <>
                            <TableCell>{row.idtypemateriel}</TableCell>
                            <TableCell>{row.typemateriel}</TableCell>
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
                          {isEditClicked && row.idtypemateriel === selectedRowId && (
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

export default Listetypemateriel;

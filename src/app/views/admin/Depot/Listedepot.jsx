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
import { useListedepotFunctions } from 'app/views/admin/Depot/function';
import { baseUrl } from 'app/utils/constant';

const Listedepot = () => {
  // Colonne
  const columns = [
    { label: 'Iddepot', field: 'iddepot', align: 'center' },
    { label: 'Depot', field: 'depot', align: 'center' }
    // Other columns...
  ];
  const [data, setData] = useState([]);
  const [editedIdDepot, setEditedIdDepot] = useState(null);
  const [editedNomDepot, setEditedNomDepot] = useState(null);
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
    setEditedIdDepot('');
    setEditedNomDepot('');
    setIsEditClicked(true);
    setSelectedRowId(row.iddepot);
  };

  const cancelEdit = (row) => {
    setEditedIdDepot('');
    setEditedNomDepot('');
    setIsEditClicked(false);
  };

  const {
    sortDirection,
    page,
    rowsPerPage,
    setSortDirection,
    setNomdepot,
    nomdepot,
    handleChangePage,
    sortColumn,
    selectedIds,
    handleChangeRowsPerPage,
    handleSelectColumn,
    sortedData
  } = useListedepotFunctions(data);

  const handleSubmit = () => {
    let depot = {
      iddepot: editedIdDepot,
      depot: editedNomDepot
    };
    console.log(editedIdDepot + editedNomDepot);
    let url = baseUrl + '/depot/createdepot';
    fetch(url, {
      crossDomain: true,
      method: 'POST',
      body: JSON.stringify(depot),
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

  useEffect(() => {
    let url = baseUrl + '/depot/listdepot';
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
          <SimpleCard title="Rechercher un depot" sx={{ marginBottom: '16px' }}>
            <TextField
              fullWidth
              size="small"
              type="text"
              name="materielfiltre"
              label="Nom du depot"
              variant="outlined"
              value={nomdepot}
              onChange={(event) => setNomdepot(event.target.value)}
              sx={{ mb: 3 }}
            />
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
                  <TableCell key="iddepot" align="left">
                    iddepot
                  </TableCell>
                  <TableCell key="depot" align="left">
                    depot
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
                        {isEditClicked && row.iddepot === selectedRowId ? (
                          <>
                            <TableCell>
                              <TextField
                                value={editedIdDepot !== '' ? editedIdDepot : row.iddepot}
                                onChange={(event) =>
                                  setEditedIdDepot(
                                    editedIdDepot !== '' ? event.target.value : row.iddepot
                                  )
                                }
                                onFocus={() => setEditedIdDepot(row.iddepot)}
                              />
                            </TableCell>
                            <TableCell>
                              <TableCell>
                                <TextField
                                  value={editedNomDepot !== '' ? editedNomDepot : row.depot}
                                  onChange={(event) =>
                                    setEditedNomDepot(
                                      editedNomDepot !== '' ? event.target.value : row.depot
                                    )
                                  }
                                  onFocus={() => setEditedNomDepot(row.depot)}
                                />
                              </TableCell>
                            </TableCell>
                          </>
                        ) : (
                          <>
                            <TableCell>{row.iddepot}</TableCell>
                            <TableCell>{row.depot}</TableCell>
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
                          {isEditClicked && row.iddepot === selectedRowId && (
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

export default Listedepot;

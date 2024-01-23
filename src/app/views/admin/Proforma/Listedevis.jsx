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
import { useEffect } from 'react';
import { SimpleCard } from 'app/components';
import { StyledTable, AutoComplete } from 'app/views/style/style';
import { useListedevisFunctions } from 'app/views/admin/Proforma/function';

const Listedevis = ({ rowsPerPageOptions = [5, 10, 25] }) => {
  // Colonne
  const columns = [
    { label: 'ID', field: 'id', align: 'center' },
    { label: 'Commande', field: 'idcommande', align: 'center' },
    { label: 'Client', field: 'idclient', align: 'center' },
    { label: 'devis', field: 'iddevis', align: 'center' },
    { label: 'statut', field: 'statut', align: 'center' }

    // Other columns...
  ];

  const data = [];
  const {
    editingId,
    sortDirection,
    page,
    rowsPerPage,
    setSortDirection,
    isEditClicked,
    selectedRowId,
    handleChangePage,
    sortColumn,
    selectedIds,
    setClient,
    setDate,
    client,
    date,
    handleChangeRowsPerPage,
    handleEdit,
    cancelEdit,
    handleSave,
    handleSelection,
    handleSelectAll,
    handleSelectColumn,
    sortedData
  } = useListedevisFunctions(data);

  //  Use effect
  useEffect(() => {}, [sortedData]);

  return (
    <Box width="100%" overflow="auto">
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <SimpleCard title="Rechercher un devis" sx={{ marginBottom: '16px' }}>
            <form>
              <div style={{ display: 'flex', gap: '16px' }}>
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      size="small"
                      type="date"
                      name="datedevis"
                      variant="outlined"
                      value={date}
                      onChange={(event) => setDate(event.target.value)}
                      sx={{ mb: 3 }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <AutoComplete
                      fullWidth
                      size="small"
                      // options={suggestions}
                      getOptionLabel={(option) => option.label}
                      renderInput={(params) => (
                        <TextField {...params} label="Nom du client" variant="outlined" fullWidth />
                      )}
                      name="idclient"
                      id="idclient"
                    />
                  </Grid>
                </Grid>
              </div>
            </form>
          </SimpleCard>
        </Grid>
        <Grid item>
          <SimpleCard title="Liste des devis">
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
                  <TableCell>
                    <Checkbox
                      checked={data.every((row) => selectedIds.includes(row.id))}
                      indeterminate={
                        data.some((row) => selectedIds.includes(row.id)) &&
                        !data.every((row) => selectedIds.includes(row.id))
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  {columns.map((column, index) => (
                    // Nom des colonnes du tableau
                    <TableCell key={index} align={column.align || 'left'}>
                      {column.label}
                    </TableCell>
                  ))}
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
                        <TableCell>
                          <Checkbox
                            checked={selectedIds.includes(row.id)}
                            onChange={(event) => handleSelection(event, row.id)}
                          />
                        </TableCell>
                        {columns.map((column, index) => (
                          <TableCell key={index} align={column.align || 'left'}>
                            {editingId === row.id ? (
                              <TextField
                                defaultValue={
                                  column.render ? column.render(row) : row[column.field]
                                }
                                name={row.field}
                                onBlur={(e) => handleSave(e.target.value, row.id, column.field)}
                              />
                            ) : column.render ? (
                              column.render(row)
                            ) : (
                              row[column.field]
                            )}
                          </TableCell>
                        ))}

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
                          {isEditClicked && row.id === selectedRowId && (
                            <>
                              <IconButton
                                className="button"
                                variant="contained"
                                aria-label="Edit"
                                color="secondary"
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

export default Listedevis;

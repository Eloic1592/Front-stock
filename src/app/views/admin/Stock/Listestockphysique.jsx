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
import { StyledTable } from 'app/views/style/style';
import { useMphysiqueFunctions } from 'app/views/admin/Stock/function';

const Listestockphysique = ({ rowsPerPageOptions = [5, 10, 25] }) => {
  // Colonne

  const columns = [
    { label: 'ID', field: 'idmouvementdestock', align: 'center' },
    { label: 'Date de depot', field: 'datedepot', align: 'center' },
    { label: 'Mouvement', field: 'mouvement', align: 'center' },
    { label: 'Nature', field: 'naturemouvement', align: 'center' },
    { label: 'Description', field: 'description', align: 'center' },
    { label: 'Modele', field: 'modele', align: 'center' },
    { label: 'Quantite', field: 'quantite', align: 'center' },
    { label: 'Prix', field: 'P.U', align: 'center' },
    { label: 'Total', field: 'total', align: 'center' },
    { label: 'Depot', field: 'depot', align: 'center' }
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
    setDate,
    setDepot,
    setArticle,
    setMouvement,
    handleChangeRowsPerPage,
    handleEdit,
    cancelEdit,
    handleSave,
    handleSelection,
    handleSelectAll,
    handleSelectColumn,
    sortedData
  } = useMphysiqueFunctions(data);

  //  Use effect
  useEffect(() => {}, [sortedData]);

  return (
    <Box width="100%" overflow="auto">
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <SimpleCard title="Rechercher un mouvement" sx={{ marginBottom: '16px' }}>
            <form>
              <div style={{ display: 'flex', gap: '16px' }}>
                <Grid container spacing={2}>
                  <Grid item xs={3}>
                    <TextField
                      fullWidth
                      size="small"
                      type="text"
                      name="materielfiltre"
                      label="Nom du materiel"
                      variant="outlined"
                      //  value={materielfilter}
                      //  onChange={(event) => setMaterielfilter(event.target.value)}
                      sx={{ mb: 3 }}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      fullWidth
                      size="small"
                      type="date"
                      name="date"
                      variant="outlined"
                      //  value={materielfilter}
                      //  onChange={(event) => setMaterielfilter(event.target.value)}
                      sx={{ mb: 3 }}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Select
                      fullWidth
                      size="small"
                      labelId="select-label"
                      value={'1'}
                      //  onChange={handleChange}
                    >
                      <MenuItem value="1">Entree</MenuItem>
                      <MenuItem value="-1"> Sortie</MenuItem>
                    </Select>
                  </Grid>
                  <Grid item xs={1}>
                    <Select
                      size="small"
                      labelId="select-label"
                      value={'1'}
                      //  onChange={(event) => setDepot(event.target.value)}
                    >
                      <MenuItem value="1">Depot</MenuItem>
                      <MenuItem value="-1"> Salle 6</MenuItem>
                    </Select>
                  </Grid>
                  <Grid item xs={2}>
                    <Select
                      fullWidth
                      size="small"
                      labelId="select-label"
                      value={'1'}
                      //  onChange={handleChange}
                    >
                      <MenuItem value="1">Don</MenuItem>
                      <MenuItem value="-1"> Transfert</MenuItem>
                      <MenuItem value="-1"> Perte</MenuItem>
                    </Select>
                  </Grid>
                </Grid>
              </div>
            </form>
          </SimpleCard>
        </Grid>

        <Grid item>
          <SimpleCard title="Liste des mouvements physiques actuels">
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

export default Listestockphysique;

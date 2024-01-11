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
import { StyledTable, AutoComplete } from 'app/views/style/style';
import { useListematerielFunctions } from 'app/views/admin/Materiel/function';

const Listemateriel = ({ rowsPerPageOptions = [5, 10, 25] }) => {
  const columns = [
    { label: 'ID', field: 'id', align: 'center' },
    { label: 'Type materiel', field: 'typemateriel', align: 'center' },
    { label: 'Article', field: 'article', align: 'center' },
    { label: 'Numserie', field: 'numserie', align: 'center' },
    { label: 'Description', field: 'description', align: 'center' },
    { label: 'Prix de vente', field: 'prixvente', align: 'center' },
    { label: 'Caution', field: 'caution', align: 'center' },
    { label: 'Couleur', field: 'couleur', align: 'center' },
    { label: 'statut', field: 'statut', align: 'center' }

    // Other columns...
  ];

  const data = [
    // { id: 1, typemateriel: 'Test Data 1', /* other fields... */ },
    // { id: 2, typemateriel: 'Test Data 2', /* other fields... */ },
    // { id: 3, typemateriel: 'Test Data 3', /* other fields... */ },
    // { id: 4, typemateriel: 'Test Data 4', /* other fields... */ },
    // { id: 5, typemateriel: 'Test Data 5', /* other fields... */ },
    // { id: 6, typemateriel: 'Test Data 6', /* other fields... */ },
    // { id: 7, typemateriel: 'Test Data 7', /* other fields... */ },
    // { id: 8, typemateriel: 'Test Data 8', /* other fields... */ },
    // { id: 9, typemateriel: 'Test Data 9', /* other fields... */ },
    // { id: 10, typemateriel: 'Test Data 10', /* other fields... */ },
    // Add more rows if needed
  ];

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
    setCouleur,
    setNumserie,
    setModele,
    setTypemateriel,
    couleur,
    modele,
    typemateriel,
    numserie,
    handleChangeRowsPerPage,
    handleEdit,
    cancelEdit,
    handleSave,
    handleSelection,
    handleSelectAll,
    handleSelectColumn,
    sortedData
  } = useListematerielFunctions(data);

  //  Use effect
  useEffect(() => {}, [sortedData]);

  return (
    <Box width="100%" overflow="auto">
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <SimpleCard title="Rechercher un materiel" sx={{ marginBottom: '16px' }}>
            <form>
              <div style={{ display: 'flex', gap: '16px' }}>
                <TextField
                  fullWidth
                  size="small"
                  id="numeroserie"
                  type="text"
                  label="Numero de serie"
                  name="numserie"
                  variant="outlined"
                  // value={numserie}
                  // onChange={(event) => setnumserie(event.target.value)}
                  sx={{ mb: 3 }}
                />
                <AutoComplete
                  fullWidth
                  size="small"
                  // options={suggestions}
                  getOptionLabel={(option) => option.label}
                  renderInput={(params) => (
                    <TextField {...params} label="Modele" variant="outlined" fullWidth />
                  )}
                  name="typemateriel"
                  id="typemateriel"
                />

                <Select
                  size="small"
                  labelId="select-label"
                  value={'1'}
                  sx={{ mb: 3 }}
                  //  onChange={handleChange}
                >
                  <MenuItem value="1">Ordinateur</MenuItem>
                  <MenuItem value="-1">Materiel sonore</MenuItem>
                  <MenuItem value="-1">Alimentation</MenuItem>
                  <MenuItem value="-1">Baffles</MenuItem>
                </Select>
                <Select
                  labelId="select-label"
                  value={'1'}
                  size="small"
                  sx={{ mb: 3 }}
                  //  onChange={handleChange}
                >
                  <MenuItem value="1">Noir</MenuItem>
                  <MenuItem value="1">Gris</MenuItem>
                </Select>
                <Select
                  size="small"
                  labelId="select-label"
                  value={'1'}
                  sx={{ mb: 3 }}
                  //  onChange={handleChange}
                >
                  <MenuItem value="1">Materiel bureautique</MenuItem>
                  <MenuItem value="-1"> Materiel informatique</MenuItem>
                  <MenuItem value="-1"> Materiel sonore</MenuItem>
                  <MenuItem value="-1"> Alimentation</MenuItem>
                </Select>
              </div>
            </form>
          </SimpleCard>
        </Grid>
        <Grid item>
          <SimpleCard title="Liste des materiels">
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
                          <IconButton
                            className="button"
                            variant="contained"
                            aria-label="Edit"
                            color="primary"
                          >
                            <Icon>info</Icon>
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

export default Listemateriel;

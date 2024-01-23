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
import { useListecommandeFunctions } from 'app/views/admin/Commande/function';

const Listecommande = ({ rowsPerPageOptions = [5, 10, 25] }) => {
  // Colonne
  const columns = [
    { label: 'ID', field: 'id', align: 'center' },
    { label: 'Marque', field: 'marque', align: 'center' },
    { label: 'Modele', field: 'modele', align: 'center' },
    { label: 'Date commande', field: 'datecommande', align: 'center' },
    { label: 'Quantite', field: 'quantite', align: 'center' },
    { label: 'Prix unitaire', field: 'prixunitaire', align: 'center' },
    { label: 'Total', field: 'total', align: 'center' },
    { label: 'statut', field: 'statut', align: 'center' }
    // Other columns...
  ];

  const data = [
    {
      id: 1,
      datecommande: 'COM1',
      marque: 'CL1',
      modele: 'DEV1',
      idcommande: 'COMMAND1',
      description: 'Description',
      quantite: 23,
      prixunitaire: 15,
      total: 235,
      statut: '1' /* other fields... */
    },
    {
      id: 2,
      datecommande: 'COM1',
      marque: 'CL1',
      modele: 'DEV1',
      idcommande: 'COMMAND1',
      description: 'Description',
      quantite: 1,
      prixunitaire: 234,
      total: 34,
      statut: '1' /* other fields... */
    },
    {
      id: 3,
      datecommande: 'COM1',
      marque: 'CL1',
      modele: 'DEV1',
      idcommande: 'COMMAND1',
      description: 'Description',
      quantite: 10,
      prixunitaire: 12,
      total: 346,
      statut: '1' /* other fields... */
    },
    {
      id: 4,
      datecommande: 'COM1',
      marque: 'CL1',
      modele: 'DEV1',
      idcommande: 'COMMAND1',
      description: 'Description',
      quantite: 4,
      prixunitaire: 25,
      total: 45,
      statut: '1' /* other fields... */
    },
    {
      id: 5,
      datecommande: 'COM1',
      marque: 'CL1',
      modele: 'DEV1',
      idcommande: 'COMMAND1',
      description: 'Description',
      quantite: 6,
      prixunitaire: 6,
      total: 456,
      statut: '1' /* other fields... */
    },
    {
      id: 6,
      datecommande: 'COM1',
      marque: 'CL1',
      modele: 'DEV1',
      idcommande: 'COMMAND1',
      description: 'Description',
      quantite: 45,
      prixunitaire: 97,
      total: 78,
      statut: '1' /* other fields... */
    },
    {
      id: 7,
      datecommande: 'COM1',
      marque: 'CL1',
      modele: 'DEV1',
      idcommande: 'COMMAND1',
      description: 'Description',
      quantite: 6,
      prixunitaire: 56,
      total: 78,
      statut: '1' /* other fields... */
    }
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
    setDate,
    setClient,
    setModele,
    client,
    date,
    modele,
    handleChangeRowsPerPage,
    handleEdit,
    cancelEdit,
    handleSave,
    handleSelection,
    handleSelectAll,
    handleSelectColumn,
    sortedData
  } = useListecommandeFunctions(data);

  //  Use effect
  useEffect(() => {}, [sortedData]);

  return (
    <Box width="100%" overflow="auto">
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <SimpleCard title="Rechercher un bon de commande" sx={{ marginBottom: '16px' }}>
            <form>
              <div style={{ display: 'flex', gap: '16px' }}>
                <Grid container spacing={1}>
                  <Grid item xs={4}>
                    <TextField
                      fullWidth
                      size="small"
                      type="date"
                      name="datedevis"
                      variant="outlined"
                      // value={materielfilter}
                      // onChange={(event) => setMaterielfilter(event.target.value)}
                      sx={{ mb: 3 }}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <AutoComplete
                      fullWidth
                      size="small"
                      // options={suggestions}
                      getOptionLabel={(option) => option.label}
                      renderInput={(params) => (
                        <TextField {...params} label="Nom du client" variant="outlined" fullWidth />
                      )}
                      name="idmateriel"
                      id="idmateriel"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <AutoComplete
                      fullWidth
                      size="small"
                      // options={suggestions}
                      getOptionLabel={(option) => option.label}
                      renderInput={(params) => (
                        <TextField {...params} label="Modele" variant="outlined" fullWidth />
                      )}
                      name="idmateriel"
                      id="idmateriel"
                    />
                  </Grid>
                </Grid>
              </div>
            </form>
          </SimpleCard>
        </Grid>

        <Grid item>
          <SimpleCard title="Liste des commandes">
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

export default Listecommande;

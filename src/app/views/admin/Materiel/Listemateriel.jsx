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
import { useEffect, useState } from 'react';
import { SimpleCard } from 'app/components';
import { StyledTable, AutoComplete } from 'app/views/style/style';
import { useListematerielFunctions } from 'app/views/admin/Materiel/function';
import { baseUrl } from 'app/utils/constant';

const Listemateriel = ({ rowsPerPageOptions = [5, 10, 25] }) => {
  const columns = [
    { label: 'ID', field: 'id', align: 'center' },
    { label: 'Type materiel', field: 'typemateriel', align: 'center' },
    { label: 'modele', field: 'modele', align: 'center' },
    { label: 'Numserie', field: 'numserie', align: 'center' },
    { label: 'Description', field: 'description', align: 'center' },
    { label: 'Prix de vente', field: 'prixvente', align: 'center' },
    { label: 'Caution', field: 'caution', align: 'center' },
    { label: 'Couleur', field: 'couleur', align: 'center' },
    { label: 'statut', field: 'statut', align: 'center' }

    // Other columns...
  ];
  const [data, setData] = useState([]);
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
    // setEditedIdtypemateriel('');
    // setEditedTypemateriel('');
    setIsEditClicked(true);
    setSelectedRowId(row.idmateriel);
  };

  const cancelEdit = (row) => {
    // setEditedIdtypemateriel('');
    // setEditedTypemateriel('');
    setIsEditClicked(false);
  };

  const {
    editingId,
    sortDirection,
    page,
    rowsPerPage,
    setSortDirection,
    handleChangePage,
    sortColumn,
    selectedIds,
    setCouleur,
    setNumserie,
    numserie,
    handleChangeRowsPerPage,
    handleSave,
    handleSelection,
    handleSelectAll,
    handleSelectColumn,
    sortedData
  } = useListematerielFunctions(data);

  useEffect(() => {
    let url = baseUrl + '/materiel/contentmateriel';
    fetch(url, {
      crossDomain: true,
      method: 'POST',
      body: JSON.stringify({}),
      headers: { 'Content-Type': 'application/json' }
    })
      .then((response) => response.json())
      .then((response) => {
        setData(response);
        console.log(data.materiels);
      });
  }, []);

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
                  value={numserie}
                  onChange={(event) => setNumserie(event.target.value)}
                  sx={{ mb: 3 }}
                />
                <AutoComplete
                  fullWidth
                  options={data.typemateriels}
                  getOptionLabel={(option) => option.typemateriel}
                  renderInput={(params) => (
                    <TextField {...params} label="Type de materiel" variant="outlined" fullWidth />
                  )}
                  name="typemateriel"
                  id="typemateriel"
                  // value={typemateriel}
                  // onChange={(event, newValue) => {
                  //   setTypemateriel(newValue ? newValue.idtypemateriel : '');
                  // }}
                  sx={{ mb: 3 }}
                />
                <AutoComplete
                  fullWidth
                  options={data.typemateriels}
                  getOptionLabel={(option) => option.typemateriel}
                  renderInput={(params) => (
                    <TextField {...params} label="Type de materiel" variant="outlined" fullWidth />
                  )}
                  name="typemateriel"
                  id="typemateriel"
                  // value={typemateriel}
                  // onChange={(event, newValue) => {
                  //   setTypemateriel(newValue ? newValue.idtypemateriel : '');
                  // }}
                  sx={{ mb: 3 }}
                />
                <AutoComplete
                  fullWidth
                  options={data.categoriemateriels}
                  getOptionLabel={(option) => option.categoriemateriel}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Categorie de materiel"
                      variant="outlined"
                      fullWidth
                    />
                  )}
                  name="categoriemateriel"
                  id="idcategoriemateriel"
                  // value={categoriemateriel}
                  // onChange={(event, newValue) => {
                  //   setCategorietmateriel(newValue ? newValue.idcategoriemateriel : '');
                  // }}
                  sx={{ mb: 3 }}
                />
                <Select
                  labelId="select-label"
                  size="small"
                  sx={{ mb: 3 }}
                  // value={couleur}
                  // onChange={(event) => setCouleur(event.target.value)}
                >
                  <MenuItem value=" ">Choisir une couleur</MenuItem>
                  <MenuItem value="Black">Noir</MenuItem>
                  <MenuItem value="White">Blanc</MenuItem>
                  <MenuItem value="Grey">Gris</MenuItem>
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
                  <TableHead>
                    {/* Listage de Donnees */}
                    <TableRow>
                      <TableCell key="idmateriel" align="left">
                        idmateriel
                      </TableCell>
                      <TableCell key="typemateriel" align="left">
                        typemateriel
                      </TableCell>
                      <TableCell key="modele" align="left">
                        modele
                      </TableCell>
                      <TableCell key="numserie" align="left">
                        numserie
                      </TableCell>
                      <TableCell key="prixvente" align="left">
                        prixvente
                      </TableCell>
                      <TableCell key="caution" align="left">
                        caution
                      </TableCell>
                      <TableCell key="couleur" align="left">
                        couleur
                      </TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
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

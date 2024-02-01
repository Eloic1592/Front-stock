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
  Grid,
  Snackbar,
  Alert,
  Container
} from '@mui/material';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { SimpleCard } from 'app/components';
import { StyledTable, AutoComplete } from 'app/views/style/style';
import { useDetaildevisFunctions } from 'app/views/admin/Proforma/detailfunction';
import { baseUrl } from 'app/utils/constant';

const Detail = ({ rowsPerPageOptions = [5, 10, 25] }) => {
  // Colonne
  const columns = [
    { label: 'ID', field: 'iddevis', align: 'center' },
    { label: 'Nom client', field: 'nom', align: 'center' },
    { label: 'Date devis', field: 'datedevis', align: 'center' },
    { label: 'Libele', field: 'libele', align: 'center' }

    // Other columns...
  ];
  const [data, setData] = useState([]);
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
    client,
    datedevis,
    setDatedevis,
    libelle,
    setLibelle,
    handleChangeRowsPerPage,
    handleEdit,
    cancelEdit,
    handleSelection,
    handleSelectAll,
    handleSelectColumn
    // sortedData
  } = useDetaildevisFunctions(data);

  const [message, setMessage] = useState({
    text: 'Information enregistree',
    severity: 'success',
    open: false
  });
  const handleAlertClose = () => setMessage({ open: false });
  const [initialDataFetched, setInitialDataFetched] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = baseUrl + '/devis/detaildevis';
        const response = await fetch(url, {
          crossDomain: true,
          method: 'POST',
          body: JSON.stringify({}),
          headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`);
        }

        const responseData = await response.json();
        // setData(responseData);
        console.log(responseData);
      } catch (error) {
        setMessage({
          text: "Aucune donnee n'ete recuperee,veuillez verifier si le serveur est actif",
          severity: 'error',
          open: true
        });
      }
    };
  }, []); // Ajoutez initialDataFetched comme dépendance

  return (
    <Box width="100%" overflow="auto">
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <SimpleCard title="Rechercher un devis" sx={{ marginBottom: '16px' }}>
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  size="small"
                  type="date"
                  name="datedevis"
                  variant="outlined"
                  value={datedevis}
                  onChange={(event) => setDatedevis(event.target.value)}
                  sx={{ mb: 3 }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  id="nomclient"
                  size="small"
                  type="text"
                  name="nomclient"
                  label="Nom du client"
                  value={client}
                  onChange={(event) => setClient(event.target.value)}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  id="libelle"
                  size="small"
                  type="text"
                  name="libelle"
                  label="Libelle du devis"
                  value={libelle}
                  onChange={(event) => setLibelle(event.target.value)}
                />
              </Grid>
            </Grid>
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
                  disabled={selectedIds.length === 0}
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
                      checked={data.every((row) => selectedIds.includes(row.iddevis))}
                      indeterminate={
                        data.some((row) => selectedIds.includes(row.iddevis)) &&
                        !data.every((row) => selectedIds.includes(row.iddevis))
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell key="iddevis" align="left">
                    ID
                  </TableCell>
                  <TableCell key="nom" align="left">
                    nom client
                  </TableCell>
                  <TableCell key="datedevis" align="left">
                    date devis
                  </TableCell>
                  <TableCell key="libele" align="left">
                    Libele
                  </TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* Donnees du tableau */}
                {data && data.length > 0 ? (
                  data
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Checkbox
                            checked={selectedIds.includes(row.iddevis)}
                            onChange={(event) => handleSelection(event, row.iddevis)}
                          />
                        </TableCell>
                        <TableCell align="left">{row.iddevis}</TableCell>
                        <TableCell align="left">{row.nom}</TableCell>
                        <TableCell align="left">{row.datedevis}</TableCell>
                        <TableCell align="left">{row.libelle}</TableCell>
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
                          {isEditClicked && row.iddevis === selectedRowId && (
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
                  <TableRow>
                    <TableCell colSpan={6}>
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
      </Grid>{' '}
      <Snackbar open={message.open} autoHideDuration={3000} onClose={handleAlertClose}>
        <Alert severity={message.severity} sx={{ width: '100%' }} variant="filled">
          {message.text}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Detail;

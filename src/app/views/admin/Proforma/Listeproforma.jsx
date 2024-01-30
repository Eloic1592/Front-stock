import {
  Box,
  TableBody,
  TableCell,
  TextField,
  TableHead,
  TablePagination,
  TableRow,
  Select,
  MenuItem,
  Grid
} from '@mui/material';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { SimpleCard } from 'app/components';
import { StyledTable } from 'app/views/style/style';
import { useListedevisFunctions } from 'app/views/admin/Proforma/function';
import { baseUrl } from 'app/utils/constant';

// Proforma tsy afaka ovaina intsony
const Listeproforma = ({ rowsPerPageOptions = [5, 10, 25] }) => {
  // Colonne
  const columns = [
    { label: 'ID', field: 'idproforma', align: 'center' },
    { label: 'Client', field: 'idclient', align: 'center' },
    { label: 'date devis', field: 'datedevis', align: 'center' },
    { label: 'date validation', field: 'datevalidation', align: 'center' }
  ];

  const [data, setData] = useState([]);
  const [initialDataFetched, setInitialDataFetched] = useState(false);

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
    setDatedevis,
    setDateval,
    dateval,
    datedevis,
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
  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = baseUrl + '/devis/proformaclient';
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
        setData(responseData);
      } catch (error) {
        console.log("Aucune donnee n'ete recuperee,veuillez verifier si le serveur est actif");
        // Gérer les erreurs de requête Fetch ici
      }
    };

    // Charger les données initiales uniquement si elles n'ont pas encore été chargées
    if (!initialDataFetched) {
      fetchData(); // Appel initial
      setInitialDataFetched(true);
    }

    // La logique conditionnelle
    if (isEditClicked && selectedRowId !== null) {
      const selectedRow = sortedData.find((row) => row.idmateriel === selectedRowId);

      if (selectedRow) {
        // setIsEditedmateriel(selectedRow.idmateriel);
        // setEditedNaturemouvement((prev) => (prev != null ? prev : selectedRow.naturemouvement));
      }
    }
  }, [isEditClicked, selectedRowId, sortedData, initialDataFetched]); // Ajoutez initialDataFetched comme dépendance

  return (
    <Box width="100%" overflow="auto">
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <SimpleCard title="Rechercher un proforma" sx={{ marginBottom: '16px' }}>
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
                      value={datedevis}
                      onChange={(event) => setDatedevis(event.target.value)}
                      sx={{ mb: 3 }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      size="small"
                      type="date"
                      name="dateval"
                      variant="outlined"
                      value={dateval}
                      onChange={(event) => setDateval(event.target.value)}
                      sx={{ mb: 3 }}
                    />
                  </Grid>
                </Grid>
              </div>
            </form>
          </SimpleCard>
        </Grid>
        <Grid item>
          <SimpleCard title="Liste des mouvements proformas">
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
            </Grid>
            <StyledTable>
              <TableHead>
                {/* Listage de Donnees */}
                <TableRow>
                  <TableCell key="idproforma" align="left">
                    idproforma
                  </TableCell>
                  <TableCell key="nom" align="left">
                    Nom client
                  </TableCell>
                  <TableCell key="datedevis" align="left">
                    date devis
                  </TableCell>
                  <TableCell key="datevalidation" align="left">
                    date validation
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* Donnees du tableau */}
                {sortedData && sortedData.length > 0 ? (
                  sortedData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => (
                      <TableRow key={index}>
                        <TableCell key={index}>{row.idproforma}</TableCell>
                        <TableCell key={index}>{row.nom}</TableCell>
                        <TableCell key={index}>{row.datedevis}</TableCell>
                        <TableCell key={index}>{row.datevalidation}</TableCell>
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

export default Listeproforma;

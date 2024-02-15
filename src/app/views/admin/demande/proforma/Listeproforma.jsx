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
  Grid,
  Icon,
  IconButton,
  Button,
  Snackbar,
  Alert,
  Checkbox
} from '@mui/material';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { SimpleCard } from 'app/components';
import { StyledTable } from 'app/views/style/style';
import { useListeproformafunctions } from 'app/views/admin/demande/proforma/proformafunction';
import { baseUrl } from 'app/utils/constant';
import { converttodate } from 'app/utils/utils';

// Proforma tsy afaka ovaina intsony
const Listeproforma = ({ rowsPerPageOptions = [5, 10, 25] }) => {
  // Colonne
  const columns = [
    { label: 'ID', field: 'idproforma', align: 'center' },
    { label: 'N devis', field: 'iddetaildevis', align: 'center' },
    { label: 'Client', field: 'nom', align: 'center' },
    { label: 'date devis', field: 'datedevis', align: 'center' },
    { label: 'date validation', field: 'datevalidation', align: 'center' }
  ];

  const [data, setData] = useState([]);
  const handleAlertClose = () => setMessage({ open: false });
  const [initialDataFetched, setInitialDataFetched] = useState(false);
  const [message, setMessage] = useState({
    text: 'Information enregistree',
    severity: 'success',
    open: false
  });

  const handleSubmit = () => {
    let commande = [];
    commande = selectedIds.map((id) => ({
      idproforma: id,
      dateboncommande: new Date()
    }));

    let url = baseUrl + '/boncommande/createcommande';
    fetch(url, {
      crossDomain: true,
      method: 'POST',
      body: JSON.stringify(commande),
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
      .catch(() => {
        setMessage({
          text: 'La modification dans la base de données a échoué',
          severity: 'error',
          open: true
        });
      });
  };

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
    client,
    setClient,
    datevalidation,
    setDatevalidation,
    handleSelection,
    handleSelectAll,
    handleChangeRowsPerPage,
    handleSelectColumn,
    sortedData
  } = useListeproformafunctions(data);

  //  Use effect
  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = baseUrl + '/proforma/proformaclient';
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
        setMessage({
          text: "Aucune donnee n'ete recuperee,veuillez verifier si le serveur est actif",
          severity: 'error',
          open: true
        });
      }
    };

    // Charger les données initiales uniquement si elles n'ont pas encore été chargées
    if (!initialDataFetched) {
      fetchData(); // Appel initial
      setInitialDataFetched(true);
    }

    // La logique conditionnelle
    if (isEditClicked && selectedRowId !== null) {
      const selectedRow = sortedData.find((row) => row.idproforma === selectedRowId);

      if (selectedRow) {
        // setIsEditedmateriel(selectedRow.idmateriel);
        // setEditedNaturemouvement((prev) => (prev != null ? prev : selectedRow.naturemouvement));
      }
    }
  }, [isEditClicked, selectedRowId, sortedData, initialDataFetched]); // Ajoutez initialDataFetched comme dépendance
  const getInfo = (iddevis) => {
    window.location.replace('/admin/detailproforma/' + iddevis);
  };

  return (
    <Box width="100%" overflow="auto">
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <SimpleCard title="Rechercher un proforma" sx={{ marginBottom: '16px' }}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  size="small"
                  type="text"
                  name="client"
                  variant="outlined"
                  value={client}
                  onChange={(event) => setClient(event.target.value)}
                  sx={{ mb: 3 }}
                  label="Nom du client"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  size="small"
                  type="date"
                  name="dateval"
                  variant="outlined"
                  value={datevalidation}
                  onChange={(event) => setDatevalidation(event.target.value)}
                  sx={{ mb: 3 }}
                  label="Date de validation"
                  focused
                />
              </Grid>
            </Grid>
          </SimpleCard>
        </Grid>
        <Grid item>
          <SimpleCard title="Liste des proformas">
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
              <Grid item xs={3}>
                <Button
                  className="button"
                  variant="contained"
                  aria-label="Edit"
                  color="secondary"
                  disabled={selectedIds.length === 0}
                  onClick={handleSubmit}
                >
                  Generer bon de commande
                </Button>
              </Grid>
            </Grid>
            <StyledTable id="datatable">
              <TableHead>
                {/* Listage de Donnees */}
                <TableRow>
                  <TableCell align="left">
                    <Checkbox
                      checked={data.every((row) => selectedIds.includes(row.idproforma))}
                      indeterminate={
                        data.some((row) => selectedIds.includes(row.idproforma)) &&
                        !data.every((row) => selectedIds.includes(row.idproforma))
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell align="left">ID proforma</TableCell>
                  <TableCell align="left">Num devis</TableCell>
                  <TableCell align="left">Nom client</TableCell>
                  <TableCell align="left">Date devis</TableCell>
                  <TableCell align="left">Date validation</TableCell>
                  <TableCell align="left">Action</TableCell>
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
                            checked={selectedIds.includes(row.idproforma)}
                            onChange={(event) => handleSelection(event, row.idproforma)}
                          />
                        </TableCell>
                        <TableCell>{row.idproforma}</TableCell>
                        <TableCell>{row.iddevis}</TableCell>
                        <TableCell>{row.nom}</TableCell>
                        <TableCell>{converttodate(row.datedevis)}</TableCell>
                        <TableCell>{converttodate(row.datevalidation)}</TableCell>
                        <TableCell>
                          <IconButton
                            className="button"
                            variant="contained"
                            aria-label="Edit"
                            color="primary"
                            onClick={() => getInfo(row.iddevis)}
                          >
                            <Icon>info</Icon>
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4}>
                      <Typography variant="subtitle1" color="textSecondary">
                        Aucune donnée disponible
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
                  count={sortedData.length}
                  onPageChange={handleChangePage}
                  rowsPerPageOptions={rowsPerPageOptions}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  nextIconButtonProps={{ 'aria-label': 'Page suivante' }}
                  backIconButtonProps={{ 'aria-label': 'Page precedente' }}
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

export default Listeproforma;

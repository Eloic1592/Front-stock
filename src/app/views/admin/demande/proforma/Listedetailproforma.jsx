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
  Alert
} from '@mui/material';
import { SimpleCard } from 'app/components';
import Typography from '@mui/material/Typography';
import { StyledTable, AutoComplete } from 'app/views/style/style';
import { useDetaildevisFunctions } from 'app/views/admin/demande/devis/detailfunction';
import { useState, useEffect } from 'react';
import { baseUrl } from 'app/utils/constant';
import { useParams } from 'react-router-dom';

const Listedetailproforma = ({ rowsPerPageOptions = [5, 10, 25] }) => {
  const iddevis = useParams();
  console.log(iddevis.iddevis);
  // Colonne
  const columns = [
    { label: 'ID', field: 'iddetaildevis', align: 'center' },
    { label: 'Marque', field: 'marque', align: 'center' },
    { label: 'Modele', field: 'modele', align: 'center' },
    { label: 'Quantite', field: 'quantite', align: 'center' },
    { label: 'Prix unitaire', field: 'pu', align: 'center' },
    { label: 'Total', field: 'total', align: 'center' }

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
    handleSelectColumn,
    sortedData
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
        let devisParams = {
          iddevis: iddevis.iddevis
        };
        let url = baseUrl + '/proforma/detailproforma';
        const response = await fetch(url, {
          crossDomain: true,
          method: 'POST',
          body: JSON.stringify(devisParams),
          headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`);
        }

        const responseData = await response.json();
        setData(responseData);
        console.log(data);
      } catch (error) {
        setMessage({
          text: "Aucune donnee n'ete recuperee,veuillez verifier si le serveur est actif",
          severity: 'error',
          open: true
        });
      }
    };
    fetchData();
  }, []); // Ajoutez initialDataFetched comme dépendance

  return (
    <Box width="100%" overflow="auto">
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <SimpleCard title="Details du proforma">
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
            </Grid>
            <StyledTable>
              <TableHead>
                {/* Listage de Donnees */}
                <TableRow>
                  <TableCell key="iddetaildevis" align="left">
                    ID
                  </TableCell>
                  <TableCell key="marque" align="left">
                    Marque
                  </TableCell>
                  <TableCell key="modele" align="left">
                    Modele
                  </TableCell>
                  <TableCell key="quantite" align="left">
                    Quantite
                  </TableCell>
                  <TableCell key="pu" align="left">
                    Prix unitaire
                  </TableCell>
                  <TableCell key="total" align="left">
                    Total
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
                        <TableCell align="left">{row.iddetaildevis}</TableCell>
                        <TableCell align="left">{row.marque}</TableCell>
                        <TableCell align="left">{row.modele}</TableCell>
                        <TableCell align="left">{row.quantite}</TableCell>
                        <TableCell align="left">{row.pu}</TableCell>
                        <TableCell align="left">{row.total}</TableCell>
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

export default Listedetailproforma;

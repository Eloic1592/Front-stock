import {
  Box,
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
  Grid,
  Snackbar,
  Alert
} from '@mui/material';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { SimpleCard } from 'app/components';
import { StyledTable, Container } from 'app/views/style/style';
import { Livraisonfunctions } from 'app/views/admin/Bon/livraison/Livraisonfunction';
import { baseUrl } from 'app/utils/constant';
import { converttodate } from 'app/utils/utils';

const Commande = ({ rowsPerPageOptions = [5, 10, 25, 50, 100, 200] }) => {
  // Colonne
  const columns = [
    { label: 'ID Bon livraison', field: 'idbonlivraison', align: 'center' },
    { label: 'Date livraison', field: 'datelivraison', align: 'center' },
    { label: 'Nom client', field: 'nom', align: 'center' },
    { label: 'Proforma', field: 'idproforma', align: 'center' }
  ];

  const handleAlertClose = () => setMessage({ open: false });
  const [initialDataFetched, setInitialDataFetched] = useState(false);
  const [data, setData] = useState([]);
  const [message, setMessage] = useState({
    text: 'Information enregistree',
    severity: 'success',
    open: false
  });

  const {
    sortDirection,
    page,
    rowsPerPage,
    setSortDirection,
    isEditClicked,
    selectedRowId,
    handleChangePage,
    sortColumn,
    setClient,
    client,
    setDatelivraison,
    datelivraison,
    handleChangeRowsPerPage,
    handleSelectColumn,
    sortedData
  } = Livraisonfunctions(data);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = baseUrl + '/bonlivraison/listlivraison';
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

    if (!initialDataFetched) {
      fetchData();
      setInitialDataFetched(true);
    }
    if (isEditClicked && selectedRowId !== null) {
      const selectedRow = sortedData.find((row) => row.idbonlivraison === selectedRowId);

      if (selectedRow) {
      }
    }
  }, [isEditClicked, selectedRowId, sortedData, initialDataFetched]);

  const getInfo = (idproforma) => {
    window.location.replace('/admin/detaillivraison/' + idproforma);
  };
  return (
    <Container>
      <Box width="100%" overflow="auto">
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <SimpleCard title="Rechercher une livraisons" sx={{ marginBottom: '16px' }}>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    size="small"
                    type="date"
                    name="datedevis"
                    variant="outlined"
                    value={datelivraison}
                    onChange={(event) => setDatelivraison(event.target.value)}
                    sx={{ mb: 3 }}
                  />
                </Grid>
                <Grid item xs={6}>
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
              </Grid>
            </SimpleCard>
          </Grid>
          <Grid item>
            <SimpleCard title="Liste des livraisons">
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
                    <TableCell key="idbonlivraison" align="center" width="15%">
                      ID livraison
                    </TableCell>
                    <TableCell key="nom" align="center" width="30%">
                      Nom client
                    </TableCell>
                    <TableCell key="datelivraison" align="center" width="15%">
                      Date livraison
                    </TableCell>
                    <TableCell key="idproforma" align="center" width="15%">
                      Proforma
                    </TableCell>
                    <TableCell width="5%">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* Donnees du tableau */}
                  {sortedData && sortedData.length > 0 ? (
                    sortedData
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row, index) => (
                        <TableRow key={index}>
                          <TableCell align="center">{row.idbonlivraison}</TableCell>
                          <TableCell align="center">{row.nom}</TableCell>
                          <TableCell align="center">
                            {converttodate(row.datebonlivraison)}
                          </TableCell>
                          <TableCell align="center">{row.idproforma}</TableCell>
                          <TableCell>
                            <IconButton
                              className="button"
                              variant="contained"
                              aria-label="Edit"
                              color="primary"
                              onClick={() => getInfo(row.idproforma)}
                            >
                              <Icon>info</Icon>
                            </IconButton>
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
        </Grid>{' '}
        <Snackbar open={message.open} autoHideDuration={3000} onClose={handleAlertClose}>
          <Alert severity={message.severity} sx={{ width: '100%' }} variant="filled">
            {message.text}
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
};

export default Commande;

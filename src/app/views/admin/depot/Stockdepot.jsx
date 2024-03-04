import {
  Box,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Select,
  MenuItem,
  Snackbar,
  Alert,
  Grid,
  Icon,
  IconButton,
  Button
} from '@mui/material';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { SimpleCard, Breadcrumb } from 'app/components';
import { StyledTable, Container } from 'app/views/style/style';
import { baseUrl } from 'app/utils/constant';
import { formatNumber, coloredNumber } from 'app/utils/utils';
import { useStockdepotFunctions } from './stockdepotfunction';
import { pdf as renderPdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import PDFStockdepot from './PDFStockdepot';

const Stockdepot = () => {
  const columns = [
    { label: 'Depot', field: 'depot', align: 'center' },
    { label: 'Quantite', field: 'quantite', align: 'center' }
  ];
  const [data, setData] = useState([]);
  const [initialDataFetched, setInitialDataFetched] = useState(false);
  const handleAlertClose = () => setMessage({ open: false });
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
    setNomdepot,
    nomdepot,
    handleChangePage,
    sortColumn,
    handleChangeRowsPerPage,
    handleSelectColumn,
    sortedData
  } = useStockdepotFunctions(data);

  // Genere un PDF
  const generateStockDepotPDF = async () => {
    const blob = await renderPdf(<PDFStockdepot dataList={data} columns={columns} />).toBlob();
    saveAs(blob, 'Liste_Stock_Depot.pdf');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = baseUrl + '/depot/stockdepot';
        const response = await fetch(url, {
          crossDomain: true,
          method: 'POST',
          body: JSON.stringify({}),
          headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
          setMessage({
            text: "Il y a un probleme, aucune donnee n'a ete recuperee",
            severity: 'error',
            open: true
          });
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
  }, [sortedData, initialDataFetched]);

  const getstock = (iddepot) => {
    window.location.replace('/admin/stocktypemateriel/' + iddepot);
  };

  // Redirect
  const getlist = () => {
    window.location.replace('/admin/depot');
  };

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: 'Stock depot', path: 'admin/stockdepot' },
            { name: 'Stock par depot' }
          ]}
        />
      </Box>
      <Box className="breadcrumb">
        <Button variant="contained" color="secondary" onClick={getlist}>
          Liste des depots
        </Button>
      </Box>
      <Box width="100%" overflow="auto" key="Box1">
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <SimpleCard title="Rechercher un materiel dans ce depot" sx={{ marginBottom: '16px' }}>
              <TextField
                fullWidth
                size="small"
                type="text"
                name="materielfiltre"
                label="Nom du depot"
                variant="outlined"
                value={nomdepot}
                onChange={(event) => setNomdepot(event.target.value)}
                sx={{ mb: 3 }}
              />
            </SimpleCard>
          </Grid>

          <Grid item>
            <SimpleCard title="Liste des depots ">
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
                      <MenuItem key={column.field} value={column.field}>
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
                    color="secondary"
                    onClick={generateStockDepotPDF}
                  >
                    <Icon>picture_as_pdf</Icon>
                  </Button>
                </Grid>
              </Grid>
              <StyledTable>
                <TableHead>
                  <TableRow>
                    <TableCell key="depot" align="center" width="50%">
                      depot
                    </TableCell>
                    <TableCell key="quantite" align="center" width="50%">
                      Total article
                    </TableCell>
                    <TableCell key="action" align="center" width="50%">
                      Action
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
                          <>
                            <TableCell align="center">{row.depot}</TableCell>
                            <TableCell align="center" style={{ fontWeight: 'bold' }}>
                              {coloredNumber(formatNumber(row.quantite))}
                            </TableCell>
                            <TableCell align="center">
                              <IconButton
                                className="button"
                                variant="contained"
                                aria-label="Edit"
                                color="primary"
                                onClick={() => getstock(row.iddepot)}
                              >
                                <Icon>info</Icon>
                              </IconButton>
                            </TableCell>
                          </>
                        </TableRow>
                      ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={10}>
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
                    rowsPerPageOptions={[5, 10, 25, 50, 100, 200]}
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
    </Container>
  );
};

export default Stockdepot;

import {
  Box,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Grid,
  Icon,
  Button,
  Snackbar,
  Alert,
  Select,
  MenuItem
} from '@mui/material';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { SimpleCard, Breadcrumb } from 'app/components';
import { StyledTable, Container } from 'app/views/style/style';
import { baseUrl } from 'app/utils/constant';
import { formatNumber, coloredNumber } from 'app/utils/utils';
import { useParams } from 'react-router-dom';
import { pdf as renderPdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import PDFStocktypemateriel from './PDFStocktypemateriel';

const Stocktypematerieldepot = () => {
  const iddepot = useParams();

  const columns = [
    { label: 'Depot', field: 'depot', align: 'center' },
    { label: 'Typemateriel', field: 'typemateriel', align: 'center' },
    { label: 'Quantite', field: 'nombre', align: 'center' }
  ];
  const [typemateriel, setTypemateriel] = useState('');
  const [data, setData] = useState([]);
  const [initialDataFetched, setInitialDataFetched] = useState(false);
  const handleAlertClose = () => setMessage({ open: false });
  const [message, setMessage] = useState({
    text: 'Information enregistree',
    severity: 'success',
    open: false
  });
  const [sortColumn, setSortColumn] = useState(['1']);
  const [sortDirection, setSortDirection] = useState('asc');

  // Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleSelectColumn = (event) => {
    setSortColumn(event.target.value);
  };

  // Filtre
  const filtertypemateriels = data.filter(
    (typemateriels) =>
      typemateriels.typemateriel &&
      typemateriels.typemateriel.toLowerCase().includes(typemateriel.toLowerCase())
  );
  // Tri
  const sortedData = filtertypemateriels.sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) {
      return sortDirection === 'asc' ? -1 : 1;
    }
    if (a[sortColumn] > b[sortColumn]) {
      return sortDirection === 'asc' ? 1 : -1;
    }
    return 0;
  });

  // Export PDF
  const generatestocktypematerielPDF = async () => {
    const blob = await renderPdf(
      <PDFStocktypemateriel dataList={data} columns={columns} />
    ).toBlob();
    saveAs(blob, 'Liste_Stock_Type_materiel.pdf');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let depotParams = {
          iddepot: iddepot.iddepot
        };
        let url = baseUrl + '/depot/stocktypematerieldepot';
        const response = await fetch(url, {
          crossDomain: true,
          method: 'POST',
          body: JSON.stringify(depotParams),
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
          text: "Aucune donnee n 'a ete recuperee,veuillez verifier si le serveur est actif",
          severity: 'error',
          open: true
        });
      }
    };

    if (!initialDataFetched) {
      fetchData();
      setInitialDataFetched(true);
    }
  }, [iddepot.iddepot, sortedData, initialDataFetched]);

  //   Bouton retour
  const redirect = () => {
    window.location.replace('/admin/stockdepot');
  };

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: 'Stock depot', path: 'admin/stocktypemateriel' },
            { name: 'Stock type materiel par depot' }
          ]}
        />
      </Box>
      <Box width="100%" overflow="auto" key="Box1">
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Button variant="contained" color="inherit" onClick={redirect}>
              <Icon>arrow_backward</Icon>
            </Button>
          </Grid>
          <Grid item>
            <SimpleCard title="Rechercher un materiel dans ce depot" sx={{ marginBottom: '16px' }}>
              <TextField
                fullWidth
                size="small"
                type="text"
                name="materielfiltre"
                label="Nom du depot"
                variant="outlined"
                value={typemateriel}
                onChange={(event) => setTypemateriel(event.target.value)}
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
                    multiple
                  >
                    <MenuItem value="1" disabled>
                      Colonne
                    </MenuItem>
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
                    onClick={generatestocktypematerielPDF}
                  >
                    <Icon>picture_as_pdf</Icon>
                  </Button>
                </Grid>
              </Grid>
              <StyledTable>
                <TableHead>
                  <TableRow>
                    <TableCell key="depot" align="center" width="50%">
                      Depot
                    </TableCell>
                    <TableCell key="typemateriel" align="center" width="50%">
                      Type materiel
                    </TableCell>
                    <TableCell key="nombre" align="center" width="50%">
                      Quantite
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
                            <TableCell align="center">{row.typemateriel}</TableCell>
                            <TableCell align="center" style={{ fontWeight: 'bold' }}>
                              {coloredNumber(formatNumber(row.nombre))}
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

export default Stocktypematerieldepot;

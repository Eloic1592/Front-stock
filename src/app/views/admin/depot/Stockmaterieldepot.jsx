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
  Button,
  Icon
} from '@mui/material';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { SimpleCard, Breadcrumb } from 'app/components';
import { StyledTable, Container } from 'app/views/style/style';
import { baseUrl } from 'app/utils/constant';
import { formatNumber, coloredNumber } from 'app/utils/utils';
import { pdf as renderPdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import { useStockmaterielFunctions } from './stockmaterielfunction';
import PDFMouvementmateriel from './PDFMouvementmateriel';

const Stockmaterieldepot = () => {
  const columns = [
    { label: 'Depot', field: 'depot', align: 'center' },
    { label: 'total materiels', field: 'totalmateriels', align: 'center' },
    { label: 'materiel sutilises', field: 'materielsutilises', align: 'center' },
    { label: 'Utilisations en %', field: 'pourcentage_utilisation', align: 'center' }
  ];
  const [data, setData] = useState({ utilisationMateriels: [] });
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
  } = useStockmaterielFunctions(data);

  // Export PDF
  const generatemouvementmaterielPDF = async () => {
    const blob = await renderPdf(
      <PDFMouvementmateriel dataList={data.utilisationMateriels} columns={columns} />
    ).toBlob();
    saveAs(blob, 'Mouvement_materiel.pdf');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = baseUrl + '/materiel/utilisationmateriel';
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
        const newData = {
          typemateriels: responseData.typemateriels || [],
          utilisationMateriels: responseData.utilisationMateriels || []
        };
        setData(newData);
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
  }, [sortedData, initialDataFetched]);

  // Redirect
  const getlist = () => {
    window.location.replace('/admin/depot');
  };
  const getstockarticle = () => {
    window.location.replace('/admin/stockdepot');
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
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Grid container direction="row" spacing={2}>
            <Grid item>
              <Button variant="contained" color="primary" onClick={getlist}>
                Liste des depots
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="secondary" onClick={getstockarticle}>
                Stock des articles
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Box width="100%" overflow="auto" key="Box1">
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <SimpleCard title="Rechercher un  depot" sx={{ marginBottom: '16px' }}>
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
                <SimpleCard title="Utilisations des materiels ">
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
                        onClick={generatemouvementmaterielPDF}
                      >
                        <Icon>picture_as_pdf</Icon>
                      </Button>
                    </Grid>
                  </Grid>
                  <StyledTable>
                    <TableHead>
                      <TableRow>
                        <TableCell key="depot" align="center" width="25%">
                          Depot
                        </TableCell>
                        <TableCell key="totalmateriels" align="center" width="25%">
                          Total materiels
                        </TableCell>
                        <TableCell key="materielsutilises" align="center" width="25%">
                          Materiels utilises
                        </TableCell>
                        <TableCell key="pourcentage_utilisation" align="center" width="25%">
                          Utilisations (en %)
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
                                  {coloredNumber(formatNumber(row.totalmateriels))}
                                </TableCell>
                                <TableCell align="center" style={{ fontWeight: 'bold' }}>
                                  {coloredNumber(formatNumber(row.materielsutilises))}
                                </TableCell>
                                <TableCell align="center" style={{ fontWeight: 'bold' }}>
                                  {coloredNumber(formatNumber(row.pourcentage_utilisation))}
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
        </Grid>
      </Grid>
    </Container>
  );
};

export default Stockmaterieldepot;

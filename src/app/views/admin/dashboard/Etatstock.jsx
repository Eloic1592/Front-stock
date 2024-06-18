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
  MenuItem,
  IconButton
} from '@mui/material';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { SimpleCard, Breadcrumb } from 'app/components';
import { StyledTable, Container } from 'app/views/style/style';
import { baseUrl } from 'app/utils/constant';
import { pdf as renderPdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import { formatNumber } from 'app/utils/utils';
import PDFEtatstock from './PDFEtatstock';
import ComparisonChart from 'app/views/charts/echarts/ComparisonChart';
import { useTheme } from '@mui/material';

const Statnaturemouvement = () => {
  const theme = useTheme();
  const columns = [
    { label: 'Annee', field: 'annee', align: 'center' },
    { label: 'Mois', field: 'mois', align: 'center' },
    { label: 'Qt.abime', field: 'articleabime', align: 'center' },
    { label: 'Qt.bon etat', field: 'articlebonetat', align: 'center' },
    { label: 'Total prix abime', field: 'totalprixabime', align: 'center' },
    { label: 'Total prix bon etat', field: 'totalprixbonetat', align: 'center' },
    { label: 'Quantite totale', field: 'quantitetotale', align: 'center' }
  ];

  const [annee, setAnnee] = useState(new Date().getFullYear());
  const [data, setData] = useState({
    etatstockannee: [],
    pourcentagebonetatstock: 0,
    pourcentageabimestock: 0,
    depensemois: []
  });
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
  const filter = data.etatstockannee.filter((stat) => {
    const anneeMatch = annee === '' || (stat.annee && stat.annee === parseInt(annee, 10));

    return anneeMatch;
  });

  // Tri
  const sortedData = filter.sort((a, b) => {
    for (let column of sortColumn) {
      if (a[column] < b[column]) {
        return sortDirection === 'asc' ? -1 : 1;
      }
      if (a[column] > b[column]) {
        return sortDirection === 'asc' ? 1 : -1;
      }
    }
    return 0;
  });

  // Export PDF
  const generateutilisationmaterielPDF = async () => {
    const blob = await renderPdf(
      <PDFEtatstock dataList={data.etatstockannee} columns={columns} annee={annee} />
    ).toBlob();
    saveAs(blob, 'Etat de stock' + annee + '.pdf');
  };

  const handleSubmit = async () => {
    try {
      let dashboardParams = {
        annee: annee
      };
      let url = baseUrl + '/dashboard/etatstockannee';
      const response = await fetch(url, {
        crossDomain: true,
        method: 'POST',
        body: JSON.stringify(dashboardParams),
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
        etatstockannee: responseData.etatstockannee || [],
        pourcentageabimestock: responseData.pourcentageabimestock || 0,
        pourcentagebonetatstock: responseData.pourcentagebonetatstock || 0,
        depensemois: responseData.depensemois || []
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        let dashboardParams = {
          annee: annee
        };
        let url = baseUrl + '/dashboard/etatgeneraldesstock';
        const response = await fetch(url, {
          crossDomain: true,
          method: 'POST',
          body: JSON.stringify(dashboardParams),
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
          etatstockannee: responseData.etatstockannee || [],
          pourcentageabimestock: responseData.pourcentageabimestock || 0,
          pourcentagebonetatstock: responseData.pourcentagebonetatstock || 0,
          depensemois: responseData.depensemois || []
        };

        setData(newData);
        // console.log(data.depensemois);
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
  }, [annee, sortedData, initialDataFetched]);

  const getdetailetatstock = (an, mois) => {
    window.location.replace('/admin/detailetatstock/' + an + '/' + mois);
  };

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: 'Etat de stock', path: 'admin/etatstock' },
            { name: 'Etat de stock' }
          ]}
        />
      </Box>

      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Grid container direction="column" spacing={1}>
            <Grid item>
              <SimpleCard title="Rechercher l'annee" sx={{ marginBottom: '16px' }}>
                <Grid container spacing={1}>
                  <Grid item xs={10}>
                    <TextField
                      fullWidth
                      size="small"
                      type="text"
                      name="annee"
                      label="annee"
                      variant="outlined"
                      value={annee}
                      onChange={(event) => setAnnee(event.target.value)}
                      sx={{ mb: 3 }}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <Button color="primary" variant="contained" onClick={handleSubmit}>
                      Rechercher
                    </Button>
                  </Grid>
                </Grid>
              </SimpleCard>
            </Grid>
            <Grid item>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <SimpleCard title="TOTAL ARTICLES EN BON ETAT ">
                    <Typography
                      variant="body1"
                      style={{ fontWeight: 'bold', fontSize: '1.5rem', color: 'green' }}
                    >
                      {data.pourcentagebonetatstock} articles
                    </Typography>
                  </SimpleCard>
                </Grid>
                <Grid item xs={6}>
                  <SimpleCard title="TOTAL ARTICLES ABIMES ">
                    <Typography
                      variant="body1"
                      style={{ fontWeight: 'bold', fontSize: '1.5rem', color: 'red' }}
                    >
                      {data.pourcentageabimestock} articles
                    </Typography>
                  </SimpleCard>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <SimpleCard title="Dépenses sur les produits de l'année actuelle">
                <ComparisonChart
                  height="350px"
                  color={[theme.palette.primary.dark, theme.palette.primary.light]}
                  data={data.depensemois}
                />
              </SimpleCard>
            </Grid>
            <Grid item>
              <SimpleCard title="Etat des stock par mois">
                <Grid item container spacing={2}>
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
                      onClick={generateutilisationmaterielPDF}
                    >
                      <Icon>picture_as_pdf</Icon>
                    </Button>
                  </Grid>
                </Grid>

                <StyledTable>
                  <TableHead>
                    <TableRow>
                      <TableCell key="annee" align="center" width="17%">
                        Annee
                      </TableCell>
                      <TableCell key="mois" align="center" width="17%">
                        Mois
                      </TableCell>
                      <TableCell key="gain" align="center" width="17%">
                        Quantite totale
                      </TableCell>
                      <TableCell key="articleabime" align="center" width="17%">
                        Article abime(quantite)
                      </TableCell>
                      <TableCell key="totalprixabime" align="center" width="17%">
                        Total prix abime
                      </TableCell>
                      <TableCell key="articlebonetat" align="center" width="17%">
                        Article bon etat(quantite)
                      </TableCell>
                      <TableCell key="totalprixbonetat" align="center" width="17%">
                        Total prix bon etat
                      </TableCell>
                      <TableCell key="action" align="center" width="17%">
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
                              <TableCell align="center" width="17%">
                                {row.annee}
                              </TableCell>
                              <TableCell align="center" width="17%">
                                {row.moisnom}
                              </TableCell>
                              <TableCell align="center" width="17%" style={{ fontWeight: 'bold' }}>
                                {formatNumber(row.quantitetotale.toFixed(2))}
                              </TableCell>
                              <TableCell align="center" width="17%" style={{ fontWeight: 'bold' }}>
                                {formatNumber(row.articleabime.toFixed(2))}
                              </TableCell>
                              <TableCell
                                align="center"
                                width="17%"
                                style={{ fontWeight: 'bold', fontSize: '1rem', color: 'red' }}
                              >
                                {formatNumber(row.totalprixabime.toFixed(2))}
                              </TableCell>
                              <TableCell align="center" width="17%" style={{ fontWeight: 'bold' }}>
                                {formatNumber(row.articlebonetat.toFixed(2))}
                              </TableCell>
                              <TableCell
                                align="center"
                                width="17%"
                                style={{ fontWeight: 'bold', fontSize: '1rem', color: 'green' }}
                              >
                                {formatNumber(row.totalprixbonetat.toFixed(2))}
                              </TableCell>
                              <TableCell align="center" width="17%">
                                <IconButton
                                  className="button"
                                  variant="contained"
                                  aria-label="Edit"
                                  color="primary"
                                  onClick={() => getdetailetatstock(row.annee, row.mois)}
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
        </Grid>
      </Grid>
    </Container>
  );
};

export default Statnaturemouvement;

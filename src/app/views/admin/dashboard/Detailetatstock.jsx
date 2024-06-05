import {
  Box,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Grid,
  Icon,
  Button,
  Snackbar,
  Alert,
  Select,
  MenuItem,
  TextField
} from '@mui/material';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { SimpleCard, Breadcrumb } from 'app/components';
import { StyledTable, Container } from 'app/views/style/style';
import { baseUrl } from 'app/utils/constant';
import { formatNumber } from 'app/utils/utils';
import { useParams } from 'react-router-dom';

const Detailetatstock = () => {
  const mois = useParams();
  const annee = useParams();

  const columns = [
    { label: 'Type materiel', field: 'typemateriel', align: 'center' },
    { label: 'Annee', field: 'annee', align: 'center' },
    { label: 'Mois', field: 'mois', align: 'center' },
    { label: 'Qt.abime', field: 'articleabime', align: 'center' },
    { label: 'Qt.bon etat', field: 'articlebonetat', align: 'center' },
    { label: 'Total prix abime', field: 'totalprixabime', align: 'center' },
    { label: 'Total prix bon etat', field: 'totalprixbonetat', align: 'center' },
    { label: 'Quantite totale', field: 'quantitetotale', align: 'center' }
  ];
  const [codetypemateriel, setCodetypemateriel] = useState('');
  const [data, setData] = useState({
    etatdetailstockannee: []
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
  const filter = data.etatdetailstockannee.filter((stat) => {
    const codetypematerielmatch =
      !codetypemateriel ||
      stat.val.toLowerCase().includes(codetypemateriel.toLowerCase()) ||
      !codetypemateriel ||
      stat.typemateriel.toLowerCase().includes(codetypemateriel.toLowerCase());
    return codetypematerielmatch;
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
  //   const generateutilisationmaterielPDF = async () => {
  //     const blob = await renderPdf(
  //       <PDFDetailetatstock dataList={data.statnaturemouvements} columns={columns} />
  //     ).toBlob();
  //     saveAs(blob, 'Detail etat de stock.pdf');
  //   };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let dashboardParams = {
          annee: annee.annee,
          mois: mois.mois
        };
        let url = baseUrl + '/dashboard/etatdetailstockannee';
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
          etatdetailstockannee: responseData.etatdetailstockannee || []
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
  }, [annee.annee, mois.mois, sortedData, initialDataFetched]);

  //   Bouton retour
  const redirect = () => {
    window.location.replace('/admin/etatstock');
  };

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: 'Detail etat de stock', path: '/admin/etatstock' },
            { name: 'Detail etat de stock' }
          ]}
        />
      </Box>

      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Grid container direction="row" spacing={2}>
            <Grid item>
              <Button variant="contained" color="inherit" onClick={redirect}>
                <Icon>arrow_backward</Icon>
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <SimpleCard title="Rechercher un type de materiel" sx={{ marginBottom: '16px' }}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      size="small"
                      type="text"
                      name="val"
                      label="Type code type materiel"
                      variant="outlined"
                      value={codetypemateriel}
                      onChange={(event) => setCodetypemateriel(event.target.value)}
                      sx={{ mb: 3 }}
                    />
                  </Grid>
                </Grid>
              </SimpleCard>
            </Grid>
            <Grid item>
              <SimpleCard title="Detail etat de stock">
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
                  {/* <Grid item xs={2}>
                    <Button
                      className="button"
                      variant="contained"
                      aria-label="Edit"
                      color="secondary"
                      //   onClick={generateutilisationmaterielPDF}
                    >
                      <Icon>picture_as_pdf</Icon>
                    </Button>
                  </Grid> */}
                </Grid>
                <StyledTable>
                  <TableHead>
                    <TableRow>
                      <TableCell key="typematriel" align="center" width="17%">
                        Type materiel - Code
                      </TableCell>
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
                                {row.typemateriel} - {row.val}
                              </TableCell>
                              <TableCell align="center" width="17%">
                                {row.annee}
                              </TableCell>
                              <TableCell align="center" width="17%">
                                {row.moisnom}
                              </TableCell>
                              <TableCell align="center" width="17%">
                                {formatNumber(row.quantitetotale)}
                              </TableCell>
                              <TableCell align="center" width="17%">
                                {formatNumber(row.articleabime)}
                              </TableCell>
                              <TableCell
                                align="center"
                                width="17%"
                                style={{ fontWeight: 'bold', fontSize: '1rem', color: 'red' }}
                              >
                                {formatNumber(row.totalprixabime)}
                              </TableCell>
                              <TableCell align="center" width="17%">
                                {formatNumber(row.articlebonetat)}
                              </TableCell>
                              <TableCell
                                align="center"
                                width="17%"
                                style={{ fontWeight: 'bold', fontSize: '1rem', color: 'green' }}
                              >
                                {formatNumber(row.totalprixbonetat)}
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

export default Detailetatstock;

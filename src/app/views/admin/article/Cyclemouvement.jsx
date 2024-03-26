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
import { coloredNumber } from 'app/utils/utils';
import { useParams } from 'react-router-dom';

const Cyclemouvement = () => {
  const iddepot = useParams();

  const columns = [
    { label: 'Marque', field: 'marque', align: 'center' },
    { label: 'Modele', field: 'modele', align: 'center' },
    { label: 'taux_rupture_stock', field: 'taux_rupture_stock', align: 'center' }
  ];
  const [filtre, setFiltre] = useState('');
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
  const filter = data.filter(
    (Item) =>
      (Item.marque && Item.marque.toLowerCase().includes(filtre.toLowerCase())) ||
      (Item.modele && Item.modele.toLowerCase().includes(filtre.toLowerCase()))
  );

  // Tri
  const sortedData = filter.sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) {
      return sortDirection === 'asc' ? -1 : 1;
    }
    if (a[sortColumn] > b[sortColumn]) {
      return sortDirection === 'asc' ? 1 : -1;
    }
    return 0;
  });

  // Export PDF
  //   const generateutilisationmaterielPDF = async () => {
  //     const blob = await renderPdf(
  //       <PDFStatnaturemouvement dataList={data.cyclemouvements} columns={columns} />
  //     ).toBlob();
  //     saveAs(blob, 'Benefice par mouvement.pdf');
  //   };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = baseUrl + '/article/rupturearticle';
        const response = await fetch(url, {
          crossDomain: true,
          method: 'POST',
          body: JSON.stringify(),
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
  }, [sortedData, initialDataFetched]);

  //   Bouton retour
  const redirect = () => {
    window.location.replace('/admin/article');
  };

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: 'Stock rupture', path: 'admin/stocktypemateriel' },
            { name: 'Stock rupture' }
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
              <SimpleCard title="Rechercher un mouvement" sx={{ marginBottom: '16px' }}>
                <TextField
                  fullWidth
                  size="small"
                  type="text"
                  name="materielfiltre"
                  label="Filtre"
                  variant="outlined"
                  value={filtre}
                  onChange={(event) => setFiltre(event.target.value)}
                  sx={{ mb: 3 }}
                />
              </SimpleCard>
            </Grid>
            <Grid item>
              <SimpleCard title="Benefice par mouvement">
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
                </Grid>
                <StyledTable>
                  <TableHead>
                    <TableRow>
                      <TableCell key="annee" align="center" width="33%">
                        Marque
                      </TableCell>
                      <TableCell key="mois" align="center" width="33%">
                        Modele
                      </TableCell>
                      <TableCell key="entree" align="center" width="33%">
                        Taux rupture en (%)
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
                                {row.marque}
                              </TableCell>
                              <TableCell align="center" width="17%">
                                {row.modele}
                              </TableCell>
                              <TableCell align="center" width="17%">
                                {coloredNumber(row.taux_rupture_stock)}
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

export default Cyclemouvement;

import {
  Box,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Icon,
  Button,
  Grid,
  Snackbar,
  Alert,
  Select,
  MenuItem,
  TextField
} from '@mui/material';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { SimpleCard } from 'app/components';
import { StyledTable } from 'app/views/style/style';
import { baseUrl } from 'app/utils/constant';
import { Container } from 'app/views/style/style';
import { converttodate, formatDate, formatNumber } from 'app/utils/utils';
import { useParams } from 'react-router-dom';

const Detailstockarticle = ({ rowsPerPageOptions = [10, 25, 50, 100, 200] }) => {
  const idarticle = useParams();
  const handleAlertClose = () => setMessage({ open: false });
  const [initialDataFetched, setInitialDataFetched] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortColumn, setSortColumn] = useState(['1']);
  const [sortDirection, setSortDirection] = useState('asc');
  const [dateinventaire, setDateinventaire] = useState('');
  //
  const columns = [
    { label: 'ID article', field: 'idarticle', align: 'center' },
    { label: 'Modele', field: 'modele', align: 'center' },
    { label: 'Marque', field: 'marque', align: 'center' },
    { label: 'Code article', field: 'codearticle', align: 'center' },
    { label: 'Type materiel', field: 'typemateriel', align: 'center' },
    { label: 'Quantite estimee', field: 'quantitereel', align: 'center' },
    { label: 'Quantite abimee', field: 'articleabime', align: 'center' },
    { label: 'Quantite en bon etat', field: 'articlebonetat', align: 'center' }
  ];

  const [data, setData] = useState({
    stockarticles: [],
    sommebonetat: 0,
    sommeabime: 0,
    stockarticleinventaires: []
  });
  const [message, setMessage] = useState({
    text: 'Information enregistree',
    severity: 'success',
    open: false
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        let articleParams = {
          idarticle: idarticle.idarticle
        };
        let url = baseUrl + '/article/detailstockarticle';
        const response = await fetch(url, {
          crossDomain: true,
          method: 'POST',
          body: JSON.stringify(articleParams),
          headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`);
        }

        const responseData = await response.json();
        const newData = {
          stockarticles: responseData.stockarticles || [],
          sommebonetat: responseData.sommebonetat || 0,
          sommeabime: responseData.sommeabime || 0,
          stockarticleinventaires: responseData.stockarticleinventaires || []
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
  }, [idarticle.idarticle, initialDataFetched]);
  // Redirect
  const getlist = () => {
    window.location.replace('/admin/article');
  };

  //   Pagination
  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Filtre
  const filter = data.stockarticleinventaires.filter((stat) => {
    const datematch =
      dateinventaire === '' ||
      new Date(new Date(formatDate(stat.dateinventaire)).getTime()).getTime() ===
        new Date(dateinventaire).getTime();

    return datematch;
  });

  // Tri
  const handleSelectColumn = (event) => {
    setSortColumn(event.target.value);
  };

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

  return (
    <Container>
      <Box width="100%" overflow="auto">
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Button variant="contained" color="inherit" onClick={getlist}>
              <Icon>arrow_backward</Icon>
            </Button>
          </Grid>
          <Grid item>
            <Typography variant="h6" gutterBottom textAlign="center">
              Stock réel de l'article
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <SimpleCard title="Total articles en bon etat">
                  <Typography
                    variant="body1"
                    style={{ fontWeight: 'bold', fontSize: '1.5rem', color: 'green' }}
                  >
                    {data.sommebonetat} en bon état
                  </Typography>
                </SimpleCard>
              </Grid>
              <Grid item xs={6}>
                <SimpleCard title="Total articles abimes">
                  <Typography
                    variant="body1"
                    style={{ fontWeight: 'bold', fontSize: '1.5rem', color: 'red' }}
                  >
                    {data.sommeabime} abimés
                  </Typography>
                </SimpleCard>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <SimpleCard title="STOCK REEL DE CET ARICLE">
              <StyledTable>
                <TableHead>
                  {/* Listage de Donnees */}
                  <TableRow>
                    <TableCell key="idreception" align="center" width="25%">
                      CODE ARTICLE
                    </TableCell>
                    <TableCell key="marque" align="center" width="25%">
                      MARQUE
                    </TableCell>
                    <TableCell key="modele" align="center" width="25%">
                      MODELE
                    </TableCell>
                    <TableCell key="typemateriel" align="center" width="25%">
                      TYPE MATERIEL
                    </TableCell>
                    <TableCell key="quantitestock" align="center" width="25%">
                      QUANTITE EN STOCK
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* Donnees du tableau */}
                  {data.stockarticles && data.stockarticles.length > 0 ? (
                    data.stockarticles
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row, index) => (
                        <TableRow key={index}>
                          <>
                            <TableCell align="center" width="25%">
                              {row.codearticle}
                            </TableCell>
                            <TableCell align="center" width="25%">
                              {row.marque}
                            </TableCell>
                            <TableCell align="center" width="25%">
                              {row.modele}
                            </TableCell>
                            <TableCell align="center" width="25%">
                              {row.typemateriel}
                            </TableCell>
                            <TableCell
                              align="center"
                              width="25%"
                              style={{ fontWeight: 'bold', fontSize: '1rem' }}
                            >
                              {formatNumber(row.quantitestock.toFixed(2))}
                            </TableCell>
                          </>
                        </TableRow>
                      ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={12}>
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
                    count={data.stockarticles.length}
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
          <Grid item>
            <Typography variant="h6" gutterBottom textAlign="center">
              Stock via inventaire
            </Typography>
          </Grid>
          <Grid item>
            <SimpleCard title="Rechercher un inventaire">
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    size="small"
                    type="date"
                    name="annee"
                    label="date de l'inventaire"
                    variant="outlined"
                    value={dateinventaire}
                    onChange={(event) => setDateinventaire(event.target.value)}
                    sx={{ mb: 3 }}
                  />
                </Grid>
              </Grid>
            </SimpleCard>
          </Grid>
          <Grid item>
            <SimpleCard title="STOCK DE CET ARTICLE VIA INVENTAIRE">
              {/* Tri de tables */}
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
              </Grid>
              <StyledTable>
                <TableHead>
                  {/* Listage de Donnees */}
                  <TableRow>
                    <TableCell key="idreception" align="center" width="25%">
                      CODE ARTICLE
                    </TableCell>
                    <TableCell key="marque" align="center" width="25%">
                      MARQUE
                    </TableCell>
                    <TableCell key="modele" align="center" width="25%">
                      MODELE
                    </TableCell>
                    <TableCell key="typemateriel" align="center" width="25%">
                      TTYPE MATERIEL
                    </TableCell>
                    <TableCell key="dateinventaire" align="center" width="25%">
                      DATE DE L'INVENTAIRE
                    </TableCell>
                    <TableCell key="dateinventaire" align="center" width="25%">
                      QUANTITE ESTIMEE
                    </TableCell>
                    <TableCell key="articlebonetat" align="center" width="25%">
                      NOMBRE ARTICLE EN BON ETAT
                    </TableCell>
                    <TableCell key="articleabime" align="center" width="25%">
                      NOMBRE ARTICLE ABIME
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
                            <TableCell align="center" width="25%">
                              {row.codearticle}
                            </TableCell>
                            <TableCell align="center" width="25%">
                              {row.marque}
                            </TableCell>
                            <TableCell align="center" width="25%">
                              {row.modele}
                            </TableCell>
                            <TableCell align="center" width="25%">
                              {row.typemateriel}
                            </TableCell>
                            <TableCell align="center" width="25%">
                              {converttodate(row.dateinventaire)}
                            </TableCell>
                            <TableCell
                              align="center"
                              width="25%"
                              style={{ fontWeight: 'bold', fontSize: '1rem' }}
                            >
                              {formatNumber(row.quantitereel.toFixed(2))}
                            </TableCell>
                            <TableCell
                              align="center"
                              width="25%"
                              style={{ fontWeight: 'bold', fontSize: '1rem', color: 'green' }}
                            >
                              {formatNumber(row.articlebonetat)} - EN BON ETAT(S)
                            </TableCell>
                            <TableCell
                              align="center"
                              width="25%"
                              style={{ fontWeight: 'bold', fontSize: '1rem', color: 'red' }}
                            >
                              {formatNumber(row.articleabime)} - ABIME(S)
                            </TableCell>
                          </>
                        </TableRow>
                      ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={12}>
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

export default Detailstockarticle;

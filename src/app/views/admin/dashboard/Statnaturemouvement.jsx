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
import { coloredNumber, months } from 'app/utils/utils';
import { useParams } from 'react-router-dom';
import { pdf as renderPdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import PDFStatnaturemouvement from './PDFStatnaturemouvement';
import { Link } from 'react-router-dom';

const Statnaturemouvement = () => {
  const iddepot = useParams();

  const columns = [
    { label: 'Nature', field: 'naturemouvement', align: 'center' },
    { label: 'Annee', field: 'annee', align: 'center' },
    { label: 'Mois', field: 'mois', align: 'center' },
    { label: 'Gain', field: 'gain', align: 'center' },
    { label: 'Depense', field: 'depense', align: 'center' },
    { label: 'Benefice', field: 'depense', align: 'center' }
  ];

  const [annee, setAnnee] = useState('');
  const [mois, setMois] = useState('0');
  const [data, setData] = useState({
    statnaturemouvements: [],
    totalentree: 0,
    totalsortie: 0,
    getcurrentsommearticleentree: {
      id: 0,
      total: 0,
      mois: 0,
      annee: 0,
      nom_mois: ''
    },
    getcurrentsommearticlesortie: {
      id: 0,
      total: 0,
      mois: 0,
      annee: 0,
      nom_mois: ''
    }
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
  const filter = data.statnaturemouvements.filter((stat) => {
    const anneeMatch = annee === '' || (stat.annee && stat.annee === parseInt(annee, 10));
    const moisMatch = mois === '0' || (stat.mois && stat.mois === mois);

    return moisMatch && anneeMatch;
  });

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
  const generateutilisationmaterielPDF = async () => {
    const blob = await renderPdf(
      <PDFStatnaturemouvement dataList={data.statnaturemouvements} columns={columns} />
    ).toBlob();
    saveAs(blob, 'Benefice par mouvement.pdf');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = baseUrl + '/naturemouvement/statnaturemouvement';
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
        const newData = {
          statnaturemouvements: responseData.statnaturemouvements || [],
          getcurrentsommearticleentree: responseData.getcurrentsommearticleentree || null,
          getcurrentsommearticlesortie: responseData.getcurrentsommearticlesortie || null,
          totalentree: responseData.totalentree || 0,
          totalsortie: responseData.totalsortie || 0
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
  }, [iddepot.iddepot, mois, annee, sortedData, initialDataFetched]);

  //   Bouton retour
  const redirect = () => {
    window.location.replace('/admin/typemouvement');
  };
  const getstattypemateriel = (idnaturemouvement, mois, an) => {
    window.location.replace('/admin/stattypemateriel/' + idnaturemouvement + '/' + mois + '/' + an);
  };

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: 'Benefice par nature', path: 'admin/stocktypemateriel' },
            { name: 'Benefice par nature' }
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
          <Grid container direction="column" spacing={1}>
            <Grid item>
              <SimpleCard title="Rechercher un mouvement" sx={{ marginBottom: '16px' }}>
                <Grid container spacing={1}>
                  <Grid item xs={4}>
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
                  <Grid item xs={4}>
                    <Select
                      fullWidth
                      labelId="select-label"
                      value={mois}
                      onChange={(event) => setMois(event.target.value)}
                      size="small"
                      sx={{ mb: 3 }}
                    >
                      <MenuItem key="0" value="0">
                        Tous les mois
                      </MenuItem>
                      {months.map((row, index) => (
                        <MenuItem key={index} value={index + 1}>
                          {row}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                  <Grid item xs={4}>
                    <Button color="primary" variant="contained">
                      Rechercher
                    </Button>
                  </Grid>
                </Grid>
              </SimpleCard>
            </Grid>
            <Grid item>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <SimpleCard title="Total articles en entree pour ce mois">
                    <Typography
                      variant="body1"
                      style={{ fontWeight: 'bold', fontSize: '1.5rem', color: 'green' }}
                    >
                      <Link
                        to="/admin/mouvementphysique"
                        style={{ textDecoration: 'none', color: 'inherit' }}
                      >
                        {data.totalentree} articles
                      </Link>
                    </Typography>
                  </SimpleCard>
                </Grid>
                <Grid item xs={6}>
                  <SimpleCard title="Total articles en entree pour ce mois">
                    <Typography
                      variant="body1"
                      style={{ fontWeight: 'bold', fontSize: '1.5rem', color: 'red' }}
                    >
                      <Link
                        to="/admin/mouvementphysique"
                        style={{ textDecoration: 'none', color: 'inherit' }}
                      >
                        {data.totalsortie * -1} articles
                      </Link>
                    </Typography>
                  </SimpleCard>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <SimpleCard title="Benefice par mouvement de la periode actuelle">
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
                      onClick={generateutilisationmaterielPDF}
                    >
                      <Icon>picture_as_pdf</Icon>
                    </Button>
                  </Grid>
                </Grid>
                <StyledTable>
                  <TableHead>
                    <TableRow>
                      <TableCell key="naturemouvement" align="center" width="17%">
                        Nature
                      </TableCell>
                      <TableCell key="annee" align="center" width="17%">
                        Annee
                      </TableCell>
                      <TableCell key="mois" align="center" width="17%">
                        Mois
                      </TableCell>
                      <TableCell key="gain" align="center" width="17%">
                        Gain
                      </TableCell>
                      <TableCell key="depense" align="center" width="17%">
                        Depense
                      </TableCell>
                      <TableCell key="benefice" align="center" width="17%">
                        Benefice
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
                                {row.naturemouvement}
                              </TableCell>
                              <TableCell align="center" width="17%">
                                {row.annee}
                              </TableCell>
                              <TableCell align="center" width="17%">
                                {row.mois_nom}
                              </TableCell>
                              <TableCell align="center" width="17%">
                                {coloredNumber(row.gain)}
                              </TableCell>
                              <TableCell align="center" width="17%">
                                {coloredNumber(row.depense)}
                              </TableCell>
                              <TableCell align="center" width="17%">
                                {coloredNumber(row.benefice)}
                              </TableCell>
                              <TableCell align="center" width="17%">
                                <IconButton
                                  className="button"
                                  variant="contained"
                                  aria-label="Edit"
                                  color="primary"
                                  onClick={() =>
                                    getstattypemateriel(row.idnaturemouvement, row.mois, row.annee)
                                  }
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

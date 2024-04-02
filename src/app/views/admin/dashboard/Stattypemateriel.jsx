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
// import { pdf as renderPdf } from '@react-pdf/renderer';
// import { saveAs } from 'file-saver';

const Stattypemateriel = () => {
  const idnaturemouvement = useParams();
  console.log(idnaturemouvement.idnaturemouvement);

  const columns = [
    { label: 'typemateriel', field: 'typemateriel', align: 'center' },
    { label: 'Mois', field: 'mois', align: 'center' },
    { label: 'Gain', field: 'gain', align: 'center' },
    { label: 'Depense', field: 'depense', align: 'center' }
  ];
  const [filtre, setFiltre] = useState('');
  const [data, setData] = useState({
    stat_typemateriels: []
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
  const filter = data.stat_typemateriels.filter(
    (stat) =>
      (stat.mois && stat.mois.toLowerCase().includes(filtre.toLowerCase())) ||
      (stat.typmateriel && stat.typmateriel.toLowerCase().includes(filtre.toLowerCase()))
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
  //       <PDFStattypemateriel dataList={data.statnaturemouvements} columns={columns} />
  //     ).toBlob();
  //     saveAs(blob, 'Benefice par mouvement.pdf');
  //   };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let typematerielParams = {
          idnaturemouvement: idnaturemouvement.idnaturemouvement
        };
        let url = baseUrl + '/typemateriel/getstattypemateriel';
        const response = await fetch(url, {
          crossDomain: true,
          method: 'POST',
          body: JSON.stringify(typematerielParams),
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
          stat_typemateriels: responseData.stat_typemateriels || []
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
  }, [idnaturemouvement.idnaturemouvement, sortedData, initialDataFetched]);

  //   Bouton retour
  const redirect = () => {
    window.location.replace('/admin/stattypemouvement');
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
                  <Grid item xs={2}>
                    <Button
                      className="button"
                      variant="contained"
                      aria-label="Edit"
                      color="secondary"
                      //   onClick={generateutilisationmaterielPDF}
                    >
                      <Icon>picture_as_pdf</Icon>
                    </Button>
                  </Grid>
                </Grid>
                <StyledTable>
                  <TableHead>
                    <TableRow>
                      <TableCell key="typemateriel" align="center" width="25%">
                        Type materiel
                      </TableCell>
                      <TableCell key="mois" align="center" width="25%">
                        Mois
                      </TableCell>
                      <TableCell key="gain" align="center" width="25%">
                        Gain en (Ariary)
                      </TableCell>
                      <TableCell key="depense" align="center" width="25%">
                        Depense en (Ariary)
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
                                {row.typemateriel}
                              </TableCell>
                              <TableCell align="center" width="25%">
                                {row.mois}
                              </TableCell>
                              <TableCell align="center" width="25%">
                                {coloredNumber(row.gain)}
                              </TableCell>
                              <TableCell align="center" width="25%">
                                {coloredNumber(row.depense)}
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

export default Stattypemateriel;

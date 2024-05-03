import {
  Box,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Grid,
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
import { coloredNumber, months } from 'app/utils/utils';

const Cyclenaturemouvement = () => {
  const columns = [
    { label: 'Annee', field: 'annee', align: 'center' },
    { label: 'Mois', field: 'mois', align: 'center' },
    { label: 'Sortie', field: 'sortie', align: 'center' },
    { label: 'Entree', field: 'entree', align: 'center' },
    { label: 'Nature du mouvement', field: 'naturemouvement', align: 'center' }
  ];

  const [annee, setAnnee] = useState('');
  const [mois, setMois] = useState('0');
  const [naturemouvement, setNaturemouvement] = useState('0');
  const [data, setData] = useState({ cyclemouvements: [], naturemouvements: [] });
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
  const filter = data.cyclemouvements.filter((stat) => {
    const anneeMatch = annee === '' || (stat.annee && stat.annee === parseInt(annee, 10));
    const moisMatch = mois === '0' || (stat.mois && stat.mois === mois);
    const naturematch =
      naturemouvement === '0' ||
      (stat.idnaturemouvement && stat.idnaturemouvement === naturemouvement);

    return anneeMatch && moisMatch && naturematch;
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = baseUrl + '/naturemouvement/cyclenaturemouvement';
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
          cyclemouvements: responseData.cyclemouvements || [],
          naturemouvements: responseData.naturemouvements || []
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

  //   Bouton retour
  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: 'Entree et sortie par nature', path: 'admin/cyclemouvement' },
            { name: 'Entree et sortie par nature' }
          ]}
        />
      </Box>

      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Grid container direction="column" spacing={1}>
            <Grid item>
              <SimpleCard title="Rechercher un mouvement">
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
                    <Select
                      fullWidth
                      labelId="select-label"
                      value={naturemouvement}
                      onChange={(event) => setNaturemouvement(event.target.value)}
                      size="small"
                      sx={{ mb: 3 }}
                    >
                      <MenuItem key="0" value="0">
                        Tous les mouvements
                      </MenuItem>
                      {data.naturemouvements.map((row) => (
                        <MenuItem key={row.idnaturemouvement} value={row.idnaturemouvement}>
                          {row.naturemouvement}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                </Grid>
              </SimpleCard>
            </Grid>
            <Grid item>
              <SimpleCard title="Recherche un mouvement">
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
                      <TableCell key="annee" align="center" width="20%">
                        Annee
                      </TableCell>
                      <TableCell key="mois" align="center" width="20%">
                        Mois
                      </TableCell>
                      <TableCell key="naturemouvement" align="center" width="20%">
                        Nature
                      </TableCell>
                      <TableCell key="entree" align="center" width="20%">
                        Entree
                      </TableCell>
                      <TableCell key="sortie" align="center" width="20%">
                        Sortie
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
                              <TableCell align="center" width="20%">
                                {row.annee}
                              </TableCell>
                              <TableCell align="center" width="20%">
                                {row.mois_nom}
                              </TableCell>
                              <TableCell align="center" width="20%">
                                {row.naturemouvement}
                              </TableCell>
                              <TableCell align="center" width="20%">
                                {coloredNumber(row.entree)}
                              </TableCell>
                              <TableCell align="center" width="20%">
                                {coloredNumber(row.sortie)}
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

export default Cyclenaturemouvement;

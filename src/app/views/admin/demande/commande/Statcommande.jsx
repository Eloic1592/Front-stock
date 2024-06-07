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
import { formatNumber } from 'app/utils/utils';

const Statcommande = () => {
  const columns = [
    { label: 'Annee', field: 'annee', align: 'center' },
    { label: 'Mois', field: 'mois', align: 'center' },
    { label: 'totalcommandes', field: 'totalcommandes', align: 'center' }
  ];

  const [annee, setAnnee] = useState(new Date().getFullYear());
  const [data, setData] = useState({
    totalcommandeannees: []
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
    setRowsPerPage(event.target.value);
    setPage(0);
  };
  const handleSelectColumn = (event) => {
    setSortColumn(event.target.value);
  };

  // Filtre
  const filter = data.totalcommandeannees.filter((stat) => {
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

  const handleSubmit = async () => {
    try {
      let commandeParams = {
        annee: annee
      };
      let url = baseUrl + '/commande/totalcommandeannee';
      const response = await fetch(url, {
        crossDomain: true,
        method: 'POST',
        body: JSON.stringify(commandeParams),
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
        totalcommandeannees: responseData.totalcommandeannees || []
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
        let url = baseUrl + '/commande/totalcommandeannee';
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
          totalcommandeannees: responseData.totalcommandeannees || []
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
  }, [annee, sortedData, initialDataFetched]);

  //   Bouton retour
  const redirect = () => {
    window.location.replace('/admin/commande');
  };

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: 'Etats des commandes', path: 'admin/statcommande' },
            { name: 'Etats des commandes' }
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
              <Grid container direction="row" spacing={1}>
                <Grid item xs={6}>
                  <SimpleCard title="Bilan des commandes">
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
                        <TableRow>
                          <TableCell key="annee" align="center" width="17%">
                            Annee
                          </TableCell>
                          <TableCell key="mois" align="center" width="17%">
                            Mois
                          </TableCell>
                          <TableCell key="totalcommandes" align="center" width="17%">
                            Total commandes effectues
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
                                  <TableCell align="center" width="17%">
                                    {formatNumber(row.totalcommandes)}
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
                <Grid item container xs={6} spacing={6}>
                  <Grid item xs={12}>
                    <SimpleCard title="ARTICLES LE PLUS COMMANDE DE L'ANNEE">
                      <Typography
                        variant="body1"
                        style={{ fontWeight: 'bold', fontSize: '1.0rem', color: 'green' }}
                      >
                        NEC-NEC Est le produit le plus commande de l'annee
                        <Typography
                          variant="body1"
                          style={{ fontWeight: 'bold', fontSize: '1.5rem', color: 'green' }}
                        >
                          1 ER | 5012 UNITES | 70% des commandes
                        </Typography>
                        <hr />
                        <Typography
                          variant="body1"
                          style={{ fontWeight: 'bold', fontSize: '1.2rem', color: 'red' }}
                        >
                          2 E |2000 UNITES | 25% des commandes
                        </Typography>
                        <hr />
                        <Typography
                          variant="body1"
                          style={{ fontWeight: 'bold', fontSize: '1.2rem', color: 'grey' }}
                        >
                          3 E |1000 UNITES | 3% des commandes
                        </Typography>
                      </Typography>
                    </SimpleCard>
                  </Grid>
                  <Grid item xs={12}>
                    <SimpleCard title="COMMANDES MOYENNES PAR ANNEE">
                      <Typography
                        variant="body1"
                        style={{ fontWeight: 'bold', fontSize: '1.0rem', color: 'green' }}
                      >
                        NEC-NEC Est le produit le plus commande de l'annee
                        <Typography
                          variant="body1"
                          style={{ fontWeight: 'bold', fontSize: '1.5rem', color: 'green' }}
                        >
                          3100 UNITES | 65% des commandes
                        </Typography>
                        <hr />
                        <Typography
                          variant="body1"
                          style={{ fontWeight: 'bold', fontSize: '1.2rem', color: 'red' }}
                        >
                          2 E |2000 UNITES | 25% des commandes
                        </Typography>
                        <hr />
                        <Typography
                          variant="body1"
                          style={{ fontWeight: 'bold', fontSize: '1.2rem', color: 'grey' }}
                        >
                          3 E |300 UNITES | 5% des commandes
                        </Typography>
                      </Typography>
                    </SimpleCard>
                  </Grid>
                </Grid>
              </Grid>
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

export default Statcommande;
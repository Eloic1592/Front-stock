import {
  Box,
  Button,
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
  Grid
} from '@mui/material';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { SimpleCard, Breadcrumb } from 'app/components';
import { StyledTable } from 'app/views/style/style';
import { Container } from 'app/views/style/style';
import { baseUrl } from 'app/utils/constant';
import { formatNumber, coloredNumber } from 'app/utils/utils';
import { useStockfunctions } from 'app/views/admin/article/stockfunction';
import Detailreapprovisionnement from './Detailreapprovisionnement';

const Reapprovisionnementstock = () => {
  // Colonne
  const columns = [
    { label: 'ID article', field: 'idarticle', align: 'center' },
    { label: 'modele', field: 'modele', align: 'center' },
    { label: 'marque', field: 'marque', align: 'center' },
    { label: 'code article', field: 'codearticle', align: 'center' },
    { label: 'type materiel', field: 'typemateriel', align: 'center' },
    { label: 'quantite', field: 'quantite', align: 'center' },
    { label: 'etat', field: 'etat', align: 'center' }
  ];
  const [data, setData] = useState({
    stockarticles: []
  });
  const [reapprovisionnement, setReapprovisionnement] = useState([]);
  const [initialDataFetched, setInitialDataFetched] = useState(false);
  const [message, setMessage] = useState({
    text: 'Information enregistree',
    severity: 'success',
    open: false
  });

  const handleAlertClose = () => setMessage({ open: false });
  const [opendatagrid, setOpendatagrid] = useState(false);
  const handleClickOpendatagrid = () => setOpendatagrid(true);
  const handleCloseOpendatagrid = () => {
    setOpendatagrid(false);
  };
  const {
    sortDirection,
    page,
    rowsPerPage,
    setSortDirection,
    handleChangePage,
    sortColumn,
    handleChangeRowsPerPage,
    handleSelectColumn,
    sortedData,
    setMarque,
    marque,
    typemateriel,
    setTypemateriel
  } = useStockfunctions(data);

  const handleSubmit = async () => {
    try {
      let url = baseUrl + '/article/reapprovisionnement';
      const response = await fetch(url, {
        crossDomain: true,
        method: 'POST',
        body: JSON.stringify({}),
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }

      const responseData = await response.json();
      setReapprovisionnement(responseData);
      handleClickOpendatagrid();
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
        let url = baseUrl + '/article/stockarticle';
        const response = await fetch(url, {
          crossDomain: true,
          method: 'POST',
          body: JSON.stringify({}),
          headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`);
        }

        const responseData = await response.json();
        const newData = {
          stockarticles: responseData.stockarticles || []
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
    window.location.replace('/admin/article');
  };

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: 'Stock article', path: 'admin/stocksarticle' },
            { name: 'Stock par article' }
          ]}
        />
      </Box>
      <Grid container direction="row" spacing={2}>
        <Grid item>
          <Grid container direction="row" spacing={2}>
            <Grid item>
              <Button variant="contained" onClick={getlist} color="primary">
                Liste des articles
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="secondary" onClick={handleSubmit}>
                Voir le réapprovisionnement en stock
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Detailreapprovisionnement
            data={reapprovisionnement}
            state={opendatagrid}
            handleClose={handleCloseOpendatagrid}
          />
        </Grid>
        <Grid item>
          <Box width="100%" overflow="auto" key="Box1">
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <SimpleCard title="Rechercher un article" sx={{ marginBottom: '16px' }}>
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        size="small"
                        type="text"
                        name="marque"
                        label="Marque,modele ou code article"
                        variant="outlined"
                        value={marque}
                        onChange={(event) => setMarque(event.target.value)}
                        sx={{ mb: 3 }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        size="small"
                        type="text"
                        name="marque"
                        label="Type de materiel ou code type materiel"
                        variant="outlined"
                        value={typemateriel}
                        onChange={(event) => setTypemateriel(event.target.value)}
                        sx={{ mb: 3 }}
                      />
                    </Grid>
                  </Grid>
                </SimpleCard>
              </Grid>

              <Grid item>
                <SimpleCard title="Stock actuels des articles">
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
                        {columns.map((column, index) => (
                          <MenuItem key={index} value={column.field}>
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
                        <TableCell key="idarticle" width="10%">
                          idarticle
                        </TableCell>
                        <TableCell key="marque" width="15%" align="center">
                          marque
                        </TableCell>
                        <TableCell key="modele" width="15%" align="center">
                          modele
                        </TableCell>
                        <TableCell key="codearticle" width="15%" align="center">
                          code article
                        </TableCell>
                        <TableCell key="typemateriel" width="15%" align="center">
                          type materiel
                        </TableCell>
                        <TableCell key="quantitestock" width="15%" align="center">
                          quantite en stock
                        </TableCell>
                        <TableCell key="stocksecurite" width="15%" align="center">
                          stock de securité
                        </TableCell>
                        <TableCell key="etat" width="15%" align="center">
                          etat
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
                                <TableCell> {row.idarticle}</TableCell>
                                <TableCell align="center">{row.marque}</TableCell>
                                <TableCell align="center">{row.modele}</TableCell>
                                <TableCell align="center">{row.codearticle}</TableCell>
                                <TableCell align="center">
                                  {row.typemateriel} - {row.val}
                                </TableCell>
                                <TableCell align="center" style={{ fontWeight: 'bold' }}>
                                  {coloredNumber(formatNumber(row.quantitestock.toFixed(2)))}
                                </TableCell>
                                <TableCell align="center" style={{ fontWeight: 'bold' }}>
                                  {coloredNumber(formatNumber(row.stocksecurite.toFixed(2)))}
                                </TableCell>
                                <TableCell
                                  align="center"
                                  style={{
                                    fontWeight: 'bold',
                                    color:
                                      row.niveaustock === 'Critique'
                                        ? 'red'
                                        : row.niveaustock === 'Urgent'
                                        ? 'yellow'
                                        : 'green'
                                  }}
                                >
                                  {row.niveaustock}
                                </TableCell>
                              </>
                            </TableRow>
                          ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={12}>
                            <Typography variant="subtitle1" color="textSecondary">
                              Aucune donnée disponible
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

export default Reapprovisionnementstock;

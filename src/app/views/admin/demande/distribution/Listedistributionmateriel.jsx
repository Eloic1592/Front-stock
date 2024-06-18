import {
  Box,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Icon,
  IconButton,
  TextField,
  Select,
  MenuItem,
  Grid,
  Snackbar,
  Alert,
  Button
} from '@mui/material';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { SimpleCard } from 'app/components';
import { Breadcrumb } from 'app/components';
import { StyledTable } from 'app/views/style/style';
import { useListedistributionmaterielFunctions } from 'app/views/admin/demande/distribution/materielfunction';
import { baseUrl } from 'app/utils/constant';
import { converttodate, formatNumber } from 'app/utils/utils';
import { Container } from 'app/views/style/style';

const Listedistributionmateriel = ({ rowsPerPageOptions = [10, 25, 50, 100, 200] }) => {
  // Colonne
  const columns = [
    { label: 'ID', field: 'iddistribution', align: 'center' },
    { label: 'Date distribution', field: 'datedistribution', align: 'center' },
    { label: 'Article', field: 'article', align: 'center' },
    { label: 'Quantite', field: 'quantite', align: 'center' },
    { label: 'Depot', field: 'depot', align: 'center' },
    { label: 'Etat', field: 'etat', align: 'center' }
  ];

  const handleAlertClose = () => setMessage({ open: false });
  const [initialDataFetched, setInitialDataFetched] = useState(false);
  const [data, setData] = useState({
    vuedistributionmateriels: []
  });
  const [message, setMessage] = useState({
    text: 'Information enregistree',
    severity: 'success',
    open: false
  });

  const handleEdit = (iddistribution) => {
    window.location.replace('/admin/editdistribution/' + iddistribution);
  };

  const {
    sortDirection,
    page,
    rowsPerPage,
    setSortDirection,
    isEditClicked,
    selectedRowId,
    handleChangePage,
    sortColumn,
    setNumserie,
    numserie,
    datedistribution,
    setDatedistribution,
    codedepot,
    setCodedepot,
    handleChangeRowsPerPage,
    handleSelectColumn,
    sortedData
  } = useListedistributionmaterielFunctions(data);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = baseUrl + '/inventory/listdistributionmateriel';
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
          vuedistributionmateriels: responseData.vuedistributionmateriels || []
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
  }, [isEditClicked, selectedRowId, sortedData, initialDataFetched]);
  const redirect = () => {
    window.location.replace('/admin/distribution');
  };
  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: 'Distribution', path: 'admin/distribution' },
            { name: 'Distribution' }
          ]}
        />
      </Box>
      <Box width="100%" overflow="auto">
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Grid container direction="row" spacing={2}>
              <Grid item>
                <Button variant="contained" onClick={redirect} color="inherit">
                  <Icon>arrow_backward</Icon>
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <SimpleCard title="Rechercher une distribution precise" sx={{ marginBottom: '16px' }}>
              <Grid container spacing={3}>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    id="numserie"
                    size="small"
                    type="text"
                    name="numserie"
                    label="Numero de serie"
                    value={numserie}
                    onChange={(event) => setNumserie(event.target.value)}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    size="small"
                    type="text"
                    name="codedepot"
                    variant="outlined"
                    label="Code ou nom du depot"
                    value={codedepot}
                    onChange={(event) => setCodedepot(event.target.value)}
                    sx={{ mb: 3 }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    size="small"
                    type="date"
                    name="datedistribution"
                    variant="outlined"
                    value={datedistribution}
                    onChange={(event) => setDatedistribution(event.target.value)}
                    sx={{ mb: 3 }}
                  />
                </Grid>
              </Grid>
            </SimpleCard>
          </Grid>
          <Grid item>
            <SimpleCard title="Liste des distributions">
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
                    <TableCell key="iddistribution" align="center" width="15%">
                      Numero Distribution
                    </TableCell>
                    <TableCell key="datedistribution" align="center" width="30%">
                      Date distribution
                    </TableCell>
                    <TableCell key="materiel" align="center" width="30%">
                      Materiel
                    </TableCell>
                    <TableCell key="Quantite" align="center" width="30%">
                      Quantite
                    </TableCell>
                    <TableCell key="etat" align="center" width="30%">
                      Etat
                    </TableCell>
                    <TableCell key="depot" align="center" width="30%">
                      Depot
                    </TableCell>
                    <TableCell width="15%" align="center">
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
                            <TableCell align="center">{row.iddistribution}</TableCell>
                            <TableCell align="center">
                              {converttodate(row.datedistribution)}
                            </TableCell>
                            <TableCell align="center">
                              {row.marque} - {row.modele} / {row.numserie}
                            </TableCell>
                            <TableCell align="center" style={{ fontWeight: 'bold' }}>
                              {formatNumber(row.quantite.toFixed(2))}
                            </TableCell>
                            <TableCell align="center">{row.etat}</TableCell>
                            <TableCell align="center">
                              {row.depot} - {row.codedep}
                            </TableCell>

                            <TableCell align="center">
                              <IconButton
                                className="button"
                                variant="contained"
                                aria-label="Edit"
                                color="primary"
                                onClick={() => handleEdit(row.iddistribution)}
                              >
                                <Icon>edit_icon</Icon>
                              </IconButton>
                            </TableCell>
                          </>
                          {isEditClicked && row.iddistribution === selectedRowId && (
                            <>
                              <TableCell></TableCell>
                            </>
                          )}
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

export default Listedistributionmateriel;

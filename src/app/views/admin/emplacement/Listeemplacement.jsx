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
  Snackbar,
  Alert,
  Grid
} from '@mui/material';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { SimpleCard } from 'app/components';
import { StyledTable } from 'app/views/style/style';
import { useEmplacementfunctions } from 'app/views/admin/emplacement/function';
import { baseUrl } from 'app/utils/constant';
import { formatNumber } from 'app/utils/utils';
import { useParams } from 'react-router-dom';

const Listemplacement = ({ rowsPerPageOptions = [10, 25, 50, 100, 200] }) => {
  const iddepot = useParams();
  // Colonne
  const columns = [
    { label: 'ID', field: 'idemplacement', align: 'center' },
    { label: 'Code Emplacement', field: 'codeemp', align: 'center' },
    { label: 'capacite', field: 'capacite', align: 'center' },
    { label: 'Depot', field: 'depot', align: 'center' }
  ];
  const [data, setData] = useState({
    listeemplacements: []
  });
  const [initialDataFetched, setInitialDataFetched] = useState(false);
  const [message, setMessage] = useState({
    text: 'Information enregistree',
    severity: 'success',
    open: false
  });

  const [isEditClicked, setIsEditClicked] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const handleAlertClose = () => setMessage({ open: false });

  // Modification(Update)
  const handleEdit = (idemplacement, iddepot) => {
    window.location.replace('/admin/editemplacement/' + idemplacement + '/' + iddepot);
  };

  const {
    sortColumn,
    sortDirection,
    page,
    rowsPerPage,
    setSortDirection,
    codeemp,
    setCodeemp,
    handleChangePage,
    handleChangeRowsPerPage,
    handleSelectColumn,
    sortedData
  } = useEmplacementfunctions(data);

  //  Use effect
  useEffect(() => {
    const fetchData = async () => {
      try {
        let emplacementParams = {
          iddepot: iddepot.iddepot
        };
        let url = baseUrl + '/emplacement/getlistemplacementdepot';
        const response = await fetch(url, {
          crossDomain: true,
          method: 'POST',
          body: JSON.stringify(emplacementParams),
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
          listeemplacements: responseData.listeemplacements || []
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

  return (
    <Box width="100%" overflow="auto">
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <SimpleCard title="Rechercher un emplacement">
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  size="small"
                  type="text"
                  name="typemateriel"
                  label="Code de l'emplacement"
                  variant="outlined"
                  value={codeemp}
                  onChange={(event) => setCodeemp(event.target.value)}
                  sx={{ mb: 3 }}
                />
              </Grid>
            </Grid>
          </SimpleCard>
        </Grid>

        <Grid item>
          <SimpleCard title="Liste des emplacements">
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
                  sx={{ mb: 3 }}
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
                  sx={{ mb: 3 }}
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
                  <TableCell key="idemplacement" align="center" width="15%">
                    ID
                  </TableCell>
                  <TableCell key="codeemp" align="center" width="40%">
                    Code emplacement
                  </TableCell>
                  <TableCell key="depot" align="center" width="40%">
                    Depot
                  </TableCell>
                  <TableCell key="capacite" align="center" width="40%">
                    Capacite (Unite)
                  </TableCell>
                  <TableCell align="center" width="15%">
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedData && sortedData.length > 0 ? (
                  sortedData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <TableRow key={row.idemplacement}>
                        <>
                          <TableCell key="idemplacement" align="center" width="15%">
                            {row.idemplacement}
                          </TableCell>
                          <TableCell key="codeemp" align="center" width="40%">
                            {row.codeemp}
                          </TableCell>
                          <TableCell key="depot" align="center" width="40%">
                            {row.depot} - {row.codedep}
                          </TableCell>
                          <TableCell key="capacite" align="center" width="40%">
                            {formatNumber(row.capacite)}
                          </TableCell>
                          <TableCell align="center" width="15%">
                            <IconButton
                              className="button"
                              variant="contained"
                              aria-label="Edit"
                              color="primary"
                              onClick={() => handleEdit(row.idemplacement, row.iddepot)}
                            >
                              <Icon>edit_icon</Icon>
                            </IconButton>
                          </TableCell>
                        </>
                      </TableRow>
                    ))
                ) : (
                  <TableRow key="no-data">
                    <TableCell colSpan={3}>
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
  );
};

export default Listemplacement;

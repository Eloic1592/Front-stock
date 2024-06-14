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
import { useState, useEffect } from 'react';
import { SimpleCard } from 'app/components';
import { StyledTable } from 'app/views/style/style';
import { useListemouvementFunctions } from 'app/views/admin/naturemouvement/function';
import { baseUrl } from 'app/utils/constant';

const Listenaturemouvement = ({ rowsPerPageOptions = [10, 25, 50, 100, 200] }) => {
  // Colonne
  const columns = [
    { label: 'idnaturemouvement', field: 'idnaturemouvement', align: 'center' },
    { label: 'Nature du mouvement', field: 'naturemouvement', align: 'center' }
  ];

  const [data, setData] = useState({
    naturemouvements: []
  });
  const [initialDataFetched, setInitialDataFetched] = useState(false);
  const [message, setMessage] = useState({
    text: 'Information enregistree',
    severity: 'success',
    open: false
  });

  const handleAlertClose = () => setMessage({ open: false });

  // Modification(Update)K
  const handleEdit = (idnaturemouvement) => {
    window.location.replace('/admin/editnaturemouvement/' + idnaturemouvement);
  };

  const {
    sortDirection,
    page,
    rowsPerPage,
    setSortDirection,
    naturemouvement,
    setNaturemouvement,
    handleChangePage,
    sortColumn,
    handleChangeRowsPerPage,
    handleSelectColumn,
    sortedData
  } = useListemouvementFunctions(data);

  //  Use effect
  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = baseUrl + '/naturemouvement/contentnatmouvement';
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

  return (
    <Box width="100%" overflow="auto">
      <Grid container direction="column" spacing={1}>
        <Grid item>
          <SimpleCard title="Rechercher un type de mouvement" sx={{ marginBottom: '16px' }}>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  size="small"
                  type="text"
                  name="typemouvement"
                  label="type de mouvement"
                  variant="outlined"
                  value={naturemouvement}
                  onChange={(event) => setNaturemouvement(event.target.value)}
                  sx={{ mb: 3 }}
                />
              </Grid>
            </Grid>
          </SimpleCard>
        </Grid>

        <Grid item>
          <SimpleCard title="Liste des mouvements">
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
                  <TableCell key="idnaturemouvement" align="center" width="15%">
                    idnaturemouvement
                  </TableCell>
                  <TableCell key="naturemouvement" align="center" width="15%">
                    nature mouvement
                  </TableCell>

                  <TableCell align="center" width="15%">
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* Donnees du tableau */}
                {sortedData && sortedData.length > 0 ? (
                  sortedData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <TableRow key={row.idnaturemouvement}>
                        <>
                          <TableCell align="center" width="15%">
                            {row.idnaturemouvement}
                          </TableCell>
                          <TableCell align="center" width="15%">
                            {row.naturemouvement}
                          </TableCell>
                          <TableCell align="center" width="15%">
                            <IconButton
                              className="button"
                              variant="contained"
                              aria-label="Edit"
                              color="primary"
                              onClick={() => handleEdit(row.idnaturemouvement)}
                            >
                              <Icon>edit_icon</Icon>
                            </IconButton>
                          </TableCell>
                        </>
                      </TableRow>
                    ))
                ) : (
                  <TableRow key="no-data">
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
  );
};

export default Listenaturemouvement;

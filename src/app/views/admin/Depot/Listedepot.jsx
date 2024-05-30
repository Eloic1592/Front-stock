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
import { useListedepotFunctions } from 'app/views/admin/depot/function';
import { baseUrl } from 'app/utils/constant';

const Listedepot = () => {
  const columns = [
    { label: 'Iddepot', field: 'iddepot', align: 'center' },
    { label: 'Depot', field: 'depot', align: 'center' }
  ];
  const [data, setData] = useState([]);
  const [initialDataFetched, setInitialDataFetched] = useState(false);
  const handleAlertClose = () => setMessage({ open: false });
  const [message, setMessage] = useState({
    text: 'Information enregistree',
    severity: 'success',
    open: false
  });

  const handleEdit = (iddepot) => {
    window.location.replace('/admin/editdepot/' + iddepot);
  };

  const {
    sortDirection,
    page,
    rowsPerPage,
    setSortDirection,
    setNomdepot,
    nomdepot,
    handleChangePage,
    sortColumn,
    handleChangeRowsPerPage,
    handleSelectColumn,
    sortedData
  } = useListedepotFunctions(data);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = baseUrl + '/depot/listdepot';
        const response = await fetch(url, {
          crossDomain: true,
          method: 'POST',
          body: JSON.stringify({}),
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

  return (
    <Box width="100%" overflow="auto" key="Box1">
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <SimpleCard title="Rechercher un depot" sx={{ marginBottom: '16px' }}>
            <TextField
              fullWidth
              size="small"
              type="text"
              name="materielfiltre"
              label="Nom du depot"
              variant="outlined"
              value={nomdepot}
              onChange={(event) => setNomdepot(event.target.value)}
              sx={{ mb: 3 }}
            />
          </SimpleCard>
        </Grid>

        <Grid item>
          <SimpleCard title="Liste des depots ">
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
                  <TableCell key="iddepot" align="center" width="15%">
                    iddepot
                  </TableCell>
                  <TableCell key="depot" align="center" width="50%">
                    depot
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
                      <TableRow key={row.iddepot}>
                        <>
                          <TableCell align="center" width="15%">
                            {row.iddepot}
                          </TableCell>
                          <TableCell align="center" width="50%">
                            {row.depot}
                          </TableCell>
                          <TableCell align="center" width="15%">
                            <IconButton
                              className="button"
                              variant="contained"
                              aria-label="Edit"
                              color="primary"
                              onClick={() => handleEdit(row.iddepot)}
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
  );
};

export default Listedepot;

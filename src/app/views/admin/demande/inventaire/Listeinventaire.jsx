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
  Alert
} from '@mui/material';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { SimpleCard } from 'app/components';
import { StyledTable } from 'app/views/style/style';
import { useListeinventaireFunctions } from 'app/views/admin/demande/inventaire/function';
import { baseUrl } from 'app/utils/constant';
import { converttodate, formatNumber } from 'app/utils/utils';

const Listeinventaire = ({ rowsPerPageOptions = [10, 25, 50, 100, 200] }) => {
  // Colonne
  const columns = [
    { label: 'ID', field: 'idinventaire', align: 'center' },
    { label: 'Date inventaire', field: 'dateinventaire', align: 'center' },
    { label: 'Article', field: 'article', align: 'center' },
    { label: 'Quantite reelle', field: 'quantitereel', align: 'center' },
    { label: 'Quantite theorique', field: 'quantitetheorique', align: 'center' },
    { label: 'Etat', field: 'etat', align: 'center' }
  ];

  const handleAlertClose = () => setMessage({ open: false });
  const [initialDataFetched, setInitialDataFetched] = useState(false);
  const [data, setData] = useState({
    vueinventaires: [],
    articles: []
  });
  const [message, setMessage] = useState({
    text: 'Information enregistree',
    severity: 'success',
    open: false
  });

  const handleEdit = (idinventaire) => {
    window.location.replace('/admin/editinventaire/' + idinventaire);
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
    codearticle,
    setCodearticle,
    dateinventaire,
    setDateinventaire,
    handleChangeRowsPerPage,
    handleSelectColumn,
    sortedData
  } = useListeinventaireFunctions(data);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = baseUrl + '/inventory/listinventaire';
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
          vueinventaires: responseData.vueinventaires || [],
          articles: responseData.articles || []
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
          <SimpleCard title="Rechercher un inventaire" sx={{ marginBottom: '16px' }}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="codearticle"
                  size="small"
                  type="text"
                  name="codearticle"
                  label="Code de l'article"
                  value={codearticle}
                  onChange={(event) => setCodearticle(event.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  size="small"
                  type="date"
                  name="dateinventaire"
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
          <SimpleCard title="Liste des inventaires">
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
                  <TableCell key="idinventaire" align="center" width="15%">
                    Numero Inventaire
                  </TableCell>
                  <TableCell key="dateinventaire" align="center" width="30%">
                    Date inventaire
                  </TableCell>
                  <TableCell key="article" align="center" width="30%">
                    Article
                  </TableCell>
                  <TableCell key="quantitereel" align="center" width="30%">
                    Quantite reelle
                  </TableCell>
                  <TableCell key="quantitetheorique" align="center" width="30%">
                    Quantite theorique
                  </TableCell>
                  <TableCell key="etat" align="center" width="30%">
                    Etat
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
                          <TableCell align="center">{row.idinventaire}</TableCell>
                          <TableCell align="center">{converttodate(row.dateinventaire)}</TableCell>
                          <TableCell align="center">
                            {row.marque} - {row.modele} /{row.codearticle}
                          </TableCell>
                          <TableCell align="center">{formatNumber(row.quantitereel)}</TableCell>
                          <TableCell align="center">
                            {formatNumber(row.quantitetheorique)}
                          </TableCell>
                          <TableCell align="center">{formatNumber(row.etat)}</TableCell>
                          <TableCell align="center">
                            <IconButton
                              className="button"
                              variant="contained"
                              aria-label="Edit"
                              color="primary"
                              onClick={() => handleEdit(row.idinventaire)}
                            >
                              <Icon>edit_icon</Icon>
                            </IconButton>
                          </TableCell>
                        </>
                        {isEditClicked && row.idinventaire === selectedRowId && (
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
  );
};

export default Listeinventaire;

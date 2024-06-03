import {
  Box,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Icon,
  IconButton,
  Select,
  MenuItem,
  Grid,
  Snackbar,
  Alert,
  TextField
} from '@mui/material';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { SimpleCard } from 'app/components';
import { StyledTable } from 'app/views/style/style';
import { useListedetailcommandeFunctions } from 'app/views/admin/demande/commande/detailfunction';
import { baseUrl } from 'app/utils/constant';
import { useParams } from 'react-router-dom';
import { formatNumber } from 'app/utils/utils';

const Listedetailcommande = ({ rowsPerPageOptions = [10, 25, 50, 100, 200] }) => {
  const idcommande = useParams();
  // Colonne
  const columns = [
    { label: 'ID', field: 'iddetailcommande', align: 'center' },
    { label: 'Numero Commande', field: 'idcommande', align: 'center' },
    { label: 'Code article', field: 'codearticle', align: 'center' },
    { label: 'Quantite', field: 'quantite', align: 'center' },
    { label: 'Prix unitaire', field: 'pu', align: 'center' },
    { label: 'Total', field: 'total', align: 'center' }
  ];
  const [data, setData] = useState({
    detailcommandeviews: [],
    articles: []
  });

  const handleEdit = (iddetailcommande) => {
    window.location.replace('/admin/editdetailcommande/' + iddetailcommande);
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
    handleChangeRowsPerPage,
    handleSelectColumn,
    sortedData,
    marque,
    setMarque
  } = useListedetailcommandeFunctions(data);

  const [message, setMessage] = useState({
    text: 'Information enregistree',
    severity: 'success',
    open: false
  });
  const handleAlertClose = () => setMessage({ open: false });
  const [initialDataFetched, setInitialDataFetched] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let commandeParams = {
          idcommande: idcommande.idcommande
        };
        let url = baseUrl + '/commande/detailcontentpage';
        const response = await fetch(url, {
          crossDomain: true,
          method: 'POST',
          body: JSON.stringify(commandeParams),
          headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`);
        }

        const responseData = await response.json();
        const newData = {
          detailcommandeviews: responseData.detailcommandeviews || [],
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
  }, [isEditClicked, selectedRowId, sortedData, initialDataFetched, idcommande.idcommande]);

  return (
    <Box width="100%" overflow="auto">
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <SimpleCard title="Rechercher un detail precis" sx={{ marginBottom: '16px' }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  size="small"
                  type="text"
                  name="marque"
                  variant="outlined"
                  label="Marque ou code l'article"
                  value={marque}
                  onChange={(event) => setMarque(event.target.value)}
                  sx={{ mb: 3 }}
                />
              </Grid>
            </Grid>
          </SimpleCard>
        </Grid>
        <Grid item>
          <SimpleCard title="Details du devis">
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
                  <TableCell key="iddetailcommande" align="center" width="15%">
                    ID
                  </TableCell>
                  <TableCell key="numerocommande" align="center" width="30%">
                    Numero commande
                  </TableCell>
                  <TableCell key="codearticle" align="center" width="30%">
                    Code article
                  </TableCell>
                  <TableCell key="quantite" align="center" width="30%">
                    Quantite
                  </TableCell>
                  <TableCell key="pu" align="center" width="30%">
                    Prix unitaire
                  </TableCell>
                  <TableCell key="total" align="center" width="30%">
                    Total
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
                          <TableCell align="center">{row.iddetailcommande}</TableCell>
                          <TableCell align="center">{row.idcommande}</TableCell>
                          <TableCell align="center">{row.codearticle}</TableCell>
                          <TableCell align="center">{formatNumber(row.quantite)}</TableCell>
                          <TableCell align="center">{formatNumber(row.pu)}</TableCell>
                          <TableCell align="center">{formatNumber(row.total)}</TableCell>

                          <TableCell>
                            <IconButton
                              className="button"
                              variant="contained"
                              aria-label="Edit"
                              color="primary"
                              onClick={() => handleEdit(row.iddetailcommande)}
                            >
                              <Icon>edit_icon</Icon>
                            </IconButton>
                          </TableCell>
                        </>
                        {isEditClicked && row.idcommande === selectedRowId && (
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

export default Listedetailcommande;

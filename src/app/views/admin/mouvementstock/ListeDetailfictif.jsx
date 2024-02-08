import {
  Box,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Icon,
  IconButton,
  Checkbox,
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
import { StyledTable, Container } from 'app/views/style/style';
import { Commandefunctions } from 'app/views/admin/Bon/commande/Commandefunction';
import { baseUrl } from 'app/utils/constant';
import { useParams } from 'react-router-dom';
import { converttodate } from 'app/utils/utils';

const Detailmfictif = ({ rowsPerPageOptions = [5, 10, 25] }) => {
  const idmouvementstock = useParams();

  // Colonne
  const columns = [
    { label: 'ID', field: 'iddetailmouvementfictif', align: 'center' },
    { label: 'Date depot', field: 'datedepot', align: 'center' },
    { label: 'Nature', field: 'naturemouvement', align: 'center' },
    { label: 'Marque', field: 'marque', align: 'center' },
    { label: 'Modele', field: 'modele', align: 'center' },
    { label: 'Responsable', field: 'idetudiant', align: 'center' },
    { label: 'Date debut', field: 'datedeb', align: 'center' },
    { label: 'Date fin', field: 'datefin', align: 'center' }
    // Other columns...
  ];
  const handleAlertClose = () => setMessage({ open: false });
  const [initialDataFetched, setInitialDataFetched] = useState(false);
  const [data, setData] = useState([]);
  const [message, setMessage] = useState({
    text: 'Information enregistree',
    severity: 'success',
    open: false
  });

  const handleSubmit = () => {
    let livraison = [];
    livraison = selectedIds.map((id) => ({
      idmouvementstock: id,
      datebonlivraison: new Date()
    }));

    let url = baseUrl + '/bonlivraison/createlivraison';
    fetch(url, {
      crossDomain: true,
      method: 'POST',
      body: JSON.stringify(livraison),
      headers: { 'Content-Type': 'application/json' }
    })
      .then((response) => response.json())
      .then((response) => {
        setMessage({
          text: 'Information modifiee',
          severity: 'success',
          open: true
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch(() => {
        setMessage({
          text: 'La modification dans la base de données a échoué',
          severity: 'error',
          open: true
        });
      });
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
    selectedIds,
    setClient,
    client,
    setDatecommande,
    datecommande,
    handleChangeRowsPerPage,
    handleSelection,
    handleSelectAll,
    handleSelectColumn,
    sortedData
  } = Commandefunctions(data);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let mouvementstockParams = {
          idmouvementstock: idmouvementstock.idmouvementstock
        };
        let url = baseUrl + '/mouvementstock/detailstockfictif/';
        const response = await fetch(url, {
          crossDomain: true,
          method: 'POST',
          body: JSON.stringify(mouvementstockParams),
          headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`);
        }

        const responseData = await response.json();
        setData(responseData);
        console.log(responseData);
      } catch (error) {
        setMessage({
          text: "Aucune donnee n'ete recuperee,veuillez verifier si le serveur est actif",
          severity: 'error',
          open: true
        });
      }
    };

    // Charger les données initiales uniquement si elles n'ont pas encore été chargées
    if (!initialDataFetched) {
      fetchData(); // Appel initial
      setInitialDataFetched(true);
    }

    // La logique conditionnelle
    if (isEditClicked && selectedRowId !== null) {
      const selectedRow = sortedData.find((row) => row.iddetailmouvementphysique === selectedRowId);

      if (selectedRow) {
      }
    }
  }, [isEditClicked, selectedRowId, sortedData, initialDataFetched]); // Ajoutez initialDataFetched comme dépendance

  return (
    <Container>
      <Box width="100%" overflow="auto">
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <SimpleCard title="Rechercher un detail precis" sx={{ marginBottom: '16px' }}>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    size="small"
                    type="date"
                    name="datedevis"
                    variant="outlined"
                    value={datecommande}
                    onChange={(event) => setDatecommande(event.target.value)}
                    sx={{ mb: 3 }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    id="nomclient"
                    size="small"
                    type="text"
                    name="nomclient"
                    label="Nom du client"
                    value={client}
                    onChange={(event) => setClient(event.target.value)}
                  />
                </Grid>
              </Grid>
            </SimpleCard>
          </Grid>
          <Grid item>
            <SimpleCard title="Details du mouvement">
              {/* Tri de tables */}
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
                    <TableCell>
                      <Checkbox
                        checked={data.every((row) =>
                          selectedIds.includes(row.iddetailmouvementphysique)
                        )}
                        indeterminate={
                          data.some((row) => selectedIds.includes(row.iddetailmouvementphysique)) &&
                          !data.every((row) => selectedIds.includes(row.iddetailmouvementphysique))
                        }
                        onChange={handleSelectAll}
                      />
                    </TableCell>
                    <TableCell key="iddetailmouvementfictif" align="left">
                      ID
                    </TableCell>
                    <TableCell key="marque" align="left">
                      Marque
                    </TableCell>
                    <TableCell key="modele" align="left">
                      Modele
                    </TableCell>
                    <TableCell key="naturemouvement" align="left">
                      Nature
                    </TableCell>
                    <TableCell key="idetudiant" align="left">
                      Responsable
                    </TableCell>
                    <TableCell key="datedeb" align="left">
                      Date Debut
                    </TableCell>
                    <TableCell key="datefin" align="left">
                      Date fin
                    </TableCell>
                    {/* <TableCell>Action</TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* Donnees du tableau */}
                  {sortedData && sortedData.length > 0 ? (
                    sortedData
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <Checkbox
                              checked={selectedIds.includes(row.iddetailmouvementphysique)}
                              onChange={(event) =>
                                handleSelection(event, row.iddetailmouvementphysique)
                              }
                            />
                          </TableCell>
                          <TableCell align="left">{row.iddetailmouvementfictif}</TableCell>
                          <TableCell align="left">{row.marque}</TableCell>
                          <TableCell align="left">{row.modele}</TableCell>
                          <TableCell align="left">{row.naturemouvement}</TableCell>
                          <TableCell align="left">{row.idetudiant}</TableCell>
                          <TableCell align="left">{converttodate(row.datedeb)}</TableCell>
                          <TableCell align="left">{converttodate(row.datefin)}</TableCell>
                          {/* <TableCell>
                            <IconButton
                              className="button"
                              variant="contained"
                              aria-label="Edit"
                              color="primary"
                            >
                              <Icon>info</Icon>
                            </IconButton>
                          </TableCell> */}
                        </TableRow>
                      ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6}>
                        <Typography variant="subtitle1" color="textSecondary">
                          Aucune donnee disponible
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </StyledTable>{' '}
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TablePagination
                    sx={{ px: 2 }}
                    page={page}
                    component="div"
                    rowsPerPage={rowsPerPage}
                    count={data.length}
                    onPageChange={handleChangePage}
                    rowsPerPageOptions={rowsPerPageOptions}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    nextIconButtonProps={{ 'aria-label': 'Next Page' }}
                    backIconButtonProps={{ 'aria-label': 'Previous Page' }}
                  />
                </Grid>
              </Grid>
            </SimpleCard>
          </Grid>
        </Grid>{' '}
        <Snackbar open={message.open} autoHideDuration={3000} onClose={handleAlertClose}>
          <Alert severity={message.severity} sx={{ width: '100%' }} variant="filled">
            {message.text}
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
};

export default Detailmfictif;

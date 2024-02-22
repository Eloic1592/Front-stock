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
  Checkbox,
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
import { StyledTable } from 'app/views/style/style';
import { useDphysiqueFunctions } from 'app/views/admin/mouvementstock/physique/detail/dphysiquefunction';
import { baseUrl } from 'app/utils/constant';
import { useParams } from 'react-router-dom';
import { formatNumber, coloredNumber, colorType } from 'app/utils/utils';
import { rest } from 'lodash';

const ListeDetailphysique = ({ rowsPerPageOptions = [5, 10, 25, 50, 100, 200] }) => {
  const idmouvementstock = useParams();

  // Colonne
  const columns = [
    { label: 'Mouvement', field: 'mouvement', align: 'center' },
    { label: 'Marque', field: 'marque', align: 'center' },
    { label: 'Modele', field: 'modele', align: 'center' },
    { label: 'Quantite', field: 'quantite', align: 'center' },
    { label: 'Prix unitaire', field: 'pu', align: 'center' },
    { label: 'Prix stock', field: 'prixstock', align: 'center' },
    { label: 'Reste stock', field: 'restestock', align: 'center' },

    { label: 'Depot', field: 'depot', align: 'center' }
  ];
  const handleAlertClose = () => setMessage({ open: false });
  const [initialDataFetched, setInitialDataFetched] = useState(false);
  const [editiddetail, setEditedIddetail] = useState('');
  const [editarticle, setEditarticle] = useState(['1']);
  const [editquantite, setEditquantite] = useState(0);
  const [prixstock, setPristock] = useState('');
  const [editpu, setEditpu] = useState(0);
  const [editreste, setEditreste] = useState(0);

  const [depot, setDepot] = useState(['1']);
  const [data, setData] = useState({
    articles: [],
    depots: [],
    mouvementphysiques: []
  });
  const [message, setMessage] = useState({
    text: 'Information enregistree',
    severity: 'success',
    open: false
  });

  const handleupdate = () => {
    let detailmouvementphysique = {
      iddetailmouvementphysique: editiddetail,
      idmouvement: idmouvementstock.idmouvementstock,
      idarticle: editarticle,
      quantite: editquantite,
      pu: editpu,
      prixstock: prixstock,
      total: editpu * editquantite,
      iddepot: depot,
      statut: 0
    };

    let url = baseUrl + '/mouvementstock/createsingledetailphysique';
    fetch(url, {
      crossDomain: true,
      method: 'POST',
      body: JSON.stringify(detailmouvementphysique),
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
    marque,
    cancelEdit,
    setMarque,
    handleEdit,
    modele,
    setModele,
    handleChangeRowsPerPage,
    handleSelection,
    handleSelectAll,
    handleSelectColumn,
    sortedData
  } = useDphysiqueFunctions(data);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let mouvementstockParams = {
          idmouvementstock: idmouvementstock.idmouvementstock
        };
        let url = baseUrl + '/mouvementstock/detailstockphysique/';
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
        const newData = {
          mouvementphysiques: responseData.mouvementphysiques || [],
          articles: responseData.articles || [],
          depots: responseData.depots || []
        };

        setData(newData);
      } catch (error) {
        setMessage({
          text: "Aucune donnee n'ete recuperee,veuillez verifier si le serveur est actif",
          severity: 'error',
          open: true
        });
      }
    };

    if (!initialDataFetched) {
      fetchData();
      setInitialDataFetched(true);
    }

    if (isEditClicked && selectedRowId !== null) {
      const selectedRow = sortedData.find((row) => row.iddetailmouvementphysique === selectedRowId);
      if (selectedRow) {
        setEditedIddetail(selectedRow.iddetailmouvementphysique);
      }
    }
  }, [
    isEditClicked,
    selectedRowId,
    sortedData,
    initialDataFetched,
    idmouvementstock.idmouvementstock
  ]);

  //Retour page retour
  const redirect = () => {
    window.location.replace('/admin/mouvementphysique');
  };

  return (
    <Box width="100%" overflow="auto">
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <SimpleCard title="Rechercher un detail precis" sx={{ marginBottom: '16px' }}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  size="small"
                  type="text"
                  name="marque"
                  variant="outlined"
                  label="Marque"
                  value={marque}
                  onChange={(event) => setMarque(event.target.value)}
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
                  label="Modele"
                  value={modele}
                  onChange={(event) => setModele(event.target.value)}
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
                  <TableCell width="5%">
                    <Checkbox
                      checked={data.mouvementphysiques.every((row) =>
                        selectedIds.includes(row.iddetailmouvementphysique)
                      )}
                      indeterminate={
                        data.mouvementphysiques.some((row) =>
                          selectedIds.includes(row.iddetailmouvementphysique)
                        ) &&
                        !data.mouvementphysiques.every((row) =>
                          selectedIds.includes(row.iddetailmouvementphysique)
                        )
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell key="mouvement" align="center" width="8%">
                    Mouvement
                  </TableCell>
                  <TableCell key="marque" align="center" width="10%">
                    Marque
                  </TableCell>
                  <TableCell key="modele" align="center" width="10%">
                    Modele
                  </TableCell>
                  <TableCell key="quantite" align="center" width="10%">
                    Quantite
                  </TableCell>
                  <TableCell key="pu" align="center" width="10%">
                    Prix unitaire
                  </TableCell>
                  <TableCell key="prixstock" align="center" width="12%">
                    Prix Stock
                  </TableCell>
                  <TableCell key="restestock" align="center" width="12%">
                    Reste stock
                  </TableCell>
                  <TableCell key="Depot" align="center" width="15%">
                    Depot
                  </TableCell>
                  <TableCell width="5%">Action</TableCell>
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
                        {isEditClicked && row.iddetailmouvementphysique === selectedRowId ? (
                          <>
                            <TableCell align="center" style={{ fontWeight: 'bold' }}>
                              {colorType(row.mouvement)}
                            </TableCell>

                            <TableCell>
                              <Select
                                fullWidth
                                labelId="select-label"
                                value={editarticle}
                                onChange={(event) => setEditarticle(event.target.value)}
                              >
                                <MenuItem value="1" disabled>
                                  Article
                                </MenuItem>
                                {data.articles.map((row) => (
                                  <MenuItem key={row.idarticle} value={row.idarticle}>
                                    {row.marque}-{row.modele}
                                  </MenuItem>
                                ))}
                              </Select>
                            </TableCell>
                            <TableCell>
                              <TextField
                                type="number"
                                InputProps={{ inputProps: { min: 0 } }}
                                label="Quantite"
                                value={editquantite}
                                onChange={(event) => setEditquantite(event.target.value)}
                              />
                            </TableCell>
                            <TableCell>
                              <TextField
                                type="number"
                                InputProps={{ inputProps: { min: 0 } }}
                                label="PU"
                                value={editpu}
                                onChange={(event) => setEditpu(event.target.value)}
                              />
                            </TableCell>
                            <TableCell>
                              <TextField
                                type="number"
                                InputProps={{ inputProps: { min: 0 } }}
                                label="Prix stock"
                                value={prixstock}
                                onChange={(event) => setPristock(event.target.value)}
                              />
                            </TableCell>
                            <TableCell>
                              <TextField
                                type="text"
                                label="Reste"
                                value={editreste}
                                readOnly
                                onChange={(event) => setEditreste(event.target.value)}
                              />
                            </TableCell>
                            <TableCell>
                              <Select
                                fullWidth
                                labelId="select-label"
                                value={depot}
                                onChange={(event) => setDepot(event.target.value)}
                              >
                                <MenuItem value="1" disabled>
                                  depot
                                </MenuItem>
                                {data.depots.map((row) => (
                                  <MenuItem key={row.iddepot} value={row.iddepot}>
                                    {row.depot}
                                  </MenuItem>
                                ))}
                              </Select>
                            </TableCell>
                          </>
                        ) : (
                          <>
                            <TableCell align="center" style={{ fontWeight: 'bold' }}>
                              {colorType(row.mouvement)}
                            </TableCell>
                            <TableCell align="center">{row.marque}</TableCell>
                            <TableCell align="center">{row.modele}</TableCell>
                            <TableCell align="center" style={{ fontWeight: 'bold' }}>
                              {formatNumber(row.quantite)}
                            </TableCell>
                            <TableCell align="center">{formatNumber(row.pu)}</TableCell>
                            <TableCell align="center">{formatNumber(row.prixstock)}</TableCell>
                            <TableCell align="center" style={{ fontWeight: 'bold' }}>
                              {coloredNumber(formatNumber(row.restestock))}
                            </TableCell>
                            <TableCell align="center">{row.depot}</TableCell>
                            <TableCell>
                              <IconButton
                                className="button"
                                variant="contained"
                                aria-label="Edit"
                                color="primary"
                                onClick={() => handleEdit(row)}
                              >
                                <Icon>edit</Icon>
                              </IconButton>
                            </TableCell>
                          </>
                        )}
                        {isEditClicked && row.iddetailmouvementphysique === selectedRowId && (
                          <>
                            <TableCell>
                              <IconButton
                                className="button"
                                variant="contained"
                                aria-label="Edit"
                                color="secondary"
                                onClick={() => handleupdate()}
                              >
                                <Icon>arrow_forward</Icon>
                              </IconButton>
                              <IconButton
                                className="button"
                                variant="contained"
                                aria-label="Edit"
                                color="error"
                                onClick={() => cancelEdit(row)}
                              >
                                <Icon>close</Icon>
                              </IconButton>
                            </TableCell>
                          </>
                        )}
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
        <Grid item>
          <Box>
            <Button variant="contained" color="primary" onClick={redirect}>
              <Icon>arrow_backward</Icon>
            </Button>
          </Box>
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

export default ListeDetailphysique;

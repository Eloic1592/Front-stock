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
  Alert
} from '@mui/material';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { SimpleCard } from 'app/components';
import { StyledTable } from 'app/views/style/style';
import { useDphysiqueFunctions } from 'app/views/admin/mouvementstock/physique/detail/dphysiquefunction';
import { baseUrl } from 'app/utils/constant';
import { formatNumber, coloredNumber, colorType, converttodate } from 'app/utils/utils';

const ListeDetailphysique = ({ rowsPerPageOptions = [5, 10, 25, 50, 100, 200] }) => {
  // Colonne
  const columns = [
    { label: 'Mouvement', field: 'mouvement', align: 'center' },
    { label: 'Date', field: 'datedepot', align: 'center' },
    { label: 'Mouvement', field: 'mouvement', align: 'center' },
    { label: 'Marque', field: 'marque', align: 'center' },
    { label: 'Modele', field: 'modele', align: 'center' },
    { label: 'Quantite', field: 'quantite', align: 'center' },
    { label: 'Prix unitaire', field: 'pu', align: 'center' },
    { label: 'Reste stock', field: 'restestock', align: 'center' },

    { label: 'Depot', field: 'depot', align: 'center' }
  ];
  const handleAlertClose = () => setMessage({ open: false });
  const [initialDataFetched, setInitialDataFetched] = useState(false);
  const [editiddetail, setEditedIddetail] = useState('');
  const [editdatedepot, setEditdatedepot] = useState('');
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
      datedepot: editiddetail,
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
    datedepot,
    setDatedepot,
    mouvement,
    setMouvement,
    listdepot,
    setListdepot,
    handleChangeRowsPerPage,
    handleSelection,
    handleSelectAll,
    handleSelectColumn,
    sortedData
  } = useDphysiqueFunctions(data);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = baseUrl + '/mouvementstock/contentstockphysique';
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
  }, [isEditClicked, selectedRowId, sortedData, initialDataFetched]);

  return (
    <Box width="100%" overflow="auto">
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <SimpleCard title="Rechercher un detail precis" sx={{ marginBottom: '16px' }}>
            <Grid container spacing={1}>
              <Grid item xs={2}>
                <TextField
                  fullWidth
                  size="small"
                  type="text"
                  name="marque"
                  variant="outlined"
                  label="Marque"
                  value={marque}
                  onChange={(event) => setMarque(event.target.value)}
                />
              </Grid>
              <Grid item xs={3}>
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
              <Grid item xs={2}>
                <TextField
                  fullWidth
                  id="datedepot"
                  size="small"
                  type="date"
                  name="datedepot"
                  value={datedepot}
                  onChange={(event) => setDatedepot(event.target.value)}
                />
              </Grid>
              <Grid item xs={2}>
                <Select
                  fullWidth
                  size="small"
                  labelId="select-label"
                  value={mouvement}
                  onChange={(event) => setMouvement(event.target.value)}
                >
                  <MenuItem value="0">Tous mouvements</MenuItem>
                  <MenuItem value="1" key="1">
                    Entree
                  </MenuItem>
                  <MenuItem value="-1" key="-1">
                    Sortie
                  </MenuItem>
                </Select>
              </Grid>
              <Grid item xs={3}>
                <Select
                  fullWidth
                  autoFocus
                  size="small"
                  labelId="select-label"
                  value={listdepot}
                  margin="dense"
                  onChange={(event) => setListdepot(event.target.value)}
                >
                  <MenuItem value="1">Tous les depots</MenuItem>
                  {data.depots.map((row) => (
                    <MenuItem value={row.iddepot} key={row.iddepot}>
                      {row.iddepot}-{row.depot}
                    </MenuItem>
                  ))}
                </Select>
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
                  <TableCell key="prixstock" align="center" width="12%">
                    Date
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
                              <TextField
                                type="date"
                                value={editdatedepot}
                                onChange={(event) => setEditdatedepot(event.target.value)}
                              />
                            </TableCell>
                            <TableCell>
                              <Select
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
                            <TableCell key="datedepot" align="center" width="12%">
                              {converttodate(row.datedepot)}
                            </TableCell>
                            <TableCell align="center">{row.marque}</TableCell>
                            <TableCell align="center">{row.modele}</TableCell>
                            <TableCell align="center" style={{ fontWeight: 'bold' }}>
                              {formatNumber(row.quantite)}
                            </TableCell>
                            <TableCell align="center">{formatNumber(row.pu)}</TableCell>
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

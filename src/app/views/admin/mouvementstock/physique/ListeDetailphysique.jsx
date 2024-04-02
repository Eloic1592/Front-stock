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
import { useEffect, useState, Fragment } from 'react';
import { SimpleCard } from 'app/components';
import { StyledTable } from 'app/views/style/style';
import { useDphysiqueFunctions } from 'app/views/admin/mouvementstock/physique/dphysiquefunction';
import { baseUrl } from 'app/utils/constant';
import { formatNumber, coloredNumber, colorType, converttodate } from 'app/utils/utils';
import Collapse from '@mui/material/Collapse';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Table from '@mui/material/Table';
import { saveAs } from 'file-saver';
import PDFMouvementphysique from './PDFMouvementphysique';
import { pdf as renderPdf } from '@react-pdf/renderer';

const ListeDetailphysique = ({ rowsPerPageOptions = [10, 25, 50, 100, 200] }) => {
  // Colonne
  const columns = [
    { label: 'Date', field: 'datedepot', align: 'center' },
    { label: 'Mouvement', field: 'mouvement', align: 'center' },
    { label: 'Marque', field: 'marque', align: 'center' },
    { label: 'Nature', field: 'naturemouvement', align: 'center' },
    { label: 'Quantite', field: 'quantite', align: 'center' },
    { label: 'Prix unitaire', field: 'pu', align: 'center' },
    { label: 'Montant HT', field: 'total', align: 'center' },
    { label: 'Depot', field: 'depot', align: 'center' }
  ];
  const handleAlertClose = () => setMessage({ open: false });
  const [initialDataFetched, setInitialDataFetched] = useState(false);
  const [data, setData] = useState({
    articles: [],
    depots: [],
    mouvementphysiques: [],
    naturemouvements: []
  });
  const [message, setMessage] = useState({
    text: 'Information enregistree',
    severity: 'success',
    open: false
  });

  // Collapse
  const [openRows, setOpenRows] = useState({});

  const handleRowClick = (iddetailmouvementphysique) => {
    setOpenRows((prevState) => ({
      ...prevState,
      [iddetailmouvementphysique]: !prevState[iddetailmouvementphysique]
    }));
  };

  // Modification(Update)
  const handleEdit = (iddetailmouvementphysique) => {
    window.location.replace('/admin/editmouvementphysique/' + iddetailmouvementphysique);
  };

  const {
    sortDirection,
    page,
    rowsPerPage,
    setSortDirection,
    handleChangePage,
    sortColumn,
    selectedIds,
    marque,
    setMarque,
    datedepot,
    setDatedepot,
    mouvement,
    setMouvement,
    listdepot,
    setListdepot,
    nature,
    setNature,
    handleChangeRowsPerPage,
    handleSelection,
    handleSelectAll,
    handleSelectColumn,
    sortedData
  } = useDphysiqueFunctions(data);

  const generateMouvementPDF = async () => {
    const blob = await renderPdf(
      <PDFMouvementphysique dataList={data.mouvementphysiques} columns={columns} />
    ).toBlob();
    saveAs(blob, 'Mouvement_physiques.pdf');
  };

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
          depots: responseData.depots || [],
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
                  label="Marque ou modele"
                  value={marque}
                  onChange={(event) => setMarque(event.target.value)}
                />
              </Grid>
              <Grid item xs={3}>
                <Select
                  fullWidth
                  size="small"
                  labelId="select-label"
                  value={nature}
                  onChange={(event) => setNature(event.target.value)}
                >
                  <MenuItem key="1" value="1">
                    Toutes natures
                  </MenuItem>
                  {data.naturemouvements.map((row) => (
                    <MenuItem value={row.naturemouvement} key={row.naturemouvement}>
                      {row.naturemouvement}
                    </MenuItem>
                  ))}
                </Select>
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
                  <MenuItem key="1" value="1">
                    Tous les depots
                  </MenuItem>
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
                  <MenuItem key="1" value="1">
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
              <Grid item xs={2}>
                <Button
                  className="button"
                  fullWidth
                  variant="contained"
                  aria-label="Edit"
                  color="error"
                  disabled={selectedIds.length === 0}
                >
                  <Icon>delete</Icon>
                </Button>
              </Grid>
              <Grid item xs={2}>
                <Button
                  className="button"
                  variant="contained"
                  aria-label="Edit"
                  color="secondary"
                  onClick={generateMouvementPDF}
                >
                  <Icon>picture_as_pdf</Icon>
                </Button>
              </Grid>
            </Grid>
            <StyledTable>
              <TableHead>
                {/* Listage de Donnees */}
                <TableRow key="head">
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
                  <TableCell key="depliant" align="center" width="5%"></TableCell>
                  <TableCell key="mouvement" align="center" width="8%">
                    Mouvement
                  </TableCell>
                  <TableCell key="prixstock" align="center" width="16%">
                    Date
                  </TableCell>
                  <TableCell key="marque" align="center" width="16%">
                    Marque
                  </TableCell>
                  <TableCell key="naturemouvement" align="center" width="16%">
                    Nature
                  </TableCell>
                  <TableCell key="quantite" align="center" width="16%">
                    Quantite
                  </TableCell>
                  <TableCell key="Depot" align="center" width="16%">
                    Depot
                  </TableCell>
                  <TableCell align="center" width="16%">
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
                      <Fragment key={row.iddetailmouvementphysique}>
                        {/* Clé unique pour chaque fragment */}
                        <TableRow key={`row_${row.iddetailmouvementphysique}`}>
                          <TableCell>
                            <Checkbox
                              checked={selectedIds.includes(row.iddetailmouvementphysique)}
                              onChange={(event) =>
                                handleSelection(event, row.iddetailmouvementphysique)
                              }
                            />
                          </TableCell>
                          <TableCell>
                            <IconButton
                              aria-label="expand row"
                              size="small"
                              onClick={() => handleRowClick(row.iddetailmouvementphysique)}
                            >
                              {openRows[row.iddetailmouvementphysique] ? (
                                <KeyboardArrowUpIcon />
                              ) : (
                                <KeyboardArrowDownIcon />
                              )}
                            </IconButton>
                          </TableCell>
                          <TableCell align="center" style={{ fontWeight: 'bold' }}>
                            {colorType(row.mouvement)}
                          </TableCell>
                          <TableCell key={`datedepot_${index}`} align="center" width="12%">
                            {converttodate(row.datedepot)}
                          </TableCell>
                          <TableCell align="center">{row.marque}</TableCell>
                          <TableCell align="center">{row.naturemouvement}</TableCell>
                          <TableCell align="center" style={{ fontWeight: 'bold' }}>
                            {formatNumber(row.quantite)}
                          </TableCell>
                          <TableCell align="center">{row.depot}</TableCell>
                          <TableCell align="center">
                            <IconButton
                              className="button"
                              variant="contained"
                              aria-label="Edit"
                              color="primary"
                              onClick={() => handleEdit(row.iddetailmouvementphysique)}
                            >
                              <Icon>edit</Icon>
                            </IconButton>
                            {/* <IconButton
                              className="button"
                              variant="contained"
                              aria-label="Edit"
                              color="error"
                              onClick={() => cancelEdit(row)}
                            >
                              <Icon>cancel</Icon>
                            </IconButton> */}
                          </TableCell>
                        </TableRow>
                        <TableRow key={`Tablerow2_${index}`}>
                          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
                            <Collapse
                              in={openRows[row.iddetailmouvementphysique]}
                              timeout="auto"
                              unmountOnExit
                            >
                              <Box>
                                <Typography variant="h6" gutterBottom component="div">
                                  Details mouvement
                                </Typography>
                                <Table aria-label="purchases">
                                  <TableHead>
                                    <TableRow key="detailcolumn">
                                      <TableCell align="center" key={`pu_${index}`}>
                                        Prix Unitaire
                                      </TableCell>
                                      <TableCell align="center" key={`total_${index}`}>
                                        Total
                                      </TableCell>
                                      <TableCell align="center" key={`description_${index}`}>
                                        Description
                                      </TableCell>
                                      <TableCell align="center" key={`commentaire_${index}`}>
                                        Remarques
                                      </TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    <TableRow key="data">
                                      <TableCell align="center">
                                        {coloredNumber(formatNumber(row.pu))}
                                      </TableCell>
                                      <TableCell align="center">
                                        {coloredNumber(formatNumber(row.total))}
                                      </TableCell>
                                      <TableCell align="center">{row.description}</TableCell>
                                      <TableCell align="center">{row.commentaire}</TableCell>
                                    </TableRow>
                                  </TableBody>
                                </Table>
                              </Box>
                            </Collapse>
                          </TableCell>
                        </TableRow>
                      </Fragment>
                    ))
                ) : (
                  <>
                    <TableRow key="empty">
                      <TableCell colSpan={12}>
                        <Typography variant="subtitle1" color="textSecondary">
                          Aucune donnée disponible
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </>
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

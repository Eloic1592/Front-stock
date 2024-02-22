import {
  Box,
  Button,
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
import { StyledTable } from 'app/views/style/style';
import { useDetaildevisFunctions } from 'app/views/admin/demande/devis/detailfunction';
import { baseUrl } from 'app/utils/constant';
import { useParams } from 'react-router-dom';
import { formatNumber } from 'app/utils/utils';

const Listedetaildevis = ({ rowsPerPageOptions = [5, 10, 25, 50, 100, 200] }) => {
  const iddevis = useParams();
  // Colonne
  const columns = [
    { label: 'ID', field: 'iddetaildevis', align: 'center' },
    { label: 'Article', field: 'marque', align: 'center' },
    { label: 'Quantite', field: 'quantite', align: 'center' },
    { label: 'Prix unitaire', field: 'pu', align: 'center' },
    { label: 'Total', field: 'total', align: 'center' }
  ];
  const [data, setData] = useState({
    detaildevis: [],
    articles: []
  });
  const [editiddetail, setEditedIddetail] = useState('');
  const [editarticle, setEditarticle] = useState(['1']);
  const [editquantite, setEditquantite] = useState(0);
  const [editpu, setEditpu] = useState(0);
  const [edittotal, setEdittotal] = useState(0);

  const handleEdit = (row) => {
    setEditedIddetail('');
    setIsEditClicked(true);
    setSelectedRowId(row.iddetaildevis);
  };

  const {
    sortDirection,
    page,
    rowsPerPage,
    setSortDirection,
    isEditClicked,
    setIsEditClicked,
    setSelectedRowId,
    selectedRowId,
    handleChangePage,
    sortColumn,
    selectedIds,
    handleChangeRowsPerPage,
    cancelEdit,
    handleSelection,
    handleSelectAll,
    handleSelectColumn,
    sortedData,
    marque,
    setMarque,
    modele,
    setModele
  } = useDetaildevisFunctions(data);

  const [message, setMessage] = useState({
    text: 'Information enregistree',
    severity: 'success',
    open: false
  });
  const handleAlertClose = () => setMessage({ open: false });
  const [initialDataFetched, setInitialDataFetched] = useState(false);

  const handleupdate = () => {
    let detaildevis = {
      iddetaildevis: editiddetail,
      iddevis: iddevis.iddevis,
      idarticle: editarticle,
      quantite: editquantite,
      pu: editpu,
      total: edittotal
    };

    let url = baseUrl + '/devis/singledetails';
    fetch(url, {
      crossDomain: true,
      method: 'POST',
      body: JSON.stringify(detaildevis),
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        let devisParams = {
          iddevis: iddevis.iddevis
        };
        let url = baseUrl + '/devis/detaildevis';
        const response = await fetch(url, {
          crossDomain: true,
          method: 'POST',
          body: JSON.stringify(devisParams),
          headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`);
        }

        const responseData = await response.json();
        const newData = {
          detaildevis: responseData.detaildevis || [],
          articles: responseData.articles || []
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
      const selectedRow = sortedData.find((row) => row.iddetaildevis === selectedRowId);
      if (selectedRow) {
        setEditedIddetail(selectedRow.iddetaildevis);
      }
    }
    const calcultotal = () => {
      return editpu * editquantite;
    };
    setEdittotal(calcultotal);
  }, [
    isEditClicked,
    selectedRowId,
    sortedData,
    initialDataFetched,
    editpu,
    editquantite,
    iddevis.iddevis
  ]);

  //Retour page retour
  const redirect = () => {
    window.location.replace('/admin/devis');
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
              <Grid item xs={2}>
                <Button
                  className="button"
                  variant="contained"
                  aria-label="Edit"
                  color="error"
                  disabled={selectedIds.length === 0}
                >
                  <Icon>delete</Icon>
                </Button>
              </Grid>
            </Grid>
            <StyledTable>
              <TableHead>
                {/* Listage de Donnees */}
                <TableRow>
                  <TableCell width="5%">
                    <Checkbox
                      checked={data.detaildevis.every((row) =>
                        selectedIds.includes(row.iddetaildevis)
                      )}
                      indeterminate={
                        data.detaildevis.some((row) => selectedIds.includes(row.iddetaildevis)) &&
                        !data.detaildevis.every((row) => selectedIds.includes(row.iddetaildevis))
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell key="iddetaildevis" align="center" width="15%">
                    ID
                  </TableCell>
                  <TableCell key="marque" align="center" width="30%">
                    Article
                  </TableCell>
                  <TableCell key="quantite" align="center" width="15%">
                    Quantite
                  </TableCell>
                  <TableCell key="pu" align="center" width="15%">
                    Prix unitaire
                  </TableCell>
                  <TableCell key="total" align="center" width="15%">
                    Total
                  </TableCell>
                  <TableCell width="15%">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* Donnees du tableau */}
                {sortedData && sortedData.length > 0 ? (
                  sortedData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => (
                      <TableRow key={row.iddetaildevis}>
                        <TableCell>
                          <Checkbox
                            checked={selectedIds.includes(row.iddetaildevis)}
                            onChange={(event) => handleSelection(event, row.iddetaildevis)}
                          />
                        </TableCell>
                        {isEditClicked && row.iddetaildevis === selectedRowId ? (
                          <>
                            <TableCell key={row.iddetaildevis}>
                              <TextField
                                value={editiddetail}
                                onChange={(event) => setEditedIddetail(event.target.value)}
                                readOnly
                              />
                            </TableCell>
                            <TableCell>
                              <Select
                                fullWidth
                                labelId="select-label"
                                value={editarticle}
                                onChange={(event) => setEditarticle(event.target.value)}
                              >
                                <MenuItem value="1" disabled>
                                  article
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
                                value={editpu}
                                onChange={(event) => setEditpu(event.target.value)}
                              />
                            </TableCell>
                            <TableCell>
                              <TextField
                                type="number"
                                InputProps={{ inputProps: { min: 0 } }}
                                value={editquantite}
                                onChange={(event) => setEditquantite(event.target.value)}
                              />
                            </TableCell>
                            <TableCell>
                              <TextField
                                type="number"
                                InputProps={{ inputProps: { min: 0 } }}
                                value={edittotal}
                                readOnly
                              />
                            </TableCell>
                          </>
                        ) : (
                          <>
                            <TableCell align="center">{row.iddetaildevis}</TableCell>
                            <TableCell align="center">
                              {row.marque}-{row.modele}
                            </TableCell>
                            <TableCell align="center">{formatNumber(row.quantite)}</TableCell>
                            <TableCell align="center">{formatNumber(row.pu)}</TableCell>
                            <TableCell align="center">{formatNumber(row.total)}</TableCell>

                            <TableCell>
                              <IconButton
                                className="button"
                                variant="contained"
                                aria-label="Edit"
                                color="primary"
                                onClick={() => handleEdit(row)}
                              >
                                <Icon>edit_icon</Icon>
                              </IconButton>
                            </TableCell>
                          </>
                        )}
                        {isEditClicked && row.iddetaildevis === selectedRowId && (
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

export default Listedetaildevis;

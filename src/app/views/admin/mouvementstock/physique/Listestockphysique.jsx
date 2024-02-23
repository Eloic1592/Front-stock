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
import { useMphysiqueFunctions } from 'app/views/admin/mouvementstock/physique/physiquefunction';
import { baseUrl } from 'app/utils/constant';
import { converttodate, colorType } from 'app/utils/utils';

const Listestockphysique = ({ rowsPerPageOptions = [5, 10, 25, 50, 100, 200] }) => {
  // Colonne

  const columns = [
    { label: 'Mouv stock', field: 'idmouvementstock', align: 'center' },
    { label: 'Date de depot', field: 'datedepot', align: 'center' },
    { label: 'Mouvement', field: 'mouvement', align: 'center' },
    { label: 'Nature', field: 'naturemouvement', align: 'center' }
  ];

  const handleAlertClose = () => setMessage({ open: false });
  const [initialDataFetched, setInitialDataFetched] = useState(false);
  const [data, setData] = useState({
    mouvementStocks: [],
    naturemouvement: []
  });

  const [editedIdmouvement, setEditedIdmouvement] = useState('');
  const [editdatemouvement, setEditdatemouvement] = useState('');
  const [editnatmouvement, setEditnatmouvement] = useState(['1']);
  const [edittypemouvement, setEdittypemouvement] = useState(['1']);

  const [message, setMessage] = useState({
    text: 'Information enregistree',
    severity: 'success',
    open: false
  });

  const handleEdit = (row) => {
    setEditedIdmouvement('');
    setIsEditClicked(true);
    setSelectedRowId(row.idmouvementstock);
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
    setMouvement,
    naturemouvement,
    setNaturemouvement,
    mouvement,
    setIsEditClicked,
    setSelectedRowId,
    setDatedepot,
    datedepot,
    handleChangeRowsPerPage,
    cancelEdit,
    handleSelection,
    handleSelectAll,
    handleSelectColumn,
    sortedData
  } = useMphysiqueFunctions(data);

  const handleupdate = () => {
    let mouvementstock = {
      idmouvementstock: editedIdmouvement,
      datedepot: editdatemouvement,
      typemouvement: edittypemouvement,
      idnaturemouvement: editnatmouvement,
      statut: 0
    };

    let url = baseUrl + '/mouvementstock/createstockphysique';
    fetch(url, {
      crossDomain: true,
      method: 'POST',
      body: JSON.stringify(mouvementstock),
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

  //  Use effect
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
          mouvementStocks: responseData.mouvementStocks || [],
          naturemouvement: responseData.naturemouvements || []
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
      const selectedRow = sortedData.find((row) => row.idmouvementstock === selectedRowId);
      if (selectedRow) {
        setEditedIdmouvement(selectedRow.idmouvementstock);
      }
    }
  }, [isEditClicked, selectedRowId, sortedData, initialDataFetched]);

  const getInfo = (idmouvementstock) => {
    window.location.replace('/admin/detailphysique/' + idmouvementstock);
  };

  return (
    <Box width="100%" overflow="auto">
      <Grid container direction="column" spacing={2}>
        <Grid item key="search">
          <SimpleCard title="Rechercher un mouvement" sx={{ marginBottom: '16px' }}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  size="small"
                  type="date"
                  name="date"
                  variant="outlined"
                  sx={{ mb: 3 }}
                  value={datedepot}
                  onChange={(event) => setDatedepot(event.target.value)}
                />
              </Grid>
              <Grid item xs={4}>
                <Select
                  fullWidth
                  size="small"
                  labelId="select-label"
                  value={mouvement}
                  onChange={(event) => setMouvement(event.target.value)}
                >
                  <MenuItem value="0">Tous types</MenuItem>
                  <MenuItem value="1" key="1">
                    Entree
                  </MenuItem>
                  <MenuItem value="-1" key="-1">
                    Sortie
                  </MenuItem>
                </Select>
              </Grid>
              <Grid item xs={4}>
                <Select
                  fullWidth
                  size="small"
                  labelId="select-label"
                  value={naturemouvement}
                  onChange={(event) => setNaturemouvement(event.target.value)}
                >
                  <MenuItem value="0">Toutes natures</MenuItem>
                  {data.naturemouvement.map((row) => (
                    <MenuItem key={row.idnaturemouvement} value={row.idnaturemouvement}>
                      {row.naturemouvement}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
            </Grid>
          </SimpleCard>
        </Grid>

        <Grid item key="movementList">
          <SimpleCard title="Liste des mouvements physiques actuels">
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
                <TableRow>
                  <TableCell align="center" width="5%">
                    <Checkbox
                      checked={data.mouvementStocks.every((row) =>
                        selectedIds.includes(row.idmouvementstock)
                      )}
                      indeterminate={
                        data.mouvementStocks.some((row) =>
                          selectedIds.includes(row.idmouvementstock)
                        ) &&
                        !data.mouvementStocks.every((row) =>
                          selectedIds.includes(row.idmouvementstock)
                        )
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell key="idmouvementdestock" align="center" width="15%">
                    ID
                  </TableCell>
                  <TableCell key="datedepot" align="center" width="15%">
                    Date depot
                  </TableCell>
                  <TableCell key="mouvement" align="center" width="15%">
                    Mouvement
                  </TableCell>
                  <TableCell key="naturemouvement" align="center" width="15%">
                    Nature
                  </TableCell>
                  <TableCell align="center" width="5%">
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedData && sortedData.length > 0 ? (
                  sortedData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => (
                      <TableRow key={row.idmouvementstock}>
                        <TableCell align="center" width="5%">
                          <Checkbox
                            checked={selectedIds.includes(row.idmouvementstock)}
                            onChange={(event) => handleSelection(event, row.idmouvementstock)}
                          />
                        </TableCell>
                        {isEditClicked && row.idmouvementstock === selectedRowId ? (
                          <>
                            <TableCell key={row.idmouvementstock} align="center" width="15%">
                              <TextField
                                value={editedIdmouvement}
                                onChange={(event) => setEditedIdmouvement(event.target.value)}
                              />
                            </TableCell>
                            <TableCell align="center" width="15%">
                              <TextField
                                type="date"
                                value={editdatemouvement}
                                onChange={(event) => setEditdatemouvement(event.target.value)}
                              />
                            </TableCell>
                            <TableCell align="center" width="15%">
                              <Select
                                fullWidth
                                labelId="select-label"
                                value={edittypemouvement}
                                onChange={(event) => setEdittypemouvement(event.target.value)}
                              >
                                <MenuItem value="1" key="1">
                                  Entree
                                </MenuItem>
                                <MenuItem value="-1" key="-1">
                                  Sortie
                                </MenuItem>
                              </Select>
                            </TableCell>
                            <TableCell>
                              <Select
                                fullWidth
                                labelId="select-label"
                                value={editnatmouvement}
                                onChange={(event) => setEditnatmouvement(event.target.value)}
                              >
                                <MenuItem value="1" disabled>
                                  Nature
                                </MenuItem>
                                {data.naturemouvement.map((row) => (
                                  <MenuItem
                                    key={row.idnaturemouvement}
                                    value={row.idnaturemouvement}
                                  >
                                    {row.naturemouvement}
                                  </MenuItem>
                                ))}
                              </Select>
                            </TableCell>
                          </>
                        ) : (
                          <>
                            <TableCell align="center" width="15%">
                              {row.idmouvementstock}
                            </TableCell>
                            <TableCell align="center" width="15%">
                              {converttodate(row.datedepot)}
                            </TableCell>
                            <TableCell align="center" width="15%" style={{ fontWeight: 'bold' }}>
                              {colorType(row.mouvement)}
                            </TableCell>
                            <TableCell align="center" width="15%">
                              {row.naturemouvement}
                            </TableCell>

                            <TableCell align="center" width="10%">
                              <IconButton
                                className="button"
                                variant="contained"
                                aria-label="Edit"
                                color="primary"
                                onClick={() => getInfo(row.idmouvementstock)}
                              >
                                <Icon>info</Icon>
                              </IconButton>
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
                        {isEditClicked && row.idmouvementstock === selectedRowId && (
                          <>
                            <TableCell align="center" width="10%">
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
      </Grid>
      <Snackbar open={message.open} autoHideDuration={3000} onClose={handleAlertClose}>
        <Alert severity={message.severity} sx={{ width: '100%' }} variant="filled">
          {message.text}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Listestockphysique;

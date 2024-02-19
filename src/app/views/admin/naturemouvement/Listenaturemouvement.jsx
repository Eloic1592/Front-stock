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

const Listenaturemouvement = ({ rowsPerPageOptions = [5, 10, 25] }) => {
  // Colonne
  const columns = [
    { label: 'idnaturemouvement', field: 'idnaturemouvement', align: 'center' },
    { label: 'Nature du mouvement', field: 'naturemouvement', align: 'center' }
  ];

  const [data, setData] = useState([]);
  const [initialDataFetched, setInitialDataFetched] = useState(false);
  const [editedIdNaturemouvement, setEditedIdNaturemouvement] = useState(null);
  const [editedNaturemouvement, setEditedNaturemouvement] = useState(null);
  const [editedTypemouvement, setEditedTypemouvement] = useState('1');
  const [message, setMessage] = useState({
    text: 'Information enregistree',
    severity: 'success',
    open: false
  });

  const [isEditClicked, setIsEditClicked] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const handleAlertClose = () => setMessage({ open: false });

  // Modification(Update)
  const handleEdit = (row) => {
    setEditedIdNaturemouvement('');
    setEditedNaturemouvement('');
    setIsEditClicked(true);
    setSelectedRowId(row.idnaturemouvement);
  };

  const cancelEdit = () => {
    setEditedIdNaturemouvement('');
    setEditedNaturemouvement('');
    setIsEditClicked(false);
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

  const handleSubmit = () => {
    let naturemouvement = {
      idnaturemouvement: editedIdNaturemouvement,
      naturemouvement: editedNaturemouvement,
      typemouvement: editedTypemouvement
    };
    let url = baseUrl + '/naturemouvement/createnatmouvement';
    fetch(url, {
      crossDomain: true,
      method: 'POST',
      body: JSON.stringify(naturemouvement),
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
        let url = baseUrl + '/naturemouvement/listnatmouvement';
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
        setData(responseData);
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
      fetchData();
      setInitialDataFetched(true);
    }
    if (isEditClicked && selectedRowId !== null) {
      const selectedRow = sortedData.find((row) => row.idnaturemouvement === selectedRowId);

      if (selectedRow) {
        setEditedIdNaturemouvement(selectedRow.idnaturemouvement);
        setEditedNaturemouvement((prev) => (prev != null ? prev : selectedRow.naturemouvement));
      }
    }
  }, [isEditClicked, selectedRowId, sortedData, initialDataFetched]);

  return (
    <Box width="100%" overflow="auto">
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <SimpleCard title="Rechercher un type de mouvement" sx={{ marginBottom: '16px' }}>
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
                  <TableCell key="idnaturemouvement" align="left">
                    idnaturemouvement
                  </TableCell>
                  <TableCell key="naturemouvement" align="left">
                    nature mouvement
                  </TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* Donnees du tableau */}
                {sortedData && sortedData.length > 0 ? (
                  sortedData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <TableRow key={row.idnaturemouvement}>
                        {isEditClicked && row.idnaturemouvement === selectedRowId ? (
                          <>
                            <TableCell key={row.idnaturemouvement}>
                              <TextField
                                value={editedIdNaturemouvement}
                                onChange={(event) => setEditedIdNaturemouvement(event.target.value)}
                              />
                            </TableCell>
                            <TableCell>
                              <TextField
                                value={editedNaturemouvement}
                                onChange={(event) => setEditedNaturemouvement(event.target.value)}
                                onBlur={() =>
                                  setEditedNaturemouvement(
                                    editedNaturemouvement.trim() !== ''
                                      ? editedNaturemouvement
                                      : row.naturemouvement
                                  )
                                }
                              />
                            </TableCell>
                            <TableCell>
                              <Select
                                fullWidth
                                labelId="select-label"
                                value={editedTypemouvement}
                                onChange={(event) => setEditedTypemouvement(event.target.value)}
                              >
                                <MenuItem value="1" key="1">
                                  Physique
                                </MenuItem>
                                <MenuItem value="0" key="0">
                                  Fictif
                                </MenuItem>
                              </Select>
                            </TableCell>
                          </>
                        ) : (
                          <>
                            <TableCell>{row.idnaturemouvement}</TableCell>
                            <TableCell>{row.naturemouvement}</TableCell>
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

                        {isEditClicked && row.idnaturemouvement === selectedRowId && (
                          <>
                            <TableCell>
                              <IconButton
                                className="button"
                                variant="contained"
                                aria-label="Edit"
                                color="secondary"
                                onClick={() => handleSubmit()}
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
                  <TableRow key="no-data">
                    <TableCell colSpan={3}>
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

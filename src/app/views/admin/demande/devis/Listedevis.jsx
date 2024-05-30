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
import { useListedevisFunctions } from 'app/views/admin/demande/devis/function';
import { baseUrl } from 'app/utils/constant';
import { converttodate } from 'app/utils/utils';

const Listedevis = ({ rowsPerPageOptions = [10, 25, 50, 100, 200] }) => {
  // Colonne
  const columns = [
    { label: 'ID', field: 'iddevis', align: 'center' },
    { label: 'Nom client', field: 'nom', align: 'center' },
    { label: 'Date devis', field: 'datedevis', align: 'center' },
    { label: 'Libele', field: 'libelle', align: 'center' }
  ];

  const handleAlertClose = () => setMessage({ open: false });
  const [initialDataFetched, setInitialDataFetched] = useState(false);
  const [editedIddevis, setEditedIddevis] = useState('');
  const [editeddatedevis, setEditeddatedevis] = useState('');
  const [editednom, setEditedNom] = useState(['1']);
  const [editedLibelle, setEditedLibelle] = useState('');
  const [data, setData] = useState({
    clientdevis: [],
    clients: [],
    articles: []
  });
  const [message, setMessage] = useState({
    text: 'Information enregistree',
    severity: 'success',
    open: false
  });

  const handleEdit = (row) => {
    setEditedIddevis('');
    setIsEditClicked(true);
    setSelectedRowId(row.iddevis);
  };

  const handleupdate = () => {
    let devis = {
      iddevis: editedIddevis,
      idclient: editednom,
      datedevis: editeddatedevis,
      libelle: editedLibelle,
      statut: 0
    };

    let url = baseUrl + '/devis/createdevis';
    fetch(url, {
      crossDomain: true,
      method: 'POST',
      body: JSON.stringify(devis),
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

  const handleSubmit = () => {
    let proforma = [];
    proforma = selectedIds.map((id) => ({
      iddevis: id,
      datevalidation: new Date()
    }));

    let url = baseUrl + '/proforma/createproforma';
    fetch(url, {
      crossDomain: true,
      method: 'POST',
      body: JSON.stringify(proforma),
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
    setIsEditClicked,
    setSelectedRowId,
    datedevis,
    setDatedevis,
    handleChangeRowsPerPage,
    cancelEdit,
    handleSelection,
    handleSelectAll,
    handleSelectColumn,
    sortedData
  } = useListedevisFunctions(data);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = baseUrl + '/devis/contentdevis';
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
          clientdevis: responseData.clientdevis || [],
          clients: responseData.clients || [],
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

    if (isEditClicked && selectedRowId !== null) {
      const selectedRow = sortedData.find((row) => row.iddevis === selectedRowId);

      if (selectedRow) {
        setEditedIddevis(selectedRow.iddevis);
      }
    }
  }, [isEditClicked, selectedRowId, sortedData, initialDataFetched]);

  const getInfo = (iddevis) => {
    window.location.replace('/admin/detaildevis/' + iddevis);
  };
  return (
    <Box width="100%" overflow="auto">
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <SimpleCard title="Rechercher un devis" sx={{ marginBottom: '16px' }}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  size="small"
                  type="date"
                  name="datedevis"
                  variant="outlined"
                  value={datedevis}
                  onChange={(event) => setDatedevis(event.target.value)}
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
          <SimpleCard title="Liste des devis">
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
                  multiple
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
                  color="secondary"
                  disabled={selectedIds.length === 0}
                  onClick={handleSubmit}
                >
                  Generer un proforma
                </Button>
              </Grid>
            </Grid>
            <StyledTable>
              <TableHead>
                {/* Listage de Donnees */}
                <TableRow>
                  <TableCell width="5%">
                    <Checkbox
                      checked={data.clientdevis.every((row) => selectedIds.includes(row.iddevis))}
                      indeterminate={
                        data.clientdevis.some((row) => selectedIds.includes(row.iddevis)) &&
                        !data.clientdevis.every((row) => selectedIds.includes(row.iddevis))
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell key="iddevis" align="center" width="15%">
                    ID
                  </TableCell>
                  <TableCell key="nom" align="center" width="30%">
                    nom client
                  </TableCell>
                  <TableCell key="datedevis" align="center" width="15%">
                    date devis
                  </TableCell>
                  <TableCell key="libelle" align="center" width="30%">
                    Libele
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
                      <TableRow key={index}>
                        <TableCell>
                          <Checkbox
                            checked={selectedIds.includes(row.iddevis)}
                            onChange={(event) => handleSelection(event, row.iddevis)}
                          />
                        </TableCell>
                        {isEditClicked && row.iddevis === selectedRowId ? (
                          <>
                            <TableCell key={row.iddevis}>
                              <TextField
                                value={editedIddevis}
                                onChange={(event) => setEditedIddevis(event.target.value)}
                              />
                            </TableCell>
                            <TableCell>
                              <Select
                                labelId="select-label"
                                value={editednom}
                                onChange={(event) => setEditedNom(event.target.value)}
                                fullWidth
                              >
                                <MenuItem value="1" disabled>
                                  Choisir un client
                                </MenuItem>
                                {data.clients.map((row) => (
                                  <MenuItem key={row.idClient} value={row.idClient}>
                                    {row.nom}
                                  </MenuItem>
                                ))}
                              </Select>
                            </TableCell>
                            <TableCell>
                              <TextField
                                type="date"
                                value={editeddatedevis}
                                onChange={(event) => setEditeddatedevis(event.target.value)}
                              />
                            </TableCell>
                            <TableCell>
                              <TextField
                                value={editedLibelle}
                                onChange={(event) => setEditedLibelle(event.target.value)}
                              />
                            </TableCell>
                          </>
                        ) : (
                          <>
                            <TableCell>{row.iddevis}</TableCell>
                            <TableCell>{row.nom}</TableCell>
                            <TableCell>{converttodate(row.datedevis)}</TableCell>
                            <TableCell>{row.libelle}</TableCell>

                            <TableCell>
                              <IconButton
                                className="button"
                                variant="contained"
                                aria-label="Edit"
                                color="primary"
                                onClick={() => getInfo(row.iddevis)}
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
                        {isEditClicked && row.iddevis === selectedRowId && (
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

export default Listedevis;

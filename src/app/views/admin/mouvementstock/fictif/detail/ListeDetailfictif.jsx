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
import { StyledTable } from 'app/views/style/style';
import { useDFictifFunctions } from 'app/views/admin/mouvementstock/fictif/detail/dfictiffunction';
import { baseUrl } from 'app/utils/constant';
import { useParams } from 'react-router-dom';
import { formatNumber, converttodate } from 'app/utils/utils';

const Detailfictif = ({ rowsPerPageOptions = [5, 10, 25] }) => {
  const idmouvementstock = useParams();

  // Colonne
  const columns = [
    { label: 'ID', field: 'iddetailmouvementfictif', align: 'center' },
    { label: 'Marque', field: 'marque', align: 'center' },
    { label: 'Modele', field: 'modele', align: 'center' },
    { label: 'Responsable', field: 'idetudiant', align: 'center' },
    { label: 'Caution', field: 'caution', align: 'center' },
    { label: 'Date debut', field: 'datedeb', align: 'center' },
    { label: 'Date fin', field: 'datefin', align: 'center' },
    { label: 'Depot', field: 'depot', align: 'center' }
  ];
  const handleAlertClose = () => setMessage({ open: false });
  const [initialDataFetched, setInitialDataFetched] = useState(false);
  const [editiddetail, setEditedIddetail] = useState('');
  const [materiel, setMateriel] = useState(['1']);
  const [etudiant, setEtudiant] = useState(['1']);
  const [depot, setDepot] = useState(['1']);
  const [caution, setCaution] = useState('');
  const [datedeb, setDatedeb] = useState('');
  const [datefin, setDatefin] = useState('');

  const [data, setData] = useState({
    materiels: [],
    etudiants: [],
    depots: [],
    mouvementfictifs: []
  });

  const [message, setMessage] = useState({
    text: 'Information enregistree',
    severity: 'success',
    open: false
  });

  const handleupdate = () => {
    let detailmouvementfictif = {
      iddetailmouvementfictif: editiddetail,
      idmouvement: idmouvementstock.idmouvementstock,
      datedeb: datedeb,
      datefin: datefin,
      idetudiant: etudiant,
      caution: caution,
      idmateriel: materiel,
      iddepot: depot,
      statut: 0
    };
    let url = baseUrl + '/mouvementstock/createsingledetailfictif';
    fetch(url, {
      crossDomain: true,
      method: 'POST',
      body: JSON.stringify(detailmouvementfictif),
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
    setMarque,
    marque,
    modele,
    cancelEdit,
    handleEdit,
    setModele,
    handleChangeRowsPerPage,
    handleSelection,
    handleSelectAll,
    handleSelectColumn,
    sortedData
  } = useDFictifFunctions(data);

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
        const newData = {
          mouvementfictifs: responseData.mouvementfictifs || [],
          materiels: responseData.listemateriels || [],
          depots: responseData.depots || [],
          etudiants: responseData.etudiants || []
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
      const selectedRow = sortedData.find((row) => row.iddetailmouvementfictif === selectedRowId);

      if (selectedRow) {
        setEditedIddetail(selectedRow.iddetailmouvementfictif);
      }
    }
  }, [isEditClicked, selectedRowId, sortedData, initialDataFetched]);

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
                  <TableCell>
                    <Checkbox
                      checked={data.mouvementfictifs.every((row) =>
                        selectedIds.includes(row.iddetailmouvementfictif)
                      )}
                      indeterminate={
                        data.mouvementfictifs.some((row) =>
                          selectedIds.includes(row.iddetailmouvementfictif)
                        ) &&
                        !data.mouvementfictifs.every((row) =>
                          selectedIds.includes(row.iddetailmouvementfictif)
                        )
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
                  <TableCell key="idetudiant" align="left">
                    Responsable
                  </TableCell>
                  <TableCell key="caution" align="left">
                    Caution
                  </TableCell>
                  <TableCell key="datedeb" align="left">
                    Date Debut
                  </TableCell>
                  <TableCell key="datefin" align="left">
                    Date fin
                  </TableCell>
                  <TableCell key="depot" align="left">
                    Depot
                  </TableCell>
                  <TableCell>Action</TableCell>
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
                            checked={selectedIds.includes(row.iddetailmouvementfictif)}
                            onChange={(event) =>
                              handleSelection(event, row.iddetailmouvementfictif)
                            }
                          />
                        </TableCell>
                        {isEditClicked && row.iddetailmouvementfictif === selectedRowId ? (
                          <>
                            <TableCell key={row.iddetailmouvementfictif}>
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
                                value={etudiant}
                                onChange={(event) => setEtudiant(event.target.value)}
                              >
                                <MenuItem value="1" disabled>
                                  Etudiants
                                </MenuItem>
                                {data.etudiants.map((row) => (
                                  <MenuItem key={row.idetudiant} value={row.idetudiant}>
                                    {row.idetudiant}
                                  </MenuItem>
                                ))}
                              </Select>
                            </TableCell>
                            <TableCell>
                              <Select
                                fullWidth
                                labelId="select-label"
                                value={materiel}
                                onChange={(event) => setMateriel(event.target.value)}
                              >
                                <MenuItem value="1" disabled>
                                  Materiels
                                </MenuItem>
                                {data.materiels.map((row) => (
                                  <MenuItem key={row.idmateriel} value={row.idmateriel}>
                                    {row.marque}/{row.modele}-{row.numserie}
                                  </MenuItem>
                                ))}
                              </Select>
                            </TableCell>
                            <TableCell>
                              <TextField
                                type="date"
                                value={datedeb}
                                onChange={(event) => setDatedeb(event.target.value)}
                                sx={{ width: '100px' }}
                              />
                            </TableCell>
                            <TableCell>
                              <TextField
                                type="date"
                                value={datefin}
                                onChange={(event) => setDatefin(event.target.value)}
                                sx={{ width: '100px' }}
                              />
                            </TableCell>
                            <TableCell>
                              <TextField
                                type="number"
                                label="caution"
                                value={caution}
                                onChange={(event) => setCaution(event.target.value)}
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
                            <TableCell align="left">{row.iddetailmouvementfictif}</TableCell>
                            <TableCell align="left">{row.marque}</TableCell>
                            <TableCell align="left">{row.modele}</TableCell>
                            <TableCell align="left">{row.idetudiant}</TableCell>
                            <TableCell align="left">{formatNumber(row.caution)}</TableCell>
                            <TableCell align="left">{converttodate(row.datedeb)}</TableCell>
                            <TableCell align="left">{converttodate(row.datefin)}</TableCell>
                            <TableCell align="left">{row.depot}</TableCell>
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
                        {isEditClicked && row.iddetailmouvementfictif === selectedRowId && (
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

export default Detailfictif;

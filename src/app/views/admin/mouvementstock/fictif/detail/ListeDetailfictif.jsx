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
  TextField,
  Button,
  Menu
} from '@mui/material';
import Typography from '@mui/material/Typography';
import { useEffect, useState, Fragment } from 'react';
import { SimpleCard } from 'app/components';
import { StyledTable } from 'app/views/style/style';
import { useDFictifFunctions } from 'app/views/admin/mouvementstock/fictif/detail/dfictiffunction';
import { baseUrl } from 'app/utils/constant';
import { useParams } from 'react-router-dom';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { formatNumber, converttodate, colorType } from 'app/utils/utils';
import Table from '@mui/material/Table';
import Collapse from '@mui/material/Collapse';
import { saveAs } from 'file-saver';

import { pdf as renderPdf } from '@react-pdf/renderer';
import PDFMouvementfictif from './PDFMouvementfictif';

const Detailfictif = ({ rowsPerPageOptions = [10, 25, 50, 100, 200] }) => {
  const idmouvementstock = useParams();

  // Colonne
  const columns = [
    { label: 'Mouvement', field: 'mouvement', align: 'center' },
    { label: 'Marque', field: 'marque', align: 'center' },
    { label: 'Num Serie', field: 'numserie', align: 'center' },
    { label: 'Date debut', field: 'datedeb', align: 'center' },
    { label: 'Date fin', field: 'datefin', align: 'center' },
    { label: 'Depot', field: 'depot', align: 'center' }
  ];
  const handleAlertClose = () => setMessage({ open: false });
  const [initialDataFetched, setInitialDataFetched] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  function handleClose() {
    setAnchorEl(null);
  }
  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  // Collapse
  const [openRows, setOpenRows] = useState({});

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

  // Genere un pdf
  const generateMouvementPDF = async () => {
    const blob = await renderPdf(
      <PDFMouvementfictif dataList={data.mouvementfictifs} columns={columns} />
    ).toBlob();
    saveAs(blob, 'Mouvement_fictif.pdf');
  };

  const handleRowClick = (iddetailmouvementfictif) => {
    setOpenRows((prevState) => ({
      ...prevState,
      [iddetailmouvementfictif]: !prevState[iddetailmouvementfictif]
    }));
  };

  // Modification(Update)
  const handleEdit = (iddetailmouvementfictif) => {
    window.location.replace('/admin/editdetailmouvementfictif/' + iddetailmouvementfictif);
  };

  const cancel = (row) => {
    let detailmouvementfictif = {
      iddetailmouvementfictif: row.iddetailmouvementfictif,
      idmouvement: row.idmouvementstock,
      datedeb: row.datedeb,
      datefin: row.datefin,
      caution: row.caution,
      idmateriel: row.idmateriel,
      iddepot: row.iddepot,
      description: row.description,
      commentaire: row.commentaire,
      statut: row.statut === 0 ? 1 : 0
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
    setMarque,
    marque,
    modele,
    setModele,
    handleChangeRowsPerPage,
    handleSelectColumn,
    sortedData
  } = useDFictifFunctions(data);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let mouvementstockParams = {
          idmouvementstock: idmouvementstock.idmouvementstock
        };
        let url = baseUrl + '/mouvementstock/detailstockfictif';
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
  }, [
    isEditClicked,
    selectedRowId,
    sortedData,
    initialDataFetched,
    idmouvementstock.idmouvementstock
  ]);

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
                  {/* <TableCell align="center" width="5%">
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
                  </TableCell> */}
                  <TableCell key="depliant" align="center" width="5%"></TableCell>
                  <TableCell key="mouvement" align="center" width="8%">
                    Mouvement
                  </TableCell>
                  <TableCell key="numserie" align="center" width="11.1%">
                    N serie materiel
                  </TableCell>
                  <TableCell key="marque" align="center" width="11.1%">
                    Marque
                  </TableCell>
                  <TableCell key="datedeb" align="center" width="11.1%">
                    Date Debut
                  </TableCell>
                  <TableCell key="datefin" align="center" width="11.1%">
                    Date fin
                  </TableCell>
                  <TableCell key="depot" align="center" width="11.1%">
                    Depot
                  </TableCell>
                  <TableCell width="11.1%">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* Donnees du tableau */}
                {sortedData && sortedData.length > 0 ? (
                  sortedData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => (
                      <Fragment key={row.iddetailmouvementfictif}>
                        <TableRow key={index}>
                          {/* <TableCell align="center" width="5%">
                            <Checkbox
                              checked={selectedIds.includes(row.iddetailmouvementfictif)}
                              onChange={(event) =>
                                handleSelection(event, row.iddetailmouvementfictif)
                              }
                            />
                          </TableCell> */}
                          <TableCell>
                            <IconButton
                              aria-label="expand row"
                              size="small"
                              onClick={() => handleRowClick(row.iddetailmouvementfictif)}
                            >
                              {openRows[row.iddetailmouvementfictif] ? (
                                <KeyboardArrowUpIcon />
                              ) : (
                                <KeyboardArrowDownIcon />
                              )}
                            </IconButton>
                          </TableCell>

                          <TableCell align="center" style={{ fontWeight: 'bold' }}>
                            {colorType(row.mouvement)}
                          </TableCell>
                          <TableCell align="center">{row.numserie}</TableCell>
                          <TableCell align="center" style={{ fontWeight: 'bold' }}>
                            {formatNumber(row.caution)}
                          </TableCell>
                          <TableCell align="center">{converttodate(row.datedeb)}</TableCell>
                          <TableCell align="center">{converttodate(row.datefin)}</TableCell>
                          <TableCell align="center">{row.depot}</TableCell>
                          <TableCell align="center">
                            <IconButton
                              aria-label="More"
                              aria-owns={open ? 'long-menu' : undefined}
                              aria-haspopup="true"
                              onClick={handleClick}
                            >
                              <Icon>more_vert</Icon>
                            </IconButton>
                            <Menu
                              open={open}
                              id="long-menu"
                              anchorEl={anchorEl}
                              onClose={handleClose}
                              PaperProps={{ style: { maxHeight: 48 * 4.5, width: 200 } }}
                            >
                              <MenuItem key="Edit">
                                <IconButton
                                  className="button"
                                  variant="contained"
                                  aria-label="Edit"
                                  color="primary"
                                  onClick={() => handleEdit(row.iddetailmouvementfictif)}
                                >
                                  <Icon>edit_icon</Icon>
                                </IconButton>
                                Modifier
                              </MenuItem>
                              <MenuItem key="Delete">
                                <IconButton
                                  className="button"
                                  variant="contained"
                                  aria-label="Edit"
                                  color="error"
                                  onClick={() => cancel(row)}
                                >
                                  <Icon> {row && row.statut === 0 ? 'delete' : 'cancel'}</Icon>
                                </IconButton>
                                Supprimer
                              </MenuItem>
                            </Menu>
                          </TableCell>
                        </TableRow>
                        <TableRow key={`Tablerow2_${index}`}>
                          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                            <Collapse
                              in={openRows[row.iddetailmouvementfictif]}
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
                                      <TableCell align="center" key={`modele_${index}`}>
                                        Modele
                                      </TableCell>
                                      <TableCell align="center" key={`description_${index}`}>
                                        Description
                                      </TableCell>
                                      <TableCell align="center" key={`commentaire_${index}`}>
                                        Commentaire
                                      </TableCell>
                                      <TableCell align="center" key={`caution_${index}`}>
                                        Caution
                                      </TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    <TableRow key="data">
                                      <TableCell align="center">{row.modele}</TableCell>
                                      <TableCell align="center">{row.description}</TableCell>
                                      <TableCell align="center">{row.commentaire}</TableCell>
                                      <TableCell align="center">{row.caution}</TableCell>
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
                  <TableRow key="empty">
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

export default Detailfictif;

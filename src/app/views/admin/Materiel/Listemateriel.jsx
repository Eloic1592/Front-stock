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
  Alert,
  Snackbar,
  Grid
} from '@mui/material';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { formatNumber, colors, signatures } from 'app/utils/utils';
import { SimpleCard } from 'app/components';
import { StyledTable } from 'app/views/style/style';
import { useListematerielFunctions } from 'app/views/admin/materiel/function';
import { baseUrl } from 'app/utils/constant';
import { pdf as renderPdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import PDFMateriel from './PDFmateriel';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Table from '@mui/material/Table';
import Collapse from '@mui/material/Collapse';

const Listemateriel = ({ rowsPerPageOptions = [10, 25, 50, 100, 200] }) => {
  const columns = [
    { label: 'ID', field: 'idmateriel', align: 'center' },
    { label: 'Type materiel', field: 'typemateriel', align: 'center' },
    { label: 'Marque', field: 'marque', align: 'center' },
    { label: 'Modele', field: 'modele', align: 'center' },
    { label: 'Numserie', field: 'numserie', align: 'center' },
    { label: 'Prix de vente', field: 'prixvente', align: 'center' },
    { label: 'Caution', field: 'caution', align: 'center' },
    { label: 'Couleur', field: 'couleur', align: 'center' },
    { label: 'Signature', field: 'signature', align: 'center' },
    { label: 'statut', field: 'statut', align: 'center' }
  ];
  const [message, setMessage] = useState({
    text: 'Information enregistree',
    severity: 'success',
    open: false
  });

  // Collapse
  const [openRows, setOpenRows] = useState({});

  const [data, setData] = useState({
    typemateriels: [],
    listemateriels: []
  });
  const [initialDataFetched, setInitialDataFetched] = useState(false);
  const handleAlertClose = () => setMessage({ open: false });

  // Modification(Update)
  const handleEdit = (idmateriel) => {
    window.location.replace('/admin/editmateriel/' + idmateriel);
  };

  const cancelEdit = () => {};

  const {
    sortDirection,
    page,
    rowsPerPage,
    setSortDirection,
    handleChangePage,
    sortColumn,
    setCouleur,
    setTypemateriel,
    couleur,
    typemateriel,
    selectedIds,
    marque,
    setMarque,
    handleChangeRowsPerPage,
    handleSelectAll,
    handleSelection,
    handleSelectColumn,
    sortedData,
    signature,
    disponibilite,
    setDisponibilite,
    setSignature
  } = useListematerielFunctions(data);

  const handleRowClick = (idmateriel) => {
    setOpenRows((prevState) => ({
      ...prevState,
      [idmateriel]: !prevState[idmateriel]
    }));
  };

  const generateMaterielPDF = async () => {
    const blob = await renderPdf(
      <PDFMateriel dataList={data.listemateriels} columns={columns} />
    ).toBlob();
    saveAs(blob, 'Liste_materiel.pdf');
  };

  //  Use effect
  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = baseUrl + '/materiel/contentmateriel';
        const response = await fetch(url, {
          crossDomain: true,
          method: 'POST',
          body: JSON.stringify({}),
          headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
          setMessage({
            text: "Il y a un probleme, aucune donnee n'a ete recuperee",
            severity: 'error',
            open: true
          });
        }
        const responseData = await response.json();
        const newData = {
          typemateriels: responseData.typemateriels || [],
          listemateriels: responseData.listemateriels || []
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
          <SimpleCard title="Rechercher un materiel" sx={{ marginBottom: '16px' }}>
            <Grid container spacing={1}>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  size="small"
                  id="marque"
                  type="text"
                  label="Marque ou modele ou numero de serie"
                  name="marque"
                  value={marque}
                  onChange={(event) => setMarque(event.target.value)}
                />
              </Grid>
              <Grid item xs={2}>
                <Select
                  fullWidth
                  labelId="select-label"
                  value={typemateriel}
                  onChange={(event) => setTypemateriel(event.target.value)}
                  size="small"
                  sx={{ mb: 3 }}
                >
                  <MenuItem value="0">Tous types</MenuItem>
                  {data.typemateriels.map((row) => (
                    <MenuItem key={row.idtypemateriel} value={row.idtypemateriel}>
                      {row.typemateriel}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={2}>
                <Select
                  fullWidth
                  labelId="select-label"
                  value={couleur}
                  onChange={(event) => setCouleur(event.target.value)}
                  size="small"
                  sx={{ mb: 3 }}
                >
                  <MenuItem value="0">Toutes couleurs</MenuItem>
                  {colors.map((color, index) => (
                    <MenuItem key={index} value={color}>
                      {color}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={3}>
                <Select
                  fullWidth
                  labelId="select-label"
                  value={signature}
                  onChange={(event) => setSignature(event.target.value)}
                  size="small"
                  sx={{ mb: 3 }}
                >
                  <MenuItem value="1">Toutes Signatures</MenuItem>
                  {signatures.map((signature, index) => (
                    <MenuItem key={index} value={signature}>
                      {signature}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={2}>
                <Select
                  labelId="select-label"
                  sx={{ mb: 3 }}
                  size="small"
                  value={disponibilite}
                  onChange={(event) => setDisponibilite(event.target.value)}
                  fullWidth
                >
                  <MenuItem value="0">Tous statuts</MenuItem>
                  <MenuItem value="LIBRE">Libre</MenuItem>
                  <MenuItem value="OCCUPE">Occupe</MenuItem>
                </Select>
              </Grid>
            </Grid>
          </SimpleCard>
        </Grid>
        <Grid item>
          <SimpleCard title="Liste des materiels">
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
                  fullWidth
                  className="button"
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
                  onClick={generateMaterielPDF}
                >
                  <Icon>picture_as_pdf</Icon>
                </Button>
              </Grid>
            </Grid>
            <StyledTable id="datatable">
              <TableHead>
                {/* Listage de Donnees */}
                <TableRow>
                  <TableCell align="center" width="5%">
                    <Checkbox
                      checked={data.listemateriels.every((row) =>
                        selectedIds.includes(row.idmateriel)
                      )}
                      indeterminate={
                        data.listemateriels.some((row) => selectedIds.includes(row.idmateriel)) &&
                        !data.listemateriels.every((row) => selectedIds.includes(row.idmateriel))
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell key="depliant" align="center" width="5%"></TableCell>
                  <TableCell key="typemateriel" align="center" width="14%">
                    typemateriel
                  </TableCell>
                  <TableCell key="marque" align="center" width="14%">
                    marque
                  </TableCell>
                  <TableCell key="numserie" align="center" width="14%">
                    numserie
                  </TableCell>
                  <TableCell key="prixvente" align="center" width="14%">
                    prixvente
                  </TableCell>
                  <TableCell key="caution" align="center" width="14%">
                    caution
                  </TableCell>
                  <TableCell key="signature" align="center" width="14%">
                    signature
                  </TableCell>
                  <TableCell align="center" width="14%">
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
                      <>
                        <TableRow key={`row_${index}`}>
                          <TableCell>
                            <Checkbox
                              checked={selectedIds.includes(row.idmateriel)}
                              onChange={(event) => handleSelection(event, row.idmateriel)}
                            />
                          </TableCell>
                          <TableCell>
                            <IconButton
                              aria-label="expand row"
                              size="small"
                              onClick={() => handleRowClick(row.idmateriel)}
                            >
                              {openRows[row.idmateriel] ? (
                                <KeyboardArrowUpIcon />
                              ) : (
                                <KeyboardArrowDownIcon />
                              )}
                            </IconButton>
                          </TableCell>
                          <TableCell align="center">{row.typemateriel}</TableCell>
                          <TableCell align="center">{row.marque}</TableCell>
                          <TableCell align="center">{row.numserie}</TableCell>
                          <TableCell align="center" style={{ fontWeight: 'bold' }}>
                            {formatNumber(row.prixvente)}
                          </TableCell>
                          <TableCell align="center" style={{ fontWeight: 'bold' }}>
                            {formatNumber(row.caution)}
                          </TableCell>
                          <TableCell align="center">{row.signature}</TableCell>
                          <TableCell align="center">
                            <IconButton
                              className="button"
                              variant="contained"
                              aria-label="Edit"
                              color="primary"
                              onClick={() => handleEdit(row.idmateriel)}
                            >
                              <Icon>edit_icon</Icon>
                            </IconButton>
                            <IconButton
                              className="button"
                              variant="contained"
                              aria-label="Edit"
                              color="error"
                              onClick={() => cancelEdit(row.idmateriel)}
                            >
                              <Icon>cancel</Icon>
                            </IconButton>
                          </TableCell>
                        </TableRow>
                        <TableRow key={`Tablerow2_${index}`}>
                          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                            <Collapse in={openRows[row.idmateriel]} timeout="auto" unmountOnExit>
                              <Box>
                                <Typography variant="h6" gutterBottom component="div">
                                  Details article
                                </Typography>
                                <Table aria-label="purchases">
                                  <TableHead>
                                    <TableRow key="detailcolumn">
                                      <TableCell align="center" key={`description_${index}`}>
                                        Modele
                                      </TableCell>
                                      <TableCell align="center" key={`description_${index}`}>
                                        Description
                                      </TableCell>
                                      <TableCell align="center" key={`description_${index}`}>
                                        Statut
                                      </TableCell>
                                      <TableCell align="center" key={`description_${index}`}>
                                        Couleur
                                      </TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    <TableRow key="data">
                                      <TableCell align="center">{row.modele}</TableCell>
                                      <TableCell align="center">{row.description}</TableCell>
                                      <TableCell align="center">{row.statut}</TableCell>
                                      <TableCell align="center">{row.couleur}</TableCell>
                                    </TableRow>
                                  </TableBody>
                                </Table>
                              </Box>
                            </Collapse>
                          </TableCell>
                        </TableRow>
                      </>
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

export default Listemateriel;

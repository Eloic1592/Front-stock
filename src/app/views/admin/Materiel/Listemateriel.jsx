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
  /* Checkbox,*/
  Select,
  MenuItem,
  Alert,
  Snackbar,
  Grid
} from '@mui/material';
import Typography from '@mui/material/Typography';
import { useEffect, useState, Fragment } from 'react';
import { formatNumber, signatures } from 'app/utils/utils';
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
import { CSVLink } from 'react-csv';

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

  // Récupérer uniquement les trois dernières colonnes de chaque objet de données
  const filteredData = data.listemateriels.map((item) => ({
    typemateriel: item.typemateriel,
    marque: item.marque,
    modele: item.modele,
    numserie: item.numserie,
    description: item.description,
    prixvente: item.prixvente,
    caution: item.caution,
    signature: item.signature,
    statut: item.statut
  }));

  const [initialDataFetched, setInitialDataFetched] = useState(false);
  const handleAlertClose = () => setMessage({ open: false });

  // Modification(Update)
  const handleEdit = (idmateriel) => {
    window.location.replace('/admin/editmateriel/' + idmateriel);
  };
  const {
    sortDirection,
    page,
    rowsPerPage,
    setSortDirection,
    handleChangePage,
    sortColumn,
    setTypemateriel,
    typemateriel,
    marque,
    setMarque,
    handleChangeRowsPerPage,
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
    const blob = await renderPdf(<PDFMateriel dataList={data.listemateriels} />).toBlob();
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
              <Grid item xs={3}>
                <Select
                  fullWidth
                  labelId="select-label"
                  value={typemateriel}
                  onChange={(event) => setTypemateriel(event.target.value)}
                  size="small"
                  sx={{ mb: 3 }}
                >
                  <MenuItem key="0" value="0">
                    Tous types
                  </MenuItem>
                  {data.typemateriels.map((row) => (
                    <MenuItem key={row.idtypemateriel} value={row.idtypemateriel}>
                      {row.typemateriel}
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
                  <MenuItem key="1" value="1">
                    Toutes Signatures
                  </MenuItem>
                  {signatures.map((signature, index) => (
                    <MenuItem key={index} value={signature}>
                      {signature}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={3}>
                <Select
                  labelId="select-label"
                  sx={{ mb: 3 }}
                  size="small"
                  value={disponibilite}
                  onChange={(event) => setDisponibilite(event.target.value)}
                  fullWidth
                >
                  <MenuItem key="statut" value="2">
                    Tous statuts
                  </MenuItem>
                  <MenuItem key="0" value="0">
                    Libre
                  </MenuItem>
                  <MenuItem key="1" value="1">
                    Occupe
                  </MenuItem>
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
                  multiple
                >
                  <MenuItem value="1" disabled>
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
              <Grid item xs={2} container spacing={1}>
                <Grid item>
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
                <Grid item>
                  <Button className="button" variant="contained" color="success">
                    <CSVLink
                      data={filteredData}
                      filename="Liste_materiel.csv"
                      headers={columns.label}
                      separator=";"
                    >
                      Export CSV
                    </CSVLink>
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <StyledTable id="datatable">
              <TableHead>
                <TableRow key="head">
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
                  <TableCell key="caution" align="center" width="14%">
                    caution
                  </TableCell>
                  <TableCell key="signature" align="center" width="14%">
                    signature
                  </TableCell>
                  <TableCell key="statut" align="center" width="14%">
                    Statut
                  </TableCell>
                  <TableCell key="action" align="center" width="14%">
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedData && sortedData.length > 0 ? (
                  sortedData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <Fragment key={row.idmateriel}>
                        <TableRow key={`row-${row.idmateriel}`}>
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
                          <TableCell align="center">
                            {row.typemateriel}-{row.val}
                          </TableCell>
                          <TableCell align="center">{row.marque}</TableCell>
                          <TableCell align="center">{row.numserie}</TableCell>
                          <TableCell align="center" style={{ fontWeight: 'bold' }}>
                            {formatNumber(row.caution.toFixed(2))}
                          </TableCell>
                          <TableCell align="center">{row.signature}</TableCell>
                          <TableCell align="center">{row.statut}</TableCell>
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
                          </TableCell>
                        </TableRow>
                        <TableRow key={`details-${row.idmateriel}`}>
                          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
                            <Collapse in={openRows[row.idmateriel]} timeout="auto" unmountOnExit>
                              <Box>
                                <Typography variant="h6" gutterBottom component="div">
                                  Details matériel
                                </Typography>
                                <Table aria-label="purchases">
                                  <TableHead>
                                    <TableRow key="detailcolumn">
                                      <TableCell align="center" key="modele">
                                        Modèle
                                      </TableCell>
                                      <TableCell align="center" key="description">
                                        Description
                                      </TableCell>
                                      <TableCell align="center" key="prixvente">
                                        Prix de vente
                                      </TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    <TableRow key="data">
                                      <TableCell align="center">{row.modele}</TableCell>
                                      <TableCell align="center">{row.description}</TableCell>
                                      <TableCell align="center" style={{ fontWeight: 'bold' }}>
                                        {formatNumber(row.prixvente.toFixed(2))}
                                      </TableCell>
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

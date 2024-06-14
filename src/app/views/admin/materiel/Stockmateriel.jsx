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
  Select,
  MenuItem,
  Alert,
  Snackbar,
  Grid
} from '@mui/material';
import Typography from '@mui/material/Typography';
import { useEffect, useState, Fragment } from 'react';
import { formatNumber } from 'app/utils/utils';
import { SimpleCard, Breadcrumb } from 'app/components';
import { StyledTable } from 'app/views/style/style';
import { useStockfunctions } from 'app/views/admin/materiel/stockfunction';
import { baseUrl } from 'app/utils/constant';
import { pdf as renderPdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Container } from 'app/views/style/style';
import PDFStockmateriel from './PDFStockmateriel';
import Table from '@mui/material/Table';
import Collapse from '@mui/material/Collapse';

const Stockmateriel = ({ rowsPerPageOptions = [10, 25, 50, 100, 200] }) => {
  const columns = [
    { label: 'Type materiel', field: 'typemateriel', align: 'center' },
    { label: 'Libre', field: 'libre', align: 'center' },
    { label: 'Occupe', field: 'occupe', align: 'center' },
    { label: 'Total', field: 'total', align: 'center' }
  ];
  const [message, setMessage] = useState({
    text: 'Information enregistree',
    severity: 'success',
    open: false
  });

  const [data, setData] = useState({
    typemateriels: [],
    stockmateriels: [],
    countmateriel: 0,
    countmateriellibre: 0,
    countmaterieloccupe: 0,
    stocktypemateriels: []
  });

  const [openRows, setOpenRows] = useState({});
  const [initialDataFetched, setInitialDataFetched] = useState(false);
  const handleAlertClose = () => setMessage({ open: false });
  const {
    sortDirection,
    page,
    rowsPerPage,
    setSortDirection,
    handleChangePage,
    sortColumn,
    setTypemateriel,
    typemateriel,
    handleChangeRowsPerPage,
    handleSelectColumn,
    sortedData
  } = useStockfunctions(data);

  const generateMaterielPDF = async () => {
    const blob = await renderPdf(<PDFStockmateriel dataList={data.stocktypemateriels} />).toBlob();
    saveAs(blob, 'Stock_materiel.pdf');
  };

  const handleRowClick = (idmateriel) => {
    setOpenRows((prevState) => ({
      ...prevState,
      [idmateriel]: !prevState[idmateriel]
    }));
  };

  //  Use effect
  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = baseUrl + '/materiel/stockmateriel';
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
          stockmateriels: responseData.stockmateriels || [],
          countmateriel: responseData.countmateriel || 0,
          countmaterieloccupe: responseData.countmaterieloccupe || 0,
          countmateriellibre: responseData.countmateriellibre || 0,
          stocktypemateriels: responseData.stocktypemateriels || []
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

  // Redirect
  const getlist = () => {
    window.location.replace('/admin/listemateriel');
  };

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: 'Stock materiel', path: 'admin/stockmateriel' },
            { name: 'Stock par materiel' }
          ]}
        />
      </Box>
      <Box className="breadcrumb">
        <Button variant="contained" color="secondary" onClick={getlist}>
          Liste des materiels
        </Button>
      </Box>
      <Box width="100%" overflow="auto">
        <Grid container direction="column" spacing={1}>
          <Grid item>
            <SimpleCard title="Rechercher un materiel" sx={{ marginBottom: '16px' }}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
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
              </Grid>
            </SimpleCard>
          </Grid>
          <Grid item>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <SimpleCard title="Total materiels">
                  <Typography
                    variant="body1"
                    style={{ fontWeight: 'bold', fontSize: '1.5rem', color: 'black' }}
                  >
                    {data.countmateriel} matériel(s)
                  </Typography>
                </SimpleCard>
              </Grid>
              <Grid item xs={6}>
                <SimpleCard title="Materiels libres et occupes">
                  <Typography
                    variant="body1"
                    style={{ fontWeight: 'bold', fontSize: '1.2rem', color: 'green' }}
                  >
                    {data.countmateriellibre} libres(s)
                  </Typography>
                  <Typography
                    variant="body1"
                    style={{ fontWeight: 'bold', fontSize: '1.2rem', color: 'red' }}
                  >
                    {data.countmaterieloccupe} occupé(s)
                  </Typography>
                </SimpleCard>
              </Grid>
            </Grid>
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
                          </TableRow>
                          <TableRow key={`details-${row.idmateriel}`}>
                            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
                              <Collapse in={openRows[row.idmateriel]} timeout="auto" unmountOnExit>
                                <Box>
                                  <Typography variant="h6" gutterBottom component="div">
                                    Details article
                                  </Typography>
                                  <Table aria-label="purchases">
                                    <TableHead>
                                      <TableRow key="detailcolumn">
                                        <TableCell align="center" key="modele">
                                          Modele
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
    </Container>
  );
};

export default Stockmateriel;

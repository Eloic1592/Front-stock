import {
  Box,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Select,
  MenuItem,
  Grid,
  Snackbar,
  Button,
  Icon,
  Alert
} from '@mui/material';
import { SimpleCard } from 'app/components';
import Typography from '@mui/material/Typography';
import { StyledTable } from 'app/views/style/style';
import { useDetaildevisFunctions } from 'app/views/admin/demande/devis/detailfunction';
import { useState, useEffect } from 'react';
import { baseUrl } from 'app/utils/constant';
import { useParams } from 'react-router-dom';
import { formatNumber } from 'app/utils/utils';
import PDFproforma from './PDFproforma';
import { pdf as renderPdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import { useFetchProformaDetails } from 'app/views/admin/demande/proforma/proformafunction';

const Listedetailproforma = ({ rowsPerPageOptions = [10, 25, 50, 100, 200] }) => {
  const iddevis = useParams();
  // Colonne
  const columns = [
    { label: 'ID', field: 'iddetaildevis', align: 'center' },
    { label: 'Marque', field: 'marque', align: 'center' },
    { label: 'Modele', field: 'modele', align: 'center' },
    { label: 'Description', field: 'description', align: 'center' },
    { label: 'Quantite', field: 'quantite', align: 'center' },
    { label: 'Prix unitaire', field: 'pu', align: 'center' },
    { label: 'Total', field: 'total', align: 'center' }
  ];
  const [data, setData] = useState({ detaildevis: [], total: 0 });
  const {
    sortDirection,
    page,
    rowsPerPage,
    setSortDirection,
    handleChangePage,
    sortColumn,
    handleChangeRowsPerPage,
    handleSelectColumn,
    sortedData
  } = useDetaildevisFunctions(data);

  const [message, setMessage] = useState({
    text: 'Information enregistree',
    severity: 'success',
    open: false
  });
  const handleAlertClose = () => setMessage({ open: false });

  const proformaData = useFetchProformaDetails(iddevis.iddevis);
  const generateProformaPDF = async () => {
    const blob = await renderPdf(
      <PDFproforma dataList={proformaData} columns={columns} />
    ).toBlob();
    saveAs(blob, 'Proforma.pdf');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let devisParams = {
          iddevis: iddevis.iddevis
        };
        let url = baseUrl + '/proforma/detailproforma';
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
          total: responseData.somme || 0
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
    fetchData();
  }, [iddevis.iddevis]);

  //Retour page retour
  const redirect = () => {
    window.location.replace('/admin/proforma');
  };

  return (
    <Box width="100%" overflow="auto">
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <SimpleCard title="Details du proforma">
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
                  onClick={generateProformaPDF}
                >
                  <Icon>picture_as_pdf</Icon>
                </Button>
              </Grid>
            </Grid>
            <StyledTable>
              <TableHead>
                {/* Listage de Donnees */}
                <TableRow>
                  <TableCell key="iddetaildevis" align="center">
                    ID
                  </TableCell>
                  <TableCell key="marque" align="center">
                    Marque
                  </TableCell>
                  <TableCell key="modele" align="center">
                    Modele
                  </TableCell>
                  <TableCell key="description" align="center">
                    Description
                  </TableCell>
                  <TableCell key="quantite" align="center">
                    Quantite
                  </TableCell>
                  <TableCell key="pu" align="center">
                    Prix unitaire
                  </TableCell>
                  <TableCell key="total" align="center">
                    Total
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* Donnees du tableau */}
                {sortedData && sortedData.length > 0 ? (
                  sortedData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => (
                      <TableRow key={index}>
                        <TableCell align="center">{row.iddetaildevis}</TableCell>
                        <TableCell align="center">{row.marque}</TableCell>
                        <TableCell align="center">{row.modele}</TableCell>
                        <TableCell align="center">{row.description}</TableCell>
                        <TableCell align="center">{formatNumber(row.quantite)}</TableCell>
                        <TableCell align="center">{formatNumber(row.pu)}</TableCell>
                        <TableCell align="center">{formatNumber(row.total)}</TableCell>
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

            <Grid container spacing={2} alignItems="center">
              <Grid item xs={6}>
                <span style={{ fontSize: '1 em', color: 'green' }}>
                  SOMME: {formatNumber(data.total)}
                </span>
              </Grid>
              <Grid item xs={6}>
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

export default Listedetailproforma;

import {
  Box,
  Button,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Icon,
  Select,
  MenuItem,
  Alert,
  Snackbar,
  Grid
} from '@mui/material';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { formatNumber, coloredNumber } from 'app/utils/utils';
import { SimpleCard, Breadcrumb } from 'app/components';
import { StyledTable } from 'app/views/style/style';
import { useStockfunctions } from 'app/views/admin/materiel/stockfunction';
import { baseUrl } from 'app/utils/constant';
import { pdf as renderPdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import { Container } from 'app/views/style/style';
import PDFStockmateriel from './PDFStockmateriel';

const Stockmateriel = ({ rowsPerPageOptions = [5, 10, 25, 50, 100, 200] }) => {
  const columns = [
    { label: 'Type materiel', field: 'typemateriel', align: 'center' },
    { label: 'Libre', field: 'libre', align: 'center' },
    { label: 'Occupe', field: 'occupe', align: 'center' }
  ];
  const [message, setMessage] = useState({
    text: 'Information enregistree',
    severity: 'success',
    open: false
  });

  const [data, setData] = useState({
    typemateriels: [],
    stockmateriels: []
  });
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
    const blob = await renderPdf(
      <PDFStockmateriel dataList={data.stockmateriels} columns={columns} />
    ).toBlob();
    saveAs(blob, 'Stock_materiel.pdf');
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
          stockmateriels: responseData.stockmateriels || []
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
  }, [sortedData, initialDataFetched]);
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
      <Box width="100%" overflow="auto">
        <Grid container direction="column" spacing={2}>
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
            <SimpleCard title="Stock des materiels">
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
                    <TableCell key="typemateriel" align="center" width="35%">
                      Type materiel
                    </TableCell>
                    <TableCell key="libre" align="center" width="35%">
                      Libre
                    </TableCell>
                    <TableCell key="occupe" align="center" width="50%">
                      Occupe
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
                          <>
                            <TableCell align="center" style={{ fontWeight: 'bold' }}>
                              {row.typemateriel}
                            </TableCell>

                            <TableCell align="center">
                              {coloredNumber(formatNumber(row.libre))}
                            </TableCell>
                            <TableCell align="center" style={{ fontWeight: 'bold' }}>
                              {coloredNumber(formatNumber(row.occupe))}
                            </TableCell>
                          </>
                        </TableRow>
                      ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={10}>
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
    </Container>
  );
};

export default Stockmateriel;

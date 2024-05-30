import {
  Box,
  Button,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Icon,
  TextField,
  Select,
  MenuItem,
  Snackbar,
  Alert,
  Grid
} from '@mui/material';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { SimpleCard, Breadcrumb } from 'app/components';
import { StyledTable } from 'app/views/style/style';
import { Container } from 'app/views/style/style';
import { baseUrl } from 'app/utils/constant';
import { pdf as renderPdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import { formatNumber, coloredNumber } from 'app/utils/utils';
import { useStockfunctions } from './stockfunction';
import PDFStockArticle from './PDFStockArticle';
import { months } from 'app/utils/utils';

const Stockarticle = () => {
  // Colonne
  const columns = [
    { label: 'ID article', field: 'idarticle', align: 'center' },
    { label: 'modele', field: 'modele', align: 'center' },
    { label: 'marque', field: 'marque', align: 'center' },
    { label: 'typemateriel', field: 'typemateriel', align: 'center' },
    { label: 'quantite', field: 'quantite', align: 'center' },
    { label: 'mois', field: 'mois', align: 'center' },
    { label: 'annee', field: 'annee', align: 'center' }
  ];
  const [data, setData] = useState({ stockarticles: [], typemateriels: [] });
  const [initialDataFetched, setInitialDataFetched] = useState(false);
  const [message, setMessage] = useState({
    text: 'Information enregistree',
    severity: 'success',
    open: false
  });

  const handleAlertClose = () => setMessage({ open: false });

  const {
    sortDirection,
    page,
    rowsPerPage,
    setSortDirection,
    handleChangePage,
    sortColumn,
    handleChangeRowsPerPage,
    handleSelectColumn,
    sortedData,
    setMonth,
    month,
    setMarque,
    marque,
    typemateriel,
    setTypemateriel
  } = useStockfunctions(data);

  const generateArticlePDF = async () => {
    const blob = await renderPdf(
      <PDFStockArticle dataList={data.stockarticles} columns={columns} />
    ).toBlob();
    saveAs(blob, 'Stock_article.pdf');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = baseUrl + '/article/stockarticle';
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
          stockarticles: responseData.stockarticles || [],
          typemateriels: responseData.typemateriels || []
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
    window.location.replace('/admin/article');
  };

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: 'Stock article', path: 'admin/stocksarticle' },
            { name: 'Stock par article' }
          ]}
        />
      </Box>
      <Box className="breadcrumb">
        <Button variant="contained" color="secondary" onClick={getlist}>
          Liste des articles
        </Button>
      </Box>
      <Box width="100%" overflow="auto" key="Box1">
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <SimpleCard title="Rechercher un article" sx={{ marginBottom: '16px' }}>
              <Grid container spacing={1}>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    size="small"
                    type="text"
                    name="marque"
                    label="Marque ou modele"
                    variant="outlined"
                    value={marque}
                    onChange={(event) => setMarque(event.target.value)}
                    sx={{ mb: 3 }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Select
                    fullWidth
                    labelId="month-select-label"
                    variant="outlined"
                    size="small"
                    value={month}
                    onChange={(event) => setMonth(event.target.value)}
                    sx={{ mb: 3 }}
                  >
                    <MenuItem value="0">Tous les mois</MenuItem>
                    {months.map((monthName, index) => (
                      <MenuItem key={index + 1} value={index + 1}>
                        {monthName}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid item xs={4}>
                  <Select
                    fullWidth
                    labelId="select-label"
                    variant="outlined"
                    size="small"
                    value={typemateriel}
                    onChange={(event) => setTypemateriel(event.target.value)}
                    sx={{ mb: 3 }}
                  >
                    <MenuItem value="1">Tous types</MenuItem>
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
            <SimpleCard title="Stock actuels des articles">
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
                    aria-label="Éditer"
                    color="secondary"
                    onClick={generateArticlePDF}
                  >
                    <Icon>picture_as_pdf</Icon>
                  </Button>
                </Grid>
              </Grid>
              <StyledTable>
                <TableHead>
                  {/* Listage de Donnees */}
                  <TableRow>
                    <TableCell key="idarticle" width="10%">
                      idarticle
                    </TableCell>
                    <TableCell key="marque" width="15%" align="center">
                      marque
                    </TableCell>
                    <TableCell key="modele" width="15%" align="center">
                      modele
                    </TableCell>
                    <TableCell key="typemateriel" width="15%" align="center">
                      typemateriel
                    </TableCell>
                    <TableCell key="quantite" width="15%" align="center">
                      quantite
                    </TableCell>
                    <TableCell key="mois" width="15%" align="center">
                      mois
                    </TableCell>
                    <TableCell key="annee" width="15%" align="center">
                      annee
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
                            <TableCell> {row.idarticle}</TableCell>
                            <TableCell align="center">{row.marque}</TableCell>
                            <TableCell align="center">{row.modele}</TableCell>
                            <TableCell align="center">{row.typemateriel}</TableCell>
                            <TableCell align="center" style={{ fontWeight: 'bold' }}>
                              {coloredNumber(formatNumber(row.quantite))}
                            </TableCell>
                            <TableCell align="center">{row.mois_nom}</TableCell>
                            <TableCell align="center">{row.annee}</TableCell>
                          </>
                        </TableRow>
                      ))
                  ) : (
                    <TableRow>
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
                    rowsPerPageOptions={[5, 10, 25, 50, 100, 200]}
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

export default Stockarticle;

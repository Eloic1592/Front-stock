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
  Select,
  MenuItem,
  Snackbar,
  Alert,
  Grid
} from '@mui/material';
import Typography from '@mui/material/Typography';
import { useEffect, useState, Fragment } from 'react';
import { SimpleCard } from 'app/components';
import { StyledTable } from 'app/views/style/style';
import { useListeArticlefunctions } from 'app/views/admin/article/function';
import { baseUrl } from 'app/utils/constant';
import { pdf as renderPdf } from '@react-pdf/renderer';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { saveAs } from 'file-saver';
import PDFArticle from './PDFListeArticle';
import Table from '@mui/material/Table';
import Collapse from '@mui/material/Collapse';
import { formatNumber } from 'app/utils/utils';
import { CSVLink } from 'react-csv';

const ListeArticle = () => {
  // Colonne
  const columns = [
    { label: 'ID article', field: 'idarticle', align: 'center' },
    { label: 'modele', field: 'modele', align: 'center' },
    { label: 'marque', field: 'marque', align: 'center' },
    { label: 'Code article', field: 'codearticle', align: 'center' },
    { label: 'typemateriel', field: 'typemateriel', align: 'center' },
    { label: 'description', field: 'description', align: 'center' },
    { label: 'prix', field: 'prix', align: 'center' },
    { label: 'quantite en stock', field: 'quantitestock', align: 'center' }
  ];
  const [data, setData] = useState({ articles: [], typemateriels: [] });
  const [initialDataFetched, setInitialDataFetched] = useState(false);
  const [message, setMessage] = useState({
    text: 'Information enregistree',
    severity: 'success',
    open: false
  });

  // Csv/PDF data
  // Récupérer uniquement les trois dernières colonnes de chaque objet de données
  const filteredData = data.articles.map((item) => ({
    typemateriel: item.typemateriel,
    marque: item.marque,
    modele: item.modele,
    description: item.description
  }));

  // Collapse
  const [openRows, setOpenRows] = useState({});
  const handleAlertClose = () => setMessage({ open: false });

  // Modification(Update)
  const handleEdit = (idarticle) => {
    window.location.replace('/admin/editarticle/' + idarticle);
  };

  // Voir details des stock des articles
  const details = (idarticle) => {
    window.location.replace('/admin/detailsarticle/' + idarticle);
  };

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
    codearticle,
    setCodearticle,
    setMarque,
    marque,
    typemateriel,
    setTypemateriel
  } = useListeArticlefunctions(data);

  const handleRowClick = (idarticle) => {
    setOpenRows((prevState) => ({
      ...prevState,
      [idarticle]: !prevState[idarticle]
    }));
  };

  const generateArticlePDF = async () => {
    const blob = await renderPdf(
      <PDFArticle dataList={data.articles} columns={columns} />
    ).toBlob();
    saveAs(blob, 'Liste_article.pdf');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = baseUrl + '/article/contentarticle';
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
          articles: responseData.articles || [],
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

  return (
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
                  label="Marque"
                  variant="outlined"
                  value={marque}
                  onChange={(event) => setMarque(event.target.value)}
                  sx={{ mb: 3 }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  size="small"
                  type="text"
                  name="modele"
                  label="code article"
                  variant="outlined"
                  value={codearticle}
                  onChange={(event) => setCodearticle(event.target.value)}
                  sx={{ mb: 3 }}
                />
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
                  <MenuItem key="1" value="1">
                    Tous types
                  </MenuItem>
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
          <SimpleCard title="Liste des articles">
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
                  <MenuItem key="1" value="1">
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
                    onClick={generateArticlePDF}
                  >
                    <Icon>picture_as_pdf</Icon>
                  </Button>
                </Grid>
                <Grid item>
                  <Button className="button" variant="contained" color="success">
                    <CSVLink
                      data={filteredData}
                      filename="Liste_article.csv"
                      headers={columns.label}
                      separator=";"
                    >
                      Export CSV
                    </CSVLink>
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <StyledTable>
              <TableHead>
                <TableRow key="head">
                  <TableCell align="center" key="depliant" width="5%"></TableCell>
                  <TableCell width="8%" key="idarticle">
                    idarticle
                  </TableCell>
                  <TableCell width="16.6%" key="marque" align="center">
                    marque
                  </TableCell>
                  <TableCell width="16.6%" key="codearticle" align="center">
                    Code article
                  </TableCell>
                  <TableCell width="16.6%" key="typemateriel" align="center">
                    type materiel
                  </TableCell>
                  <TableCell width="16.6%" key="prix" align="center">
                    prix
                  </TableCell>
                  <TableCell width="16.6%" key="typemateriel" align="center">
                    quantite stock
                  </TableCell>
                  <TableCell align="center" key="action" width="16.6%">
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
                      <Fragment key={row.idarticle}>
                        <TableRow key={`row-${row.idarticle}`}>
                          <TableCell>
                            <IconButton
                              aria-label="expand row"
                              size="small"
                              onClick={() => handleRowClick(row.idarticle)}
                            >
                              {openRows[row.idarticle] ? (
                                <KeyboardArrowUpIcon />
                              ) : (
                                <KeyboardArrowDownIcon />
                              )}
                            </IconButton>
                          </TableCell>

                          <TableCell align="center"> {row.idarticle}</TableCell>
                          <TableCell align="center">{row.marque}</TableCell>
                          <TableCell align="center">{row.codearticle}</TableCell>
                          <TableCell align="center">
                            {row.typemateriel} - {row.val}
                          </TableCell>
                          <TableCell align="center">{formatNumber(row.prix)}</TableCell>
                          <TableCell align="center">{formatNumber(row.quantitestock)}</TableCell>
                          <TableCell align="center">
                            <IconButton
                              className="button"
                              variant="contained"
                              aria-label="Edit"
                              color="primary"
                              onClick={() => handleEdit(row.idarticle)}
                            >
                              <Icon>edit_icon</Icon>
                            </IconButton>
                            <IconButton
                              className="button"
                              variant="contained"
                              aria-label="Edit"
                              color="primary"
                              onClick={() => details(row.idarticle)}
                            >
                              <Icon>info</Icon>
                            </IconButton>
                          </TableCell>
                        </TableRow>
                        <TableRow key={`Tablerow2_${row.idarticle}_${index}`}>
                          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
                            <Collapse in={openRows[row.idarticle]} timeout="auto" unmountOnExit>
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
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    <TableRow key="description">
                                      <TableCell align="center">{row.modele}</TableCell>
                                      <TableCell align="center">{row.description}</TableCell>
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
  );
};

export default ListeArticle;

import {
  Box,
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
  Grid,
  Snackbar,
  Alert
} from '@mui/material';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { SimpleCard } from 'app/components';
import { StyledTable } from 'app/views/style/style';
import { useListecommandeFunctions } from 'app/views/admin/demande/commande/function';
import { baseUrl } from 'app/utils/constant';
import { converttodate } from 'app/utils/utils';
import PDFCommande from './PDFCommande';
import { saveAs } from 'file-saver';
import { pdf as renderPdf } from '@react-pdf/renderer';

const Listecommande = ({ rowsPerPageOptions = [10, 25, 50, 100, 200] }) => {
  // Colonne
  const columns = [
    { label: 'ID', field: 'idcommande', align: 'center' },
    { label: 'Nom client', field: 'nom', align: 'center' },
    { label: 'Date commande', field: 'datecommande', align: 'center' },
    { label: 'Libelle', field: 'libelle', align: 'center' }
  ];

  const handleAlertClose = () => setMessage({ open: false });
  const [initialDataFetched, setInitialDataFetched] = useState(false);

  const [data, setData] = useState({
    vueCommandes: [],
    clients: [],
    articles: []
  });

  const [message, setMessage] = useState({
    text: 'Information enregistree',
    severity: 'success',
    open: false
  });

  const {
    sortDirection,
    page,
    rowsPerPage,
    setSortDirection,
    isEditClicked,
    selectedRowId,
    handleChangePage,
    sortColumn,
    numerocommande,
    setNumerocommande,
    datecommande,
    setDatecommande,
    handleChangeRowsPerPage,
    handleSelectColumn,
    sortedData
  } = useListecommandeFunctions(data);

  async function fetchDataPDF(idcommande) {
    try {
      let commandeParams = {
        idcommande: idcommande
      };
      let url = baseUrl + '/commande/pdfcommande';

      const response = await fetch(url, {
        crossDomain: true,
        method: 'POST',
        body: JSON.stringify(commandeParams),
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }

      const responseData = await response.json();

      return {
        vueCommande: responseData.vueCommande || {},
        detailcommandeviews: responseData.detailcommandeviews || []
      };
    } catch (error) {
      setMessage({
        text: "Aucune donnee n 'a ete recuperee,veuillez verifier si le serveur est actif",
        severity: 'error',
        open: true
      });
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = baseUrl + '/commande/commandecontentpage';
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
          vueCommandes: responseData.vueCommandes || [],
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
  }, [isEditClicked, selectedRowId, sortedData, initialDataFetched]);

  const handleEdit = (idcommande) => {
    window.location.replace('/admin/editcommande/' + idcommande);
  };

  const getInfo = (idcommande) => {
    window.location.replace('/admin/detailcommande/' + idcommande);
  };

  const receptioncommande = (idcommande) => {
    window.location.replace('/admin/validercommande/' + idcommande);
  };

  const generateCommandePDF = async (idcommande) => {
    try {
      const finaldata = await fetchDataPDF(idcommande);

      // Vérification et utilisation des données récupérées
      if (finaldata) {
        console.log('Données pour le PDF récupérées avec succès :', finaldata.vueCommande);
        const blob = await renderPdf(
          <PDFCommande
            vueCommande={finaldata.vueCommande}
            detailcommandeviews={finaldata.detailcommandeviews}
          />
        ).toBlob();
        saveAs(blob, 'Commande_N ' + idcommande + '.PDF');
      }
    } catch (error) {
      console.error('Erreur lors de la génération du PDF :', error);
    }
  };
  return (
    <Box width="100%" overflow="auto">
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <SimpleCard title="Rechercher une commande" sx={{ marginBottom: '16px' }}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="numerocommande"
                  size="small"
                  type="text"
                  name="numerocommande"
                  label="ID de la commande"
                  value={numerocommande}
                  onChange={(event) => setNumerocommande(event.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  size="small"
                  type="date"
                  name="datecommande"
                  variant="outlined"
                  value={datecommande}
                  onChange={(event) => setDatecommande(event.target.value)}
                  sx={{ mb: 3 }}
                />
              </Grid>
            </Grid>
          </SimpleCard>
        </Grid>
        <Grid item>
          <SimpleCard title="Liste des commandes">
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
            </Grid>
            <StyledTable>
              <TableHead>
                {/* Listage de Donnees */}
                <TableRow>
                  <TableCell key="idcommande" align="center" width="15%">
                    Numero commande
                  </TableCell>
                  <TableCell key="nom" align="center" width="30%">
                    Nom client
                  </TableCell>
                  <TableCell key="datecommande" align="center" width="15%">
                    Date commande
                  </TableCell>
                  <TableCell key="libelle" align="center" width="30%">
                    Libelle
                  </TableCell>
                  <TableCell width="15%" align="center">
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
                      <TableRow key={index}>
                        <>
                          <TableCell align="center">{row.idcommande}</TableCell>
                          <TableCell align="center">{row.nom}</TableCell>
                          <TableCell align="center">{converttodate(row.datecommande)}</TableCell>
                          <TableCell align="center">{row.libelle}</TableCell>
                          <TableCell align="center">
                            <IconButton
                              className="button"
                              variant="contained"
                              aria-label="Edit"
                              color="inherit"
                              onClick={() => getInfo(row.idcommande)}
                            >
                              <Icon>info</Icon>
                            </IconButton>
                            <IconButton
                              className="button"
                              variant="contained"
                              aria-label="Edit"
                              color="primary"
                              onClick={() => handleEdit(row.idcommande)}
                            >
                              <Icon>edit_icon</Icon>
                            </IconButton>
                            <IconButton
                              className="button"
                              variant="contained"
                              aria-label="Edit"
                              color="default"
                              onClick={() => receptioncommande(row.idcommande)}
                            >
                              <Icon>assignment_returned</Icon>
                            </IconButton>
                            <IconButton
                              className="button"
                              variant="contained"
                              aria-label="Edit"
                              color="inherit"
                              onClick={() => generateCommandePDF(row.idcommande)}
                            >
                              <Icon>picture_as_pdf</Icon>
                            </IconButton>
                          </TableCell>
                        </>
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

export default Listecommande;

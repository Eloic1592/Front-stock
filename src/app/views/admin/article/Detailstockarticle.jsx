import {
  Box,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Icon,
  Button,
  Grid,
  Snackbar,
  Alert
} from '@mui/material';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { SimpleCard } from 'app/components';
import { StyledTable } from 'app/views/style/style';
import { baseUrl } from 'app/utils/constant';
import { Container } from 'app/views/style/style';
import { formatNumber } from 'app/utils/utils';
import { useParams } from 'react-router-dom';

const Detailstockarticle = ({ rowsPerPageOptions = [10, 25, 50, 100, 200] }) => {
  const idarticle = useParams();
  // Colonne
  const columns = [
    { label: 'code article', field: 'codearticle', align: 'center' },
    { label: 'modele', field: 'modele', align: 'center' },
    { label: 'marque', field: 'marque', align: 'center' },
    { label: 'type materiel', field: 'typemateriel', align: 'center' },
    { label: 'quantite', field: 'quantitestock', align: 'center' },
    { label: 'etat', field: 'etat', align: 'center' }
  ];

  const handleAlertClose = () => setMessage({ open: false });
  const [initialDataFetched, setInitialDataFetched] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [data, setData] = useState({
    stockarticles: [],
    sommebonetat: 0,
    sommeabime: 0
  });
  const [message, setMessage] = useState({
    text: 'Information enregistree',
    severity: 'success',
    open: false
  });

  //   Pagination
  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let articleParams = {
          idarticle: idarticle.idarticle
        };
        let url = baseUrl + '/article/detailstockarticle';
        const response = await fetch(url, {
          crossDomain: true,
          method: 'POST',
          body: JSON.stringify(articleParams),
          headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`);
        }

        const responseData = await response.json();
        const newData = {
          stockarticles: responseData.stockarticles || [],
          sommebonetat: responseData.sommebonetat || [],
          sommeabime: responseData.sommeabime || []
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
  }, [idarticle.idarticle, initialDataFetched]);
  // Redirect
  const getlist = () => {
    window.location.replace('/admin/article');
  };

  return (
    <Container>
      <Box width="100%" overflow="auto">
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Button variant="contained" color="inherit" onClick={getlist}>
              <Icon>arrow_backward</Icon>
            </Button>
          </Grid>
          <Grid item>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <SimpleCard title="Total articles en bon etat">
                  <Typography
                    variant="body1"
                    style={{ fontWeight: 'bold', fontSize: '1.5rem', color: 'green' }}
                  >
                    {data.sommebonetat} en bon etat
                  </Typography>
                </SimpleCard>
              </Grid>
              <Grid item xs={6}>
                <SimpleCard title="Total articles abimes">
                  <Typography
                    variant="body1"
                    style={{ fontWeight: 'bold', fontSize: '1.5rem', color: 'red' }}
                  >
                    {data.sommeabime} abimes
                  </Typography>
                </SimpleCard>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <SimpleCard title="Stock detaille de cette article">
              {/* Tri de tables */}

              <StyledTable>
                <TableHead>
                  {/* Listage de Donnees */}
                  <TableRow>
                    <TableCell key="idreception" align="center" width="25%">
                      Code article
                    </TableCell>
                    <TableCell key="marque" align="center" width="25%">
                      Marque
                    </TableCell>
                    <TableCell key="modele" align="center" width="25%">
                      Modele
                    </TableCell>
                    <TableCell key="typemateriel" align="center" width="25%">
                      Type materiel
                    </TableCell>
                    <TableCell key="quantitestock" align="center" width="25%">
                      Quantite
                    </TableCell>
                    <TableCell align="center" width="25%">
                      Etat
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* Donnees du tableau */}
                  {data.stockarticles && data.stockarticles.length > 0 ? (
                    data.stockarticles
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row, index) => (
                        <TableRow key={index}>
                          <>
                            <TableCell align="center" width="25%">
                              {row.codearticle}
                            </TableCell>
                            <TableCell align="center" width="25%">
                              {row.marque}
                            </TableCell>
                            <TableCell align="center" width="25%">
                              {row.modele}
                            </TableCell>
                            <TableCell align="center" width="25%">
                              {row.typemateriel}
                            </TableCell>
                            <TableCell align="center" width="25%">
                              {formatNumber(row.quantitestock)}
                            </TableCell>
                            <TableCell align="center" width="25%">
                              {row.etat}
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
                    count={data.stockarticles.length}
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

export default Detailstockarticle;

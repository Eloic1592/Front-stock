import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Grid,
  Paper
} from '@mui/material';

function Detailreapprovisionnement({ data, state, handleClose }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  //   Pagination
  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <Grid container>
      <Grid item>
        <Dialog
          open={state}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
          fullWidth
          maxWidth="md"
        >
          <DialogTitle id="form-dialog-title">Liste des articles</DialogTitle>
          <DialogContent>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell width="25%">Marque-Modele</TableCell>
                    <TableCell width="25%">Code article</TableCell>
                    <TableCell width="25%">Quantite en stock</TableCell>
                    <TableCell width="25%">Stock de securité</TableCell>
                    <TableCell width="25%">Stock de recharge</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(rowsPerPage > 0
                    ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : data
                  ).map((article) => (
                    <TableRow key={article.idarticle}>
                      <TableCell width="25%">
                        {article.marque} - {article.modele}
                      </TableCell>
                      <TableCell width="25%">{article.codearticle}</TableCell>
                      <TableCell width="25%" style={{ fontWeight: 'bold' }}>
                        {article.quantitestock.toFixed(2)}
                      </TableCell>
                      <TableCell width="25%" style={{ fontWeight: 'bold' }}>
                        {article.stocksecurite.toFixed(2)}
                      </TableCell>
                      <TableCell width="25%" style={{ fontWeight: 'bold' }}>
                        {article.stockrecharge.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'Tous', value: -1 }]}
              component="div"
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary" variant="contained">
              Valider
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Grid>
  );
}

export default Detailreapprovisionnement;

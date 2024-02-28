import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  Radio,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle
} from '@mui/material';

function Datalistarticle({ articles, state, handleClose, setArticle }) {
  const [selectedArticleId, setSelectedArticleId] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filter, setFilter] = useState('');

  const handleRadioChange = (event) => {
    setSelectedArticleId(event.target.value);
  };

  const handleRetrieveData = () => {
    if (selectedArticleId !== null) {
      setArticle(selectedArticleId);
    } else {
      console.log('Aucun article sélectionné.');
    }
    handleClose(); // Fermer la boîte de dialogue après avoir récupéré la valeur
  };

  //   Pagination
  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const filteredArticles = articles.filter(
    (article) =>
      (article.marque && article.marque.toLowerCase().includes(filter.toLowerCase())) ||
      (article.modele && article.modele.toLowerCase().includes(filter.toLowerCase())) ||
      (article.description && article.description.toLowerCase().includes(filter.toLowerCase()))
  );

  return (
    <Dialog
      open={state}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      fullWidth
      maxWidth="md"
    >
      <DialogTitle id="form-dialog-title">Liste des articles</DialogTitle>
      <DialogContent>
        <TextField
          label="Filtrer"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
        />

        <TableContainer component={Table}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell width="25%"></TableCell>
                <TableCell width="25%">Marque</TableCell>
                <TableCell width="25%">Modele</TableCell>
                <TableCell width="50%">Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? filteredArticles.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : filteredArticles
              ).map((article) => (
                <TableRow key={article.idarticle}>
                  <TableCell width="25%">
                    <Radio
                      checked={selectedArticleId === article.idarticle}
                      onChange={handleRadioChange}
                      value={article.idarticle}
                      name="radio-buttons"
                      inputProps={{ 'aria-label': `Row ${article.idarticle}` }}
                    />
                  </TableCell>
                  <TableCell width="25%">{article.marque}</TableCell>
                  <TableCell width="25%">{article.modele}</TableCell>
                  <TableCell width="50%">{article.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, { label: 'Tous', value: -1 }]}
          component="div"
          count={filteredArticles.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </DialogContent>
      <DialogActions>
        <Button color="secondary" onClick={handleClose} variant="contained">
          Annuler
        </Button>
        <Button onClick={handleRetrieveData} color="primary" variant="contained">
          Valider
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default Datalistarticle;

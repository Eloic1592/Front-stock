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
  DialogTitle,
  Paper
} from '@mui/material';

function Datalistmateriel({ Materiels, state, handleClose, setmateriel }) {
  const [selectedmaterielId, setSelectedmaterielId] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filter, setFilter] = useState('');

  const handleRadioChange = (event) => {
    setSelectedmaterielId(event.target.value);
  };

  const handleRetrieveData = () => {
    if (selectedmaterielId !== null) {
      setmateriel(selectedmaterielId);
    } else {
      console.log('Aucun materiel sélectionné.');
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
  // Filtre
  const filteredMateriels = Materiels.filter(
    (materiel) =>
      (materiel.marque && materiel.marque.toLowerCase().includes(filter.toLowerCase())) ||
      (materiel.modele && materiel.modele.toLowerCase().includes(filter.toLowerCase())) ||
      (materiel.numserie && materiel.numserie.toLowerCase().includes(filter.toLowerCase()))
  );

  return (
    <Dialog
      open={state}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      fullWidth
      maxWidth="md"
    >
      <DialogTitle id="form-dialog-title">Liste des Materiels</DialogTitle>
      <DialogContent>
        <TextField
          label="Filtrer"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
        />

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell width="10%"></TableCell>
                <TableCell width="20%">Marque</TableCell>
                <TableCell width="20%">Modele</TableCell>
                <TableCell width="20%">Numero serie</TableCell>
                <TableCell width="20%">Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? filteredMateriels.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : filteredMateriels
              ).map((materiel) => (
                <TableRow key={materiel.idmateriel}>
                  <TableCell width="25%">
                    <Radio
                      checked={selectedmaterielId === materiel.idmateriel}
                      onChange={handleRadioChange}
                      value={materiel.idmateriel}
                      name="radio-buttons"
                      inputProps={{ 'aria-label': `Row ${materiel.idmateriel}` }}
                    />
                  </TableCell>
                  <TableCell width="20%">{materiel.marque}</TableCell>
                  <TableCell width="20%">{materiel.modele}</TableCell>
                  <TableCell width="20%">{materiel.numserie}</TableCell>
                  <TableCell width="20%">{materiel.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, { label: 'Tous', value: -1 }]}
          component="div"
          count={filteredMateriels.length}
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

export default Datalistmateriel;

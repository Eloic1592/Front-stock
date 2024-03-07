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

function Datalistetudiant({ Etudiant, state, handleClose, setetudiant }) {
  const [selectedetudiantId, setSelectedetudiantId] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filter, setFilter] = useState('');
  const [message, setMessage] = useState({
    message: '',
    state: false,
    color: 'green'
  });

  const handleRadioChange = (event) => {
    setSelectedetudiantId(event.target.value);
  };

  const handleRetrieveData = () => {
    if (selectedetudiantId !== null) {
      setetudiant(selectedetudiantId);
    } else {
      setMessage({
        message: 'Aucun element selectionnee',
        state: true,
        color: 'red'
      });
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
  const filteredEtudiant = Etudiant.filter(
    (etudiant) =>
      (etudiant.idetudiant && etudiant.idetudiant.toLowerCase().includes(filter.toLowerCase())) ||
      (etudiant.nom && etudiant.nom.toLowerCase().includes(filter.toLowerCase())) ||
      (etudiant.prenom && etudiant.prenom.toLowerCase().includes(filter.toLowerCase())) ||
      (etudiant.mail && etudiant.mail.toLowerCase().includes(filter.toLowerCase())) ||
      (etudiant.sexe && etudiant.sexe.toLowerCase().includes(filter.toLowerCase()))
  );

  return (
    <Dialog
      open={state}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      fullWidth
      maxWidth="md"
    >
      <DialogTitle id="form-dialog-title">Liste des Etudiant</DialogTitle>
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
                <TableCell width="15%">ETU</TableCell>
                <TableCell width="40%">Nom et Prenom</TableCell>
                <TableCell width="30%">Mail</TableCell>
                <TableCell width="10%">Sexe</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? filteredEtudiant.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : filteredEtudiant
              ).map((etudiant) => (
                <TableRow key={etudiant.idetudiant}>
                  <TableCell width="25%">
                    <Radio
                      checked={selectedetudiantId === etudiant.idetudiant}
                      onChange={handleRadioChange}
                      value={etudiant.idetudiant}
                      name="radio-buttons"
                      inputProps={{ 'aria-label': `Row ${etudiant.idetudiant}` }}
                    />
                  </TableCell>
                  <TableCell width="15%">{etudiant.idetudiant}</TableCell>
                  <TableCell width="40%">
                    {etudiant.nom} {etudiant.prenom}
                  </TableCell>
                  <TableCell width="30%">{etudiant.mail}</TableCell>
                  <TableCell width="10%">{etudiant.sexe}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, { label: 'Tous', value: -1 }]}
          component="div"
          count={filteredEtudiant.length}
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

export default Datalistetudiant;

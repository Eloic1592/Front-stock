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

function Datalistclient({ Client, state, handleClose, setClient }) {
  const [selectedClientId, setSelectedClientId] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filter, setFilter] = useState('');

  const handleRadioChange = (event) => {
    setSelectedClientId(event.target.value);
  };

  const handleRetrieveData = () => {
    if (selectedClientId !== null) {
      setClient(selectedClientId);
    } else {
      console.log('Aucun Client sélectionné.');
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
  const filteredClient = Client.filter(
    (Client) =>
      (Client.nom && Client.nom.toLowerCase().includes(filter.toLowerCase())) ||
      (Client.nif && Client.nif.toLowerCase().includes(filter.toLowerCase())) ||
      (Client.adresse && Client.adresse.toLowerCase().includes(filter.toLowerCase())) ||
      (Client.telephone && Client.telephone.toLowerCase().includes(filter.toLowerCase()))
  );

  return (
    <Dialog
      open={state}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      fullWidth
      maxWidth="md"
    >
      <DialogTitle id="form-dialog-title">Liste des Client</DialogTitle>
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
                <TableCell width="10%"></TableCell>
                <TableCell width="15%">Nom</TableCell>
                <TableCell width="15%">Telephone</TableCell>
                <TableCell width="30%">Adresse</TableCell>
                <TableCell width="15%">Nif</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? filteredClient.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : filteredClient
              ).map((Client) => (
                <TableRow key={Client.idClient}>
                  <TableCell width="25%">
                    <Radio
                      checked={selectedClientId === Client.idClient}
                      onChange={handleRadioChange}
                      value={Client.idClient}
                      name="radio-buttons"
                      inputProps={{ 'aria-label': `Row ${Client.idClient}` }}
                    />
                  </TableCell>
                  <TableCell width="15%">{Client.nom}</TableCell>
                  <TableCell width="15%">{Client.telephone}</TableCell>
                  <TableCell width="30%">{Client.adresse}</TableCell>
                  <TableCell width="15%">{Client.nif}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, { label: 'Tous', value: -1 }]}
          component="div"
          count={filteredClient.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </DialogContent>
      <DialogActions>
        <Button color="inherit" onClick={handleClose} variant="contained">
          Annuler
        </Button>
        <Button onClick={handleRetrieveData} color="primary" variant="contained">
          Valider
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default Datalistclient;

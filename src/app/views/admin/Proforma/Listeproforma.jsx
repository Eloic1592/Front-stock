import {
  Box,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Select,
  MenuItem,
  Grid
} from '@mui/material';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import { SimpleCard } from 'app/components';
import { StyledTable } from 'app/views/style/style';
import { useListedevisFunctions } from 'app/views/admin/Proforma/function';

// Proforma tsy afaka ovaina intsony
const Listeproforma = ({ rowsPerPageOptions = [5, 10, 25] }) => {
  // Colonne
  const columns = [
    { label: 'ID', field: 'id', align: 'center' },
    { label: 'Commande', field: 'idcommande', align: 'center' },
    { label: 'Client', field: 'idclient', align: 'center' },
    { label: 'devis', field: 'iddevis', align: 'center' },
    { label: 'statut', field: 'statut', align: 'center' }
  ];

  const data = [
    // { id: 1, idcommande: 'COM1',idclient:"CL1",iddevis:"DEV1",statut:"1" /* other fields... */ },
    // { id: 10, idcommande: 'COM1',idclient:"CL1",iddevis:"DEV1",statut:"1" /* other fields... */ },
    // { id: 3, idcommande: 'COM1',idclient:"CL1",iddevis:"DEV1",statut:"1" /* other fields... */ },
    // { id: 4, idcommande: 'COM1',idclient:"CL1",iddevis:"DEV1",statut:"1" /* other fields... */ },
    // { id: 5, idcommande: 'COM1',idclient:"CL1",iddevis:"DEV1",statut:"1" /* other fields... */ },
    // { id: 7, idcommande: 'COM1',idclient:"CL1",iddevis:"DEV1",statut:"1" /* other fields... */ },
    // { id: 8, idcommande: 'COM1',idclient:"CL1",iddevis:"DEV1",statut:"1" /* other fields... */ },
  ];

  const {
    editingId,
    sortDirection,
    page,
    rowsPerPage,
    setSortDirection,
    isEditClicked,
    selectedRowId,
    handleChangePage,
    sortColumn,
    selectedIds,
    setClient,
    setDate,
    client,
    date,
    handleChangeRowsPerPage,
    handleEdit,
    cancelEdit,
    handleSave,
    handleSelection,
    handleSelectAll,
    handleSelectColumn,
    sortedData
  } = useListedevisFunctions(data);

  //  Use effect
  useEffect(() => {}, [sortedData]);

  return (
    <Box width="100%" overflow="auto">
      <SimpleCard title="Liste des mouvements proformas">
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
              {columns.map((column) => (
                <MenuItem value={column.field}>{column.label}</MenuItem>
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
              {columns.map((column, index) => (
                // Nom des colonnes du tableau
                <TableCell key={index} align={column.align || 'left'}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Donnees du tableau */}
            {sortedData && sortedData.length > 0 ? (
              sortedData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow key={index}>
                    {columns.map((column, index) => (
                      <TableCell key={index} align={column.align || 'left'}>
                        {column.render ? column.render(row) : row[column.field]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
            ) : (
              <p>
                <Typography variant="subtitle1" color="textSecondary">
                  Aucune donnee disponible
                </Typography>
              </p>
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
              count={data.length}
              onPageChange={handleChangePage}
              rowsPerPageOptions={rowsPerPageOptions}
              onRowsPerPageChange={handleChangeRowsPerPage}
              nextIconButtonProps={{ 'aria-label': 'Next Page' }}
              backIconButtonProps={{ 'aria-label': 'Previous Page' }}
            />
          </Grid>
        </Grid>
      </SimpleCard>
    </Box>
  );
};

export default Listeproforma;

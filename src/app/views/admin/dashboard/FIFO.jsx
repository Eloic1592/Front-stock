import React, { useState } from 'react';
import { formatNumber, coloredNumber } from 'app/utils/utils';
import { SimpleCard } from 'app/components';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Grid
} from '@mui/material';

function FIFO({ fifos }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filter, setFilter] = useState('');

  //   Pagination
  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const filtrefifos = fifos.filter(
    (fifos) =>
      (fifos.marque && fifos.marque.toLowerCase().includes(filter.toLowerCase())) ||
      (fifos.modele && fifos.modele.toLowerCase().includes(filter.toLowerCase())) ||
      (fifos.description && fifos.description.toLowerCase().includes(filter.toLowerCase()))
  );

  return (
    <Grid container>
      <Grid item>
        <SimpleCard title="Cout des articles (FIFO)">
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell width="12%">Marque</TableCell>
                  <TableCell width="12%">Modele</TableCell>
                  <TableCell width="12%">Description</TableCell>
                  <TableCell width="12%">Total achetes</TableCell>
                  <TableCell width="12%">Total vendus</TableCell>
                  <TableCell width="12%">Total achetes valeur</TableCell>
                  <TableCell width="12%">Total venduts valeur</TableCell>
                  <TableCell width="12%">Stock actuel</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? filtrefifos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  : filtrefifos
                ).map((fifos) => (
                  <TableRow key={fifos.idarticle}>
                    <TableCell width="12%">{fifos.marque}</TableCell>
                    <TableCell width="12%">{fifos.modele}</TableCell>
                    <TableCell width="12%">{fifos.description}</TableCell>
                    <TableCell width="12%">
                      {coloredNumber(formatNumber(fifos.total_achetes))}
                    </TableCell>
                    <TableCell width="12%">
                      {coloredNumber(formatNumber(fifos.total_vendus))}
                    </TableCell>
                    <TableCell width="12%">
                      {coloredNumber(formatNumber(fifos.total_achetes_valeur))}
                    </TableCell>
                    <TableCell width="12%">
                      {coloredNumber(formatNumber(fifos.total_vendus_valeur))}
                    </TableCell>
                    <TableCell width="12%">
                      {coloredNumber(formatNumber(fifos.quantite_stock))}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50, 100, 200, { label: 'Tous', value: -1 }]}
            component="div"
            count={filtrefifos.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </SimpleCard>
      </Grid>
    </Grid>
  );
}

export default FIFO;

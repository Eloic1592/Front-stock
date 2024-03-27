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

function LIFO({ lifos }) {
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
  const filtrelifos = lifos.filter(
    (lifos) =>
      (lifos.marque && lifos.marque.toLowerCase().includes(filter.toLowerCase())) ||
      (lifos.modele && lifos.modele.toLowerCase().includes(filter.toLowerCase())) ||
      (lifos.description && lifos.description.toLowerCase().includes(filter.toLowerCase()))
  );

  return (
    <Grid container>
      <Grid item>
        <SimpleCard title="Cout des articles (LIFO)">
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell width="25%">Marque</TableCell>
                  <TableCell width="25%">Modele</TableCell>
                  <TableCell width="25%">Description</TableCell>
                  <TableCell width="25%">Cout vendus</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? filtrelifos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  : filtrelifos
                ).map((lifos) => (
                  <TableRow key={lifos.idarticle}>
                    <TableCell width="25%">{lifos.marque}</TableCell>
                    <TableCell width="25%">{lifos.modele}</TableCell>
                    <TableCell width="25%">{lifos.description}</TableCell>
                    <TableCell width="25%">
                      {coloredNumber(formatNumber(lifos.cout_vendu))}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50, 100, 200, { label: 'Tous', value: -1 }]}
            component="div"
            count={filtrelifos.length}
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

export default LIFO;

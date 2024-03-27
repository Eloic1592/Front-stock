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

function LIFO({ lifos, mois }) {
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
  const filtrelifos = lifos.filter((lifos) => mois === '0' || lifos.mois === mois);

  return (
    <Grid container>
      <Grid item>
        <SimpleCard title="Cout des articles (LIFO)">
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell width="20%" align="center">
                    Marque
                  </TableCell>
                  <TableCell width="20%" align="center">
                    Modele
                  </TableCell>
                  <TableCell width="20%" align="center">
                    Description
                  </TableCell>
                  <TableCell width="20%" align="center">
                    Mois
                  </TableCell>
                  <TableCell width="20%" align="center">
                    Cout vendus
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? filtrelifos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  : filtrelifos
                ).map((lifos) => (
                  <TableRow key={lifos.idarticle}>
                    <TableCell width="20%" align="center">
                      {lifos.marque}
                    </TableCell>
                    <TableCell width="20%" align="center">
                      {lifos.modele}
                    </TableCell>
                    <TableCell width="20%" align="center">
                      {lifos.description}
                    </TableCell>
                    <TableCell width="20%" align="center">
                      {lifos.mois}
                    </TableCell>
                    <TableCell width="20%" align="center">
                      {coloredNumber(formatNumber(lifos.cout_vendu))}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50, 100, 200]}
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

import React, { useState } from 'react';
import { coloredNumber } from 'app/utils/utils';
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

function FIFO({ fifos, mois }) {
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
  const filtrefifos = fifos.filter((fifos) => mois === '0' || fifos.mois === mois);

  return (
    <Grid container>
      <Grid item>
        <SimpleCard title="Cout des articles (FIFO)">
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell width="12%" align="center">
                    Marque
                  </TableCell>
                  <TableCell width="12%" align="center">
                    Modele
                  </TableCell>
                  <TableCell width="12%" align="center">
                    Description
                  </TableCell>
                  <TableCell width="12%" align="center">
                    Mois
                  </TableCell>
                  <TableCell width="12%" align="center">
                    Total achetes
                  </TableCell>
                  <TableCell width="12%" align="center">
                    Total vendus
                  </TableCell>
                  <TableCell width="12%" align="center">
                    Total achetes valeur
                  </TableCell>
                  <TableCell width="12%" align="center">
                    Total venduts valeur
                  </TableCell>
                  <TableCell width="12%" align="center">
                    Stock actuel
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? filtrefifos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  : filtrefifos
                ).map((fifos) => (
                  <TableRow key={fifos.idarticle}>
                    <TableCell width="12%" align="center">
                      {fifos.marque}
                    </TableCell>
                    <TableCell width="12%" align="center">
                      {fifos.modele}
                    </TableCell>
                    <TableCell width="12%" align="center">
                      {fifos.description}
                    </TableCell>
                    <TableCell width="12%" align="center">
                      {fifos.mois}
                    </TableCell>
                    <TableCell width="12%" align="center">
                      {coloredNumber(fifos.total_achetes)}
                    </TableCell>
                    <TableCell width="12%" align="center">
                      {coloredNumber(fifos.total_vendus)}
                    </TableCell>
                    <TableCell width="12%" align="center">
                      {coloredNumber(fifos.total_achetes_valeur)}
                    </TableCell>
                    <TableCell width="12%" align="center">
                      {coloredNumber(fifos.total_vendus_valeur)}
                    </TableCell>
                    <TableCell width="12%" align="center">
                      {coloredNumber(fifos.quantite_stock)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50, 100, 200]}
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

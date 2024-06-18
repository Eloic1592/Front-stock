import React, { useState } from 'react';
import { coloredNumber, formatNumber } from 'app/utils/utils';
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

function Rotationstock({ rotationstocks, mois }) {
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
  const filtrerotationstocks = rotationstocks.filter((stat) => {
    const moisMatch = mois === '0' || (stat.mois && stat.mois === mois);
    return moisMatch;
  });

  return (
    <Grid container>
      <Grid item>
        <SimpleCard title="ROTATION DE STOCK">
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow key="header">
                  <TableCell width="25%" align="center" key="annee">
                    Annee
                  </TableCell>
                  <TableCell width="25%" align="center" key="cmv">
                    Cout des marchandises vendus
                  </TableCell>
                  <TableCell width="25%" align="center" key="stockmoyen">
                    Stock moyen (Quantite)
                  </TableCell>
                  <TableCell width="25%" align="center" key="valeurmoyenne">
                    Valeur moyenne (Ariary)
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? filtrerotationstocks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  : filtrerotationstocks
                ).map((rotationstocks) => (
                  <TableRow key={rotationstocks.idarticle}>
                    <TableCell width="25%" align="center">
                      {rotationstocks.annee}
                    </TableCell>
                    <TableCell width="25%" align="center" style={{ fontWeight: 'bold' }}>
                      {formatNumber(rotationstocks.cmv.toFixed(2))}
                    </TableCell>
                    <TableCell width="25%" align="center">
                      {coloredNumber(rotationstocks.rotationstockquantite.toFixed(2))}
                    </TableCell>
                    <TableCell width="25%" align="center">
                      {coloredNumber(rotationstocks.rotationstockvaleur.toFixed(2))}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50, 100, 200]}
            component="div"
            count={filtrerotationstocks.length}
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

export default Rotationstock;

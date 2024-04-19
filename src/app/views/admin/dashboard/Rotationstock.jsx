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

function Rotationstock({ rotationstocks }) {
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
  const filtrerotationstocks = rotationstocks.filter(
    (rotationstocks) =>
      (rotationstocks.marque &&
        rotationstocks.marque.toLowerCase().includes(filter.toLowerCase())) ||
      (rotationstocks.modele &&
        rotationstocks.modele.toLowerCase().includes(filter.toLowerCase())) ||
      (rotationstocks.description &&
        rotationstocks.description.toLowerCase().includes(filter.toLowerCase()))
  );

  return (
    <Grid container>
      <Grid item>
        <SimpleCard title="Rotation de stock">
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
                    moyenne jour
                  </TableCell>
                  <TableCell width="20%" align="center">
                    Rotation stock(en %)
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? filtrerotationstocks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  : filtrerotationstocks
                ).map((rotationstocks) => (
                  <TableRow key={rotationstocks.idarticle}>
                    <TableCell width="20%" align="center">
                      {rotationstocks.marque}
                    </TableCell>
                    <TableCell width="20%" align="center">
                      {rotationstocks.modele}
                    </TableCell>
                    <TableCell width="20%" align="center">
                      {rotationstocks.description}
                    </TableCell>
                    <TableCell width="20%" align="center">
                      {coloredNumber(rotationstocks.moyenne_jour)}
                    </TableCell>
                    <TableCell width="20%" align="center">
                      {coloredNumber(rotationstocks.rotation_stock)}
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

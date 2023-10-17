import {
  Box,

  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { useState } from "react";

const StyledTable = styled(Table)(() => ({
  whiteSpace: "pre",
  "& thead": {
    "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
  },
  "& tbody": {
    "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
  },
}));

const PaginationTable = ({ columns, data, rowsPerPageOptions = [5, 10, 25] }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0] || 5);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Box width="100%" overflow="auto">
      <StyledTable>
        <TableHead>
          <TableRow>
            {columns.map((column, index) => (
              <TableCell key={index} align={column.align || "left"}>
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => (
              <TableRow key={index}>
                {columns.map((column, index) => (
                  <TableCell key={index} align={column.align || "left"}>
                    {column.render ? column.render(row) : row[column.field]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
        </TableBody>
      </StyledTable>

      <TablePagination
        sx={{ px: 2 }}
        page={page}
        component="div"
        rowsPerPage={rowsPerPage}
        count={data.length}
        onPageChange={handleChangePage}
        rowsPerPageOptions={rowsPerPageOptions}
        onRowsPerPageChange={handleChangeRowsPerPage}
        nextIconButtonProps={{ "aria-label": "Next Page" }}
        backIconButtonProps={{ "aria-label": "Previous Page" }}
      />
    </Box>
  );
};

export default PaginationTable;

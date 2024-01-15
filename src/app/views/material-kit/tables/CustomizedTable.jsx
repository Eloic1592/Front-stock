import {
  Box,
  Button,
  IconButton,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField
} from '@mui/material';
import { useState, useEffect } from 'react';

import { StyledTable } from 'app/views/style/style';

const CustomizedTable = ({ columns, data, rowsPerPageOptions = [5, 10, 25] }, editable = true) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0] || 5);
  const [editingId, setEditingId] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [savedData, setSavedData] = useState(data);
  const indexedData = data.map((item, index) => ({ index, ...item }));

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleSave = (value, id, field) => {
    // setData(data.map((row) => (row.id === id ? { ...row, [field]: value } : row)));
    setEditingId(null);
  };

  //  Supprime une ligne
  const handleDelete = (index) => {
    setSavedData(savedData.filter((_, i) => i !== index));
  };

  useEffect(() => {
    setSavedData(indexedData);
  }, [data]);

  return (
    <Box width="100%" overflow="auto">
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell align="left"></TableCell>
            <TableCell align="center">Index</TableCell>
            {columns.map((column, index) => (
              <TableCell key={index} align={column.align || 'left'}>
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {savedData
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => (
              <TableRow key={index}>
                <TableCell align="center">
                  <IconButton
                    className="button"
                    variant="contained"
                    aria-label="Edit"
                    color="error"
                    onClick={() => handleDelete(index)}
                  >
                    -
                  </IconButton>
                </TableCell>
                <TableCell align="center">{index + 1}</TableCell>
                {columns.map((column, index) => (
                  <TableCell key={index} align={column.align || 'left'}>
                    {editingId === row.id ? (
                      <TextField
                        defaultValue={column.render ? column.render(row) : row[column.field]}
                        onBlur={(e) => handleSave(e.target.value, row.id, column.field)}
                      />
                    ) : column.render ? (
                      column.render(row)
                    ) : (
                      row[column.field]
                    )}
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
        count={savedData.length}
        onPageChange={handleChangePage}
        rowsPerPageOptions={rowsPerPageOptions}
        onRowsPerPageChange={handleChangeRowsPerPage}
        nextIconButtonProps={{ 'aria-label': 'Next Page' }}
        backIconButtonProps={{ 'aria-label': 'Previous Page' }}
      />
    </Box>
  );
};

export default CustomizedTable;

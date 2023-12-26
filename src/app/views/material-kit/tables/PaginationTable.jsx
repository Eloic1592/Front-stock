import {
  Box,
  Button,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Icon, 
  IconButton,
  TextField,
  Checkbox,
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

 const DeleteButton = ({ selectedCount, onClick }) => {
  const disabled = selectedCount === 0;
  const className = disabled ? 'disabled' : '';
  return (
    <Button variant="contained" className={className} onClick={onClick} color="secondary">
        <Icon>delete</Icon>
    </Button>
  );
 };
 
 
 const PaginationTable = ({ columns, data, rowsPerPageOptions = [5, 10, 25] }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0] || 5);
  const [editingId, setEditingId] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
 
  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };
 
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
 
  const handleEdit = (row) => {
    setEditingId(row.id);
  };
 
  const handleSave = (value, id, field) => {
    // setData(data.map((row) => (row.id === id ? { ...row, [field]: value } : row)));
    setEditingId(null);
  };
 
  const handleInsert = () => {
    // setData([...data, { /* new row data */ }]);
  };

  
 const handleSelection = (event, id) => {
  if (event.target.checked) {
    setSelectedIds([...selectedIds, id]);
  } else {
    setSelectedIds(selectedIds.filter((i) => i !== id));
  }
 };

//  Supprime une ligne
 const handleDelete = (id) => {
  // setData(data.filter((row) => !selectedIds.includes(row.id)));
  setSelectedIds(selectedIds.filter((i) => i !== id));
 };

//  Supprime toutes les lignes de cette liste
 const handleDeleteAll = () => {
  // setData(data.filter((row) => !selectedIds.includes(row.id)));
  setSelectedIds([]);
 };

 //Select  toutes les checkboxes de la liste  
 const handleSelectAll = (event) => {
  if (event.target.checked) {
   setSelectedIds(data.map((row) => row.id));
  } else {
   setSelectedIds([]);
  }
 };

 
  return (
    <Box width="100%" overflow="auto">
            <DeleteButton selectedCount={selectedIds.length} onClick={handleDeleteAll} />

      <StyledTable>
        <TableHead>
          <TableRow>
          <TableCell>
            {/* Selectionne toutes les checkboxes de la liste */}
          <Checkbox
            checked={data.every((row) => selectedIds.includes(row.id))}
            indeterminate={data.some((row) => selectedIds.includes(row.id)) && !data.every((row) => selectedIds.includes(row.id))}
            onChange={handleSelectAll}
           />
          </TableCell>
            {columns.map((column, index) => (
              // Nom des colonnes du tableau
              <TableCell key={index} align={column.align || "left"}>
                {column.label}
              </TableCell>

            ))}
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* Donnees du tableau */}
          {data
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => (
              
              <TableRow key={index}>
                <TableCell>
                    <Checkbox
                      checked={selectedIds.includes(row.id)}
                      onChange={(event) => handleSelection(event, row.id)}
                    />
                </TableCell>
                {columns.map((column, index) => (
                  
                 <TableCell key={index} align={column.align || "left"}>
                   {editingId === row.id ? (
                     <TextField                                                    
                       defaultValue={column.render ? column.render(row) : row[column.field]}
                       onBlur={(e) => handleSave(e.target.value, row.id, column.field)}
                     />
                   ) : (
                     column.render ? column.render(row) : row[column.field]
                   )}
                 </TableCell>
                 
                ))}
                <TableCell>
                 <IconButton className="button" aria-label="Edit"  color="primary" onClick={() => handleEdit(row)}>
                      <Icon>edit_icon</Icon>
                </IconButton>
                </TableCell>
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
 
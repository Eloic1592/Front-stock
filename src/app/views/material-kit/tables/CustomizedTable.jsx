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
 import { useState,useEffect } from "react";
 
 const StyledTable = styled(Table)(() => ({
  whiteSpace: "pre",
  "& thead": {
    "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
  },
  "& tbody": {
    "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
  },
 }));
 
 const CustomizedTable = ({ columns, data, rowsPerPageOptions = [5, 10, 25] },editable=true) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0] || 5);
  const [editingId, setEditingId] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [savedData,setSavedData]=useState(data);
  const indexedData = data.map((item, index) => ({ index, ...item }));
 
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
 

 useEffect(() => {
  setSavedData(indexedData);
 },[data]);

  return (
    <Box width="100%" overflow="auto">
      <StyledTable>
         <TableHead>
           <TableRow>
             <TableCell align="center">Index</TableCell>
             {columns.map((column, index) => (
               <TableCell key={index} align={column.align || "left"}>
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
                 <TableCell align="center">{index + 1}</TableCell>
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
        nextIconButtonProps={{ "aria-label": "Next Page" }}
        backIconButtonProps={{ "aria-label": "Previous Page" }}
      />
    </Box>
  );
 };
 
 export default CustomizedTable;
 
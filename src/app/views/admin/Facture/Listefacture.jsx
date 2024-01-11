import {
    Box,
    Button,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    Icon, 
    IconButton,
    TextField,
    Checkbox,
    Select,
    MenuItem,
    Grid,
   } from "@mui/material";
   import Typography from '@mui/material/Typography';
   import { useState,useEffect } from "react";
   import { SimpleCard } from "app/components";
   import { StyledTable } from "app/views/style/style";
   import { filtrefacture } from "app/views/admin/Facture/function";

  
  
    
const Listefacture = ({rowsPerPageOptions = [5, 10, 25] }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0] || 5);
    const [editingId, setEditingId] = useState(null);
    const [selectedIds, setSelectedIds] = useState([]);
    const [sortColumn, setSortColumn] = useState(["1"]);
    const [sortDirection, setSortDirection] = useState("asc");
    const [isEditClicked, setIsEditClicked] = useState(false);
    const [selectedRowId, setSelectedRowId] = useState(null);
    const [client, setClient] = useState(null);
    const [date, setDate] = useState(null);
    const [numstat, setNumstat] = useState(null);
    const [telephone, setTelephone] = useState(null);


  
// Colonne

const columns = [
    { label: 'ID', field: 'idmouvementdestock', align: 'center' },
    { label: 'Date', field: 'datefacture', align: 'center' },
    { label: 'ID Mouvement', field: 'mouvement', align: 'center' },
    { label: 'Nom du client', field: 'nom', align: 'center' },
    { label: 'Telephone', field: 'telephone', align: 'center' },
    { label: 'NIF', field: 'nif', align: 'center' },
    { label: 'NUMSTAT', field: 'numstat', align: 'center' },
    { label: 'Adresse', field: 'Adresse', align: 'center' },
    { label: 'QUITTANCE', field: 'quittance', align: 'center' },
    { label: 'statut', field: 'statut', align: 'center' },
    // Other columns...
   ];

    const data=[
      
    ];

  
    const handleChangePage = (_, newPage) => {
      setPage(newPage);
    };
   
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
   
    // Active la modification
    const handleEdit = (row) => {
      setEditingId(row.id);
      setIsEditClicked(true);
      setSelectedRowId(row.id);
    };
    const cancelEdit = (row) => {
        setEditingId(null);
        setIsEditClicked(false);
    };

    const handleSave = (value, id, field) => {
      setEditingId(null);
      
    };
   
    
   const handleSelection = (event, id) => {
    if (event.target.checked) {
      setSelectedIds([...selectedIds, id]);
    } else {
      setSelectedIds(selectedIds.filter((i) => i !== id));
    }
   };
  
   //Select  toutes les checkboxes de la liste  
   const handleSelectAll = (event) => {
    if (event.target.checked) {
     setSelectedIds(data.map((row) => row.id));
    } else {
     setSelectedIds([]);
    }
   };
  

   
   const handleSelectColumn = (event) => {
    setSortColumn(event.target.value);
    
   };
   
   const sortedData = data.sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) {
    return sortDirection === 'asc' ? -1 : 1;
    }
    if (a[sortColumn] > b[sortColumn]) {
    return sortDirection === 'asc' ? 1 : -1;
    }
    return 0;
   });
   
 
  //  Use effect
  useEffect(() => {
  },[sortedData]);
   
  
   
    return (
      <Box width="100%" overflow="auto">
        <Grid container direction="column" spacing={2}>
        <Grid item>             
          <SimpleCard title="Rechercher une facture" sx={{ marginBottom: '16px' }}>        
              <form >
              <div style={{ display: 'flex', gap: '16px' }}>
              <TextField
               fullWidth
               size="small"
               type="text"
               name="client"
               label="Nom du client"
               variant="outlined"
               value={client}
               onChange={(event) => setClient(event.target.value)}
               sx={{ mb: 3 }}
             />            
             <TextField
               fullWidth
               size="small"
               type="date"
               name="date"
               variant="outlined"
               value={date}
               onChange={(event) => setDate(event.target.value)}
               sx={{ mb: 3 }}
             />
             <TextField
               fullWidth
               size="small"
               type="text"
               name="stat"
               variant="outlined"
               label="Numstat"
               value={numstat}
               onChange={(event) => setNumstat(event.target.value)}
               sx={{ mb: 3 }}
             />
            <TextField
               fullWidth
               size="small"
               type="text"
               name="telephone"
               variant="outlined"
               label="Telephone"
               value={telephone}
               onChange={(event) => setTelephone(event.target.value)}
               sx={{ mb: 3 }}
             />
            </div>
            </form>
              </SimpleCard>
        </Grid>

        
        <Grid item>
        <SimpleCard title="Liste des factures">
          {/* Tri de tables */}
          <Grid container spacing={2}>
             <Grid item xs={2}>
               <Select
                fullWidth
                 labelId="select-label"
                 value={sortColumn}
                 size="small"
                 onChange={handleSelectColumn}

               >
                 <MenuItem value="1">Colonne</MenuItem>
                 {columns.map((column) => (
                   <MenuItem value={column.field}>{column.label}</MenuItem>
                 ))}
               </Select>
             </Grid>
             <Grid item xs={2}>
               <Select
                fullWidth
                 labelId="select-direction-label"
                 value={sortDirection}
                 size="small"
                onChange={(event) => setSortDirection(event.target.value)}
               >
                 <MenuItem value="asc">ASC</MenuItem>
                 <MenuItem value="desc">DESC</MenuItem>
               </Select>
             </Grid>
             <Grid item xs={2}>
             <Button className="button" variant="contained" aria-label="Edit" color="error" disabled={selectedIds.length == 0}>
                <Icon>delete</Icon>
              </Button>
             </Grid>
  
            </Grid> 
        <StyledTable>
          <TableHead>
            {/* Listage de Donnees */}
            <TableRow>
            <TableCell>
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
            {sortedData && sortedData.length > 0 ? sortedData
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
                                      name={row.field}
                                      onBlur={(e) => handleSave(e.target.value, row.id, column.field)}
                                  />
                              ) : (
                                  column.render ? column.render(row) : row[column.field]
                              )}
                           </TableCell>
                       ))}
            
                       <TableCell>
                           <IconButton className="button" variant="contained" aria-label="Edit" color="primary" onClick={() => handleEdit(row)}>
                              <Icon>edit_icon</Icon>
                           </IconButton>

                           {isEditClicked && row.id=== selectedRowId && (
                            <>
                           <IconButton  className="button" variant="contained" aria-label="Edit" color="secondary">
                              <Icon>arrow_forward</Icon>
                           </IconButton>
                           <IconButton  className="button" variant="contained" aria-label="Edit" color="error" onClick={() => cancelEdit(row)}>
                              <Icon>close</Icon>
                           </IconButton>
                           </>
                           )}

                       </TableCell>
                   </TableRow>
               )) : <p><Typography variant="subtitle1" color="textSecondary">Aucune donnee disponible</Typography></p>}
  
          </TableBody>
        </StyledTable>
        <Grid container spacing={2}>
        <Grid item xs={12}>
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
          </Grid>
        </Grid>
        </SimpleCard>
        </Grid>
        </Grid>
      </Box>
    );
   };
   
   export default Listefacture;
   
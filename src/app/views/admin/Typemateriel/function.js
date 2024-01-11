
import { useState,useEffect } from "react";

// Init
  export const useListetypematerielFunctions = (data) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [editingId, setEditingId] = useState(null);
    const [selectedIds, setSelectedIds] = useState([]);
    const [sortColumn, setSortColumn] = useState(["1"]);
    const [sortDirection, setSortDirection] = useState("asc");
    const [isEditClicked, setIsEditClicked] = useState(false);
    const [selectedRowId, setSelectedRowId] = useState(null);
    const [typemateriel, setTypemateriel] = useState('');


    // Pagination
    const handleChangePage = (_, newPage) => {
     setPage(newPage);
    };
   
    const handleChangeRowsPerPage = (event) => {
     setRowsPerPage(+event.target.value);
     setPage(0);
    };
   
    // Modification(Update)
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


  // Suppression(Delete)
    const handleSelection = (event, id) => {
     if (event.target.checked) {
       setSelectedIds([...selectedIds, id]);
     } else {
       setSelectedIds(selectedIds.filter((i) => i !== id));
     }
    };
   
    const handleSelectAll = (event) => {
     if (event.target.checked) {
       setSelectedIds(data.map((row) => row.id));
     } else {
       setSelectedIds([]);
     }
    };
   
    // Tri de table
    const handleSelectColumn = (event) => {
      setSortColumn(event.target.value);
    };
    
    const filtredata=filtretypemateriel(data,typemateriel);
    const sortedData = filtredata.sort((a, b) => {
      if (a[sortColumn] < b[sortColumn]) {
     return sortDirection === 'asc' ? -1 : 1;
     }
     if (a[sortColumn] > b[sortColumn]) {
       return sortDirection === 'asc' ? 1 : -1;
     }
     return 0;
    });
   
    useEffect(() => {
    },[sortedData]);
   
    return {
     page,
     setPage,
     rowsPerPage,
     setRowsPerPage,
     editingId,
     setEditingId,
     selectedIds,
     setSelectedIds,
     sortColumn,
     setSortColumn,
     sortDirection,
     setSortDirection,
     isEditClicked,
     setIsEditClicked,
     selectedRowId,
     setSelectedRowId,
     typemateriel,
     setTypemateriel,
     handleChangePage,
     handleChangeRowsPerPage,
     handleEdit,
     cancelEdit,
     handleSave,
     handleSelection,
     handleSelectAll,
     handleSelectColumn,
     sortedData
    };
   };
   


   //  Filtre de recherche
   export function filtretypemateriel(listetypemateriel, typemateriel) {
     return listetypemateriel.filter((Item) => {
       return Item.typemateriel.toLowerCase().includes(typemateriel.toLowerCase());
      });
    }

   
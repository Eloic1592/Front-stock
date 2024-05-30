import { useState, useEffect } from 'react';

// Init
export const useListetypematerielFunctions = (data) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [editingId, setEditingId] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [sortColumn, setSortColumn] = useState(['1']);
  const [sortDirection, setSortDirection] = useState('asc');
  const [isEditClicked, setIsEditClicked] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [typemateriel, setTypemateriel] = useState('');
  const [categoriemateriel, setCategoriemateriel] = useState('1');
  // Pagination
  // Pagination
  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSelection = (event, id) => {
    if (event.target.checked) {
      setSelectedIds([...selectedIds, id]);
    } else {
      setSelectedIds(selectedIds.filter((i) => i !== id));
    }
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedIds(data.typemateriels.map((row) => row.idtypemateriel));
    } else {
      setSelectedIds([]);
    }
  };

  // Tri de table
  const handleSelectColumn = (event) => {
    setSortColumn(event.target.value);
  };
  const filtredata = filtretypemateriel(data.typemateriels, typemateriel, categoriemateriel);
  const sortedData = filtredata.sort((a, b) => {
    for (let column of sortColumn) {
      if (a[column] < b[column]) {
        return sortDirection === 'asc' ? -1 : 1;
      }
      if (a[column] > b[column]) {
        return sortDirection === 'asc' ? 1 : -1;
      }
    }
    return 0;
  });

  useEffect(() => {}, [sortedData]);

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
    handleSelection,
    handleSelectAll,
    handleSelectColumn,
    sortedData,
    categoriemateriel,
    setCategoriemateriel
  };
};

//  Filtre de recherche
export function filtretypemateriel(listetypemateriel, typemateriel, categoriemateriel) {
  return listetypemateriel.filter((Item) => {
    const typematch =
      !typemateriel || Item.typemateriel.toLowerCase().includes(typemateriel.toLowerCase());
    let categoriematch = true;
    if (categoriemateriel !== '1') {
      categoriematch = Item.idcategoriemateriel === categoriemateriel;
    }
    return typematch && categoriematch;
  });
}

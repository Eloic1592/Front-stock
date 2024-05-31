import { useState, useEffect } from 'react';

// Init
export const useEmplacementfunctions = (data) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [editingId, setEditingId] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [sortColumn, setSortColumn] = useState(['1']);
  const [sortDirection, setSortDirection] = useState('asc');
  const [isEditClicked, setIsEditClicked] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [codeemp, setCodeemp] = useState('');
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
      setSelectedIds(data.listeemplacements.map((row) => row.idemplacement));
    } else {
      setSelectedIds([]);
    }
  };

  // Tri de table
  const handleSelectColumn = (event) => {
    setSortColumn(event.target.value);
  };
  const filtredata = filtreemplacement(data.listeemplacements, codeemp);
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
    codeemp,
    setCodeemp,
    handleChangePage,
    handleChangeRowsPerPage,
    handleSelection,
    handleSelectAll,
    handleSelectColumn,
    sortedData
  };
};

//  Filtre de recherche
export function filtreemplacement(listeemplacements, codeemp) {
  return listeemplacements.filter((Item) => {
    const typematch = !codeemp || Item.codeemp.toLowerCase().includes(codeemp.toLowerCase());

    return typematch;
  });
}

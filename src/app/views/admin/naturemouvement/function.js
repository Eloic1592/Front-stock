import { useState } from 'react';
export const useListemouvementFunctions = (data) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [editingId, setEditingId] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  const [sortColumn, setSortColumn] = useState(['1']);
  const [sortDirection, setSortDirection] = useState('asc');
  const [isEditClicked, setIsEditClicked] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [naturemouvement, setNaturemouvement] = useState('');
  const [typemouvement, setTypemouvement] = useState('2');

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
      setSelectedIds(data.naturemouvements.map((row) => row.id));
    } else {
      setSelectedIds([]);
    }
  };

  // Tri de table
  const handleSelectColumn = (event) => {
    setSortColumn(event.target.value);
  };
  const filtredata = filtrenaturemouvement(data.naturemouvements, naturemouvement, typemouvement);
  const sortedData = filtredata.sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) {
      return sortDirection === 'asc' ? -1 : 1;
    }
    if (a[sortColumn] > b[sortColumn]) {
      return sortDirection === 'asc' ? 1 : -1;
    }
    return 0;
  });

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
    handleChangePage,
    handleChangeRowsPerPage,
    handleSelection,
    handleSelectAll,
    handleSelectColumn,
    sortedData,
    naturemouvement,
    setNaturemouvement,
    typemouvement,
    setTypemouvement
  };
};

// Filtre
export function filtrenaturemouvement(listenaturemouvement, naturemouvement, typemouvement) {
  return listenaturemouvement.filter((Item) => {
    const naturemouvementmatch =
      !naturemouvement ||
      Item.naturemouvement.toLowerCase().includes(naturemouvement.toLowerCase());
    let typemouvementMatch = true;
    if (typemouvement !== '2') {
      typemouvementMatch = Item.type === parseInt(typemouvement);
    }
    return naturemouvementmatch && typemouvementMatch;
  });
}

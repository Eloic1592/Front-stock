import { useState } from 'react';

export const useMfictifFunctions = (data) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [editingId, setEditingId] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [sortColumn, setSortColumn] = useState(['1']);
  const [sortDirection, setSortDirection] = useState('asc');
  const [isEditClicked, setIsEditClicked] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [materiel, setMateriel] = useState(false);
  const [date, setDate] = useState(null);
  const [mouvement, setMouvement] = useState('');
  const [depot, setDepot] = useState('');

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

  const filtredata = filtrestockfictif(data, materiel, mouvement, depot, date);
  const sortedData = data.sort((a, b) => {
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
    handleEdit,
    cancelEdit,
    handleSave,
    handleSelection,
    handleSelectAll,
    handleSelectColumn,
    sortedData,
    materiel,
    date,
    depot,
    mouvement,
    setDate,
    setDepot,
    setMateriel,
    setMouvement
  };
};

// Filtre
function filtrestockfictif(listestockfictif, materiel, mouvement, depot, date) {
  return listestockfictif.filter((Item) => {
    return (
      Item.date.toLowerCase().includes(date.toLowerCase()) &&
      Item.materiel.toLowerCase().includes(materiel.toLowerCase()) &&
      Item.mouvement.toLowerCase().includes(mouvement.toLowerCase()) &&
      Item.depot.toLowerCase().includes(depot.toLowerCase())
    );
  });
}

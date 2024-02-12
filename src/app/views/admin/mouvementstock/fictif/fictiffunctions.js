import { useState } from 'react';
import { formatDate } from 'app/utils/utils';

export const useMfictifFunctions = (data) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [editingId, setEditingId] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [sortColumn, setSortColumn] = useState(['1']);
  const [sortDirection, setSortDirection] = useState('asc');
  const [isEditClicked, setIsEditClicked] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [materiel, setMateriel] = useState('');
  const [datedepot, setDatedepot] = useState('');
  const [mouvement, setMouvement] = useState('0');
  const [naturemouvement, setNaturemouvement] = useState('0');

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Active la modification
  const handleEdit = (row) => {
    setEditingId(row.idmouvementstock);
    setIsEditClicked(true);
    setSelectedRowId(row.idmouvementstock);
  };
  const cancelEdit = () => {
    setEditingId(null);
    setIsEditClicked(false);
  };

  const handleSave = (value, id, field) => {
    setEditingId(null);
  };

  const handleSelection = (event, idmouvementstock) => {
    if (event.target.checked) {
      setSelectedIds([...selectedIds, idmouvementstock]);
    } else {
      setSelectedIds(selectedIds.filter((i) => i !== idmouvementstock));
    }
  };

  //Select  toutes les checkboxes de la liste
  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedIds(data.mouvementStocks.map((row) => row.idmouvementstock));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectColumn = (event) => {
    setSortColumn(event.target.value);
  };

  const filtredata = filtrestockfictif(data.mouvementStocks, datedepot, mouvement, naturemouvement);
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
    handleEdit,
    cancelEdit,
    handleSave,
    handleSelection,
    handleSelectAll,
    handleSelectColumn,
    sortedData,
    datedepot,
    setDatedepot,
    mouvement,
    setMouvement,
    naturemouvement,
    setNaturemouvement
  };
};

// Filtre
function filtrestockfictif(mouvementStocks, datedepot, typemouvement, naturemouvement) {
  return mouvementStocks.filter((item) => {
    const datedepotMatch =
      !datedepot ||
      new Date(formatDate(item.datedepot)).getTime() === new Date(datedepot).getTime();
    let typemouvementMatch = true;
    if (typemouvement !== '0') {
      typemouvementMatch = item.type === parseInt(typemouvement);
    }

    let naturemouvementMatch = true;
    if (naturemouvement !== '0') {
      naturemouvementMatch = item.idnaturemouvement === naturemouvement;
    }

    return datedepotMatch && typemouvementMatch && naturemouvementMatch;
  });
}

import { useState } from 'react';

export const useMphysiqueFunctions = (data) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [editingId, setEditingId] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [sortColumn, setSortColumn] = useState(['1']);
  const [sortDirection, setSortDirection] = useState('asc');
  const [isEditClicked, setIsEditClicked] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [mouvement, setMouvement] = useState(['0']);
  const [naturemouvement, setNaturemouvement] = useState(['1']);
  const [date, setDate] = useState('');

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
  const cancelEdit = () => {
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

  const filtredata = filtrestockphysique(data.mouvementStocks, date, mouvement, naturemouvement);
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
    mouvement,
    setDate,
    date,
    setNaturemouvement,
    naturemouvement,
    mouvement,
    setMouvement
  };
};
function filtrestockphysique(mouvementStocks, datedepot, typemouvement, naturemouvement) {
  if (datedepot != null || typemouvement != 0 || naturemouvement != 1) {
    return mouvementStocks.filter((Item) => {
      // Vérifier si chaque critère est différent de 1 avant de l'appliquer
      const datedepotdepotMatch = datedepot != null ? Item.datedepot == datedepot : true;
      const typemouvementMatch = typemouvement != 0 ? Item.typemouvement == typemouvement : true;
      const naturemouvementMatch =
        naturemouvement != 1 ? Item.naturemouvemen == naturemouvement : true;
      // Retourner vrai si l'élément répond à tous les critères
      return datedepotdepotMatch && typemouvementMatch && naturemouvementMatch;
    });
  } else {
    // Si tous les critères sont égaux à 1, retourner la liste de matériel complète
    return mouvementStocks;
  }
}

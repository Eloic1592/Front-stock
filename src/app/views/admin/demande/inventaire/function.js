import { useState } from 'react';
import { formatDate } from 'app/utils/utils';

export const useListeinventaireFunctions = (data) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [editingId, setEditingId] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [sortColumn, setSortColumn] = useState(['1']);
  const [sortDirection, setSortDirection] = useState('asc');
  const [isEditClicked, setIsEditClicked] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [dateinventaire, setDateinventaire] = useState('');
  const [codearticle, setCodearticle] = useState('');

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Active la modification
  const handleEdit = (row) => {
    setEditingId(row.idinventaire);
    setIsEditClicked(true);
    setSelectedRowId(row.idinventaire);
  };
  const cancelEdit = () => {
    setEditingId(null);
    setIsEditClicked(false);
  };

  const handleSave = () => {
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
      setSelectedIds(data.vueinventaires.map((row) => row.idinventaire));
    } else {
      setSelectedIds([]);
    }
  };

  const filtredata = filtreinventaires(data.vueinventaires, codearticle, dateinventaire);
  const handleSelectColumn = (event) => {
    setSortColumn(event.target.value);
  };

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
    codearticle,
    setCodearticle,
    setDateinventaire,
    dateinventaire
  };
};

export function filtreinventaires(vuesinventaires, codearticle, dateinventaire) {
  return vuesinventaires.filter((inventaire) => {
    // Vérifier si la date du inventaire correspond à la date spécifiée
    const dateinventairematch =
      !dateinventaire ||
      new Date(new Date(formatDate(inventaire.dateinventaire)).getTime()).getTime() ===
        new Date(dateinventaire).getTime();

    const numeromatch =
      !codearticle || inventaire.marque.toLowerCase().includes(codearticle.toLowerCase());

    return numeromatch && dateinventairematch;
  });
}

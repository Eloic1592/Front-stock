import { useState } from 'react';
import { formatDate } from 'app/utils/utils';

export const useListecommandeFunctions = (data) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [editingId, setEditingId] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [sortColumn, setSortColumn] = useState(['1']);
  const [sortDirection, setSortDirection] = useState('asc');
  const [isEditClicked, setIsEditClicked] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [datecommande, setDatecommande] = useState('');
  const [numerocommande, setNumerocommande] = useState('');

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Active la modification
  const handleEdit = (row) => {
    setEditingId(row.idcommande);
    setIsEditClicked(true);
    setSelectedRowId(row.idcommande);
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
      setSelectedIds(data.vueCommandes.map((row) => row.idcommande));
    } else {
      setSelectedIds([]);
    }
  };

  const filtredata = filtrecommande(data.vueCommandes, numerocommande, datecommande);
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
    numerocommande,
    setNumerocommande,
    setDatecommande,
    datecommande
  };
};

export function filtrecommande(vueCommandes, numerocommande, datecommande) {
  return vueCommandes.filter((commande) => {
    // Vérifier si la date du commande correspond à la date spécifiée
    const datecommandematch =
      !datecommande ||
      new Date(new Date(formatDate(commande.datecommande)).getTime()).getTime() ===
        new Date(datecommande).getTime();

    // Vérifier si le nom du client correspond au nom spécifié
    const numeromatch =
      !numerocommande || commande.idcommande.toLowerCase().includes(numerocommande.toLowerCase());

    // Retourner true si les deux conditions sont remplies
    return numeromatch && datecommandematch;
  });
}

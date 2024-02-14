import { useState } from 'react';

export const useDFictifFunctions = (data) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [editingId, setEditingId] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [sortColumn, setSortColumn] = useState(['1']);
  const [sortDirection, setSortDirection] = useState('asc');
  const [isEditClicked, setIsEditClicked] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [marque, setMarque] = useState('');
  const [modele, setModele] = useState('');

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Active la modification
  const handleEdit = (row) => {
    setEditingId(row.iddetailmouvementfictif);
    setIsEditClicked(true);
    setSelectedRowId(row.iddetailmouvementfictif);
  };
  const cancelEdit = () => {
    setEditingId(null);
    setIsEditClicked(false);
  };

  const handleSave = (value, id, field) => {
    setEditingId(null);
  };

  const handleSelection = (event, iddetailmouvementfictif) => {
    if (event.target.checked) {
      setSelectedIds([...selectedIds, iddetailmouvementfictif]);
    } else {
      setSelectedIds(selectedIds.filter((i) => i !== iddetailmouvementfictif));
    }
  };

  //Select  toutes les checkboxes de la liste
  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedIds(data.mouvementfictifs.map((row) => row.iddetailmouvementfictif));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectColumn = (event) => {
    setSortColumn(event.target.value);
  };

  const filtredata = filtrestockfictif(data.mouvementfictifs, marque, modele);
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
    marque,
    setMarque,
    modele,
    setModele
  };
};
function filtrestockfictif(mouvementfictifs, marque, modele) {
  return mouvementfictifs.filter((item) => {
    // Vérifier si la date du devis correspond à la date spécifiée
    const marqueMatch = !marque || item.marque.toLowerCase().includes(marque.toLowerCase());

    // Vérifier si le nom du client correspond au nom spécifié
    const modeleMatch = !modele || item.modele.toLowerCase().includes(modele.toLowerCase());

    // Retourner true si les deux conditions sont remplies
    return marqueMatch && modeleMatch;
  });
}

import { useState } from 'react';

export const useListedetailcommandeFunctions = (data) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [editingId, setEditingId] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [sortColumn, setSortColumn] = useState(['1']);
  const [sortDirection, setSortDirection] = useState('asc');
  const [isEditClicked, setIsEditClicked] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [marque, setMarque] = useState('');

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Active la modification
  const handleEdit = (row) => {
    setEditingId(row.iddetailcommande);
    setIsEditClicked(true);
    setSelectedRowId(row.iddetailcommande);
  };
  const cancelEdit = () => {
    setEditingId(null);
    setIsEditClicked(false);
  };

  const handleSave = () => {
    setEditingId(null);
  };

  const handleSelection = (event, iddetailcommande) => {
    if (event.target.checked) {
      setSelectedIds([...selectedIds, iddetailcommande]);
    } else {
      setSelectedIds(selectedIds.filter((i) => i !== iddetailcommande));
    }
  };

  //Select  toutes les checkboxes de la liste
  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedIds(data.detailcommandeviews.map((row) => row.iddetailcommande));
    } else {
      setSelectedIds([]);
    }
  };

  const filtredata = filtredetailcommande(data.detailcommandeviews, marque);
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
    marque,
    setMarque
  };
};

export function filtredetailcommande(listedetailcommande, filtre) {
  return listedetailcommande.filter((detail) => {
    // Vérifier si la date du devis correspond à la date spécifiée
    const marquematch = !filtre || detail.marque.toLowerCase().includes(filtre.toLowerCase());

    // Vérifier si le nom du client correspond au nom spécifié
    const codearticleMatch =
      !filtre || detail.codearticle.toLowerCase().includes(filtre.toLowerCase());

    // Retourner true si les deux conditions sont remplies
    return marquematch || codearticleMatch;
  });
}

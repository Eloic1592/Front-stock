import { useState } from 'react';

export const Commandefunctions = (data) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [editingId, setEditingId] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [sortColumn, setSortColumn] = useState(['1']);
  const [sortDirection, setSortDirection] = useState('asc');
  const [isEditClicked, setIsEditClicked] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [libelle, setLibelle] = useState('');
  const [datecommande, setDatecommande] = useState('');
  const [client, setClient] = useState('');

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Active la modification
  const handleEdit = (row) => {
    setEditingId(row.idboncommande);
    setIsEditClicked(true);
    setSelectedRowId(row.idboncommande);
  };
  const cancelEdit = () => {
    setEditingId(null);
    setIsEditClicked(false);
  };

  const handleSave = (value, id, field) => {
    setEditingId(null);
  };

  const handleSelection = (event, idboncommande) => {
    if (event.target.checked) {
      setSelectedIds([...selectedIds, idboncommande]);
    } else {
      setSelectedIds(selectedIds.filter((i) => i !== idboncommande));
    }
  };

  //Select  toutes les checkboxes de la liste
  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedIds(data.map((row) => row.idboncommande));
    } else {
      setSelectedIds([]);
    }
  };

  const filtredata = filtrecommande(data, datecommande, client);
  const handleSelectColumn = (event) => {
    setSortColumn(event.target.value);
  };

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
    setClient,
    setDatecommande,
    datecommande,
    libelle,
    setLibelle,
    client
  };
};

export function filtrecommande(listeboncommande, datecommande, nomclient) {
  return listeboncommande.filter((commande) => {
    // Vérifier si la date du devis correspond à la date spécifiée
    const dateMatch =
      !datecommande ||
      new Date(commande.dateboncommande).getTime() === new Date(datecommande).getTime();

    // Vérifier si le nom du client correspond au nom spécifié
    const nomClientMatch =
      !nomclient || commande.nom.toLowerCase().includes(nomclient.toLowerCase());

    // Retourner true si les deux conditions sont remplies
    return dateMatch && nomClientMatch;
  });
}

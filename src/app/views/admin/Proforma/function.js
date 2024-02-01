import { useState } from 'react';

export const useListedevisFunctions = (data) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [editingId, setEditingId] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [sortColumn, setSortColumn] = useState(['1']);
  const [sortDirection, setSortDirection] = useState('asc');
  const [isEditClicked, setIsEditClicked] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [libelle, setLibelle] = useState('');
  const [datedevis, setDatedevis] = useState('');
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
    setEditingId(row.iddevis);
    setIsEditClicked(true);
    setSelectedRowId(row.iddevis);
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
      setSelectedIds(data.clientdevis.map((row) => row.iddevis));
    } else {
      setSelectedIds([]);
    }
  };

  const filtredata = filtredevis(data.clientdevis, datedevis, client, libelle);
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
    setDatedevis,
    datedevis,
    libelle,
    setLibelle,
    client
  };
};

export function filtredevis(listedevis, datedevis, nomclient, libelle) {
  return listedevis.filter((devis) => {
    // Vérifier si la date du devis correspond à la date spécifiée
    const dateDevisMatch =
      !datedevis || new Date(devis.datedevis).getTime() === new Date(datedevis).getTime();

    // Vérifier si le nom du client correspond au nom spécifié
    const nomClientMatch = !nomclient || devis.nom.toLowerCase().includes(nomclient.toLowerCase());

    const libelleMatch = !libelle || devis.libelle.toLowerCase().includes(libelle.toLowerCase());

    // Retourner true si les deux conditions sont remplies
    return dateDevisMatch && nomClientMatch && libelleMatch;
  });
}

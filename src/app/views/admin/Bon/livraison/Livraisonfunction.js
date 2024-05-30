import { useState } from 'react';
import { formatDate } from 'app/utils/utils';

export const Livraisonfunctions = (data) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [editingId, setEditingId] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [sortColumn, setSortColumn] = useState(['1']);
  const [sortDirection, setSortDirection] = useState('asc');
  const [isEditClicked, setIsEditClicked] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [datelivraison, setDatelivraison] = useState('');
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
    setEditingId(row.idbonlivraison);
    setIsEditClicked(true);
    setSelectedRowId(row.idbonlivraison);
  };
  const cancelEdit = () => {
    setEditingId(null);
    setIsEditClicked(false);
  };

  const handleSave = (value, id, field) => {
    setEditingId(null);
  };

  const handleSelection = (event, idbonlivraison) => {
    if (event.target.checked) {
      setSelectedIds([...selectedIds, idbonlivraison]);
    } else {
      setSelectedIds(selectedIds.filter((i) => i !== idbonlivraison));
    }
  };

  //Select  toutes les checkboxes de la liste
  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedIds(data.map((row) => row.idbonlivraison));
    } else {
      setSelectedIds([]);
    }
  };

  const filtredata = filtrelivraison(data, datelivraison, client);
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
    setClient,
    client,
    setDatelivraison,
    datelivraison
  };
};

export function filtrelivraison(listelivraison, datelivraison, nomclient) {
  return listelivraison.filter((livraison) => {
    // Vérifier si la date du devis correspond à la date spécifiée
    const dateMatch =
      !datelivraison ||
      new Date(formatDate(livraison.datebonlivraison)).getTime() ===
        new Date(datelivraison).getTime();

    // Vérifier si le nom du client correspond au nom spécifié
    const nomClientMatch =
      !nomclient || livraison.nom.toLowerCase().includes(nomclient.toLowerCase());

    // Retourner true si les deux conditions sont remplies
    return dateMatch && nomClientMatch;
  });
}

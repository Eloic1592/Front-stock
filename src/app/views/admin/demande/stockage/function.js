import { useState } from 'react';
import { formatDate } from 'app/utils/utils';

export const useListestockageFunctions = (data) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [editingId, setEditingId] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [sortColumn, setSortColumn] = useState(['1']);
  const [sortDirection, setSortDirection] = useState('asc');
  const [isEditClicked, setIsEditClicked] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [datestockage, setDatestockage] = useState('');
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
    setEditingId(row.idstockage);
    setIsEditClicked(true);
    setSelectedRowId(row.idstockage);
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
      setSelectedIds(data.vuestockages.map((row) => row.idstockage));
    } else {
      setSelectedIds([]);
    }
  };

  const filtredata = filtrestockage(data.vuestockages, codearticle, datestockage);
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
    setDatestockage,
    datestockage
  };
};

export function filtrestockage(vuestockages, codearticle, datestockage) {
  return vuestockages.filter((stockage) => {
    // Vérifier si la date du stockage correspond à la date spécifiée
    const datestockagematch =
      !datestockage ||
      new Date(new Date(formatDate(stockage.datestockage)).getTime()).getTime() ===
        new Date(datestockage).getTime();

    // Vérifier si le nom du client correspond au nom spécifié
    const numeromatch =
      !codearticle || stockage.marque.toLowerCase().includes(codearticle.toLowerCase());

    // Retourner true si les deux conditions sont remplies
    return numeromatch && datestockagematch;
  });
}

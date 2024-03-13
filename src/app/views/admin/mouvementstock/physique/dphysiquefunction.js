import { useState } from 'react';
import { formatDate } from 'app/utils/utils';

export const useDphysiqueFunctions = (data) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [editingId, setEditingId] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [sortColumn, setSortColumn] = useState(['1']);
  const [sortDirection, setSortDirection] = useState('asc');
  const [isEditClicked, setIsEditClicked] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [marque, setMarque] = useState('');
  const [nature, setNature] = useState('1');
  const [datedepot, setDatedepot] = useState('');
  const [mouvement, setMouvement] = useState('0');
  const [listdepot, setListdepot] = useState('1');

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setIsEditClicked(false);
  };

  const handleSave = (value, id, field) => {
    setEditingId(null);
  };

  const handleSelection = (event, iddetailmouvementphysique) => {
    if (event.target.checked) {
      setSelectedIds([...selectedIds, iddetailmouvementphysique]);
    } else {
      setSelectedIds(selectedIds.filter((i) => i !== iddetailmouvementphysique));
    }
  };

  //Select  toutes les checkboxes de la liste
  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedIds(data.mouvementphysiques.map((row) => row.iddetailmouvementphysique));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectColumn = (event) => {
    setSortColumn(event.target.value);
  };

  const filtredata = filtrestockphysique(
    data.mouvementphysiques,
    marque,
    nature,
    mouvement,
    datedepot,
    listdepot
  );
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
    cancelEdit,
    handleSave,
    handleSelection,
    handleSelectAll,
    handleSelectColumn,
    sortedData,
    marque,
    setMarque,
    datedepot,
    setDatedepot,
    mouvement,
    setMouvement,
    listdepot,
    setListdepot,
    nature,
    setNature
  };
};
function filtrestockphysique(mouvementphysiques, marque, nature, typemouvement, datedepot, depot) {
  return mouvementphysiques.filter((item) => {
    const marqueMatch =
      !marque ||
      item.marque.toLowerCase().includes(marque.toLowerCase()) ||
      item.modele.toLowerCase().includes(marque.toLowerCase());
    let natureMatch = true;
    if (nature !== '1') {
      natureMatch = item.naturemouvement === nature;
    }
    const dateMatch =
      !datedepot ||
      new Date(formatDate(item.datedepot)).getTime() === new Date(datedepot).getTime();
    let typemouvementMatch = true;
    if (typemouvement !== '0') {
      typemouvementMatch = item.typemouvement === parseInt(typemouvement);
    }

    let depotMatch = true;
    if (depot !== '1') {
      depotMatch = item.iddepot === depot;
    }

    return marqueMatch && dateMatch && typemouvementMatch && depotMatch && natureMatch;
  });
}

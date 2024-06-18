import { useState } from 'react';
import { formatDate } from 'app/utils/utils';

export const useListedistributionmaterielFunctions = (data) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [editingId, setEditingId] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [sortColumn, setSortColumn] = useState(['1']);
  const [sortDirection, setSortDirection] = useState('asc');
  const [isEditClicked, setIsEditClicked] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [datedistribution, setDatedistribution] = useState('');
  const [numserie, setNumserie] = useState('');
  const [codedepot, setCodedepot] = useState('');

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Active la modification
  const handleEdit = (row) => {
    setEditingId(row.iddistribution);
    setIsEditClicked(true);
    setSelectedRowId(row.iddistribution);
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
      setSelectedIds(data.vuedistributionmateriels.map((row) => row.iddistribution));
    } else {
      setSelectedIds([]);
    }
  };

  const filtredata = filtredistributions(
    data.vuedistributionmateriels,
    numserie,
    datedistribution,
    codedepot
  );
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
    numserie,
    setNumserie,
    setDatedistribution,
    datedistribution,
    codedepot,
    setCodedepot
  };
};

export function filtredistributions(
  vuedistributionmateriels,
  numserie,
  datedistribution,
  codedepot
) {
  return vuedistributionmateriels.filter((distribution) => {
    // Vérifier si la date du distribution correspond à la date spécifiée
    const datedistributionmatch =
      !datedistribution ||
      new Date(new Date(formatDate(distribution.datedistribution)).getTime()).getTime() ===
        new Date(datedistribution).getTime();

    const marquematch =
      !numserie || distribution.marque.toLowerCase().includes(numserie.toLowerCase());
    const numseriematch =
      !numserie || distribution.numserie.toLowerCase().includes(numserie.toLowerCase());

    // Vérifier si le nom du client correspond au nom spécifié
    const depotmatch =
      !codedepot || distribution.depot.toLowerCase().includes(codedepot.toLowerCase());
    const codedepmatch =
      !codedepot || distribution.codedep.toLowerCase().includes(codedepot.toLowerCase());
    // Retourner true si les deux conditions sont remplies
    return (marquematch || numseriematch) && datedistributionmatch && (codedepmatch || depotmatch);
  });
}

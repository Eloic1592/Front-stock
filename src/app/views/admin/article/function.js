import { useState } from 'react';
export const useListeArticlefunctions = (data) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [editingId, setEditingId] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [sortColumn, setSortColumn] = useState(['1']);
  const [sortDirection, setSortDirection] = useState('asc');
  const [isEditClicked, setIsEditClicked] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [typemateriel, setTypemateriel] = useState('1');
  const [codearticle, setCodearticle] = useState('');
  const [marque, setMarque] = useState('');

  // Pagination
  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSelection = (event, id) => {
    if (event.target.checked) {
      setSelectedIds([...selectedIds, id]);
    } else {
      setSelectedIds(selectedIds.filter((i) => i !== id));
    }
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedIds(data.articles.map((row) => row.idarticle));
    } else {
      setSelectedIds([]);
    }
  };

  // Tri de table
  const handleSelectColumn = (event) => {
    setSortColumn(event.target.value);
  };
  const filtredata = filtrearticle(data.articles, marque, codearticle, typemateriel);
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
    handleSelection,
    handleSelectAll,
    handleSelectColumn,
    sortedData,
    codearticle,
    setCodearticle,
    marque,
    setMarque,
    typemateriel,
    setTypemateriel
  };
};

export function filtrearticle(listearticle, marque, codearticle, typemateriel) {
  return listearticle.filter((Item) => {
    const marquematch = !marque || Item.marque.toLowerCase().includes(marque.toLowerCase());
    const codearticlematch =
      !codearticle ||
      (Item.codearticle && Item.codearticle.toLowerCase().includes(codearticle.toLowerCase()));

    let typematch = true;
    if (typemateriel !== '1') {
      typematch = Item.idtypemateriel === typemateriel;
    }
    return codearticlematch && marquematch && typematch;
  });
}

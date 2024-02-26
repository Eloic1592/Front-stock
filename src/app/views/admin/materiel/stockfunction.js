import { useState } from 'react';
export const useStockfunctions = (data) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [editingId, setEditingId] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [sortColumn, setSortColumn] = useState(['1']);
  const [sortDirection, setSortDirection] = useState('asc');
  const [isEditClicked, setIsEditClicked] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [numserie, setNumserie] = useState('');
  const [categoriemateriel, setCategoriemateriel] = useState('0');
  const [typemateriel, setTypemateriel] = useState('0');
  const [couleur, setCouleur] = useState('0');
  const [marque, setMarque] = useState('');
  const [modele, setModele] = useState('');
  const [signature, setSignature] = useState('1');

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Active la modification
  const handleEdit = (row) => {
    setEditingId(row.id);
    setIsEditClicked(true);
    setSelectedRowId(row.id);
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

  const handleSelectColumn = (event) => {
    setSortColumn(event.target.value);
  };

  const filtredata = filtremateriel(data.stockmateriels, typemateriel);
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
    handleSelectColumn,
    sortedData,
    setCouleur,
    setNumserie,
    setTypemateriel,
    setCategoriemateriel,
    categoriemateriel,
    couleur,
    numserie,
    typemateriel,
    marque,
    setMarque,
    modele,
    setModele,
    signature,
    setSignature
  };
};

// Filtre
export function filtremateriel(stockmateriel, typemateriel) {
  return stockmateriel.filter((Item) => {
    let typeMatch = true;
    if (typemateriel !== '0') {
      typeMatch = Item.idtypemateriel === typemateriel;
    }
    return typeMatch;
  });
}

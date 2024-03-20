import { useState } from 'react';
export const useListematerielFunctions = (data) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [editingId, setEditingId] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [sortColumn, setSortColumn] = useState(['1']);
  const [sortDirection, setSortDirection] = useState('asc');
  const [isEditClicked, setIsEditClicked] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [categoriemateriel, setCategoriemateriel] = useState('0');
  const [typemateriel, setTypemateriel] = useState('0');
  const [couleur, setCouleur] = useState('0');
  const [marque, setMarque] = useState('');
  const [disponibilite, setDisponibilite] = useState('0');
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

  //Select  toutes les checkboxes de la liste
  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedIds(data.listemateriels.map((row) => row.idmateriel));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectColumn = (event) => {
    setSortColumn(event.target.value);
  };

  const filtredata = filtremateriel(
    data.listemateriels,
    marque,
    typemateriel,
    signature,
    disponibilite
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
    handleEdit,
    cancelEdit,
    handleSave,
    handleSelection,
    handleSelectAll,
    handleSelectColumn,
    sortedData,
    // setCouleur,
    setTypemateriel,
    setCategoriemateriel,
    categoriemateriel,
    // couleur,
    typemateriel,
    marque,
    setMarque,
    signature,
    setSignature,
    setDisponibilite,
    disponibilite
  };
};

// Filtre
export function filtremateriel(listemateriel, filter, typemateriel, signature, disponibilite) {
  return listemateriel.filter((Item) => {
    const filtermatch =
      (Item.marque && Item.marque.toLowerCase().includes(filter.toLowerCase())) ||
      (Item.modele && Item.modele.toLowerCase().includes(filter.toLowerCase())) ||
      (Item.numserie && Item.numserie.toLowerCase().includes(filter.toLowerCase()));
    let typeMatch = true;
    if (typemateriel !== '0') {
      typeMatch = Item.idtypemateriel === typemateriel;
    }
    let signaturematch = true;
    if (signature !== '1') {
      signaturematch = Item.signature === signature;
    }
    let statutmatch = true;
    if (disponibilite !== '0') {
      statutmatch = Item.statut === disponibilite;
    }
    return filtermatch && signaturematch && typeMatch;
  });
}

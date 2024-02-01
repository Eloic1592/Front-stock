import { useState } from 'react';
export const useListematerielFunctions = (data) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [editingId, setEditingId] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [sortColumn, setSortColumn] = useState(['1']);
  const [sortDirection, setSortDirection] = useState('asc');
  const [isEditClicked, setIsEditClicked] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [numserie, setNumserie] = useState('');
  const [categoriemateriel, setCategoriemateriel] = useState(['1']);
  const [typemateriel, setTypemateriel] = useState(['1']);
  const [couleur, setCouleur] = useState(['1']);

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
    numserie,
    categoriemateriel,
    typemateriel,
    couleur
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
    setCouleur,
    setNumserie,
    setTypemateriel,
    setCategoriemateriel,
    categoriemateriel,
    couleur,
    numserie,
    typemateriel
  };
};
// Filtre
export function filtremateriel(listemateriel, numserie, categoriemateriel, typemateriel, couleur) {
  return listemateriel.filter((Item) => {
    const numSerieMatch =
      numserie !== null ? Item.numserie.toLowerCase().includes(numserie.toLowerCase()) : true;
    const categorieMatch =
      categoriemateriel !== 1
        ? Item.idcategoriemateriel === categoriemateriel
        : true || categoriemateriel === 1;

    // const typeMatch = typemateriel !== 1 ? Item.idtypemateriel === typemateriel : true;
    // const couleurtMatch =
    //   couleur !== null ? Item.couleur.toLowerCase().includes(couleur.toLowerCase()) : true;
    // Ajout des conditions pour vérifier les valeurs de numserie et categoriemateriel
    return numSerieMatch;
  });
}

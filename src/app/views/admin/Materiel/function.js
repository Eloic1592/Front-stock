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
  const [article, setArticle] = useState('1');
  const [couleur, setCouleur] = useState('1');
  const [typemateriel, setTypemateriel] = useState('1');
  const [categoriemateriel, setCategoriemateriel] = useState('1');

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
  const cancelEdit = (row) => {
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
    article,
    couleur,
    typemateriel,
    categoriemateriel
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
    setArticle,
    setNumserie,
    setTypemateriel,
    setCategoriemateriel,
    categoriemateriel,
    couleur,
    article,
    numserie,
    typemateriel
  };
};
// Filtre
export function filtremateriel(
  listemateriel,
  numserie,
  article,
  couleur,
  typemateriel,
  categoriemateriel
) {
  // Vérifier s'il y a des critères de filtrage définis
  if (numserie != 1 || typemateriel != 1 || categoriemateriel != 1 || couleur != 1) {
    return listemateriel.filter((Item) => {
      // Vérifier si chaque critère est différent de 1 avant de l'appliquer
      const numserieMatch =
        numserie != 1 ? Item.numserie.toLowerCase().includes(numserie.toLowerCase()) : true;
      const typematerielMatch =
        typemateriel != 1
          ? Item.idtypemateriel.toLowerCase().includes(typemateriel.toLowerCase())
          : true;
      const categoriematerielMatch =
        categoriemateriel != 1
          ? Item.idcategoriemateriel.toLowerCase().includes(categoriemateriel.toLowerCase())
          : true;
      const couleurMatch =
        couleur != 1 ? Item.couleur.toLowerCase().includes(couleur.toLowerCase()) : true;

      // Retourner vrai si l'élément répond à tous les critères
      return numserieMatch && typematerielMatch && categoriematerielMatch && couleurMatch;
    });
  } else {
    // Si tous les critères sont égaux à 1, retourner la liste de matériel complète
    return listemateriel;
  }
}

import { formatDate } from 'app/utils/utils';
import { useState, useEffect } from 'react';
import { baseUrl } from 'app/utils/constant';

export const useListeproformafunctions = (data) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [editingId, setEditingId] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [sortColumn, setSortColumn] = useState(['1']);
  const [sortDirection, setSortDirection] = useState('asc');
  const [isEditClicked, setIsEditClicked] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [datevalidation, setDatevalidation] = useState('');
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
    setEditingId(row.idproforma);
    setIsEditClicked(true);
    setSelectedRowId(row.idproforma);
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
      setSelectedIds(data.map((row) => row.idproforma));
    } else {
      setSelectedIds([]);
    }
  };

  const filtredata = filtreproforma(data, client, datevalidation);
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
    client,
    setDatevalidation,
    datevalidation
  };
};

export function filtreproforma(listeproforma, nomclient, datevalidation) {
  return listeproforma.filter((proforma) => {
    const datevalidationmatch =
      !datevalidation ||
      new Date(formatDate(proforma.datevalidation)).getTime() ===
        new Date(datevalidation).getTime();

    const nomClientMatch =
      !nomclient || proforma.nom.toLowerCase().includes(nomclient.toLowerCase());

    return nomClientMatch && datevalidationmatch;
  });
}

export function useFetchProformaDetails(iddevis) {
  const [data, setData] = useState({
    detaildevis: [],
    somme: [],
    clientdevis: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        let devisParams = {
          iddevis: iddevis
        };
        let url = baseUrl + '/proforma/detailproforma';
        const response = await fetch(url, {
          crossDomain: true,
          method: 'POST',
          body: JSON.stringify(devisParams),
          headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`);
        }
        const responseData = await response.json();
        const newData = {
          detaildevis: responseData.detaildevis || [],
          somme: responseData.somme || [],
          clientdevis: responseData.clientdevis || []
        };

        setData(newData);
      } catch (error) {
        console.log('tsy mety');
      }
    };

    fetchData();
  }, [iddevis]);

  return data;
}

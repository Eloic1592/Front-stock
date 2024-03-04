import {
  Box,
  Button,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Icon,
  IconButton,
  TextField,
  Checkbox,
  Select,
  MenuItem,
  Alert,
  Snackbar,
  Grid
} from '@mui/material';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { formatNumber, colors, signatures } from 'app/utils/utils';
import { SimpleCard } from 'app/components';
import { StyledTable } from 'app/views/style/style';
import { useListematerielFunctions } from 'app/views/admin/materiel/function';
import { baseUrl } from 'app/utils/constant';
import { pdf as renderPdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import PDFMateriel from './PDFmateriel';

const Listemateriel = ({ rowsPerPageOptions = [5, 10, 25, 50, 100, 200] }) => {
  const columns = [
    { label: 'ID', field: 'idmateriel', align: 'center' },
    { label: 'Type materiel', field: 'typemateriel', align: 'center' },
    { label: 'Marque', field: 'marque', align: 'center' },
    { label: 'Modele', field: 'modele', align: 'center' },
    { label: 'Numserie', field: 'numserie', align: 'center' },
    { label: 'Prix de vente', field: 'prixvente', align: 'center' },
    { label: 'Caution', field: 'caution', align: 'center' },
    { label: 'Couleur', field: 'couleur', align: 'center' },
    { label: 'Signature', field: 'signature', align: 'center' },
    { label: 'statut', field: 'statut', align: 'center' }
  ];
  const [message, setMessage] = useState({
    text: 'Information enregistree',
    severity: 'success',
    open: false
  });

  const [data, setData] = useState({
    typemateriels: [],
    listemateriels: []
  });
  const [initialDataFetched, setInitialDataFetched] = useState(false);
  const [isEditClicked, setIsEditClicked] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const handleAlertClose = () => setMessage({ open: false });

  // Update
  const [isEditedIdmateriel, setIsEditedIdmateriel] = useState('');
  const [isEditedtypemat, setIsEditedtypemat] = useState('1');
  const [isEditedmodele, setIsEditedmodele] = useState('');
  const [isEditedMarque, setIsEditedMarque] = useState('');
  const [isEditednumserie, setIsEditednumserie] = useState('');
  const [isEditedprixvente, setIsEditedprixvente] = useState(0);
  const [isEditedcolor, setIsEditedcolor] = useState(['Rouge']);
  const [isEditedcaution, setisEditedcaution] = useState(0);
  const [isEditedstatut, setIsEditedstatut] = useState('1');
  const [isEditedsignature, setIsEditedsignature] = useState('1');

  // Modification(Update)
  const handleEdit = (row) => {
    setIsEditedIdmateriel('');
    setIsEditClicked(true);
    setSelectedRowId(row.idmateriel);
  };

  const cancelEdit = () => {
    setIsEditClicked(false);
  };

  const {
    sortDirection,
    page,
    rowsPerPage,
    setSortDirection,
    handleChangePage,
    sortColumn,
    setCouleur,
    setTypemateriel,
    couleur,
    typemateriel,
    selectedIds,
    marque,
    setMarque,
    handleChangeRowsPerPage,
    handleSelectAll,
    handleSelection,
    handleSelectColumn,
    sortedData,
    signature,
    disponibilite,
    setDisponibilite,
    setSignature
  } = useListematerielFunctions(data);

  const handleSubmit = () => {
    let materiel = {
      idmateriel: isEditedIdmateriel,
      idtypemateriel: isEditedtypemat,
      marque: isEditedMarque,
      modele: isEditedmodele,
      numserie: isEditednumserie,
      prixvente: isEditedprixvente,
      caution: isEditedcaution,
      couleur: isEditedcolor,
      statut: isEditedstatut,
      signature: isEditedsignature
    };

    let url = baseUrl + '/materiel/createmateriel';
    fetch(url, {
      crossDomain: true,
      method: 'POST',
      body: JSON.stringify(materiel),
      headers: { 'Content-Type': 'application/json' }
    })
      .then((response) => response.json())
      .then((response) => {
        setMessage({
          text: 'Information modifiee',
          severity: 'success',
          open: true
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch(() => {
        setMessage({
          text: 'La modification dans la base de données a échoué',
          severity: 'error',
          open: true
        });
      });
  };

  const generateMaterielPDF = async () => {
    const blob = await renderPdf(
      <PDFMateriel dataList={data.listemateriels} columns={columns} />
    ).toBlob();
    saveAs(blob, 'Liste_materiel.pdf');
  };

  //  Use effect
  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = baseUrl + '/materiel/contentmateriel';
        const response = await fetch(url, {
          crossDomain: true,
          method: 'POST',
          body: JSON.stringify({}),
          headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
          setMessage({
            text: "Il y a un probleme, aucune donnee n'a ete recuperee",
            severity: 'error',
            open: true
          });
        }
        const responseData = await response.json();
        const newData = {
          typemateriels: responseData.typemateriels || [],
          listemateriels: responseData.listemateriels || []
        };
        setData(newData);
      } catch (error) {
        setMessage({
          text: "Aucune donnee n'ete recuperee,veuillez verifier si le serveur est actif",
          severity: 'error',
          open: true
        });
      }
    };

    if (!initialDataFetched) {
      fetchData();
      setInitialDataFetched(true);
    }

    if (isEditClicked && selectedRowId !== null) {
      const selectedRow = sortedData.find((row) => row.idmateriel === selectedRowId);

      if (selectedRow) {
        setIsEditedIdmateriel(selectedRow.idmateriel);
      }
    }
  }, [isEditClicked, selectedRowId, sortedData, initialDataFetched]);
  return (
    <Box width="100%" overflow="auto">
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <SimpleCard title="Rechercher un materiel" sx={{ marginBottom: '16px' }}>
            <Grid container spacing={1}>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  size="small"
                  id="marque"
                  type="text"
                  label="Marque ou modele ou numero de serie"
                  name="marque"
                  value={marque}
                  onChange={(event) => setMarque(event.target.value)}
                />
              </Grid>
              <Grid item xs={2}>
                <Select
                  fullWidth
                  labelId="select-label"
                  value={typemateriel}
                  onChange={(event) => setTypemateriel(event.target.value)}
                  size="small"
                  sx={{ mb: 3 }}
                >
                  <MenuItem value="0">Tous types</MenuItem>
                  {data.typemateriels.map((row) => (
                    <MenuItem key={row.idtypemateriel} value={row.idtypemateriel}>
                      {row.typemateriel}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={2}>
                <Select
                  fullWidth
                  labelId="select-label"
                  value={couleur}
                  onChange={(event) => setCouleur(event.target.value)}
                  size="small"
                  sx={{ mb: 3 }}
                >
                  <MenuItem value="0">Toutes couleurs</MenuItem>
                  {colors.map((color, index) => (
                    <MenuItem key={index} value={color}>
                      {color}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={3}>
                <Select
                  fullWidth
                  labelId="select-label"
                  value={signature}
                  onChange={(event) => setSignature(event.target.value)}
                  size="small"
                  sx={{ mb: 3 }}
                >
                  <MenuItem value="1">Toutes Signatures</MenuItem>
                  {signatures.map((signature, index) => (
                    <MenuItem key={index} value={signature}>
                      {signature}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={2}>
                <Select
                  labelId="select-label"
                  sx={{ mb: 3 }}
                  size="small"
                  value={disponibilite}
                  onChange={(event) => setDisponibilite(event.target.value)}
                  fullWidth
                >
                  <MenuItem value="0">Tous statuts</MenuItem>
                  <MenuItem value="LIBRE">Libre</MenuItem>
                  <MenuItem value="OCCUPE">Occupe</MenuItem>
                </Select>
              </Grid>
            </Grid>
          </SimpleCard>
        </Grid>
        <Grid item>
          <SimpleCard title="Liste des materiels">
            {/* Tri de tables */}
            <Grid container spacing={2}>
              <Grid item xs={2}>
                <Select
                  fullWidth
                  labelId="select-label"
                  value={sortColumn}
                  size="small"
                  onChange={handleSelectColumn}
                >
                  <MenuItem value="1">Colonne</MenuItem>
                  {columns.map((column, index) => (
                    <MenuItem key={index} value={column.field}>
                      {column.label}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={2}>
                <Select
                  fullWidth
                  labelId="select-direction-label"
                  value={sortDirection}
                  size="small"
                  onChange={(event) => setSortDirection(event.target.value)}
                >
                  <MenuItem value="asc">ASC</MenuItem>
                  <MenuItem value="desc">DESC</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={2}>
                <Button
                  fullWidth
                  className="button"
                  variant="contained"
                  aria-label="Edit"
                  color="error"
                  disabled={selectedIds.length === 0}
                >
                  <Icon>delete</Icon>
                </Button>
              </Grid>
              <Grid item xs={2}>
                <Button
                  className="button"
                  variant="contained"
                  aria-label="Edit"
                  color="secondary"
                  onClick={generateMaterielPDF}
                >
                  <Icon>picture_as_pdf</Icon>
                </Button>
              </Grid>
            </Grid>
            <StyledTable id="datatable">
              <TableHead>
                {/* Listage de Donnees */}
                <TableRow>
                  <TableCell align="center" width="5%">
                    <Checkbox
                      checked={data.listemateriels.every((row) =>
                        selectedIds.includes(row.idmateriel)
                      )}
                      indeterminate={
                        data.listemateriels.some((row) => selectedIds.includes(row.idmateriel)) &&
                        !data.listemateriels.every((row) => selectedIds.includes(row.idmateriel))
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell key="typemateriel" align="center" width="10%">
                    typemateriel
                  </TableCell>
                  <TableCell key="marque" align="center" width="10%">
                    marque
                  </TableCell>
                  <TableCell key="modele" align="center" width="10%">
                    modele
                  </TableCell>
                  <TableCell key="numserie" align="center" width="10%">
                    numserie
                  </TableCell>
                  <TableCell key="prixvente" align="center" width="10%">
                    prixvente
                  </TableCell>
                  <TableCell key="caution" align="center" width="10%">
                    caution
                  </TableCell>
                  <TableCell key="couleur" align="center" width="10%">
                    couleur
                  </TableCell>
                  <TableCell key="signature" align="center" width="10%">
                    signature
                  </TableCell>
                  <TableCell key="statut" align="center" width="7%">
                    statut
                  </TableCell>
                  <TableCell width="5%">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* Donnees du tableau */}
                {sortedData && sortedData.length > 0 ? (
                  sortedData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Checkbox
                            align="center"
                            width="5%"
                            checked={selectedIds.includes(row.idmateriel)}
                            onChange={(event) => handleSelection(event, row.idmateriel)}
                          />
                        </TableCell>

                        {isEditClicked && row.idmateriel === selectedRowId ? (
                          <>
                            <TableCell>
                              <Select
                                labelId="select-label"
                                value={isEditedtypemat}
                                onChange={(event) => setIsEditedtypemat(event.target.value)}
                                fullWidth
                              >
                                <MenuItem value="1" disabled>
                                  Choisir un type
                                </MenuItem>
                                {data.typemateriels.map((row) => (
                                  <MenuItem key={row.idtypemateriel} value={row.idtypemateriel}>
                                    {row.typemateriel}
                                  </MenuItem>
                                ))}
                              </Select>
                            </TableCell>
                            <TableCell>
                              <TextField
                                type="text"
                                value={isEditedMarque}
                                onChange={(event) => setIsEditedMarque(event.target.value)}
                              />
                            </TableCell>
                            <TableCell>
                              <TextField
                                type="text"
                                value={isEditedmodele}
                                onChange={(event) => setIsEditedmodele(event.target.value)}
                              />
                            </TableCell>
                            <TableCell>
                              <TextField
                                value={isEditednumserie}
                                onChange={(event) => setIsEditednumserie(event.target.value)}
                              />
                            </TableCell>
                            <TableCell>
                              <TextField
                                type="number"
                                InputProps={{ inputProps: { min: 0 } }}
                                value={isEditedprixvente}
                                onChange={(event) => setIsEditedprixvente(event.target.value)}
                              />
                            </TableCell>
                            <TableCell>
                              <TextField
                                type="number"
                                InputProps={{ inputProps: { min: 0 } }}
                                value={isEditedcaution}
                                onChange={(event) => setisEditedcaution(event.target.value)}
                              />
                            </TableCell>
                            <TableCell>
                              <Select
                                fullWidth
                                labelId="select-label"
                                value={isEditedcolor}
                                onChange={(event) => setIsEditedcolor(event.target.value)}
                              >
                                <MenuItem value="0">Toutes couleurs</MenuItem>
                                {colors.map((color, index) => (
                                  <MenuItem key={index} value={color}>
                                    {color}
                                  </MenuItem>
                                ))}
                              </Select>
                            </TableCell>
                            <TableCell>
                              <Select
                                labelId="select-label"
                                value={isEditedstatut}
                                onChange={(event) => setIsEditedstatut(event.target.value)}
                                fullWidth
                              >
                                <MenuItem value="1" disabled>
                                  Choisir la disponibilite
                                </MenuItem>
                                <MenuItem value="0">Libre</MenuItem>
                                <MenuItem value="1">Occupe</MenuItem>
                              </Select>
                            </TableCell>
                            <TableCell>
                              <Select
                                labelId="select-label"
                                value={isEditedsignature}
                                onChange={(event) => setIsEditedsignature(event.target.value)}
                                fullWidth
                              >
                                <MenuItem value="1" disabled>
                                  Choisir une signature
                                </MenuItem>
                                <MenuItem value="Perso">Perso</MenuItem>
                                <MenuItem value="ITU">ITU</MenuItem>
                                <MenuItem value="Aucun appartenance">Aucun appartenance</MenuItem>
                              </Select>
                            </TableCell>
                          </>
                        ) : (
                          <>
                            <TableCell align="center">{row.typemateriel}</TableCell>
                            <TableCell align="center">{row.marque}</TableCell>
                            <TableCell align="center">{row.modele}</TableCell>
                            <TableCell align="center">{row.numserie}</TableCell>
                            <TableCell align="center" style={{ fontWeight: 'bold' }}>
                              {formatNumber(row.prixvente)}
                            </TableCell>
                            <TableCell align="center" style={{ fontWeight: 'bold' }}>
                              {formatNumber(row.caution)}
                            </TableCell>
                            <TableCell align="center">{row.couleur}</TableCell>
                            <TableCell align="center">{row.signature}</TableCell>
                            <TableCell align="center">{row.statut}</TableCell>
                            <TableCell align="center">
                              <IconButton
                                className="button"
                                variant="contained"
                                aria-label="Edit"
                                color="primary"
                                onClick={() => handleEdit(row)}
                              >
                                <Icon>edit_icon</Icon>
                              </IconButton>
                            </TableCell>
                          </>
                        )}

                        {isEditClicked && row.idmateriel === selectedRowId && (
                          <>
                            <TableCell>
                              <IconButton
                                className="button"
                                variant="contained"
                                aria-label="Edit"
                                color="secondary"
                                onClick={() => handleSubmit()}
                              >
                                <Icon>arrow_forward</Icon>
                              </IconButton>
                              <IconButton
                                className="button"
                                variant="contained"
                                aria-label="Edit"
                                color="error"
                                onClick={() => cancelEdit(row)}
                              >
                                <Icon>close</Icon>
                              </IconButton>
                            </TableCell>
                          </>
                        )}
                      </TableRow>
                    ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={10}>
                      <Typography variant="subtitle1" color="textSecondary">
                        Aucune donnee disponible
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </StyledTable>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TablePagination
                  sx={{ px: 2 }}
                  page={page}
                  component="div"
                  rowsPerPage={rowsPerPage}
                  count={sortedData.length}
                  onPageChange={handleChangePage}
                  rowsPerPageOptions={rowsPerPageOptions}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  nextIconButtonProps={{ 'aria-label': 'Page suivante' }}
                  backIconButtonProps={{ 'aria-label': 'Page precedente' }}
                />
              </Grid>
            </Grid>
          </SimpleCard>
        </Grid>
      </Grid>
      <Snackbar open={message.open} autoHideDuration={3000} onClose={handleAlertClose}>
        <Alert severity={message.severity} sx={{ width: '100%' }} variant="filled">
          {message.text}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Listemateriel;

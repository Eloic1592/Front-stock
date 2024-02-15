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
import { formatNumber } from 'app/utils/utils';
import { SimpleCard } from 'app/components';
import { StyledTable } from 'app/views/style/style';
import { useListematerielFunctions } from 'app/views/admin/materiel/function';
import { baseUrl } from 'app/utils/constant';
import { colors } from 'app/utils/utils';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';

const Listemateriel = ({ rowsPerPageOptions = [5, 10, 25] }) => {
  const columns = [
    { label: 'ID', field: 'idmateriel', align: 'center' },
    { label: 'Type materiel', field: 'typemateriel', align: 'center' },
    { label: 'Categorie', field: 'categorie', align: 'center' },
    { label: 'modele', field: 'modele', align: 'center' },
    { label: 'Numserie', field: 'numserie', align: 'center' },
    { label: 'Prix de vente', field: 'prixvente', align: 'center' },
    { label: 'Caution', field: 'caution', align: 'center' },
    { label: 'Couleur', field: 'couleur', align: 'center' },
    { label: 'statut', field: 'statut', align: 'center' }

    // Other columns...
  ];
  const [message, setMessage] = useState({
    text: 'Information enregistree',
    severity: 'success',
    open: false
  });

  const [data, setData] = useState({
    typemateriels: [],
    categoriemateriels: [],
    listemateriels: [],
    articles: []
  });
  const [initialDataFetched, setInitialDataFetched] = useState(false);
  const [isEditClicked, setIsEditClicked] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const handleAlertClose = () => setMessage({ open: false });

  // Update
  const [isEditedIdmateriel, setIsEditedIdmateriel] = useState('');
  const [isEditedtypemat, setIsEditedtypemat] = useState(['1']);
  const [isEditedcatemat, setIsEditedcatemat] = useState(['1']);
  const [isEditedmodele, setIsEditedmodele] = useState(['1']);
  const [isEditednumserie, setIsEditednumserie] = useState('');
  const [isEditedprixvente, setIsEditedprixvente] = useState(0);
  const [isEditedcolor, setIsEditedcolor] = useState(['Rouge']);
  const [isEditedcaution, setisEditedcaution] = useState(0);

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
    setCategoriemateriel,
    categoriemateriel,
    couleur,
    typemateriel,
    selectedIds,
    setNumserie,
    numserie,
    handleChangeRowsPerPage,
    handleSelectAll,
    handleSelection,
    handleSelectColumn,
    sortedData
  } = useListematerielFunctions(data);

  const handleSubmit = () => {
    let materiel = {
      idmateriel: isEditedIdmateriel,
      idcategoriemateriel: isEditedcatemat,
      idtypemateriel: isEditedtypemat,
      idarticle: isEditedmodele,
      numserie: isEditednumserie,
      prixvente: isEditedprixvente,
      caution: isEditedcaution,
      couleur: isEditedcolor
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

  const handleExportRows = () => {
    // const tableElement = document.getElementById('datatable'); // Assurez-vous que l'ID correspond à celui de votre tableau
    // html2canvas(tableElement).then((canvas) => {
    //   const imgData = canvas.toDataURL('image/png');
    //   const pdf = new jsPDF();
    //   const imgProps = pdf.getImageProperties(imgData);
    //   const pdfWidth = pdf.internal.pageSize.getWidth();
    //   const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    //   // Ajouter un titre au PDF
    //   pdf.setFontSize(16); // Définir la taille de la police pour le titre
    //   pdf.text('Liste des matériels', 10, 10); // Ajouter le texte du titre
    //   // Calculer la hauteur maximale pour l'image
    //   const maxImgHeight = pdf.internal.pageSize.getHeight() - 20; //  20 est la marge en bas pour le titre
    //   // Si l'image est trop grande, redimensionner pour qu'elle tienne sur une page
    //   if (pdfHeight > maxImgHeight) {
    //     const ratio = maxImgHeight / pdfHeight;
    //     pdfWidth *= ratio;
    //     pdfHeight *= ratio;
    //   }
    //   // Ajouter l'image de la table au PDF
    //   pdf.addImage(imgData, 'PNG', 0, 20, pdfWidth, pdfHeight); // Ajustez la position y pour laisser de l'espace pour le titre
    //   pdf.save('Liste_matériel.pdf');
    // });
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
        // Assuming data is an object with properties materiels, articles, typemateriels, categoriemateriels, and listemateriels
        const newData = {
          typemateriels: responseData.typemateriels || [],
          categoriemateriels: responseData.categoriemateriels || [],
          listemateriels: responseData.listemateriels || [],
          articles: responseData.articles || []
        };
        setData(newData);
      } catch (error) {
        setMessage({
          text: "Aucune donnee n'ete recuperee,veuillez verifier si le serveur est actif",
          severity: 'error',
          open: true
        });
        // Gérer les erreurs de requête Fetch ici
      }
    };

    // Charger les données initiales uniquement si elles n'ont pas encore été chargées
    if (!initialDataFetched) {
      fetchData(); // Appel initial
      setInitialDataFetched(true);
    }

    // La logique conditionnelle
    if (isEditClicked && selectedRowId !== null) {
      const selectedRow = sortedData.find((row) => row.idmateriel === selectedRowId);

      if (selectedRow) {
        setIsEditedIdmateriel(selectedRow.idmateriel);
        // setEditedNaturemouvement((prev) => (prev != null ? prev : selectedRow.naturemouvement));
      }
    }
  }, [isEditClicked, selectedRowId, sortedData, initialDataFetched]); // Ajoutez initialDataFetched comme dépendance
  return (
    <Box width="100%" overflow="auto">
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <SimpleCard title="Rechercher un materiel" sx={{ marginBottom: '16px' }}>
            <Grid container spacing={1}>
              <Grid item xs={6} sm={3}>
                <TextField
                  fullWidth
                  size="small"
                  id="numeroserie"
                  type="text"
                  label="Numero de serie"
                  name="numserie"
                  variant="outlined"
                  value={numserie}
                  onChange={(event) => setNumserie(event.target.value)}
                  sx={{ mb: 3 }}
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <Select
                  fullWidth
                  labelId="select-label"
                  value={categoriemateriel}
                  onChange={(event) => setCategoriemateriel(event.target.value)}
                  size="small"
                  sx={{ mb: 3 }}
                >
                  <MenuItem value="0">Toutes categories</MenuItem>
                  {data.categoriemateriels.map((row) => (
                    <MenuItem key={row.idcategoriemateriel} value={row.idcategoriemateriel}>
                      {row.categoriemateriel}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={6} sm={3}>
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
              <Grid item xs={6} sm={3}>
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
                  onClick={handleExportRows}
                >
                  <Icon>picture_as_pdf</Icon>
                </Button>
              </Grid>
            </Grid>
            <StyledTable id="datatable">
              <TableHead>
                {/* Listage de Donnees */}
                <TableRow>
                  <TableCell align="left">
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
                  <TableCell key="idmateriel" align="left">
                    idmateriel
                  </TableCell>
                  <TableCell key="categorie" align="left">
                    categorie
                  </TableCell>
                  <TableCell key="typemateriel" align="left">
                    typemateriel
                  </TableCell>
                  <TableCell key="modele" align="left">
                    modele
                  </TableCell>
                  <TableCell key="numserie" align="left">
                    numserie
                  </TableCell>
                  <TableCell key="prixvente" align="left">
                    prixvente
                  </TableCell>
                  <TableCell key="caution" align="left">
                    caution
                  </TableCell>
                  <TableCell key="couleur" align="left">
                    couleur
                  </TableCell>
                  <TableCell>Action</TableCell>
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
                            checked={selectedIds.includes(row.idmateriel)}
                            onChange={(event) => handleSelection(event, row.idmateriel)}
                          />
                        </TableCell>

                        {isEditClicked && row.idmateriel === selectedRowId ? (
                          <>
                            <TableCell>
                              <TextField
                                value={isEditedIdmateriel}
                                onChange={(event) => setIsEditedIdmateriel(event.target.value)}
                              />
                            </TableCell>
                            <TableCell>
                              <Select
                                labelId="select-label"
                                value={isEditedcatemat}
                                onChange={(event) => setIsEditedcatemat(event.target.value)}
                                fullWidth
                              >
                                <MenuItem value="1" disabled>
                                  Choisir une categorie
                                </MenuItem>
                                {data.categoriemateriels.map((row) => (
                                  <MenuItem
                                    key={row.idcategoriemateriel}
                                    value={row.idcategoriemateriel}
                                  >
                                    {row.categoriemateriel}
                                  </MenuItem>
                                ))}
                              </Select>
                            </TableCell>
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
                              <Select
                                labelId="select-label"
                                value={isEditedmodele}
                                onChange={(event) => setIsEditedmodele(event.target.value)}
                                fullWidth
                              >
                                <MenuItem value="1" disabled>
                                  Choisir un article
                                </MenuItem>
                                {data.articles.map((row) => (
                                  <MenuItem key={row.idarticle} value={row.idarticle}>
                                    {row.modele}/{row.codearticle}
                                  </MenuItem>
                                ))}
                              </Select>
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
                                value={isEditedprixvente}
                                onChange={(event) => setIsEditedprixvente(event.target.value)}
                              />
                            </TableCell>
                            <TableCell>
                              <TextField
                                type="number"
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
                          </>
                        ) : (
                          <>
                            <TableCell>{row.idmateriel}</TableCell>
                            <TableCell>{row.categoriemateriel}</TableCell>
                            <TableCell>{row.typemateriel}</TableCell>
                            <TableCell>{row.modele}</TableCell>
                            <TableCell>{row.numserie}</TableCell>
                            <TableCell>{formatNumber(row.prixvente)}</TableCell>
                            <TableCell>{formatNumber(row.caution)}</TableCell>
                            <TableCell>{row.couleur}</TableCell>
                            <TableCell>
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

import {
  Box,
  TextField,
  Snackbar,
  Alert,
  DialogContent,
  DialogActions,
  DialogTitle,
  Dialog,
  Grid
} from '@mui/material';
import { Breadcrumb } from 'app/components';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { Container } from 'app/views/style/style';
import { baseUrl } from 'app/utils/constant';
import { useParams } from 'react-router-dom';
import Listedetailproforma from './Listedetailproforma';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import { pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';

const Detaildevis = () => {
  const iddevis = useParams();
  console.log(iddevis.iddevis);

  // Form dialog
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleAlertClose = () => setMessage({ open: false });
  const [filename, setFilename] = useState('');

  const [message, setMessage] = useState({
    text: 'Information enregistree',
    severity: 'success',
    open: false
  });
  const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      backgroundColor: '#E4E4E4'
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1
    }
  });

  const MyDocument = ({ proformaData }) => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>Facture Proforma</Text>
          <Text>Client: {proformaData.clientName}</Text>
          <Text>Date: {proformaData.date}</Text>
        </View>
        <View style={styles.section}>
          {proformaData.items.map((item, index) => (
            <View key={index}>
              <Text>
                {index + 1}. {item.description} x {item.quantity}
              </Text>
              <Text>Prix: {item.price}</Text>
            </View>
          ))}
        </View>
        <View style={styles.section}>
          <Text>Total: {proformaData.total}</Text>
        </View>
      </Page>
    </Document>
  );

  const generateProformaPDF = async () => {
    const blob = await pdf(<MyDocument />).toBlob();
    saveAs(blob, 'Facture_Proforma.pdf');
  };

  useEffect(() => {}, []);
  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: 'Detail proforma', path: 'admin/proforma/detailproforma' },
            { name: 'Detail proforma' }
          ]}
        />
      </Box>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Box>
            <Button variant="contained" onClick={handleClickOpen} color="secondary">
              Exporter PDF
            </Button>
          </Box>
        </Grid>
        <Grid item>
          <Box>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth>
              <DialogTitle id="form-dialog-title">Exportation proforma</DialogTitle>
              <DialogContent>
                <Grid container direction="column" spacing={1}>
                  <Grid item xs={4}>
                    <TextField
                      fullWidth
                      id="filename"
                      type="text"
                      name="filename"
                      value={filename}
                      label="Nom du fichier"
                      onChange={(event) => setFilename(event.target.value)}
                    />
                  </Grid>
                </Grid>
              </DialogContent>

              <DialogActions>
                <Button variant="outlined" color="secondary" onClick={handleClose}>
                  Annuler
                </Button>
                <Button variant="contained" onClick={generateProformaPDF} color="primary">
                  Valider
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
        </Grid>
      </Grid>
      <Snackbar open={message.open} autoHideDuration={3000} onClose={handleAlertClose}>
        <Alert severity={message.severity} sx={{ width: '100%' }} variant="filled">
          {message.text}
        </Alert>
      </Snackbar>
      <Listedetailproforma />
    </Container>
  );
};

export default Detaildevis;

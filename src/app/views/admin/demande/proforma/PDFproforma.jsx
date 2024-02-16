import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { formatNumber, converttodate } from 'app/utils/utils';

const styles = StyleSheet.create({
  section: {
    // margin: [10, 10, 10, 10]
  },
  infoBox: {
    marginBottom: 20
  },
  table: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    width: '100%'
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomColor: '#bbb',
    borderBottomWidth: 1,
    alignItems: 'stretch',
    height: 24
  },
  tableCol: {
    flexGrow: 1,
    borderLeftColor: '#bbb',
    borderLeftWidth: 1,
    padding: 5,
    backgroundColor: '#f2f2f2', // Fond clair pour les en-têtes de colonnes
    fontSize: 10, // Réduire la taille de police
    fontFamily: 'Helvetica', // Changer la police
    textAlign: 'center' // Centrer le texte des cellules de données
  },
  tableCell: {
    flexGrow: 1,
    borderLeftColor: '#bbb',
    borderLeftWidth: 1,
    padding: 5,
    fontSize: 10, // Réduire la taille de police
    fontFamily: 'Helvetica', // Changer la police
    textAlign: 'center' // Centrer le texte des cellules de données
  },
  labelText: {
    fontSize: 10, // Même taille de police que les colonnes
    fontFamily: 'Helvetica', // Même police que les colonnes
    textAlign: 'center', // Centrer le texte
    fontWeight: 'bold' // Même poids de police que les colonnes
  }
});

const PDFproforma = ({ dataList, columns }) => {
  // console.log(dataList.somme);
  // console.log(dataList.clientdevis);
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {dataList.clientdevis.map((row) => (
          <View style={styles.infoBox}>
            <Text style={styles.labelText}>Nom: {row.nom}</Text>
            <Text style={styles.labelText}>Numéro de statut: {row.numstat}</Text>
            <Text style={styles.labelText}>Téléphone: {row.telephone}</Text>
            <Text style={styles.labelText}>Adresse: {row.adresse}</Text>
            <Text style={styles.labelText}>NIF: {row.nif}</Text>
            <Text style={styles.labelText}>Date de devis: {converttodate(row.datedevis)}</Text>
          </View>
        ))}
        <View style={styles.section}>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              {columns.map((column, index) => (
                <View style={styles.tableCol} key={index}>
                  <Text>{column.label}</Text>
                </View>
              ))}
            </View>
            {/* Reste du tableau avec les données */}
            {dataList.detaildevis.map((row, index) => (
              <View style={styles.tableRow} key={index}>
                <View style={styles.tableCell}>
                  <Text>{index}</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text>{row.marque}</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text>{row.modele}</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text>{row.description}</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text>{formatNumber(row.quantite)}</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text>{formatNumber(row.pu)}</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text>{formatNumber(row.total)} Ariary</Text>
                </View>
              </View>
            ))}
            <View style={styles.tableCell}>
              <Text>TOTAL: {formatNumber(dataList.somme)} Ariary</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PDFproforma;

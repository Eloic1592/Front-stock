import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { formatNumber } from 'app/utils/utils';

const styles = StyleSheet.create({
  page: {
    padding: 20, // Réduit un peu le padding pour maximiser l'espace
    fontFamily: 'Helvetica' // Choix d'une police plus standard
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
    textDecoration: 'underline',
    color: '#333' // Couleur du texte plus sombre pour une meilleure lisibilité
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#d1d1d1', // Fond plus foncé pour l'en-tête
    borderBottomColor: '#000', // Bordure plus foncée pour la ligne de l'en-tête
    borderBottomWidth: 2
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomColor: '#bdbdbd',
    borderBottomWidth: 1
  },
  tableRowAlternate: {
    backgroundColor: '#f2f2f2' // Couleur de fond pour les lignes alternées
  },
  tableCol: {
    width: '14.28%', // Taille égale pour chaque colonne
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 4 // Padding pour chaque colonne pour plus d'espace autour du texte
  },
  tableHeaderCol: {
    width: '14.28%', // Taille égale pour chaque colonne d'en-tête
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 4, // Padding pour chaque colonne d'en-tête
    backgroundColor: '#e0e0e0' // Fond spécifique pour l'en-tête
  },
  tableCell: {
    fontSize: 10,
    textAlign: 'center',
    margin: 4 // Marges uniformes pour chaque cellule
  },
  tableHeaderCell: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 4 // Marges uniformes pour chaque cellule d'en-tête
  }
});

const PDFArticle = ({ dataList, columns }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Liste des articles</Text>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            {columns.map((column, index) => (
              <View style={styles.tableHeaderCol} key={index}>
                <Text style={styles.tableHeaderCell}>{column.label}</Text>
              </View>
            ))}
          </View>
          {dataList.map((row, index) => (
            <View
              style={[styles.tableRow, index % 2 === 0 ? styles.tableRowAlternate : null]}
              key={index}
            >
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{row.marque}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{row.modele}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{row.codearticle}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{row.typemateriel}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{row.description}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{formatNumber(row.prix)}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{formatNumber(row.quantitestock)}</Text>
              </View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default PDFArticle;

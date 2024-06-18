import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { formatNumber } from 'app/utils/utils';

const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontFamily: 'Helvetica',
    backgroundColor: '#f4f4f9'
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 15,
    fontWeight: 'bold',
    color: '#333333',
    textDecoration: 'underline'
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRightWidth: 0,
    borderBottomWidth: 0
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#4f81bd',
    color: '#ffffff'
  },
  tableRow: {
    flexDirection: 'row'
  },
  tableRowAlternate: {
    backgroundColor: '#f2f2f2'
  },
  tableCol: {
    width: '16.6%', // Ajusté pour correspondre au nombre de colonnes dans PDFArticle
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#cccccc',
    borderLeftWidth: 0,
    borderTopWidth: 0
  },
  tableCell: {
    padding: 5,
    fontSize: 10,
    textAlign: 'center'
  },
  tableCellHeader: {
    padding: 5,
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});

const PDFArticle = ({ dataList }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Liste des articles</Text>
        <View style={styles.table}>
          {/* Table Header */}
          <View style={styles.tableHeader}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCellHeader}>Marque</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCellHeader}>Modèle</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCellHeader}>Code Article</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCellHeader}>Type de Matériel</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCellHeader}>Description</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCellHeader}>Prix</Text>
            </View>
          </View>
          {/* Table Body */}
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
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default PDFArticle;

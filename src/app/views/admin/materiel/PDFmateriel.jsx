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
    borderBottomWidth: 0,
    marginBottom: 20
  },
  tableRow: {
    flexDirection: 'row'
  },
  tableRowEven: {
    backgroundColor: '#ffffff'
  },
  tableRowOdd: {
    backgroundColor: '#f8f8f8'
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#4f81bd',
    color: '#ffffff'
  },
  tableCol: {
    width: '12.5%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#cccccc',
    borderLeftWidth: 0,
    borderTopWidth: 0
  },
  tableColFirst: {
    width: '7%',
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

const PDFmateriel = ({ dataList }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Liste des matériels</Text>
        <View style={styles.table}>
          {/* Table Header */}
          <View style={styles.tableHeader}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCellHeader}>Type de Matériel</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCellHeader}>Marque</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCellHeader}>Modèle</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCellHeader}>Description</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCellHeader}>Numéro de Série</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCellHeader}>Prix de Vente</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCellHeader}>Caution</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCellHeader}>Signature</Text>
            </View>
          </View>
          {/* Table Body */}
          {dataList.map((row, index) => (
            <View
              style={[styles.tableRow, index % 2 === 0 ? styles.tableRowOdd : styles.tableRowEven]}
              key={index}
            >
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{row.typemateriel}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{row.marque}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{row.modele}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{row.description}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{row.numserie}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{formatNumber(row.prixvente.toFixed(2))}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{formatNumber(row.caution.toFixed(2))}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{row.signature}</Text>
              </View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default PDFmateriel;

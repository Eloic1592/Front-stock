import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { formatNumber } from 'app/utils/utils';

// Styles améliorés pour un rendu plus esthétique
const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontFamily: 'Helvetica'
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
    flexDirection: 'row',
    backgroundColor: '#f8f8f8'
  },
  tableRowEven: {
    backgroundColor: '#ffffff'
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

const PDFmateriel = ({ dataList, columns }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Liste des materiels</Text>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            {columns.slice(1).map((column, index) => (
              <View style={styles.tableCol} key={index}>
                <Text style={styles.tableCellHeader}>{column.label}</Text>
              </View>
            ))}
          </View>
          {dataList.map((row, index) => (
            <View
              style={[styles.tableRow, index % 2 === 0 ? styles.tableRow : styles.tableRowEven]}
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
                <Text style={styles.tableCell}>{row.numserie}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{formatNumber(row.prixvente)}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{row.caution}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{row.couleur}</Text>
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

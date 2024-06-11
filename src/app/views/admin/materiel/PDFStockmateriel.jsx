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
  tableCol: {
    width: '33.33%',
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

const PDFStockmateriel = ({ dataList }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Stock de matériel</Text>
        <View style={styles.table}>
          {/* Table Header */}
          <View style={styles.tableHeader}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCellHeader}>Type de matériel</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCellHeader}>Libre</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCellHeader}>Occupé</Text>
            </View>
          </View>
          {/* Table Body */}
          {dataList.map((row, index) => (
            <View style={styles.tableRow} key={index}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{row.typemateriel}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{formatNumber(row.libre)}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{formatNumber(row.occupe)}</Text>
              </View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default PDFStockmateriel;

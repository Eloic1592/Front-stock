import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { formatNumber } from 'app/utils/utils';
const styles = StyleSheet.create({
  title: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: 'bold',
    textDecoration: 'underline'
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row'
  },
  tableCol: {
    width: '20%', //  100% divisé par le nombre de colonnes
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0
  },
  tableColFirst: {
    width: '7%', // Réduisez cette valeur pour réduire la taille de la première colonne
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0
  },
  tableCell: {
    margin: 'auto',
    marginTop: 5,
    fontSize: 10
  }
});

const PDFStatnaturemouvement = ({ dataList, columns }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Benefice par mouvement</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            {columns.map((column, index) => (
              <View style={styles.tableCol} key={index}>
                <Text style={styles.tableCell}>{column.label}</Text>
              </View>
            ))}
          </View>
          {dataList.map((row, index) => (
            <View style={styles.tableRow} key={index}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{row.naturemouvement}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{row.mois_nom}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{formatNumber(row.gain)}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{formatNumber(row.depense)}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{formatNumber(row.benefice)}</Text>
              </View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default PDFStatnaturemouvement;

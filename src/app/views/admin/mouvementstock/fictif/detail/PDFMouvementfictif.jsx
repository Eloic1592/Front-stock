import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { converttodate } from 'app/utils/utils';
const styles = StyleSheet.create({
  title: {
    fontSize: 16,
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
    width: '16.6%', //  100% divisé par le nombre de colonnes
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0
  },
  tableColFirst: {
    width: '16.6%', // Réduisez cette valeur pour réduire la taille de la première colonne
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

const PDFMouvementfictif = ({ dataList, columns }) => {
  console.log(dataList);
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Details des mouvements fictifs</Text>
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
                <Text style={styles.tableCell}>{row.mouvement}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{row.marque}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{row.numserie}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{converttodate(row.datedeb)}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{converttodate(row.datefin)}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{row.depot}</Text>
              </View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default PDFMouvementfictif;

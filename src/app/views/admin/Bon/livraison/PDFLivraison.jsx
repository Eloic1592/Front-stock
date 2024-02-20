import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { formatNumber, converttodate } from 'app/utils/utils';

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: 'bold'
  },
  gridContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    padding: 20 // Ajoutez un peu d'espace autour du conteneur de la grille
  },

  infoBox: {
    marginLeft: 20, // Décale la boîte un peu vers la gauche
    padding: 10, // Ajoute un peu d'espace autour du contenu
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#f2f2f2'
  },
  labelText: {
    fontSize: 8, // Réduisez la taille de la police
    marginBottom: 5, // Ajoutez de l'espace entre les lignes
    fontWeight: 'bold',
    fontFamily: 'Helvetica' // Changez la police  ici
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
    width: '12.5%', //  100% divisé par le nombre de colonnes
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0
  },
  tableColFirst: {
    width: '10%', // Réduisez cette valeur pour réduire la taille de la première colonne
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0
  },
  tableCell: {
    margin: 'auto',
    marginTop: 5,
    fontSize: 10,
    width: '100%', // Assurez-vous que la largeur de la cellule est à   100% pour qu'elle corresponde à la largeur de la colonne
    textAlign: 'center' // Centre le texte dans la cellule
  }
});

const PDFLivraison = ({ dataList, columns }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Bon de livraison</Text>
        <View style={styles.gridContainer}>
          {dataList.clientlivraisons.map((row, index) => (
            <View style={styles.infoBox}>
              <Text style={styles.labelText}>Proforma N*: {row.idproforma}</Text>
              <Text style={styles.labelText}>Nom: {row.nom}</Text>
              <Text style={styles.labelText}>Numéro de statut: {row.numstat}</Text>
              <Text style={styles.labelText}>Téléphone: {row.telephone}</Text>
              <Text style={styles.labelText}>Adresse: {row.adresse}</Text>
              <Text style={styles.labelText}>NIF: {row.nif}</Text>
              <Text style={styles.labelText}>
                Date de livraison: {converttodate(row.datebonlivraison)}
              </Text>
            </View>
          ))}
          <View style={styles.table}>
            <View style={styles.tableRow}>
              {columns.map((column, index) => (
                <View style={styles.tableCol} key={index}>
                  <Text style={styles.tableCell}>{column.label}</Text>
                </View>
              ))}
            </View>
            {dataList.detailProformas.map((row, index) => (
              <View style={styles.tableRow} key={index}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{index}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{row.marque}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{row.modele}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{formatNumber(row.quantite)}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{formatNumber(row.pu)}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{formatNumber(row.total)}</Text>
                </View>
              </View>
            ))}
            <View style={styles.infoBox}>
              <Text style={styles.tableCell}>Total: {formatNumber(dataList.total)} Ariary</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PDFLivraison;

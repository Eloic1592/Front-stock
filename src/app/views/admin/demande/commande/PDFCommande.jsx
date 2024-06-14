import { formatNumber, converttodate, nombreEnLettres } from 'app/utils/utils';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
const PDFCommande = ({ vueCommande, detailcommandeviews }) => {
  const styles = StyleSheet.create({
    page: {
      padding: 40,
      fontSize: 12,
      lineHeight: 1.5,
      fontFamily: 'Helvetica'
    },
    header: {
      fontSize: 24,
      marginBottom: 20,
      textAlign: 'center',
      textTransform: 'uppercase'
    },
    companyDetails: {
      marginBottom: 20,
      textAlign: 'right',
      fontSize: 10
    },
    section: {
      marginBottom: 20
    },
    table: {
      display: 'table',
      width: 'auto',
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: '#000',
      marginBottom: 20
    },
    tableRow: {
      flexDirection: 'row'
    },
    tableColHeader: {
      width: '20%',
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: '#000',
      backgroundColor: '#e6e6e6',
      padding: 5,
      fontWeight: 'bold'
    },
    tableCol: {
      width: '20%',
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: '#000',
      padding: 5
    },
    tableCell: {
      fontSize: 10,
      textAlign: 'center'
    },
    totalSection: {
      fontSize: 14,
      marginTop: 20,
      textAlign: 'right'
    },
    boldText: {
      fontWeight: 'bold'
    },
    footer: {
      position: 'absolute',
      bottom: 30,
      left: 0,
      right: 0,
      textAlign: 'center',
      fontSize: 10
    }
  });

  // Calcul des totaux hors taxes
  const totalHT = detailcommandeviews.reduce((acc, item) => acc + item.total, 0);

  // Calcul du total avec taxes (20%)
  const totalTTC = totalHT * 1.2;
  return (
    <Document>
      <Page style={styles.page}>
        {/* Titre de la facture */}
        <Text style={styles.header}>Commande</Text>

        {/* Détails de l'entreprise */}
        <View style={styles.companyDetails}>
          <Text>IT University</Text>
          <Text>102, Antananarivo Antsimodrano</Text>
          <Text>Email: contact@ituniversity.com</Text>
          <Text>Tel: +261 34 12 345 67</Text>
        </View>

        {/* Informations sur le client */}
        <View style={styles.section}>
          <Text>Facturé à :</Text>
          <Text>Nom: {vueCommande.nom}</Text>
          <Text>Adresse: {vueCommande.adresse}</Text>
          <Text>NIF: {vueCommande.nif}</Text>
          <Text>Contact: {vueCommande.telephone}</Text>
        </View>

        {/* Informations sur la commande */}
        <View style={styles.section}>
          <Text>Date de commande: {converttodate(vueCommande.datecommande)}</Text>
          <Text>Numéro de commande: N-{vueCommande.idcommande}</Text>
        </View>

        {/* Tableau des détails de la commande */}
        <View style={[styles.section, styles.table]}>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCell}>Marque</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCell}>Code article</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCell}>Quantité</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCell}>Prix unitaire</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCell}>Prix total</Text>
            </View>
          </View>
          {detailcommandeviews.map((item, index) => (
            <View style={styles.tableRow} key={index}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  {item.marque}/{item.modele}
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item.codearticle}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item.quantite}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{formatNumber(item.pu.toFixed(2))}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{formatNumber(item.total.toFixed(2))}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Totaux de la commande */}
        <View style={styles.section}>
          <Text style={[styles.totalSection, styles.boldText]}>
            Total hors taxes (HT): {formatNumber(totalHT.toFixed(2))} Ariary
          </Text>
          <Text style={[styles.totalSection, styles.boldText]}>
            Total avec taxes (TTC) (20%): {formatNumber(totalTTC.toFixed(2))} Ariary
          </Text>
          <Text style={[styles.totalSection, styles.boldText]}>
            Somme: {nombreEnLettres(totalHT.toFixed(2))} Ariary
          </Text>
        </View>

        {/* Pied de page */}
        <Text style={styles.footer}>
          Achat effectue le {converttodate(vueCommande.datecommande)}
        </Text>
      </Page>
    </Document>
  );
};

export default PDFCommande;

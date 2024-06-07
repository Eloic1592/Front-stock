import React, { useState, useEffect } from 'react';
import { baseUrl } from 'app/utils/constant';
import { formatNumber, converttodate } from 'app/utils/utils';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { useParams } from 'react-router-dom';
const PDFCommande = () => {
  const idcommande = useParams();
  const [data, setData] = useState({
    vueCommande: {},
    detailcommandeviews: []
  });
  const [initialDataFetched, setInitialDataFetched] = useState(false);
  const [message, setMessage] = useState({
    text: 'Information enregistree',
    severity: 'success',
    open: false
  });

  const styles = StyleSheet.create({
    page: {
      fontSize: 12,
      padding: 30
    },
    header: {
      fontSize: 20,
      marginBottom: 20,
      textAlign: 'center',
      color: 'grey'
    },
    section: {
      margin: 10,
      padding: 10
    },
    companyDetails: {
      marginBottom: 20
    },
    billTo: {
      marginBottom: 20
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
      flexDirection: 'row'
    },
    tableColHeader: {
      width: '20%',
      borderStyle: 'solid',
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
      backgroundColor: '#bdbdbd',
      padding: 5
    },
    tableCol: {
      width: '20%',
      borderStyle: 'solid',
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
      padding: 5
    },
    tableCell: {
      margin: 5,
      fontSize: 10
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        let commandeParams = {
          idcommande: idcommande.idcommande
        };
        let url = baseUrl + '/commande/pdfcommande';
        const response = await fetch(url, {
          crossDomain: true,
          method: 'POST',
          body: JSON.stringify(commandeParams),
          headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`);
        }

        const responseData = await response.json();
        const newData = {
          detailcommandeviews: responseData.detailcommandeviews || [],
          vueCommande: responseData.vueCommande || []
        };
        setData(newData);
        console.log(data.detailcommandeviews);
        console.log(data.vueCommande);
        setInitialDataFetched(true);
      } catch (error) {
        setMessage({
          text: "Aucune donnee n 'a ete recuperee, veuillez verifier si le serveur est actif",
          severity: 'error',
          open: true
        });
      }
    };

    if (!initialDataFetched) {
      fetchData();
    }
  }, [initialDataFetched, idcommande.idcommande]);

  return (
    <div style={styles.page}>
      <h1 style={styles.header}>Facture</h1>
      <section style={styles.section}>
        <div style={styles.companyDetails}>
          <p>IT University</p>
          <p>102, Antananarivo Antsimodrano</p>
          <p>Email: contact@ituniversity.com</p>
          <p>Tel: +261 34 12 345 67</p>
        </div>
      </section>
      <section style={styles.section}>
        <p>Facturé à :</p>
        <p>{data.vueCommande.nom}</p>
        <p>{data.vueCommande.adresse}</p>
        <p>NIF: {data.vueCommande.nif}</p>
        <p>Contact: {data.vueCommande.contact}</p>
      </section>
      <section style={styles.section}>
        <p>Date de Facture: {converttodate(data.vueCommande.datecommande)}</p>
        <p>Numéro de Facture: N-{data.vueCommande.idcommande}</p>
      </section>
      <section style={styles.section}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableColHeader}>Marque</th>
              <th style={styles.tableColHeader}>Code article</th>
              <th style={styles.tableColHeader}>Quantité</th>
              <th style={styles.tableColHeader}>Prix unitaire</th>
              <th style={styles.tableColHeader}>Prix total</th>
            </tr>
          </thead>
          <tbody>
            {data.detailcommandeviews.map((item, index) => (
              <tr key={index} style={styles.tableRow}>
                <td style={styles.tableCol}>
                  {item.marque}/{item.modele}
                </td>
                <td style={styles.tableCol}>{item.codearticle}</td>
                <td style={styles.tableCol}>{item.quantite}</td>
                <td style={styles.tableCol}>{formatNumber(item.pu)}</td>
                <td style={styles.tableCol}>{formatNumber(item.total)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
    // <Document>
    //   <Page style={styles.page}>
    //     <Text style={styles.header}>Facture</Text>
    //     <View style={styles.section}>
    //       <Text style={styles.companyDetails}>IT University</Text>
    //       <Text>102, Antananarivo Antsimodrano</Text>
    //       <Text>Email: contact@ituniversity.com</Text>
    //       <Text>Tel: +261 34 12 345 67</Text>
    //     </View>
    //     <View style={styles.section}>
    //       <Text>Facturé à :</Text>
    //       <Text>{data.vueCommande.nom}</Text>
    //       <Text>{data.vueCommande.adresse}</Text>
    //       <Text>NIF: {data.vueCommande.nif}</Text>
    //       <Text>Contact: {data.vueCommande.contact}</Text>
    //     </View>
    //     <View style={styles.section}>
    //       <Text>Date de Facture: {converttodate(data.vueCommande.datecommande)}</Text>
    //       <Text>Numéro de Facture: N-{data.vueCommande.idcommande}</Text>
    //     </View>
    //     <View style={[styles.section, styles.table]}>
    //       <View style={styles.tableRow}>
    //         <View style={styles.tableColHeader}>
    //           <Text style={styles.tableCell}>Marque</Text>
    //         </View>
    //         <View style={styles.tableColHeader}>
    //           <Text style={styles.tableCell}>Code article</Text>
    //         </View>
    //         <View style={styles.tableColHeader}>
    //           <Text style={styles.tableCell}>Quantité</Text>
    //         </View>
    //         <View style={styles.tableColHeader}>
    //           <Text style={styles.tableCell}>Prix unitaire</Text>
    //         </View>
    //         <View style={styles.tableColHeader}>
    //           <Text style={styles.tableCell}>Prix total</Text>
    //         </View>
    //       </View>
    //       {data.detailcommandeviews.map((item, index) => (
    //         <View style={styles.tableRow} key={index}>
    //           <View style={styles.tableCol}>
    //             <Text style={styles.tableCell}>
    //               {item.marque}/{item.modele}
    //             </Text>
    //           </View>
    //           <View style={styles.tableCol}>
    //             <Text style={styles.tableCell}>{item.codearticle}</Text>
    //           </View>
    //           <View style={styles.tableCol}>
    //             <Text style={styles.tableCell}>{item.quantite}</Text>
    //           </View>
    //           <View style={styles.tableCol}>
    //             <Text style={styles.tableCell}>{formatNumber(item.pu)}</Text>
    //           </View>
    //           <View style={styles.tableCol}>
    //             <Text style={styles.tableCell}>{formatNumber(item.total)}</Text>
    //           </View>
    //         </View>
    //       ))}
    //     </View>
    //   </Page>
    // </Document>
  );
};

export default PDFCommande;

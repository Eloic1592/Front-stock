// src/Discharge.js

import React from 'react';
import { useState, useEffect } from 'react';
import { baseUrl } from 'app/utils/constant';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { converttodate } from 'app/utils/utils';
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  text: {
    fontSize: 11
  }
});

const Decharge = ({ idmouvementstock }) => {
  const [data, setData] = useState({
    mouvementstock: {
      id: 0,
      idmouvementstock: '',
      datedepot: 0,
      typemouvement: 0,
      idnaturemouvement: '',
      idetudiant: '',
      statut: 0,
      type: 1,
      mouvement: '',
      naturemouvement: '',
      nom: '',
      prenom: '',
      mail: '',
      contact: '',
      adresse: ''
    },
    mouvementfictifs: []
  });
  const [message, setMessage] = useState({
    text: 'Information enregistree',
    severity: 'success',
    open: false
  });

  const [dischargeLetter, setDischargeLetter] = useState('');
  console.log(data.mouvementstock);
  console.log(data.mouvementfictifs);
  const generateLetter = (data) => {
    const letter = `
      ${data.mouvementstock.nom} ${data.mouvementstock.prenom}
      ${data.mouvementstock.adresse}
      101, Antananarivo
      ${data.mouvementstock.mail}
      ${data.mouvementstock.contact}

      ${converttodate(data.mouvementstock.datedepot)}

      IT University
      102, Antananarivo Antsimodrano

      Objet : Décharge de Responsabilité pour l'emprunt de matériel(s)

      Madame, Monsieur,

      Je soussigné(e),${data.mouvementstock.nom} ${data.mouvementstock.prenom}, ETU ${
      data.mouvementstock.idetudiant
    }, étudiant(e) à l'IT University, déclare avoir emprunté le(s) matériel(s) suivant(s) :

      ${data.mouvementfictifs.map((row) => row.marque)}

      J'accepte de retourner le matériel dans un état satisfaisant et de payer les éventuels dommages.

      Je vous remercie de bien vouloir prendre en compte cette décharge de responsabilité concernant l'emprunt du matériel mentionné ci-dessus.

      Veuillez agréer, Madame, Monsieur, l'expression de mes salutations distinguées.

      ${data.mouvementstock.nom}
      ${converttodate(data.mouvementstock.datedepot)}
      Signature de l'étudiant


      Nom du responsable
      ${converttodate(data.mouvementstock.datedepot)}
      Signature du responsable
    `;

    setDischargeLetter(letter);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let mouvementstockParams = {
          idmouvementstock: idmouvementstock
        };
        let url = baseUrl + '/mouvementstock/discharge';
        const response = await fetch(url, {
          crossDomain: true,
          method: 'POST',
          body: JSON.stringify(mouvementstockParams),
          headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`);
        }
        const responseData = await response.json();
        const newData = {
          mouvementstock: responseData.mouvementstock || null,
          mouvementfictifs: responseData.mouvementfictifs || []
        };
        setData(newData);
      } catch (error) {
        setMessage({
          text: "Aucune donnee n 'a ete recuperee,veuillez verifier si le serveur est actif",
          severity: 'error',
          open: true
        });
      }
    };
    fetchData();
    generateLetter(data);
  }, [idmouvementstock]); // Keep idmouvementstock as a dependency

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <div className="discharge">
            <h2>Décharge de Responsabilité</h2>
            <Text style={styles.text}>{dischargeLetter}</Text>
            <Text style={styles.text}></Text>
          </div>
        </View>
      </Page>
    </Document>
  );
};

export default Decharge;

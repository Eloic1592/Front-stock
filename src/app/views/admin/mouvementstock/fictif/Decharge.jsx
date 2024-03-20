import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { baseUrl } from 'app/utils/constant';
import { converttodate } from 'app/utils/utils';
import { Container } from 'app/views/style/style';
import './Discharge.css';
import { Button, Grid, Icon } from '@mui/material';
const Decharge = () => {
  const { idmouvementstock } = useParams(); // Destructure idmouvementstock directly
  console.log(idmouvementstock);

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

  const generateLetter = (data) => {
    const letter = `
      <div class="header">
        <p>${data.mouvementstock.adresse}</p>
        <p>101, Antananarivo</p>
        <p>${data.mouvementstock.mail}</p>
        <p>${data.mouvementstock.contact}</p>
        <p>${converttodate(data.mouvementstock.datedepot)}</p>
      </div>
      <div class="body">
        <p>IT University</p>
        <p>102, Antananarivo Antsimodrano</p>
        <p>Objet : Décharge de Responsabilité pour l'emprunt de matériel(s)</p>
        <p>Madame, Monsieur,</p>
        <p>Je soussigné(e), ${data.mouvementstock.nom} ${data.mouvementstock.prenom}, ETU ${
      data.mouvementstock.idetudiant
    }, étudiant(e) à l'IT University, déclare avoir emprunté le(s) matériel(s) suivant(s) :</p>
        <ul>
          ${data.mouvementfictifs
            .map(
              (row) =>
                `<li>${row.marque} - ${row.numserie} le ${converttodate(
                  row.datedeb
                )} jusqu\'au ${converttodate(row.datefin)}</li>`
            )
            .join('')}
        </ul>
        <p>J'accepte de retourner le matériel dans un état satisfaisant et de payer les éventuels dommages.</p>
        <p>Je vous remercie de bien vouloir prendre en compte cette décharge de responsabilité concernant l'emprunt du matériel mentionné ci-dessus.</p>
        <p>Veuillez agréer, Madame, Monsieur, l'expression de mes salutations distinguées.</p>
        <p>${data.mouvementstock.nom}</p>
        <p>${converttodate(data.mouvementstock.datedepot)}</p>
        <p>Signature de l'étudiant</p>
        <p>Nom du responsable</p>
        <p>${converttodate(data.mouvementstock.datedepot)}</p>
        <p>Signature du responsable</p>
      </div>
      <div class="footer">
        <p>IT University</p>
        <p>102, Antananarivo Antsimodrano</p>
      </div>
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
        generateLetter(newData);
      } catch (error) {
        setMessage({
          text: "Aucune donnee n 'a ete recuperee,veuillez verifier si le serveur est actif",
          severity: 'error',
          open: true
        });
      }
    };
    fetchData();
  }, [idmouvementstock]);

  // Export en PDF
  const handlePrint = () => {
    const originalBodyClass = document.body.className;
    document.body.className += ' print-discharge';
    window.print();
    document.body.className = originalBodyClass;
  };

  //Retour page retour
  const redirect = () => {
    window.location.replace('/admin/mouvementfictif');
  };

  return (
    <Container>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          {' '}
          <Button variant="contained" color="inherit" onClick={redirect}>
            <Icon>arrow_backward</Icon>
          </Button>
        </Grid>
        <Grid item>
          {' '}
          <div className="discharge">
            <h2>Décharge de Responsabilité</h2>
            <div style={{ margin: '10px', padding: '10px', flexGrow: 1 }}>
              <div dangerouslySetInnerHTML={{ __html: dischargeLetter }}></div>
            </div>
            <Button variant="contained" color="primary" onClick={handlePrint}>
              Imprimer
            </Button>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Decharge;

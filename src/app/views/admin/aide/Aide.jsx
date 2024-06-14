import React from 'react';
import { Container, Typography, Box, Grid } from '@mui/material';
import Stock_articles from 'app/img/Stock_articles.PNG';
import Liste_commandes from 'app/img/Liste_commandes.PNG';
import Etatstatistiques from 'app/img/Etatstatistiques.PNG';
import Section_depots from 'app/img/Section_depots.PNG';
import Emplacement from 'app/img/Emplacement.PNG';
import Bouton_depot from 'app/img/Bouton_depot.PNG';
import Bouton_emplacement from 'app/img/Bouton_emplacement.PNG';
import Bouton_modifier from 'app/img/Bouton_modifier.PNG';
import Bouton_voir_emplacement from 'app/img/Bouton_voir_emplacement.PNG';
import Form_depot from 'app/img/Form_depot.PNG';
import Bouton_pdf1 from 'app/img/Bouton_pdf1.PNG';
import Bouton_pdf2 from 'app/img/Bouton_pdf2.PNG';
import Export_csv from 'app/img/Export_csv.PNG';
import Import_csv from 'app/img/Import_csv.PNG';
import Mouvement_physiques from 'app/img/Mouvement_physiques.PNG';
import Calendrier from 'app/img/Calendrier.PNG';
const Aide = () => {
  return (
    <Container>
      {/* Première page : Bienvenue */}
      <Box p={4} textAlign="left">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom>
              Bienvenue dans la section Aide
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" gutterBottom>
              La section Aide est conçue pour vous aider à tirer le meilleur parti de notre
              plateforme. Que vous soyez un nouvel utilisateur ou expérimenté, cette section a pour
              but de vous guider à travers les différentes démarches pour une utilisation efficace
              de l'application.
            </Typography>
          </Grid>
        </Grid>
      </Box>

      {/* Deuxième page : Insertion de données */}
      <Box p={4} textAlign="left">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom>
              <b>1. Insertion de données</b>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" gutterBottom style={{ fontSize: '1.2rem' }}>
              Section concernées
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <ul>
              <Typography variant="body1" gutterBottom style={{ fontSize: '1.0rem' }}>
                <li>Dépôts et emplacements</li>
                <li>Articles et matériaux</li>
                <li>Distribution et inventaire</li>
                <li>Mouvements de stock</li>
                <li>Calendrier d'inventaire</li>
                <li>Commande et reception</li>
              </Typography>
            </ul>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" gutterBottom style={{ fontSize: '1.2rem' }}>
              Voici un exemple la section dépôts et emplacements. Obtenez des informations sur les
              lieux de dépôt et leurs emplacements dans cette section.
            </Typography>
          </Grid>
          <Grid container item xs={12} spacing={2} alignItems="center">
            <Grid item xs={1}>
              <Typography variant="h6" align="center">
                1.
              </Typography>
            </Grid>
            <Grid item xs={11}>
              <img
                src={Section_depots}
                alt="Description de la section des dépôts 1"
                style={{ width: '100%' }}
              />
            </Grid>
          </Grid>
          <Grid container item xs={12} spacing={2} alignItems="center">
            <Grid item xs={1}>
              <Typography variant="h6" align="center">
                2.
              </Typography>
            </Grid>
            <Grid item xs={11}>
              <img
                src={Emplacement}
                alt="Description de la section des dépôts 2"
                style={{ width: '100%' }}
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" gutterBottom style={{ fontSize: '1.2rem' }}>
              <b>
                Chacune des sections (images 1 et 2) possède un bouton d'ajout de nouvelles données,
                généralement de couleur bleue.
              </b>
            </Typography>
          </Grid>
          <Grid container item xs={12} spacing={2} justifyContent="center">
            <Grid item xs={6}>
              <img
                src={Bouton_depot}
                alt="Illustration du bouton d'ajout de données pour la section des dépôts"
                style={{ width: '30%', margin: 'auto', display: 'block' }}
              />
            </Grid>
            <Grid item xs={6}>
              <img
                src={Bouton_emplacement}
                alt="Illustration du bouton d'ajout de données pour les emplacements"
                style={{ width: '45%', margin: 'auto', display: 'block' }}
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" gutterBottom style={{ fontSize: '1.2rem' }}>
              <b>
                Chacun des boutons "Ajouter" fait apparaître un formulaire, comme illustré par
                l'exemple ci-dessous.
              </b>
            </Typography>
          </Grid>
          <Grid container item xs={12} spacing={2} justifyContent="center">
            <Grid item xs={6}>
              <img
                src={Form_depot}
                alt="Illustration du formulaire"
                style={{ width: '100%', margin: 'auto', display: 'block' }}
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" gutterBottom style={{ fontSize: '1.2rem' }}>
              <b>
                Sur chaque ligne de données de chaque section se trouve un bouton "edit" ou modifier
                afin de pouvoir modifier une valeur précise dans le cas où l'utilisateur souhaite
                modifier une donnée.
              </b>
            </Typography>
          </Grid>
          <Grid container item xs={12} spacing={2} justifyContent="center">
            <Grid item xs={6}>
              <img
                src={Bouton_modifier}
                alt="Illustration du bouton de modification"
                style={{ width: '10%', margin: 'auto', display: 'block' }}
              />
            </Grid>
          </Grid>
          <Grid item container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="body1" gutterBottom style={{ fontSize: '1.2rem' }}>
                <b>Dépots*</b>
              </Typography>
              <Typography variant="body1" gutterBottom style={{ fontSize: '1.0rem' }}>
                Chaque ligne de données dans chaque section est équipée d'un bouton "edit" ou de
                modification, permettant ainsi à l'utilisateur de modifier une valeur spécifique si
                nécessaire. De plus, chaque ligne comprend un bouton "voir emplacement" pour
                consulter les emplacements possibles dans chaque dépôt.
              </Typography>
            </Grid>
            <Grid container item xs={12} spacing={2} justifyContent="center">
              <Grid item xs={6}>
                <img
                  src={Bouton_voir_emplacement}
                  alt="Illustration du bouton voir emplacement"
                  style={{ width: '10%', margin: 'auto', display: 'block' }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="body1" gutterBottom style={{ fontSize: '1.2rem' }}>
                <b>
                  Articles et matériaux / Commande et réception / Mouvements de stock /
                  Statistiques*
                </b>
              </Typography>
              <Typography variant="body1" gutterBottom style={{ fontSize: '1.0rem' }}>
                Chacune de ces sections possède également un bouton d'exportation en format PDF.
              </Typography>
            </Grid>
            <Grid container item xs={12} spacing={2} justifyContent="center">
              <Grid item xs={6}>
                <img
                  src={Bouton_pdf1}
                  alt="Illustration du bouton pdf"
                  style={{ width: '15%', margin: 'auto', display: 'block' }}
                />
              </Grid>
              <Grid item xs={6}>
                <img
                  src={Bouton_pdf2}
                  alt="Illustration du bouton pdf"
                  style={{ width: '15%', margin: 'auto', display: 'block' }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="body1" gutterBottom style={{ fontSize: '1.2rem' }}>
                <b>Articles et matériaux*</b>
              </Typography>
              <Typography variant="body1" gutterBottom style={{ fontSize: '1.0rem' }}>
                Chacune de ces sections possède également un bouton d'exportation et d'importation
                en format CSV ou XLSX.
              </Typography>
            </Grid>
            <Grid container item xs={12} spacing={2} justifyContent="center">
              <Grid item xs={6}>
                <img
                  src={Import_csv}
                  alt="Illustration du bouton CSV"
                  style={{ width: '25%', margin: 'auto', display: 'block' }}
                />
              </Grid>
              <Grid item xs={6}>
                <img
                  src={Export_csv}
                  alt="Illustration du bouton CSV"
                  style={{ width: '25%', margin: 'auto', display: 'block' }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <hr />
      {/* Troisième page : Mouvements */}
      <Box p={4} textAlign="left">
        <Typography variant="h6" gutterBottom>
          Mouvements
        </Typography>
        <Grid item container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="body1" gutterBottom>
              Découvrez comment gérer les mouvements de stocks et de produits au sein de votre
              entreprise. De la réception des marchandises à leur expédition, nous vous expliquerons
              toutes les étapes.
            </Typography>
          </Grid>
          <Grid container item xs={12} spacing={2} justifyContent="center">
            <Grid item xs={12}>
              <img
                src={Mouvement_physiques}
                alt="Illustration des Mouvement_physiques"
                style={{ width: '100%' }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <hr />
      {/* Calendrier d'inventaire */}

      <Box p={4} textAlign="left">
        <Typography variant="h6" gutterBottom>
          Inventaire et calendrier d'inventaire
        </Typography>
        <Grid item container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="body1" gutterBottom>
              Cette section vous permet de planifier vos inventaires quotidiens ou périodiques de
              manière organisée.
            </Typography>
          </Grid>
          <Grid container item xs={12} spacing={2} justifyContent="center">
            <Grid item xs={12}>
              <img src={Calendrier} alt="Illustration calendrier" style={{ width: '100%' }} />
            </Grid>
          </Grid>
        </Grid>
      </Box>

      {/* Quatrième page : Stockage de matériels et des articles */}
      <Box p={4} textAlign="left">
        <Typography variant="h6" gutterBottom>
          Stockage de matériels et des articles
        </Typography>
        <Typography variant="body1" gutterBottom>
          Obtenez des informations sur le stockage efficace des matériaux et des articles dans votre
          entrepôt ou vos locaux. Apprenez les meilleures pratiques pour organiser votre inventaire.
        </Typography>
        <div>
          <img
            src={Stock_articles}
            alt="Description de la section de stockage des articles"
            width="100%"
          />
        </div>
      </Box>
      <hr />
      {/* Cinquième page : Les commandes */}
      <Box p={4} textAlign="left">
        <Typography variant="h6" gutterBottom>
          Les commandes
        </Typography>
        <Typography variant="body1" gutterBottom>
          Maîtrisez la gestion des commandes clients, de leur création à leur traitement. Découvrez
          comment suivre les commandes en attente et effectuées pour garantir une expérience client
          optimale.
        </Typography>
        <div>
          <img src={Liste_commandes} alt="Description de la section commandes" width="100%" />
        </div>
      </Box>
      <hr />
      {/* Sixième page : Les statistiques */}
      <Box p={4} textAlign="left">
        <Typography variant="h6" gutterBottom>
          Les statistiques
        </Typography>
        <Typography variant="body1" gutterBottom>
          Explorez les fonctionnalités de génération de rapports et de statistiques de notre
          système. Obtenez des informations précieuses sur les ventes, les stocks, les performances
          et plus encore pour prendre des décisions éclairées.
        </Typography>
        <div>
          <img src={Etatstatistiques} alt="Description de la section statistiques" width="100%" />
        </div>
        {/* Ajoutez ici d'autres sections ou un formulaire de contact */}
      </Box>
    </Container>
  );
};

export default Aide;

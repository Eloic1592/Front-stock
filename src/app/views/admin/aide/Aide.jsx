import React from 'react';
import { Container, Typography, Box, Grid } from '@mui/material';
import Stock_articles from 'app/img/Stock_articles.PNG';
import Stock_materiels from 'app/img/Stock_materiels.PNG';
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
import Inventaire_recent from 'app/img/Inventaire_recent.PNG';
import Section_articles_materiels from 'app/img/Section_articles_materiels.PNG';
import Info_icon from 'app/img/Info_icon.PNG';
import Reception from 'app/img/Reception.PNG';
import Bouton_option from 'app/img/Bouton_option.PNG';
const Aide = () => {
  return (
    <Container>
      {/* Première page : Bienvenue */}
      <Box p={4} textAlign="left">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h3" gutterBottom>
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

      <Box p={4} textAlign="left">
        <Typography variant="h3" gutterBottom>
          Table des matières
        </Typography>
        <ul>
          <li>
            <a href="#section-insertion">1. Insertion de données</a>
          </li>
          <li>
            <a href="#section-mouvements">2. Mouvement de stock</a>
          </li>
          <li>
            <a href="#section-calendrier">3. Inventaire et calendrier d'inventaire</a>
          </li>
          <li>
            <a href="#section-stockage">4. Stockage de matériels et des articles</a>
          </li>
          <li>
            <a href="#section-commandes">5. Les commandes</a>
          </li>
          <li>
            <a href="#section-statistiques">6. Les statistiques</a>
          </li>
        </ul>
      </Box>

      {/* Deuxième page : Insertion de données */}
      <Box p={4} textAlign="left" id="section-insertion">
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
                <li>Categorie materiel et type materiel</li>
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
              Voici un exemple la section <b>Dépôts et emplacements</b>. Obtenez des informations
              sur les lieux de dépôt et leurs emplacements dans cette section.
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
              <Typography variant="body1" gutterBottom style={{ fontSize: '1.2rem' }}>
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
              <Typography variant="body1" gutterBottom style={{ fontSize: '1.2rem' }}>
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
                <b>Articles et matériels*</b>
              </Typography>
              <Typography variant="body1" gutterBottom style={{ fontSize: '1.2rem' }}>
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
      <Box p={4} textAlign="left" id="section-mouvements">
        <Typography variant="h4" gutterBottom>
          <b>2.Mouvement de stock</b>
        </Typography>
        <Grid item container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="body1" gutterBottom style={{ fontSize: '1.2rem' }}>
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
            <Grid item xs={12}>
              <ul>
                <Typography variant="body1" gutterBottom style={{ fontSize: '1.2rem' }}>
                  Pour voir les details des mouvements de stock il faut appuyer sur l'icon
                  ci-dessous.
                </Typography>
              </ul>
              <div>
                <img
                  src={Bouton_option}
                  alt="Description de la section statistiques"
                  style={{ width: '15%', margin: 'auto', display: 'block' }}
                />
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <hr />
      {/* Calendrier d'inventaire */}

      <Box p={4} textAlign="left" id="section-calendrier">
        <Typography variant="h4" gutterBottom>
          <b>3.Inventaire et calendrier d'inventaire</b>
        </Typography>
        <Grid item container spacing={2}>
          <Grid item xs={12}>
            <ul>
              <Typography variant="body1" gutterBottom style={{ fontSize: '1.2rem' }}>
                <li>
                  Cette section vous permet de planifier vos inventaires quotidiens ou périodiques
                  de manière organisée. Tous les inventaires que vous avez prevus selon le jour
                  actuel apparatront en-dessous du calendrier.
                </li>
                <br />
                <li>
                  Vous pouvez inserer vos propre inventaires manuellement grace au bouton bleu en
                  haut a gauche du calendrier.
                </li>
                <br />
                <li>
                  Vous pouvez modifier les inventaires manuellement grace a l'icon bleu a droite de
                  chaque inventaire sur la liste en bas du calendrier.
                </li>
              </Typography>
            </ul>
          </Grid>
          <Grid container item xs={12} spacing={2} justifyContent="center">
            <Grid item xs={12}>
              <img src={Calendrier} alt="Illustration calendrier" style={{ width: '100%' }} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item container spacing={2}>
          <Grid item xs={12}>
            <ul>
              <Typography variant="body1" gutterBottom style={{ fontSize: '1.2rem' }}>
                <li>Les inventaires les plus récents seront liste en dessous.</li>
              </Typography>
            </ul>
          </Grid>

          <Grid container item xs={12} spacing={2} justifyContent="center">
            <Grid item xs={12}>
              <img
                src={Inventaire_recent}
                alt="Illustration inventaire recent"
                style={{ width: '100%' }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Box>

      {/* Quatrième page : Stockage de matériels et des articles */}
      <Box p={4} textAlign="left" id="section-stockage">
        <Typography variant="h4" gutterBottom>
          <b>4.Stockage de matériels et des articles</b>
        </Typography>
        <Typography variant="body1" gutterBottom style={{ fontSize: '1.2rem' }}>
          Obtenez des informations sur le stockage efficace des matériaux et des articles dans votre
          dans chaque depot.
        </Typography>
        <Grid container item xs={12} spacing={2} justifyContent="center">
          <Grid item xs={12}>
            <ul>
              <Typography variant="body1" gutterBottom style={{ fontSize: '1.2rem' }}>
                <li>
                  Afin de pouvoir verifier le stock reel des articles et materiels, dirigez vous
                  vers le menu a gauche, cherchez la section articles et materiels puis cliquez
                  dessus pour avoir une liste de ce genre.
                </li>
              </Typography>
            </ul>
          </Grid>
        </Grid>
        <Grid container item xs={12} spacing={2} justifyContent="center">
          <Grid item xs={12}>
            <ul>
              <Typography variant="body1" gutterBottom style={{ fontSize: '1.2rem' }}>
                <li>
                  Dans chacun de ces items se trouve une section nommee stock. Clique sur cette
                  section stock, vous verrez le stock actuel de chaque article dans la stock pour
                  les article et le stock de materiel dans la section stock des materiels.
                </li>
              </Typography>
            </ul>
          </Grid>
          <Grid item xs={6}>
            <img
              src={Stock_articles}
              alt="Illustration des stocks d'articles et de materiels"
              style={{ width: '100%', margin: 'auto', display: 'block' }}
            />
          </Grid>
          <Grid item xs={6}>
            <img
              src={Stock_materiels}
              alt="Illustration des stocks d'articles et de materiels"
              style={{ width: '100%', margin: 'auto', display: 'block' }}
            />
          </Grid>
          <Grid item xs={12}>
            <img
              src={Section_articles_materiels}
              alt="Illustration des stocks d'articles et de materiels"
              style={{ width: '20%', margin: 'auto', display: 'block' }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" gutterBottom style={{ fontSize: '1.2rem' }}>
              <b>Articles *</b>
            </Typography>
            <Typography variant="body1" gutterBottom style={{ fontSize: '1.2rem' }}>
              Dans la section <b>"Liste"</b> d'Article vous pouvez egalement voir en detail le stock
              des articles en appuyant sur l'icon ci-dessous.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <img
              src={Info_icon}
              alt="Illustration des stocks d'articles"
              style={{ width: '7%', margin: 'auto', display: 'block' }}
            />
          </Grid>
        </Grid>
      </Box>
      <hr />
      {/* Cinquième page : Les commandes */}
      <Box p={4} textAlign="left" id="section-commandes">
        <Grid item container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom>
              <b>5.Les commandes</b>
            </Typography>
            <Typography variant="body1" gutterBottom style={{ fontSize: '1.2rem' }}>
              Gerer les divers commandes et les receptions dans la section
              <b>"Commande et reception"</b>. Découvrez comment suivre les commandes en attente et
              effectuées pour garantir une experience optimale.
            </Typography>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                <b>Commandes</b>
              </Typography>
              <div>
                <img src={Liste_commandes} alt="Description de la section commandes" width="100%" />
              </div>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                <b>Reception</b>
              </Typography>
              <div>
                <img src={Reception} alt="Description de la section commandes" width="100%" />
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <hr />
      {/* Sixième page : Les statistiques */}
      <Box p={4} textAlign="left" id="section-statistiques">
        <Typography variant="h4" gutterBottom>
          <b>6.Les statistiques</b>
        </Typography>
        <Grid item container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="body1" gutterBottom style={{ fontSize: '1.2rem' }}>
              Ceci est la section <b>Tableau de bord</b> qui permet de voir les divers statistiques
              qui resume le bilan annuel des sections suivantes.
              <ul>
                <Typography variant="body1" gutterBottom style={{ fontSize: '1.0rem' }}>
                  <li>Commandes</li>
                  <li>Benefices articles et materiels</li>
                  <li>Etat des stocks</li>
                </Typography>
              </ul>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              <b>Extrait des etats des stocks</b>
            </Typography>
            <div>
              <img
                src={Etatstatistiques}
                alt="Description de la section statistiques"
                width="100%"
              />
            </div>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Aide;

import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import Article from 'app/img/Article.PNG';
import Insertion_article from 'app/img/Insertion_article.PNG';
import Stock_articles from 'app/img/Stock_articles.PNG';

const Aide = () => {
  return (
    <Container>
      <Box p={4} textAlign="left">
        <Typography variant="h4" gutterBottom>
          Bienvenue dans la section Aide
        </Typography>
        <p>
          <Typography variant="body1" gutterBottom>
            Nous sommes là pour vous aider à tirer le meilleur parti de notre plateforme. Que vous
            soyez nouveau ou utilisateur expérimenté, notre objectif est de vous fournir
            l'assistance dont vous avez besoin pour naviguer et utiliser efficacement nos
            fonctionnalités.
          </Typography>
        </p>
        <p>
          <Typography variant="body1" gutterBottom>
            Notre Centre d'Aide contient une variété de ressources pour répondre à vos questions et
            résoudre vos problèmes. Explorez les différentes sections ci-dessous pour obtenir des
            instructions détaillées, des guides pratiques et des conseils utiles sur divers aspects
            de notre plateforme.
          </Typography>
        </p>
        <p>
          <Typography variant="body1" gutterBottom>
            Si vous ne trouvez pas ce que vous cherchez ou si vous avez besoin d'une assistance
            supplémentaire, n'hésitez pas à nous contacter directement. Notre équipe de support est
            disponible pour répondre à vos questions et résoudre vos problèmes dans les plus brefs
            délais.
          </Typography>
        </p>
        <p>
          <Typography variant="h6" gutterBottom>
            Insertion de données
          </Typography>
          <Typography variant="body1" gutterBottom>
            Apprenez à insérer efficacement des données dans notre système. Que ce soit des
            informations sur les clients, les produits ou d'autres détails importants, nous vous
            guiderons à travers le processus.
          </Typography>
          <Typography variant="h6" gutterBottom>
            Exemple: Module article: Afin d'ajouter un nouvel article, il faut appuyer sur le bouton
            "Nouvel article" pour faire apparaitre le formulaire.
            <Typography variant="h6" gutterBottom>
              <p>
                Certains modules possedent ce formulaire d'insertion dans leurs section, ils sont
                generalement marque d'un bouton bleu.
              </p>
            </Typography>
            <div>
              <img src={Article} alt="Description de mon image" width="70%" />
            </div>
            <div>
              <img src={Insertion_article} alt="Description de mon image" width="70%" />
            </div>
          </Typography>
        </p>
        <p>
          <Typography variant="h6" gutterBottom>
            Mouvements
          </Typography>
          <Typography variant="body1" gutterBottom>
            Découvrez comment gérer les mouvements de stocks et de produits au sein de votre
            entreprise. De la réception des marchandises à leur expédition, nous vous expliquerons
            toutes les étapes.
          </Typography>
        </p>
        <Typography variant="h6" gutterBottom>
          Stockage de matériels et des articles
        </Typography>
        <Typography variant="body1" gutterBottom>
          Obtenez des informations sur le stockage efficace des matériaux et des articles dans votre
          entrepôt ou vos locaux. Apprenez les meilleures pratiques pour organiser votre inventaire.
          <div>
            <img src={Stock_articles} alt="Description de mon image" width="100%" />
          </div>
        </Typography>

        <Typography variant="h6" gutterBottom>
          Les commandes
        </Typography>
        <Typography variant="body1" gutterBottom>
          Maîtrisez la gestion des commandes clients, de leur création à leur traitement. Découvrez
          comment suivre les commandes en attente et effectuées pour garantir une expérience client
          optimale.
        </Typography>

        <Typography variant="h6" gutterBottom>
          Les statistiques
        </Typography>
        <Typography variant="body1" gutterBottom>
          Explorez les fonctionnalités de génération de rapports et de statistiques de notre
          système. Obtenez des informations précieuses sur les ventes, les stocks, les performances
          et plus encore pour prendre des décisions éclairées.
        </Typography>

        {/* Ajoutez ici d'autres sections ou un formulaire de contact */}
      </Box>
    </Container>
  );
};

export default Aide;

// Fonction d'insertion généralisée
const insertData = async (objetAInserer,lienPost) => {
  try {
    // Envoyer la requête POST au serveur
    const response = await fetch(lienPost, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(objetAInserer),
    });

    // Vérifier si la requête a réussi (statut HTTP 2xx)
    if (response.ok) {
      // Retourner le message de confirmation
      return {
        text: 'Information enregistrée',
        severity: 'success',
        open:true
      };
    } else {
      // Retourner une erreur
      return {
        text: 'Une erreur s\'est produite',
        severity: 'error',
        open:true
      };
    }
  } catch (error) {
    // Retourner une erreur
    return {
      text: 'Une erreur s\'est produite',
      severity: 'error',
      open:true
    };
};
}

export {insertData}
  
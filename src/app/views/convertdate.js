export function convertdate(date) {
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      };
      
    return new Intl.DateTimeFormat('fr-FR',options).format(date);
}

export default convertdate;
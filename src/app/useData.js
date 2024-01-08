import { useEffect, useState } from "react";

import { baseUrl } from 'app/utils/constant';


export function useData(url) {
    const [data, setData] = useState([]);
    const [previousUrl, setPreviousUrl] = useState(null);
  
    useEffect(() => {
      // Cette fonction effectue la requête et met à jour les données
      const fetchData = async () => {
        try {
          const response = await fetch(baseUrl + url);
          const json = await response.json();
  
          if (!json) {
            setData([]);
          } else {
            setData(json);
          }
        } catch (error) {
          console.error(error);
        }
      };
  
      // Si l'URL change, effectuer la requête
      if (url !== previousUrl) {
        fetchData();
        setPreviousUrl(url);
      } else {
        // Si l'URL n'a pas changé, mettre à jour les données
        fetchData();
      }
    }, [url, previousUrl]);
  
    return data;
  }
  
  export default useData;
  
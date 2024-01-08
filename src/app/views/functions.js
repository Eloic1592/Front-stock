
import { useEffect, useState } from 'react';
import { baseUrl } from 'app/utils/constant';

export const deleteData = async (objetAInserer,lienPost) => {
   try {
     const response = await fetch(baseUrl+lienPost, {
       method: 'PUT',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify(objetAInserer),
     });

     if (response.ok) {
       return {
         text: 'Information enregistrée',
         severity: 'success',
         open:true
       };
     } else {
       return {
         text: 'Une erreur s\'est produite',
         severity: 'error',
         open:true
       };
     }
   } catch (error) {
     return {
       text: 'Une erreur s\'est produite',
       severity: 'error',
       open:true
     };
   }
};

export const Finddata = (url,id) => {
   const [data, setData] = useState(null);
   useEffect(() => {
       fetch(baseUrl+url+"/"+id)
           .then(response => response.json())
           .then(json => {
                  setData(json);
           })
           .catch(error => console.error(error));
   }, [data]);
   console.log(data);

   return data;
};

export const insertData = async (objetAInserer,lienPost) => {
 try {
   const response = await fetch(baseUrl+lienPost, {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
     },
     body: JSON.stringify(objetAInserer),
   });

   if (response.ok) {
     return {
       text: 'Information enregistrée',
       severity: 'success',
       open:true
     };
   } else {
     return {
       text: 'Une erreur s\'est produite',
       severity: 'error',
       open:true
     };
   }
 } catch (error) {
   return {
     text: 'Une erreur s\'est produite',
     severity: 'error',
     open:true
   };
 }
};

export const UpdateData = async (objetUpdate,lienPost) => {
   try {
     const response = await fetch(lienPost, {
       method: 'PUT',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify(objetUpdate),
     });

     if (response.ok) {
       return {
         text: 'Information enregistrée',
         severity: 'success',
         open:true
       };
     } else {
       return {
         text: 'Une erreur s\'est produite',
         severity: 'error',
         open:true
       };
     }
   } catch (error) {
     return {
       text: 'Une erreur s\'est produite',
       severity: 'error',
       open:true
     };
   }
};

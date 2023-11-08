import { useEffect, useState } from "react";
import getUselink from 'app/views/getuseLink';

const Finddata = (url,id) => {
    const [data, setData] = useState(null);
    useEffect(() => {
        fetch(getUselink()+url+"/"+id)
            .then(response => response.json())
            .then(json => {
                    setData(json);

            })
            .catch(error => console.error(error));
            console.log(getUselink()+url+"/"+id);
    }, [data]);
    console.log(data);

    return data;
}

export {Finddata};
import { useEffect, useState } from "react";

export function useData(url) {
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch('http://localhost:8080/'+url)
            .then(response => response.json())
            .then(json => {
                if (!json) {
                    setData([]);
                } else {
                    setData(json);
                }
            })
            .catch(error => console.error(error));
    }, []);
    console.log(data);

    return data;
}

export default useData;
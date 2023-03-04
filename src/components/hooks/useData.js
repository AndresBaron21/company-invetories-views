import { useState, useEffect } from 'react';

const useData = url => {
    const [data, setData] = useState({
        data: [],
        charging: true,
    });
    useEffect(() => {
        fetch(url, {
            headers: { Authorization: `Bearer ${localStorage.getItem('TOKEN')}` },
        })
            .then(response => response.json())
            .then(
                data => setData({
                    data: data.data,
                    charging: false,
                })
            )
    }, [url]);
    return data;
}

export default useData;
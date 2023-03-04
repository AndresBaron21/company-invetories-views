import React, { useState, useEffect, useMemo, } from 'react';
import { Link } from "react-router-dom";
import URL from '../../utils/Config';

const useInfo = () => {
    const [pending, setPending] = useState(true);
    const [info, setInfo] = useState([])
    const [topic, setTopic] = useState('All')
    const [updateInfo, setUpdateInfo] = useState(true);
    const urlRecords = URL.BASE_URL + '/company/reed';
    const [categories, setCategories] = useState([])
    const [filteredResults, setFilteredResults] = useState([]);

    const getInfo = (url) => {
        fetch(url, {
            headers: { Authorization: `Bearer ${localStorage.getItem('TOKEN')}` },
        })
        .then(response => response.json())
        .then(data => {
                setInfo(data.records)
                setPending(false)
            })
    }

    useMemo(() => getInfo(urlRecords), [updateInfo]);


    const filterComponent = () => {
        return (
                info.map(record =>
                    (
                        <div className="col" key={record.tin}>
                            <div className="card card-details">
                                <div className="card-body">
                                    <h5 className="card-title">Name: {record.name}</h5>
                                    <p className="card-text">Address: {record.address}</p>
                                    <span className="card-text">Phone: {record.phone}</span>
                                </div>
                            </div>
                        </div>
                    )
                )
            )
    }

    useMemo(() => filterComponent, [filteredResults]);

    return {
        info,
        pending,
        filteredResults,
        filterComponent,
        topic,
        categories,
    }
};

export { useInfo, };
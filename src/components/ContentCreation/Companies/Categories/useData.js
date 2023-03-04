import React, { useState, useEffect, useMemo, } from 'react';
import URL from '../../../../utils/Config';
import { HiOutlinePencil } from "react-icons/hi";
import { BsTrash } from "react-icons/bs";
import axios from "axios";
import { BsArrowRightSquare } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { plainAlert, confirmationAlert } from '../../../hooks/useAlertWindows'


const makeRequest = (props) => {
    try {
        axios({
            method: 'post',
            url: URL.BASE_URL + props.conditionalUrl,
            data: props.data,
            headers: {
                Authorization: `${localStorage.getItem('TOKEN')}`,
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                props.props.props.updateData(!props.props.props.updateDataTable)
                var title = '';
                var icon = '';
                if (response.status === 200 || response.status === 201) {
                    title = 'Successful request'
                    icon = 'success'
                } else if (response.status === 400) {
                    title = 'Incomplete application'
                    icon = 'error'
                }
                const data = {
                    title: title,
                    text: response.data.message,
                    icon: icon,
                }
                plainAlert(data)
                props.props.setData({})
                props.props.cleanForm(props.props)
            });
    } catch (error) {
        console.log(error)
    }
}

const newRecord = (props) => {
    var conditionalUrl = '';
    const record = props.data;
    if (props.props.type === 'create') {
        if (
            record.name 
        ) {
            var data = JSON.stringify({
                "name": record.name,
                "company_id": props.props.companyID,
            });

            conditionalUrl = '/category/store';
            makeRequest({ conditionalUrl, data, props })
        } else {
            const data = {
                title: "Incomplete application",
                text: "All fields must be completed",
                icon: "error",
            }
            plainAlert(data)
        }
    } else if (props.props.type === 'update') {
        var data = JSON.stringify({
            "id": record.id ? record.id : props.props.record.id,
            "name": record.name ? record.name : props.props.record.name,
            "company_id": record.companyID ? record.companyID : props.props.record.company_id,
        });

        conditionalUrl = '/category/update';
        makeRequest({ conditionalUrl, data, props })
    }


}

const deleteRecord = (props) => {
    try {
        axios({
            method: 'post',
            url: URL.BASE_URL + '/category/delete',
            data: { 'id': props.row.id },
            headers: {
                Authorization: `${localStorage.getItem('TOKEN')}`,
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                props.setUpdateDataTable(!props.updateDataTable)

                var title = '';
                var icon = '';
                if (response.status === 200) {
                    title = 'Successful request'
                    icon = 'success'
                } else if (response.status === 404) {
                    title = 'Incomplete application'
                    icon = 'error'
                }
                const data = {
                    title: title,
                    text: response.data.message,
                    icon: icon,
                }
                plainAlert(data)
            });
    } catch (error) {
        console.log(error)
    }
}


const useInfo = ({ params }) => {
    const [columns, setColumns] = useState([]);
    const [pending, setPending] = useState(true);
    const [updateDataTable, setUpdateDataTable] = useState(true);
    const [modules, setModules] = useState([])
    const [companies, setCompanies] = useState([])
    const [info, setInfo] = useState([])
    const [record, setRecord] = useState([])
    const [type, setType] = useState('')
    const urlUserRecords = URL.BASE_URL + '/company/categories';
    const urlCompanies = URL.BASE_URL + '/company/reed';

    const getInfo = () => {
        var data = JSON.stringify({
            "company_id": params.id,
          });
        try {
            axios({
                method: 'post',
                url: urlUserRecords,
                data: data,
                headers: {
                    Authorization: `${localStorage.getItem('TOKEN')}`,
                    'Content-Type': 'application/json'
                }
            })
                .then((response) => {
                    setInfo(response.data.record ? response.data.record : null)
                    setModules(response.data.data)
                });
        } catch (error) {
            console.log(error)
        }
    }

    
    const getCompanies = () => {
        fetch(urlCompanies, {
            headers: { Authorization: `${localStorage.getItem('TOKEN')}` },
        })
        .then(response => response.json())
        .then(data => {
            setCompanies(data.records)
        })
    }

    useMemo(() => {
        getInfo(urlUserRecords)
        getCompanies()
    }, [updateDataTable]);
    
    useEffect(() => {
        const timeout = setTimeout(() => {
            setColumns([
                {
                    name: 'Name',
                    selector: row => row.name,
                    sortable: true,
                },
                {
                    name: 'Contents',
                    cell: (row) => <div>
                        <Link to={`/company-manager/categories-articles/${row.id}`}>
                            <BsArrowRightSquare
                                className='icons-details'
                            />
                        </Link>
                    </div>,
                    ignoreRowClick: true,
                    allowOverflow: true,
                    button: true,
                },
                {
                    name: 'Actions',
                    cell: (row) => <div>
                        <HiOutlinePencil className='icons-details' data-bs-toggle="modal" data-bs-target="#recordModification"
                            onClick={
                                () => {
                                    setRecord(row)
                                    setType('update')
                                }
                            } />
                        <BsTrash className='icons-details'
                            onClick={() => {
                                confirmationAlert({
                                    row,
                                    setUpdateDataTable,
                                    updateDataTable,
                                    deleteRecord
                                })
                            }

                            } />
                    </div>,
                    ignoreRowClick: true,
                    allowOverflow: true,
                    button: true,
                },
            ]);
            setPending(false);
        }, 2000);
        return () => clearTimeout(timeout);
    }, [updateDataTable]);

    return {
        info,
        modules,
        companies,
        columns,
        pending,
        record,
        type,
        setType,
        updateDataTable,
        setUpdateDataTable,
    }
};

export { newRecord, useInfo, };
import React, { useState, useEffect, useMemo, } from 'react';
import URL from '../../../../utils/Config';
import { HiOutlinePencil } from "react-icons/hi";
import { BsTrash } from "react-icons/bs";
import { BsArrowRightSquare } from "react-icons/bs";
import { Link } from 'react-router-dom';
import axios from "axios";
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
                } else if (response.status === 400 || response.status === 404) {
                    title = 'Incomplete application'
                    icon = 'error'
                }
                const data = {
                    title: title,
                    text: response.message,
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
            record.tin &&
            record.name &&
            record.address &&
            record.phone 
        ) {
            var data = JSON.stringify({
                "tin": record.tin,
                "name": record.name,
                "address": record.address,
                "phone": record.phone,
                "user_id": localStorage.getItem('ID')
              });

            conditionalUrl = '/company/store';
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
            "tin": record.tin ? record.tin : props.props.record.tin,
            "name": record.name ? record.name : props.props.record.name,
            "address": record.address ? record.address : props.props.record.address,
            "phone": record.phone ? record.phone : props.props.record.phone,
            "user_id": localStorage.getItem('ID')
        });

        conditionalUrl = '/company/update';
        makeRequest({ conditionalUrl, data, props })
    }


}

const deleteRecord = (props) => {
    var data = JSON.stringify({
        "tin": props.row.tin,
      });
    try {
        axios({
            method: 'post',
            url: URL.BASE_URL + '/company/delete',
            data: data,
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
                    text: response.message,
                    icon: icon,
                }
                plainAlert(data)
            });
    } catch (error) {
        console.log(error)
    }
}


const useInfo = () => {
    const [columns, setColumns] = useState([]);
    const [pending, setPending] = useState(true);
    const [updateDataTable, setUpdateDataTable] = useState(true);
    const [info, setInfo] = useState([])
    const [categories, setCategories] = useState([])
    const [record, setRecord] = useState([])
    const [type, setType] = useState('')
    const urlUserRecords = URL.BASE_URL + '/company/reed';
    const urlCategories = URL.BASE_URL + '/company/reed';

    const getInfo = (url) => {
        fetch(url, {
            headers: { Authorization: `Bearer ${localStorage.getItem('TOKEN')}` },
        })
            .then(response => response.json())
            .then(data => {
                setInfo(data.records)
            })
    }

    const getCategories = () => {
        fetch(urlCategories, {
            headers: { Authorization: `Bearer ${localStorage.getItem('TOKEN')}` },
        })
            .then(response => response.json())
            .then(data => {
                setCategories(data.data)
            })
    }

    useMemo(() => getInfo(urlUserRecords), [updateDataTable]);


    useEffect(() => {
        const timeout = setTimeout(() => {
            setColumns([
                {
                    name: 'Name',
                    selector: row => row.tin,
                    sortable: true,
                },
                {
                    name: 'Name',
                    selector: row => row.name,
                    sortable: true,
                },
                {
                    name: 'Address',
                    selector: row => row.address,
                    sortable: true,
                },
                {
                    name: 'Phone',
                    selector: row => row.phone,
                    sortable: true,
                },
                {
                    name: 'Categories',
                    cell: (row) => <div>
                        <Link to={`/company-manager/categories/${row.tin}`}>
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
            getCategories()
            setPending(false);
        }, 2000);
        return () => clearTimeout(timeout);
    }, [updateDataTable]);

    return {
        info,
        columns,
        pending,
        record,
        type,
        setType,
        updateDataTable,
        setUpdateDataTable,
        categories,
        getCategories
    }
};

export { newRecord, useInfo, };
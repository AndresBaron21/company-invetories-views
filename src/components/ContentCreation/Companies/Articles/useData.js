import React, { useState, useEffect, useMemo, } from 'react';
import URL from '../../../../utils/Config';
import { HiOutlinePencil } from "react-icons/hi";
import { BsTrash } from "react-icons/bs";
import axios from "axios";
import { plainAlert, confirmationAlert } from '../../../hooks/useAlertWindows'


const makeRequest = (props) => {
    const alert = (response) => {
        var title = '';
        var icon = '';
        if (response.status === 200 || response.status === 201) {
            title = 'Successful request'
            icon = 'success'
        } else if (response.status === 400 || response.status === 500) {
            title = 'Incomplete application'
            icon = 'error'
        }
        const data = {
            title: title,
            text: response.data.message,
            icon: icon,
        }
        return data;
    }
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
                let data = {};
                if (props.props !== undefined) {
                    if (props.props.props.type === 'create' || props.props.props.type === 'update')
                    {
                        props.props.props.updateData(!props.props.props.updateDataTable)
                        data = alert(response)
                        plainAlert(data)
                        props.props.setData({})
                        props.props.cleanForm(props.props)
                    } 
                } else {
                    data = alert(response)
                    plainAlert(data)
                }
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
            record.name &&
            record.description 
        ) {
            var data = JSON.stringify({
                "name": record.name,
                "description": record.description,
                "category_id": props.props.categoryID,
            });

            conditionalUrl = '/article/store';
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
            "description": record.description ? record.description : props.props.record.description,
            "category_id": props.props.record.category_id,
        });

        conditionalUrl = '/article/update';
        makeRequest({ conditionalUrl, data, props })
    }


}

const sendPDFEmail = ({categoryID, data}) => {
    const record = data;
        if (
            record.senderEmail &&
            record.senderPassword &&
            record.emailRecipient &&
            record.subject &&
            record.message 
        ) {
            var data = JSON.stringify({
                "category_id": categoryID,
                "sender_email": record.senderEmail,
                "sender_password": record.senderPassword,
                "email_recipient": record.emailRecipient,
                "subject": record.subject,
                "message": record.message,
            });

            const conditionalUrl = '/article/send-email';
            makeRequest({ conditionalUrl, data })
        } else {
            const data = {
                title: "Incomplete application",
                text: "All fields must be completed",
                icon: "error",
            }
            plainAlert(data)
        }
  
}

const deleteRecord = (props) => {
    try {
        axios({
            method: 'post',
            url: URL.BASE_URL + '/article/delete',
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
    const urlUserRecords = URL.BASE_URL + '/category/articles';

    const getInfo = () => {
        var data = JSON.stringify({
            "category_id": params.id,
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

    useMemo(() => {
        getInfo(urlUserRecords)
    }, [updateDataTable]);
    
    const urlPDF = URL.BASE_URL + '/article/pdf';

    const getPDF = () => {
        var data = JSON.stringify({
            "category_id": params.id,
        });
        try {
            axios({
                method: 'post',
                url: urlPDF,
                data: data,
                responseType: 'blob',
                headers: {
                    Authorization: `${localStorage.getItem('TOKEN')}`,
                    'Content-Type': 'application/json'
                }
            })
                .then((response) => {
                        const url = window.URL.createObjectURL(new Blob([response.data]));
                        const link = document.createElement('a');
                        link.href = url;
                        // const arr = props.nombreArchivo.split('.')
                        link.setAttribute('download', 'articles.pdf')
                        document.body.appendChild(link);
                        link.click();
                }).catch((error) => {console.log(error.response)});
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            setColumns([
                {
                    name: 'Name',
                    selector: row => row.name,
                    sortable: true,
                },
                {
                    name: 'Description',
                    selector: row => row.description,
                    sortable: true,
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
        columns,
        pending,
        record,
        type,
        getPDF,
        setType,
        updateDataTable,
        setUpdateDataTable,
    }
};

export { newRecord, useInfo, sendPDFEmail };
import React, { useState, useMemo, } from 'react';
import URL from '../../../utils/Config';
import Spinner from '../../General/Spinner';
import axios from "axios";
import { plainAlert, confirmationAlert } from '../../../components/hooks/useAlertWindows'
import { HiOutlinePencil } from "react-icons/hi";
import { BsTrash } from "react-icons/bs";


const makeRequest = (props) => {
    try {
        axios({
            method: 'post',
            url: URL.BASE_URL + props.conditionalUrl,
            data: props.data,
            headers: {
                Authorization: `Bearer ${localStorage.getItem('TOKEN')}`,
                'Content-type': 'multipart/form-data'
            }
        })
            .then((response) => {
                props.props.props.updateData(!props.props.props.updateDataTable)
                var title = '';
                var icon = '';
                if (response.data.status === 200 || response.data.status === 201) {
                    title = 'Successful request'
                    icon = 'success'
                } else if (response.data.status === 400 || response.data.status === 404) {
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
    const data = new FormData()
    const record = props.data;
    if (props.props.type === 'update') {
        data.append('id', props.props.record.id);
        data.append('booking_end_dates', record.bookingEndDates ? record.bookingEndDates : props.props.record.booking_end_dates);

        conditionalUrl = '/books/make-booking';
        makeRequest({ conditionalUrl, data, props })
    }
}

const deleteRecord = (props) => {
    try {
        axios({
            method: 'post',
            url: URL.BASE_URL + '/books/delete-booking',
            data: { 'id': props.element.id },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('TOKEN')}`,
                'Content-type': 'multipart/form-data'
            }
        })
            .then((response) => {
                props.setUpdateDataTable(!props.updateDataTable)

                var title = '';
                var icon = '';
                if (response.data.status === 200) {
                    title = 'Successful request'
                    icon = 'success'
                } else if (response.data.status === 404) {
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


const useInfo = () => {
    const [pending, setPending] = useState(true);
    const [updateDataTable, setUpdateDataTable] = useState(true);
    const [info, setInfo] = useState([])
    const [type, setType] = useState('')
    const [record, setRecord] = useState([])
    const urlUserRecords = URL.BASE_URL + '/users/my-reservations';

    const getInfo = (url) => {
        fetch(url, {
            headers: { Authorization: `Bearer ${localStorage.getItem('TOKEN')}` },
        })
            .then(response => response.json())
            .then(response => {
                setInfo(response.data)
                setPending(false)
            })
    }

    const showLatestRecords = () => { 
        if (pending === true) {
            return (
                <Spinner />
            );
        } else if (info !== undefined && info.length > 0) {
            return (
                info.map(element =>
                (
                    <div className="col space" key={element.id}>
                        <HiOutlinePencil
                            type="button"
                            className="modal-button col-1 icons-details"
                            data-bs-toggle="modal" data-bs-target="#recordModification"
                                onClick={() => {
                                    setRecord(element)
                                    setType('update');  
                                }
                            }
                        />
                         <BsTrash className='icons-details'
                            onClick={() => {
                                confirmationAlert({
                                    element,
                                    setUpdateDataTable,
                                    updateDataTable,
                                    deleteRecord
                                })
                            }

                            } />
                        <div className="card card-details">
                            <div className="card-img-top">
                                <img src={URL.BASE_URL_STORAGE + element.images}
                                    className="img-top" alt={element.titles} />
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{element.titles}</h5>
                                <p className="card-text">{element.descriptions}</p>
                                <span>{element.authors}</span>
                            </div>
                        </div>
                    </div>
                ))
            );
        } else if (info !== undefined && info.length === 0) {
            return <h4 className="text-details">Here you will find the books that you have reserved</h4>
        }
    }

    useMemo(() => {
        getInfo(urlUserRecords)
        showLatestRecords()
    }, [updateDataTable]);
    
    return {
        pending,
        info,
        setRecord,
        record,
        type,
        setType,
        updateDataTable,
        setUpdateDataTable,
        showLatestRecords,
    }
};


export { newRecord, useInfo, };

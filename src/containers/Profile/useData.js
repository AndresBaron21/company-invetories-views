import React, { useState, useMemo, } from 'react';
import URL from '../../utils/Config';
import axios from "axios";
import { plainAlert } from '../../components/hooks/useAlertWindows'


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
        data.append('name', record.name ? record.name : props.props.record.name);
        data.append('email', record.email ? record.email : props.props.record.email);

        if (
            record.ProfilePicture != null
        ) {
            data.append('profile_picture', record.ProfilePicture ? record.ProfilePicture : props.props.record.profile_picture);
        }
        conditionalUrl = '/users/update';
        makeRequest({ conditionalUrl, data, props })
    }


}



const useInfo = () => {
    const [pending, setPending] = useState(true);
    const [updateDataTable, setUpdateDataTable] = useState(true);
    const [info, setInfo] = useState([])
    const [record, setRecord] = useState([])
    const [type, setType] = useState('')
    const urlUserRecords = URL.BASE_URL + '/users';

    const getInfo = (url) => {
        fetch(url, {
            headers: { Authorization: `Bearer ${localStorage.getItem('TOKEN')}` },
        })
            .then(response => response.json())
            .then(response => {
                setInfo(response.data[0])
                setPending(false)
            })
    }

    useMemo(() => getInfo(urlUserRecords), [updateDataTable]);

    return {
        pending,
        info,
        setRecord,
        record,
        type,
        setType,
        updateDataTable,
        setUpdateDataTable,
    }
};

export { newRecord, useInfo, };
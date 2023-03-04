import { plainAlert } from './useAlertWindows'
import axios from "axios";

const makeRequest = ({ 
        conditionalUrl, 
        setForm, 
        data, 
        cleanForm, 
        record, 
        type, 
        updateDataTable, 
        setUpdateDataTable,
        method,
    }) => {
    try {
        axios({
            method: method,
            url: conditionalUrl,
            data: data,
            headers: {
                Authorization: `Bearer ${localStorage.getItem('TOKEN')}`,
                // 'Content-type': 'multipart/form-data'
            }
        })
            .then((response) => {
                setUpdateDataTable(!updateDataTable)
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
                if (type === 'create' || type === 'update') {
                    cleanForm({record, type, setForm})
                }
            });
    } catch (error) {
        console.log(error)
    }
}

export { makeRequest, };
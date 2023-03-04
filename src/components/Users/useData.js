import React, { useState, useEffect, useMemo, } from 'react';
import URL from '../../utils/Config';
import { HiOutlinePencil } from "react-icons/hi";
import { BsTrash } from "react-icons/bs";
import axios from "axios";
import { plainAlert, confirmationAlert } from '../hooks/useAlertWindows'
import useData from '../hooks/useData'
import { isCompositeComponent } from 'react-dom/test-utils';


const getRoles = (options) => {
  var roles = [];
  if (options && options.length > 0) {
    options.map(option => {
        roles.push(option.value)
        })
  }
  return roles
}

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
                } else if (response.data.status === 400) {
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
    const roles = getRoles(props.props.selectedOption);
    var conditionalUrl = '';
    const data = new FormData()
    const record = props.data;

    if (props.props.type === 'create') {
        if (
            record.firstName &&
            record.lastName &&
            record.birthday &&
            record.gender &&
            record.email &&
            record.mobileNumber &&
            roles.length > 0 &&
            record.password 
        ) {
            data.append('birthday', record.birthday); 
            data.append('email', record.email);
            data.append('first_name', record.firstName);
            data.append('gender', record.gender);
            data.append('mobile_number', record.mobileNumber);
            data.append('last_name', record.lastName);
            data.append('password', record.password);
            data.append('roles_id', roles);

            if (
                record.country !== undefined
            ) {
                data.append('country', record.country);
            }
            if (
                record.coverPhoto !== undefined
            ) {
                data.append('cover_photo', record.coverPhoto);
            }
            if (
                record.livesIn !== undefined
            ) {
                data.append('lives_in', record.livesIn);
            }
            if (
                record.profilePicture !== undefined
            ) {
                data.append('profile_picture', record.profilePicture);
            }
            if (
                record.worksAt !== undefined
            ) {
                data.append('works_at', record.worksAt);
            }

            conditionalUrl = '/users-control/store';
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
        data.append('id', props.props.record.id);
        data.append('birthday', record.birthday ? record.birthday : props.props.record.birthday);
        data.append('country', record.country ? record.country : props.props.record.country);
        data.append('email', record.email ? record.email : props.props.record.email);
        data.append('first_name', record.firstName ? record.firstName : props.props.record.first_name);
        data.append('gender', record.gender ? record.gender : props.props.record.gender);
        data.append('mobile_number', record.mobileNumber ? record.mobileNumber : props.props.record.mobile_number);
        data.append('last_name', record.lastName ? record.lastName : props.props.record.last_name);
        data.append('works_at', record.worksAt ? record.worksAt : props.props.record.works_at);
        data.append('lives_in', record.livesIn ? record.livesIn : props.props.record.lives_in);
        
        if (roles.length > 0) {
            for (var i = 0; i < roles.length; i++) {
                data.append('roles_id[]', roles[i]);
              }
        }
        if (record.password != null) {
            data.append('password', record.password);
        }
        if (record.profilePicture != null) {
            data.append('profile_picture', record.profilePicture);
        }
        if (record.coverPhoto != null) {
            data.append('cover_photo', record.coverPhoto);
        }

        conditionalUrl = '/users-control/update';
        makeRequest({ conditionalUrl, data, props })
    }


}

const deleteRecord = (props) => {
    try {
        axios({
            method: 'post',
            url: URL.BASE_URL + '/users-control/deactivate',
            data: { 'id': props.row.id },
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
    const [columns, setColumns] = useState([]);
    const [pending, setPending] = useState(true);
    const [updateDataTable, setUpdateDataTable] = useState(true);
    const [info, setInfo] = useState([])
    const [record, setRecord] = useState([])
    const [type, setType] = useState('')
    const urlUserRecords = URL.BASE_URL + '/users-control/all';
    const roles = useData(URL.BASE_URL + '/users-control/all-roles');
    const [options, setOptions] = useState([])
    const [selectedOption, setSelectedOption] = useState(null);

    const getInfo = (url) => {
        fetch(url, {
            headers: { Authorization: `Bearer ${localStorage.getItem('TOKEN')}` },
        })
            .then(response => response.json())
            .then(data => {
                setInfo(data.data)
            })
    }

    useMemo(() => getInfo(urlUserRecords), [updateDataTable]);

    const getOptions = (data) => {
        var options = []
        if (data.length > 0) {
            data.map(datum => {
                    options.push(
                            { value: datum.id, label: datum.name }
                    )
                }
            )
        }  
        return options;
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            setColumns([
                {
                    name: <p>First name</p>,
                    selector: row => row.first_name,
                    sortable: true,
                },
                {
                    name: <p>Last name</p>,
                    selector: row => row.last_name,
                    sortable: true,
                },
                {
                    name: <p>Email</p>,
                    selector: row => row.email,
                    sortable: true,
                },
                {
                    name: <p>Roles</p>,
                    selector: row => <div>{
                        row.roles.length > 0 ?
                        row.roles.map (datum => <li key={datum.id}>{datum.name}</li>)
                        : null 
                     }</div>,
                    sortable: true,
                },
                {
                    name: <p>Birthday</p>,
                    selector: row => row.birthday,
                    sortable: true,
                },
                {
                    name: <p>Country</p>,
                    selector: row => row.country,
                    sortable: true,
                },
                {
                    name: <p>Gender</p>,
                    selector: row => row.gender,
                    sortable: true,
                },
                {
                    name: <p>Lives in</p>,
                    selector: row => row.lives_in,
                    sortable: true,
                },
                {
                    name: <p>Mobile number</p>,
                    selector: row => row.mobile_number,
                    sortable: true,
                },
                {
                    name: <p>Works at</p>,
                    selector: row => row.works_at,
                    sortable: true,
                },
                {
                    name: <p>Profile picture</p>,
                    selector: row => <img className="img-data-table" src={row.profile_picture ? URL.BASE_URL_STORAGE + row.profile_picture : null} />,
                    sortable: true,
                },
                {
                    name: <p>Cover photo</p>,
                    selector: row => <img className="img-data-table" src={row.cover_photo ? URL.BASE_URL_STORAGE + row.cover_photo : null} />,
                    sortable: true,
                },
                {
                    name: <p>Actions</p>,
                    cell: (row) => <div>
                        <HiOutlinePencil className='icons-details' data-bs-toggle="modal" data-bs-target="#recordModification"
                            onClick={
                                () => {
                                    setRecord(row)
                                    setType('update')
                                    setSelectedOption(getOptions(row.roles))
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

    useEffect(() => {
        setOptions(getOptions(roles.data))
    }, [roles]);

    return {
        info,
        selectedOption,
        setSelectedOption,
        options,
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
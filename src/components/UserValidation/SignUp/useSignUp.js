import React, { useState, useEffect, } from 'react';
import URL from '../../../utils/Config';
import { plainAlert } from '../../hooks/useAlertWindows.js'
import axios from "axios";

const registerNewUser = (props) => {
    const record = props.registerUser;
    if (
        record.name &&
        record.email &&
        record.password
    ) {
        axios
            .post(URL.BASE_URL + '/auth/register', {
                name: record.name,
                email: record.email,
                password: record.password
            })
            .then((response) => {
                if (response.data.status == true && response.data.token != null) {
                    localStorage.setItem('TOKEN', response.data.token)
                    localStorage.setItem('VALIDATION', response.data.status)
                    // localStorage.setItem('ROLES', response.data.roles)
                    localStorage.setItem('ID', response.data.id)
                    props.props.validation(true)
                    props.redirectHome()
                } else if (response.data.status == '401') {
                    const data = {
                        title: 'Repeated record',
                        text: response.data.message,
                        icon: 'error',
                    }
                    plainAlert(data)
                }
            });
    } else {
        const data = {
            title: 'Incomplete application',
            text: 'All fields must be completed',
            icon: 'error',
        }
        plainAlert(data)
    }
}

export { registerNewUser };
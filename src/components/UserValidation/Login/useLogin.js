import React, { useState, useEffect, } from 'react';
import axios from "axios";
import URL from '../../../utils/Config';
import { plainAlert } from '../../hooks/useAlertWindows.js'

const submitCredentials = (props) => {

    const record = props.credentials;

    if (
        record.email &&
        record.password
    ) {
        try {
            axios
                .post(URL.BASE_URL + '/auth/login', {
                    email: record.email,
                    password: record.password
                })
                .then((response) => {
                    if (response.data.status == true && response.data.token != null) {
                        localStorage.setItem('TOKEN', response.data.token)
                        localStorage.setItem('VALIDATION', response.data.status)
                        localStorage.setItem('ROLES', JSON.stringify(response.data.roles))
                        localStorage.setItem('ID', response.data.id)
                        props.props.validation(true)
                        props.redirectHome()
                    } else if (response.data.status == '401') {
                        const data = {
                            title: 'Credentials do not match',
                            text: response.data.message,
                            icon: 'error',
                        }
                        plainAlert(data)
                    }
                });
        } catch (error) {
            console.log(error)
        }
    } else {
        const data = {
            title: 'Incomplete application',
            text: 'All fields must be completed',
            icon: 'error',
        }
        plainAlert(data)
    }
}

export { submitCredentials, };
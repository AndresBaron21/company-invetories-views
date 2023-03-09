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
        var data = JSON.stringify({
            "email": record.email,
            "password": record.password
          });
          
          var config = {
            method: 'post',
          maxBodyLength: Infinity,
            url: URL.BASE_URL + '/auth/login',
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
          };
          
          axios(config)
          .then(function (response) {
            if (response.data.status == true && response.data.token != null) {
                localStorage.setItem('TOKEN', response.data.token)
                localStorage.setItem('VALIDATION', response.data.status)
                localStorage.setItem('ROLES', JSON.stringify(response.data.roles))
                localStorage.setItem('ID', response.data.id)
                props.props.validation(true)
                props.redirectHome()
            }
          })
          .catch(function (error) {
            const data = {
                title: 'Credentials do not match',
                icon: 'error',
            }
            plainAlert(data)
            // console.log(error);
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

export { submitCredentials, };
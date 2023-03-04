import URL from '../../utils/Config';
import { useNavigate  } from "react-router-dom";
import axios from "axios";

const useInfo = () => {
    const navigate = useNavigate();
    var storedRoles = [];
    if (localStorage.getItem('ROLES') != 'student') {
      storedRoles = JSON.parse(localStorage.getItem('ROLES'))
    }
    const adminRole = storedRoles !== null ? storedRoles.find(element => element === 'admin') : false;
  

    const closeSession = () => {
        localStorage.removeItem('VALIDATION');
        localStorage.removeItem('TOKEN');
        localStorage.removeItem('ROLES');
        navigate('/login');
        navigate(0);
    }

    const request = ({url}) => {
            try {
                axios({
                    method: 'post',
                    url: URL.BASE_URL + url,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('TOKEN')}`,
                        'Content-type': 'multipart/form-data'
                    }
                })
                    .then(closeSession())
            } catch (error) {
                console.log(error)
            }
    }

    const removeAllUserTokens = () => {
        const url = '/auth/remove-all-user-tokens';
        request({url})
    }

    const signOff = () => {
        const url = '/auth/sign-off';
        request({url})
    }

    return {
        removeAllUserTokens,
        signOff,
        adminRole,
    }
};

export { useInfo };
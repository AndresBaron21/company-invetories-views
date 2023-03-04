import React from "react";
import "./UserValidation.scss";
import Login from '../../components/UserValidation/Login'
import SignUp from '../../components/UserValidation/SignUp'

const UserValidation = (props) => {
    return (
        <section>
            <Login validation={props.validation} />
            <div>
                <SignUp validation={props.validation} />
            </div>
        </section>
    );
};

export default UserValidation;
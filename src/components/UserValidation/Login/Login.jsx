import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.scss";
import { submitCredentials } from "./useLogin"
import { useRedirect } from '../useUserValidation'

const Login = (props) => {
    const [credentials, setCredentials] = useState({});
    const { redirectHome, } = useRedirect();


    const handleChange = (e) => {
        credentials[e.target.name] = e.target.value;
        setCredentials(credentials)
    }

    return (
        <section className="login">
            <div className="wrapper">
                <div className="one">
                    <h2 className="section-title container center title-details">Company inventaries</h2>
                </div>
                <div className="five">
                    <div className="container">
                        <div className="row justify-content-md-center">
                            <div className="col-12 apart">
                                <input type="email" className="form-control input-details"
                                    placeholder="Email" name="email" onChange={handleChange} />
                            </div>
                            <div className="col-12 apart">
                                <input type="password" className="form-control input-details"
                                    placeholder="Password" name="password" onChange={handleChange} />
                            </div>
                            <div className="col-12 apart">
                                <button type="submit" className="btn login-button col-12"
                                    onClick={() => submitCredentials({ credentials, props, redirectHome })}>
                                    Log In
                                </button>
                            </div>
                            <div className="form-text apart">
                                Forgot Password?
                            </div>
                            <div className="col-12 apart">
                                <button type="button" className="btn sing-up-button col-12" data-bs-toggle="modal"
                                    data-bs-target="#exampleModal">Sing up</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
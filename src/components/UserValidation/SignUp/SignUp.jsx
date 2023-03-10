import React, { useState } from "react";
import { registerNewUser } from "./useSignUp"
import { useRedirect } from '../useUserValidation'
import "./SignUp.scss";

const Advertising = (props) => {
    const [registerUser, setRegisterUser] = useState({});
    const { redirectHome, } = useRedirect();

    const handleChange = (e) => {
        registerUser[e.target.name] = e.target.value;
        setRegisterUser(registerUser)
    }
    return (
        <section className="sign-up">
            <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Create an account</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body row">
                            <div className="col-md-6 col-sm-12 separate-boxes">
                                <input type="text" className="form-control" placeholder="Name" name="name" onChange={handleChange} />
                            </div>
                            <div className="col-md-6 col-sm-12 separate-boxes">
                                <input type="email" className="form-control" placeholder="Email" name="email" onChange={handleChange} />
                            </div>
                            <div className="col-md-6 col-sm-12 separate-boxes">
                                <input type="password" className="form-control" placeholder="New password" name="password" onChange={handleChange} />
                            </div>
                            <div className="form-text separate-boxes">
                                By clicking Sign Up, you agree to our Terms, Data Policy and Cookies Policy. Hired
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn sing-up-button" data-bs-dismiss="modal" onClick={() => registerNewUser({ registerUser, redirectHome, props })}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Advertising;
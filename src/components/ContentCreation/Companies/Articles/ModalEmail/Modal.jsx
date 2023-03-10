import React, { useState, useMemo } from 'react';
import { sendPDFEmail } from "../useData.js"
import { cleanForm } from "./useModal"
import "./Modal.scss";


const Modal = ({categoryID}) => {
    const [data, setData] = useState({});
    const handleChange = (e) => {
        data[e.target.name] = e.target.value;
        setData(data)
    }
    
    return (
        <section className="container modal-component">
            <div className="modal fade" id="sendEmail" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Send PDF to email</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row align-items-center">
                                <div className="col-sm-12 col-md-6 form-details">
                                    <input type="email" className="form-control" placeholder="Sender email" id="senderEmail" name="senderEmail" onChange={handleChange} />
                                </div>
                                <div className="col-sm-12 col-md-6 form-details">
                                    <input type="password" className="form-control" placeholder="Sender password" id="senderPassword" name="senderPassword" onChange={handleChange} />
                                </div>
                                <div className="col-sm-12 col-md-6 form-details">
                                    <input type="email" className="form-control" placeholder="Email recipient" id="emailRecipient" name="emailRecipient" onChange={handleChange} />
                                </div>
                                <div className="col-sm-12 col-md-6 form-details">
                                    <input type="text" className="form-control" placeholder="Subject" id="subject" name="subject" onChange={handleChange} />
                                </div>
                                <div className="col-sm-12 form-details">
                                    <textarea type="text" className="form-control" placeholder="Message" id="message" name="message" onChange={handleChange} />
                                </div>
                                <span>
                                    At the time of "Send" the modal it will close and it will take a short time for your mail to arrive with: <br/>
                                     - A PDF with the articles of this table. <br/>
                                     - The subject and message you added.
                                </span>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal"
                                onClick={
                                        () => {
                                            sendPDFEmail({ data, categoryID })
                                            cleanForm({setData})
                                        }
                                    }>Send</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Modal;




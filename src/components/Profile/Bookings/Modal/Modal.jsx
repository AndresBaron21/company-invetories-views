import React, { useState, useMemo } from 'react';
import { newRecord } from "../useData.js"
import { cleanForm } from "./useModal"
import "./Modal.scss";


const Modal = (props) => {
    const [data, setData] = useState({});

    const handleChange = (e) => {
        data[e.target.name] = e.target.value;
        setData(data)
    }

    useMemo(() => cleanForm({ props, setData }), [props.record, props.type]);

    return (
        <section className="modal-component">
            <div className="container modal fade" id="recordModification" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Update booking</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row align-items-center">
                                <div className="col-md-6 col-sm-12 form-details">
                                <label className="form-label" >Booking end date</label>
                                    <input type="date" className="form-control" id="bookingEndDates" name="bookingEndDates" onChange={handleChange} />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-primary"
                                data-bs-dismiss="modal"
                                onClick={() => newRecord({ data, props, setData, cleanForm })}>{props.type === 'create' ? 'Add' : 'Update'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Modal;




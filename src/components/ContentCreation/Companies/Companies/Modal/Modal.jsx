import React, { useState, useMemo } from 'react';
import { newRecord } from "../useData.js"
import { cleanForm } from "./useModal"
import URL from '../../../../../utils/Config';
import "./Modal.scss";


const Modal = (props) => {
    const [data, setData] = useState({});

    const handleChange = (e) => {
        data[e.target.name] = e.target.value;
        setData(data)
    }

    useMemo(() => {
        cleanForm({ props, setData })
    }, [props.record, props.type]);

    return (
        <section className="container modal-component">
            <div className="modal fade" id="recordModification" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">{props.type === 'create' ? 'Create company' : 'Update company'}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row align-items-center">
                                <div className="col-6 form-details">
                                {
                                    props.type === 'create' ? 
                                    <input type="number" className="form-control" placeholder="TIN" id="tin" name="tin" onChange={handleChange} />
                                    : 
                                    <input type="number" className="form-control" placeholder="TIN" id="tin" name="tin" onChange={handleChange} disabled />
                                }
                                </div>
                                <div className="col-6 form-details">
                                    <input type="text" className="form-control" placeholder="Name" id="name" name="name" onChange={handleChange} />
                                </div>
                                <div className="col-6 form-details">
                                    <input type="text" className="form-control" placeholder="Address" id="address" name="address" onChange={handleChange} />
                                </div>
                                <div className="col-6 form-details">
                                    <input type="number" className="form-control" placeholder="phone" id="phone" name="phone" onChange={handleChange} />
                                </div>
                                {/* <div className="col-6 form-details">
                                    <select className="form-select col-auto" defaultValue={'default'} id="categoryId" name="categoryId" onChange={handleChange}  >
                                        <option value="default" disabled>Select category</option>
                                        {
                                            props.categories ? props.categories.map(element => (
                                                <option value={element.id} key={element.id}>{element.category_names}</option>
                                            )
                                            ) : 'First you have to create a category.'
                                        }
                                    </select>
                                </div>
                                <div className="col-6 form-details">
                                    <select className="form-select col-auto" defaultValue={'default'} id="levels" name="levels" onChange={handleChange}  >
                                        <option value="default" disabled>Select level</option>
                                        <option value="Basic">Basic</option>
                                        <option value="Medium">Medium</option>
                                        <option value="Avanced">Avanced</option>
                                    </select>
                                </div> */}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal"
                                onClick={() => newRecord({ data, props, setData, cleanForm })}>{props.type === 'create' ? 'Add' : 'Update'}</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Modal;




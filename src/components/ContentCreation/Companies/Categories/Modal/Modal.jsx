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
        <section className="container modal-component">
            <div className="modal fade" id="recordModification" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">{props.type === 'create' ? 'Create category' : 'Update category'}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row align-items-center">
                                <div className="col-12 form-details">
                                    <input type="text" className="form-control" placeholder="Name" id="name" name="name" onChange={handleChange} />
                                </div>
                                <div className="col-12 form-details">
                                
                                {
                                    props.type === 'create' ? 
                                    <label>This category will belong to the company you selected</label>
                                    : 
                                    <label>If you change company, you can find this category and its respective articles in the company you chose</label>
                                }
                                    <select className="form-select col-auto" defaultValue={'default'} id="companyID" name="companyID" onChange={handleChange}  >
                                        <option value="default" disabled>Select company</option>
                                        {
                                            props.type === 'create'
                                            ?
                                                props.companies ? props.companies.map(element => (
                                                    <option value={element.tin} key={element.tin} disabled>{element.name}</option>
                                                )
                                                ) : 'First you have to create a category.'
                                            :
                                                props.companies ? props.companies.map(element => (
                                                    <option value={element.tin} key={element.tin} >{element.name}</option>
                                                )
                                                ) : 'First you have to create a category.'
                                        }
                                    </select>
                                </div>
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




import React, { useState, useMemo } from 'react';
import { newRecord } from "../useData.js"
import { cleanForm } from "./useModal"
import URL from '../../../utils/Config.js';
import "./Modal.scss";


const Modal = (props) => {
    const [data, setData] = useState({});

    const handleChange = (e) => {
       if (e.target.name === 'ProfilePicture') {
            data[e.target.name] = e.target.files[0];

            var file = e.target.files[0];
            var reader = new FileReader();
            reader.onload = function (e) {
                var img = document.getElementById('SecondLogImage');
                img.src = e.target.result;
            }
            reader.readAsDataURL(file);
        }
        else {
            data[e.target.name] = e.target.value;
        }
        setData(data)
    }

    useMemo(() => cleanForm({ props, setData }), [props.info, props.type]);

    return (
        <section className=" modal-component">
            <div className="container modal fade" id="recordModification" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">{props.type === 'create' ? 'Create profile' : 'Update profile'}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row align-items-center">
                                <div className="col-md-6 col-sm-12 form-details">
                                    <input type="text" className="form-control" placeholder="Name" id="name" name="name" onChange={handleChange} />
                                </div>
                                <div className="col-md-6 col-sm-12 form-details">
                                    <input type="email" className="form-control" placeholder="Email" id="email" name="email" onChange={handleChange} />
                                </div>
                                <div className="col-12 form-details">
                                <label className="form-label" >Profile picture</label>
                                    <input type="file" className="form-control" id="ProfilePicture" name="ProfilePicture" onChange={handleChange} />
                                </div>
                                {
                                    props.type === 'update' ?
                                        <div className='col-6'>
                                            <label className="form-label" >Old file</label><br />
                                            <img src={props.record ? URL.BASE_URL_STORAGE + props.record.profile_picture : null} className="card-img-top"></img>
                                        </div>
                                        : null
                                }
                                <div className='col-6'>
                                    <label className="form-label" >New file</label><br />
                                    <img id="SecondLogImage" className="card-img-top" />
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




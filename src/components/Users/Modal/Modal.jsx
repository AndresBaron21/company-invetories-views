import React, { useState, useMemo } from 'react';
import { newRecord } from "../useData.js"
import { cleanForm } from "./useModal"
import "./Modal.scss";
import URL from '../../../utils/Config';
import Select from 'react-select'

const Modal = (props) => {
    const [data, setData] = useState({});
    
    const handleChange = (e) => {
        if (e.target.name === 'profilePicture') {
            data[e.target.name] = e.target.files[0];

            var file = e.target.files[0];
            var reader = new FileReader();
            reader.onload = function (e) {
                var img = document.getElementById('FirstLogImage');
                img.src = e.target.result;
            }
            reader.readAsDataURL(file);
        } else if (e.target.name === 'coverPhoto') {
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

    useMemo(() => cleanForm({ props, setData }), [props.type == 'create' ? props.type : props.record.id]);

    return (
        <section className="container modal-component">
            <div className="modal fade" id="recordModification" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">{props.type === 'create' ? 'Create user' : 'Update user'}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row align-items-center">
                                <div className="col-md-6 col-sm-12 form-details">
                                    <input type="text" className="form-control" placeholder="First name" id="firstName" name="firstName" onChange={handleChange} />
                                </div>
                                <div className="col-md-6 col-sm-12 form-details">
                                    <input type="text" className="form-control" placeholder="Last name" id="lastName" name="lastName" onChange={handleChange} />
                                </div>
                                <div className="col-md-6 col-sm-12 form-details">
                                    <input type="text" className="form-control" placeholder="Email" id="email" name="email" onChange={handleChange} />
                                </div>
                                <div className="col-md-6 col-sm-12 form-details">
                                    <Select 
                                        options={props.options} 
                                        value={props.selectedOption}
                                        onChange={props.setSelectedOption}
                                        isMulti
                                        className="basic-multi-select"
                                        classNamePrefix="select"
                                        id='roles'
                                        name='roles'
                                    />
                                </div>
                                <div className="col-md-6 col-sm-12 form-details">
                                    <input type="date" className="form-control" placeholder="Birthday" id="birthday" name="birthday" onChange={handleChange} />
                                </div>
                                <div className="col-md-6 col-sm-12 form-details">
                                    <input type="text" className="form-control" placeholder="Country" id="country" name="country" onChange={handleChange} />
                                </div>
                                <div className="col-md-6 col-sm-12 form-details">
                                    <input type="text" className="form-control" placeholder="Gender" id="gender" name="gender" onChange={handleChange} />
                                </div>
                                <div className="col-md-6 col-sm-12 form-details">
                                    <input type="number" className="form-control" placeholder="Mobile number" id="mobileNumber" name="mobileNumber" onChange={handleChange} />
                                </div>
                                <div className="col-md-6 col-sm-12 form-details">
                                    <input type="text" className="form-control" placeholder="Lives in" id="livesIn" name="livesIn" onChange={handleChange} />
                                </div>
                                <div className="col-md-6 col-sm-12 form-details">
                                    <input type="text" className="form-control" placeholder="Works at" id="worksAt" name="worksAt" onChange={handleChange} />
                                </div>
                                <div className="col-md-6 col-sm-12 form-details">
                                    <input type="password" className="form-control" placeholder="Password" id="password" name="password" onChange={handleChange} />
                                </div>
                                {/* <div className="col-12 form-details">
                                    <input type="file" className="form-control" placeholder="Profile picture" id="profilePicture" name="profilePicture" onChange={handleChange} />
                                </div>
                                {
                                    props.type === 'update' ?
                                        <div className='col-6'>
                                            <label className="form-label" >Old file</label><br />
                                            <img src={props.record && props.record.profile_picture ? URL.BASE_URL_STORAGE + props.record.profile_picture : null} className="card-img-top" ></img>
                                        </div>
                                        : null
                                }
                                <div className='col-6'>
                                    <label className="form-label" >New file</label><br />
                                    <img id="FirstLogImage" className="card-img-top" />
                                </div>
                                <div className="col-12 form-details">
                                    <input type="file" className="form-control" placeholder="Cover photo" id="coverPhoto" name="coverPhoto" onChange={handleChange} />
                                </div>
                                {
                                    props.type === 'update' ?
                                        <div className='col-6'>
                                            <label className="form-label" >Old file</label><br />
                                            <img src={props.record && props.record.cover_photo ? URL.BASE_URL_STORAGE + props.record.cover_photo : null} className="card-img-top" ></img>
                                        </div>
                                        : null
                                }
                                <div className='col-6'>
                                    <label className="form-label" >New file</label><br />
                                    <img id="SecondLogImage" className="card-img-top" />
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




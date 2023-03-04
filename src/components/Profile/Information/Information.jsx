import React from "react";
import "./Information.scss";
import { HiOutlinePencil } from "react-icons/hi";

const Information = ({
    info,
    setRecord,
    setType,
}) => {


    return (
        <section className="information">
            <div className="container">
                <div className="row information-details">
                    <div className="col-md-3 col-sm-12">
                        <h2 className="section-title text-details">General information</h2>
                    </div>
                    <ul className="list-group background col-md-8 col-sm-12">
                        <li className="list-group-item text-details">Full name: {info.name}</li>
                        <li className="list-group-item text-details">Country: {info.email}</li>
                    </ul>
                    <HiOutlinePencil
                        type="button"
                        className="modal-button col-1 text-details icons-details"
                        data-bs-toggle="modal" data-bs-target="#recordModification"
                            onClick={() => {
                                setRecord(info)
                                setType('update')
                            }
                        }
                    />
                </div>
            </div>
        </section>
    );
};

export default Information;

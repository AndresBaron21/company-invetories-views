import React from "react";
import DataTable from '../../../General/DataTable';
import Modal from './Modal'
import ModalEmail from './ModalEmail'
import "./Articles.scss";
import { useInfo } from './useData.js'
import { useParams } from "react-router-dom";

const Modules = () => {
    let params = useParams();

    const {
        info,
        modules,
        columns,
        pending,
        record,
        type,
        getPDF,
        setType,
        updateDataTable,
        setUpdateDataTable,
    } = useInfo({ params });

    return (
        <section className="container categories-component">
            <div className="row">
                <div className="col-md-6 col-sm-12">
                    <h1 className="section-title text-details">Articles</h1>
                </div>
                <button type="button" className="btn btn-light modal-button col-md-2 col-sm-12 text-details" onClick={getPDF}>
                    Download pdf
                </button>
                <button type="button" className="btn btn-light modal-button col-md-2 col-sm-12 text-details" data-bs-toggle="modal" data-bs-target="#sendEmail" onClick={() => setType('create')}>
                    Send email
                </button>
                <button type="button" className="btn btn-light modal-button col-md-2 col-sm-12 text-details" data-bs-toggle="modal" data-bs-target="#recordModification" onClick={() => setType('create')}>
                    Create article
                </button>
            </div>
            <DataTable
                columns={columns}
                info={info}
                progressPending={pending}
            />
            <div>
                <Modal
                    updateData={setUpdateDataTable}
                    updateDataTable={updateDataTable}
                    record={record}
                    type={type}
                    modules={modules}
                    categoryID={params.id}
                />
                 <ModalEmail
                    categoryID={params.id}
                />
            </div>
        </section>
    );
};

export default Modules;




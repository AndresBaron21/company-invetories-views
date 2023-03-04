import React from "react";
import DataTable from '../../../General/DataTableSecond';
import Modal from './Modal'
import "./Companies.scss";
import { useInfo } from './useData.js'

const Company = () => {
    const { info, columns, pending, record, type, setType, updateDataTable, setUpdateDataTable, categories, getCategories, } = useInfo();

    return (
        <section className="container companies-component">
            <div className="row">
                <div className="col-9">
                    <h1 className="section-title text-details">Companies</h1>
                </div>
                <button type="button" className="btn btn-light modal-button col-3 text-details" data-bs-toggle="modal" data-bs-target="#recordModification" onClick={() => setType('create')}>
                    Create company
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
                    getCategories={getCategories}
                />
            </div>
        </section>
    );
};

export default Company;




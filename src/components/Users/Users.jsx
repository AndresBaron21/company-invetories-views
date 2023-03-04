import React from "react";
import DataTable from '../General/DataTable';
import Modal from './Modal'
import "./Users.scss";
import { useInfo } from './useData.js'

const UsersControl = () => {
    const { 
          info,
          selectedOption,
          setSelectedOption,
          options,
          columns,
          pending, 
          record, 
          type, 
          setType, 
          updateDataTable, 
          setUpdateDataTable,
         } = useInfo();

    return (
        <section className="container users-component">
            <div className="row">
                <div className="col-9">
                    <h1 className="section-title text-details">Users control</h1>
                </div>
                <button type="button" 
                    className="btn btn-light modal-button col-3 text-details"
                    data-bs-toggle="modal" 
                    data-bs-target="#recordModification"
                    onClick={() => {
                        setType('create')
                        setSelectedOption([])
                    }
                }>
                    Create user
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
                    options={options} 
                    selectedOption={selectedOption} 
                    setSelectedOption={setSelectedOption} 
                />
            </div>
        </section>
    );
};

export default UsersControl;




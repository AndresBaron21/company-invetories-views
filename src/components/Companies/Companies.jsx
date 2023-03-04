import React from "react";
import { useInfo } from './useBook.js'
import Spinner from '../General/Spinner';
import "./Companies.scss";

const Books = () => {
    const {
        pending,
        filterComponent,
    } = useInfo();

    return (
        <section className="companies container">
            <header className="page-header">
                <div className="row">
                    <div className="col">
                        <h1 className="section-title text-details">Companies</h1>
                    </div>
                </div>
            </header>
            <div className="container">
                    <div className="row">
                        {
                            pending !== false ?
                                <Spinner />
                                :
                                filterComponent()
                        }
                    </div>
            </div>

        </section>
    );
};

export default Books;

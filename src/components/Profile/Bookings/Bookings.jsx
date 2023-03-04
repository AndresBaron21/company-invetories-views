import "./Bookings.scss";
import { Link } from "react-router-dom";
import { useInfo } from "./useData.js"
import Modal from './Modal'

const CompletedStudies = () => {
    const { 
            showLatestRecords,
            record,
            info,
            updateDataTable,
            setUpdateDataTable, 
            type
         } = useInfo();
    return (
        <section className="completed-studies">
            <div className="container">
                <Link
                    to="/courses"
                    className="row tap-list justify-content-md-center pull-apart link"
                >
                    <h2 className="section-title text-details">My bookings</h2>
                </Link>
                <div className="container">
                    <div className="media-scroller scroll">
                        {
                            showLatestRecords()
                        }
                    </div>
                </div>
            </div>
            <Modal
                updateData={setUpdateDataTable}
                updateDataTable={updateDataTable}
                record={record}
                info={info}
                type={type}
            />
        </section>
    );
};

export default CompletedStudies;

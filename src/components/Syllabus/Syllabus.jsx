import React from "react";
import "./Syllabus.scss";
import { Link } from "react-router-dom";
import URL from '../../utils/Config';


const Modules = (props) => {
  return (
    <section className="container syllabus-component">
      <div className="syllabus-scroll">
        <div className="row justify-content-md-center pull-apart link">
          <h1 className="section-title text-details">Modules</h1>
        </div>
        {
          props.modules ? props.modules.map(element =>
          (
            <div className="pull-apart" key={element.id}>
              <div className="row justify-content-md-center pull-apart link">
                <h2 className="section-title text-details">{element.module_names}</h2>
              </div>
              {
                element.lessons ? element.lessons.map(record =>
                (
                  <div className="col" key={record.id}>
                    <Link to={"/lesson/" + record.id} className={record.id !== parseInt(props.id) ? "card card-details" : "card activated-card"}>
                        <div className="row g-0">
                          <div className="col-md-4">
                            <video src={URL.BASE_URL_STORAGE + record.videos_classes} className="img-fluid rounded-start" />
                          </div>
                          <div className="col-md-8">
                            <div className="card-body">
                              <h5 className="card-title">{record.class_names}</h5>
                              <p className="card-text"><small>{record.topics}</small></p>
                            </div>
                          </div>
                        </div>
                    </Link>
                  </div>
                )
                ) : null
              }
            </div>
          )
          ) : null
        }
      </div>
    </section>
  );
};

export default Modules;

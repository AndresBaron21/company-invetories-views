import React from "react";
import "./Resource.scss";

const Resource = ({ titles, topics, contents, }) => {
  return (
    <section className="container resource-lesson">
      <div className="scroll-resource">
        <div className="card card-details">
          <div className="card-header"></div>
          <div className="card-body">
            <h5 className="card-title">{titles}</h5>
            {
              topics ?
                <h6 className="card-title">{topics}</h6>
                : null
            }
            <p className="card-text">
              {contents}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resource;

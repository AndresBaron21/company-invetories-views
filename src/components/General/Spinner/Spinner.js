import React from "react";
import './spinner.scss';

const Spinner = (props) => (
    <div className='center'>
        <div className="lds-ripple"><div></div><div></div></div>
    </div>
);

export default Spinner;
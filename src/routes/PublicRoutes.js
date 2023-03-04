import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFound from '../containers/NotFound';
import UserValidation from '../containers/UserValidation'
import PublicHome from '../containers/PublicHome/index.js'
// import Layout from '../components/LayoutPublic';

function PublicRoutes(props) {
    return (
        <section>
            <BrowserRouter>
                <Routes>
                    <Route path="*" element={<NotFound />} />
                    {/* <Route exact path="/login" element={<UserValidation validation={props.validation} />} />
                        <Route index element={<UserValidation validation={props.validation} />} /> */}
                    <Route exact path="/login" element={<UserValidation validation={props.validation} />} />
                    <Route exact path="/" element={<PublicHome />} />
                    <Route index element={<PublicHome />} />
                </Routes>
            </BrowserRouter>
        </section>
    );
}

export default PublicRoutes;

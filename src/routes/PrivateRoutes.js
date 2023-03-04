import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Companies from '../containers/ContentCreation/Companies'
import Categories from '../components/ContentCreation/Companies/Categories'
import Articles from '../components/ContentCreation/Companies/Articles'
import CompaniesList from '../components/Companies'
import Layout from '../components/Layout';
import Home from '../containers/Home';
import NotFound from '../containers/NotFound';
import Profile from '../containers/Profile';
import UserManager from '../containers/UserManager';

const PrivateRoutes = () => {
    var storedRoles = [];
    if (localStorage.getItem('ROLES') != 'student') {
        storedRoles = JSON.parse(localStorage.getItem('ROLES'))
    }
    const adminRole = storedRoles !== null ? storedRoles.find(element => element === 'admin') : false;

    if (adminRole || localStorage.getItem('ROLES') == 'admin') {
        return (
            <section>
                <BrowserRouter>
                    <Layout>
                        <Routes>
                            <Route exact path="/company-manager" element={<Companies />} />
                            <Route exact path="/company-manager/categories/:id" element={<Categories />} />
                            <Route exact path="/company-manager/categories-articles/:id" element={<Articles />} />
                            <Route exact path="/companies" element={<CompaniesList />} />
                            <Route exact path="/home" element={<Home />} />
                            <Route exact path="/profile" element={<Profile />} />
                            <Route exact path="/users" element={<UserManager />} />
                            <Route path="*" element={<NotFound />} />

                            <Route index element={<Home />} />
                        </Routes>
                    </Layout>
                </BrowserRouter>
            </section>
        );
    } else {
        return (
            <section>
                <BrowserRouter>
                    <Layout>
                        <Routes>
                            <Route exact path="/companies" element={<CompaniesList />} />
                            <Route exact path="/home" element={<Home />} />
                            <Route exact path="/profile" element={<Profile />} />
                            <Route path="*" element={<NotFound />} />

                            <Route index element={<Home />} />
                        </Routes>
                    </Layout>
                </BrowserRouter>
            </section>
        );
    }

}

export default PrivateRoutes;

import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "./Companies.scss";
import Courses from '../../../components/ContentCreation/Companies/Companies'

const courses = () => {
    return (
        <section className="container courses-component">

            <Tabs className="three">
                <TabList className="tittle-tabs row">
                    <Tab className="tittle-tabs  text-details col tap-list">
                        Companies
                    </Tab>
                </TabList>

                <TabPanel>
                    <Courses />
                </TabPanel>
            </Tabs>
        </section>
    );
};

export default courses;




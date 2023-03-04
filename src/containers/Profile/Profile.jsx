import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "./Profile.scss";
import Bookings from '../../components/Profile/Bookings'
import Information from '../../components/Profile/Information'
import ProfileHeader from '../../components/Profile/ProfileHeader'
import { useInfo } from './useData'
import Spinner from '../../components/General/Spinner'
import Modal from './Modal'

const Profile = () => {
  const {
    pending,
    info,
    setRecord,
    record,
    type,
    setType,
    updateDataTable,
    setUpdateDataTable,
  } = useInfo();

  return (
    pending
      ?
      <Spinner />
      :
      <section className="profile-container">
        <div className="wrapper">
          <div className='header'>
            <div className="profile-header">
              <ProfileHeader
                CoverPhoto={info.cover_photo}
                ProfilePicture={info.profile_picture}
              />
            </div>
          </div>
          <div className="profile-body">
            <Tabs className="three">
              <TabList className="row justify-content-center">
                <Tab className="resource  text-details col-auto tap-list">
                  {/* <GiBookshelf className="icons-details" /> */}
                  Information
                </Tab>
                <Tab className="resource  text-details col-auto tap-list">
                  {/* <BsBook className="icons-details" /> */}
                  My Bookings
                </Tab>
              </TabList>

              <TabPanel>
                <Information
                  info={info}
                  setRecord={setRecord}
                  record={record}
                  setType={setType}
                  updateDataTable={updateDataTable}
                  setUpdateDataTable={setUpdateDataTable}
                />
              </TabPanel>
              <TabPanel>
                <Bookings />
              </TabPanel>
            </Tabs>
          </div>
        </div>
        <div>
          <Modal
            updateData={setUpdateDataTable}
            updateDataTable={updateDataTable}
            record={record}
            info={info}
            type={type}
          />
        </div>
      </section>
  );
};

export default Profile;

import React from "react";
import "./ProfileHeader.scss";
import URL from '../../../utils/Config.js';

const ProfileHeader = ({ CoverPhoto, ProfilePicture }) => {
    return (
        <section className="profile-header">
            <div className="wrapper">
                <div className="profile-picture">
                    <img src={URL.BASE_URL_STORAGE + ProfilePicture} className='photo-profile' />
                </div>
            </div>
        </section>
    );
};

export default ProfileHeader;
